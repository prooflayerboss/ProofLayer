import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  });

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
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
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan as 'MONTHLY' | 'LIFETIME';

      if (!userId) {
        console.error('No userId in session metadata');
        return NextResponse.json(
          { error: 'Missing userId' },
          { status: 400 }
        );
      }

      if (session.mode === 'subscription') {
        // Monthly subscription
        await prisma.entitlement.update({
          where: { userId },
          data: {
            plan: 'MONTHLY',
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            subscriptionStatus: 'active',
          },
        });

        console.log(`User ${userId} subscribed to MONTHLY plan`);
      } else {
        // One-time payment (Lifetime)
        await prisma.entitlement.update({
          where: { userId },
          data: {
            plan: 'LIFETIME',
            stripeCustomerId: session.customer as string,
            stripePaymentId: session.payment_intent as string,
          },
        });

        console.log(`User ${userId} upgraded to LIFETIME`);
      }
    }

    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (userId) {
        await prisma.entitlement.update({
          where: { userId },
          data: {
            subscriptionStatus: subscription.status,
            subscriptionPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        console.log(`User ${userId} subscription updated: ${subscription.status}`);
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;

      // Find user by subscription ID
      const entitlement = await prisma.entitlement.findFirst({
        where: { stripeSubscriptionId: subscription.id },
      });

      if (entitlement) {
        // Downgrade to trial when subscription ends
        await prisma.entitlement.update({
          where: { userId: entitlement.userId },
          data: {
            plan: 'TRIAL',
            subscriptionStatus: 'canceled',
            stripeSubscriptionId: null,
          },
        });

        console.log(`User ${entitlement.userId} subscription canceled, downgraded to TRIAL`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}