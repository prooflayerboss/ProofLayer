import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { webhookLogger } from '@/lib/logger';

// Disable body parsing so we can verify the webhook signature
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: NextApiRequest) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  webhookLogger.debug('Webhook hit', { method: req.method, url: req.url });

  if (req.method !== 'POST') {
    webhookLogger.warn('Method not allowed', { method: req.method });
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  });

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    webhookLogger.error('Missing stripe-signature header');
    return res.status(400).json({ error: 'Missing stripe-signature header' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    webhookLogger.debug('Webhook signature verified');
  } catch (err) {
    webhookLogger.error('Webhook signature verification failed', { error: String(err) });
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    webhookLogger.info('Webhook event received', { type: event.type });

    // Handle checkout.session.completed for both one-time and subscription
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const purchaseType = session.metadata?.type; // 'first100' or undefined for regular users
      const plan = session.metadata?.plan as 'STARTER' | 'GROWTH' | 'LAUNCH' | 'CONCIERGE' | 'MONTHLY' | 'LIFETIME' | 'SOLO' | 'PRO' | 'AGENCY';

      webhookLogger.info('Checkout session completed', { plan, mode: session.mode, type: purchaseType });

      // Handle First100 founder upgrades
      if (purchaseType === 'first100') {
        const founderId = session.metadata?.founderId;
        const founderEmail = session.metadata?.founderEmail;

        webhookLogger.info('First100 founder upgrade', { founderId, founderEmail, plan });

        if (!founderId || !plan) {
          webhookLogger.error('Missing founderId or plan in First100 session metadata');
          return res.status(400).json({ error: 'Missing First100 metadata' });
        }

        // Update the founder's record - auto-approve on payment
        await prisma.first100Waitlist.update({
          where: { id: founderId },
          data: {
            status: 'active', // Auto-approve on payment
          },
        });

        webhookLogger.info('First100 founder upgraded and auto-approved', { founderId, plan });
        return res.json({ received: true });
      }

      // Handle regular user upgrades
      const userId = session.metadata?.userId;

      if (!userId || !plan) {
        webhookLogger.error('Missing userId or plan in session metadata');
        return res.status(400).json({ error: 'Missing metadata' });
      }

      if (session.mode === 'subscription') {
        // Monthly subscription

        const updated = await prisma.entitlement.update({
          where: { userId },
          data: {
            plan: 'MONTHLY',
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            subscriptionStatus: 'active',
          },
        });

        webhookLogger.info('User subscribed to MONTHLY plan', { userId });
      } else {
        // One-time payment (LIFETIME, SOLO, PRO, or AGENCY)

        const updated = await prisma.entitlement.update({
          where: { userId },
          data: {
            plan: plan,
            stripeCustomerId: session.customer as string,
            stripePaymentId: session.payment_intent as string,
          },
        });

        webhookLogger.info('User upgraded', { userId, plan });
      }
    }

    // Handle subscription updates
    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (!userId) {
        webhookLogger.error('No userId in subscription metadata');
        return res.status(400).json({ error: 'Missing userId' });
      }

      await prisma.entitlement.update({
        where: { userId },
        data: {
          subscriptionStatus: subscription.status,
          subscriptionPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });

      webhookLogger.info('Subscription status updated', { userId, status: subscription.status });
    }

    // Handle subscription deletions/cancellations
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (!userId) {
        webhookLogger.error('No userId in subscription metadata for deletion');
        return res.status(400).json({ error: 'Missing userId' });
      }

      await prisma.entitlement.update({
        where: { userId },
        data: {
          plan: 'TRIAL',
          subscriptionStatus: 'canceled',
          stripeSubscriptionId: null,
        },
      });

      webhookLogger.info('User downgraded to TRIAL after cancellation', { userId });
    }

    return res.json({ received: true });
  } catch (error) {
    webhookLogger.error('Webhook processing error', { error: String(error) });
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
