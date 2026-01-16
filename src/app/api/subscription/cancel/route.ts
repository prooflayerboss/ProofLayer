import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ensureUserExists } from '@/actions/user';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
    });
    const user = await ensureUserExists();

    if (!user?.entitlement?.stripeSubscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      );
    }

    // Cancel the subscription at period end (user keeps access until end of billing period)
    await stripe.subscriptions.update(user.entitlement.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    // Update local database
    await prisma.entitlement.update({
      where: { userId: user.id },
      data: {
        subscriptionStatus: 'canceling',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription will be canceled at the end of the billing period'
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
