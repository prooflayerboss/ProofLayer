import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

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
  console.log('🔥🔥🔥 PAGES API WEBHOOK HIT - This is the legacy API route');
  console.log('Method:', req.method);
  console.log('URL:', req.url);

  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  });

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  console.log('Buffer length:', buf.length);
  console.log('Signature present:', !!sig);

  if (!sig) {
    console.error('❌ Missing stripe-signature header');
    return res.status(400).json({ error: 'Missing stripe-signature header' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('✅ Webhook signature verified successfully');
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    console.log('📦 Webhook event received:', event.type);

    // Handle checkout.session.completed for both one-time and subscription
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const purchaseType = session.metadata?.type; // 'first100' or undefined for regular users
      const plan = session.metadata?.plan as 'STARTER' | 'GROWTH' | 'LAUNCH' | 'CONCIERGE' | 'MONTHLY' | 'LIFETIME' | 'SOLO' | 'PRO' | 'AGENCY';

      console.log('💳 Checkout session completed');
      console.log('Plan:', plan);
      console.log('Mode:', session.mode);
      console.log('Type:', purchaseType);

      // Handle First100 founder upgrades
      if (purchaseType === 'first100') {
        const founderId = session.metadata?.founderId;
        const founderEmail = session.metadata?.founderEmail;

        console.log('🚀 First100 founder upgrade:', { founderId, founderEmail, plan });

        if (!founderId || !plan) {
          console.error('❌ Missing founderId or plan in First100 session metadata');
          return res.status(400).json({ error: 'Missing First100 metadata' });
        }

        // Update the founder's record - auto-approve on payment
        await prisma.first100Waitlist.update({
          where: { id: founderId },
          data: {
            status: 'active', // Auto-approve on payment
          },
        });

        console.log(`✅ First100 founder ${founderId} upgraded to ${plan} and auto-approved!`);
        return res.json({ received: true });
      }

      // Handle regular user upgrades
      const userId = session.metadata?.userId;

      console.log('💳 Regular checkout for userId:', userId);

      if (!userId || !plan) {
        console.error('❌ Missing userId or plan in session metadata');
        return res.status(400).json({ error: 'Missing metadata' });
      }

      if (session.mode === 'subscription') {
        // Monthly subscription
        console.log('⏳ Setting up MONTHLY subscription...');

        const updated = await prisma.entitlement.update({
          where: { userId },
          data: {
            plan: 'MONTHLY',
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            subscriptionStatus: 'active',
          },
        });

        console.log(`✅ User ${userId} subscribed to MONTHLY plan!`);
        console.log('Updated plan:', updated.plan);
      } else {
        // One-time payment (LIFETIME, SOLO, PRO, or AGENCY)
        console.log(`⏳ Upgrading user to ${plan}...`);

        const updated = await prisma.entitlement.update({
          where: { userId },
          data: {
            plan: plan,
            stripeCustomerId: session.customer as string,
            stripePaymentId: session.payment_intent as string,
          },
        });

        console.log(`✅ User ${userId} upgraded to ${plan}!`);
        console.log('Updated plan:', updated.plan);
      }
    }

    // Handle subscription updates
    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      console.log('🔄 Subscription updated for userId:', userId);
      console.log('Status:', subscription.status);

      if (!userId) {
        console.error('❌ No userId in subscription metadata');
        return res.status(400).json({ error: 'Missing userId' });
      }

      await prisma.entitlement.update({
        where: { userId },
        data: {
          subscriptionStatus: subscription.status,
          subscriptionPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });

      console.log(`✅ Subscription status updated for user ${userId}`);
    }

    // Handle subscription deletions/cancellations
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      console.log('❌ Subscription deleted for userId:', userId);

      if (!userId) {
        console.error('❌ No userId in subscription metadata');
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

      console.log(`✅ User ${userId} downgraded to TRIAL after subscription cancellation`);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
