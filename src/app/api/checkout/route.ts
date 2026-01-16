import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { plan } = body; // 'MONTHLY' or 'LIFETIME'

    if (!plan || (plan !== 'MONTHLY' && plan !== 'LIFETIME')) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Get or create user in database
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { entitlement: true },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email!,
          entitlement: {
            create: {
              plan: 'TRIAL',
              workspacesUsed: 0,
              submissionsUsed: 0,
            },
          },
        },
        include: { entitlement: true },
      });
    }

    // Check if already on a paid plan
    const currentPlan = dbUser.entitlement?.plan;

    if (currentPlan === 'LIFETIME') {
      return NextResponse.json(
        { error: 'You already have lifetime access' },
        { status: 400 }
      );
    }

    if (currentPlan === 'MONTHLY' && plan === 'MONTHLY') {
      return NextResponse.json(
        { error: 'You already have an active monthly subscription' },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Determine mode and price based on plan
    const isMonthly = plan === 'MONTHLY';
    const priceId = isMonthly
      ? process.env.STRIPE_MONTHLY_PRICE_ID!
      : process.env.STRIPE_LIFETIME_PRICE_ID!;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: isMonthly ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/dashboard/billing?success=true`,
      cancel_url: `${appUrl}/dashboard/billing?canceled=true`,
      customer_email: user.email!,
      metadata: {
        userId: user.id,
        plan: plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}