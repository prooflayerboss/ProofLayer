import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  console.log('🔥 WEBHOOK ENDPOINT HIT - stripe-webhook route');
  console.log('Request URL:', request.url);
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  });

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  console.log('Body length:', body.length);
  console.log('Signature present:', !!signature);

  if (!signature) {
    console.error('❌ Missing stripe-signature header');
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    console.log('Webhook event received:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      console.log('Checkout session completed for userId:', userId);

      if (!userId) {
        console.error('No userId in session metadata');
        return NextResponse.json(
          { error: 'Missing userId' },
          { status: 400 }
        );
      }

      // One-time payment (Lifetime) - this is the only option now
      console.log('Attempting to upgrade user to LIFETIME...');

      const updated = await prisma.entitlement.update({
        where: { userId },
        data: {
          plan: 'LIFETIME',
          stripeCustomerId: session.customer as string,
          stripePaymentId: session.payment_intent as string,
        },
      });

      console.log(`✓ User ${userId} successfully upgraded to LIFETIME. New plan:`, updated.plan);
    }

    // Note: No subscription webhooks needed since we only offer one-time lifetime payments

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}