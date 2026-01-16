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

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      console.log('💳 Checkout session completed for userId:', userId);
      console.log('Session metadata:', session.metadata);

      if (!userId) {
        console.error('❌ No userId in session metadata');
        return res.status(400).json({ error: 'Missing userId' });
      }

      console.log('⏳ Attempting to upgrade user to LIFETIME...');

      const updated = await prisma.entitlement.update({
        where: { userId },
        data: {
          plan: 'LIFETIME',
          stripeCustomerId: session.customer as string,
          stripePaymentId: session.payment_intent as string,
        },
      });

      console.log(`✅✅✅ User ${userId} successfully upgraded to LIFETIME!`);
      console.log('Updated plan:', updated.plan);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
