import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
    });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { plan } = body; // 'LIFETIME' only

    if (!plan || plan !== 'LIFETIME') {
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

    // Check if already on lifetime plan
    const currentPlan = dbUser.entitlement?.plan;

    if (currentPlan === 'LIFETIME') {
      return NextResponse.json(
        { error: 'You already have lifetime access' },
        { status: 400 }
      );
    }

    // Get app URL - use Vercel URL in production or localhost in dev
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ||
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // Get lifetime price ID
    const priceId = process.env.STRIPE_LIFETIME_PRICE_ID;

    if (!priceId) {
      console.error('STRIPE_LIFETIME_PRICE_ID is not set');
      return NextResponse.json(
        { error: 'Stripe price ID not configured' },
        { status: 500 }
      );
    }

    console.log('Creating checkout session with price:', priceId);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
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

    // Return more detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}