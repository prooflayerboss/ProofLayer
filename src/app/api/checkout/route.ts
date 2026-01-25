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
    const { plan } = body; // 'MONTHLY', 'LIFETIME', 'SOLO', 'PRO', or 'AGENCY'

    const validPlans = ['MONTHLY', 'LIFETIME', 'SOLO', 'PRO', 'AGENCY'];
    if (!plan || !validPlans.includes(plan)) {
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
    const lifetimePlans = ['LIFETIME', 'SOLO', 'PRO', 'AGENCY'];

    if (lifetimePlans.includes(currentPlan || '')) {
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

    // Get app URL - use Vercel URL in production or localhost in dev
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ||
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // Get price ID based on plan
    let priceId: string | undefined;

    switch (plan) {
      case 'MONTHLY':
        priceId = process.env.STRIPE_MONTHLY_PRICE_ID;
        break;
      case 'LIFETIME':
        priceId = process.env.STRIPE_LIFETIME_PRICE_ID;
        break;
      case 'SOLO':
        priceId = process.env.STRIPE_PRICE_SOLO;
        break;
      case 'PRO':
        priceId = process.env.STRIPE_PRICE_PRO;
        break;
      case 'AGENCY':
        priceId = process.env.STRIPE_PRICE_AGENCY;
        break;
      default:
        priceId = undefined;
    }

    if (!priceId) {
      console.error(`Stripe price ID not set for plan: ${plan}`);
      return NextResponse.json(
        { error: 'Stripe price ID not configured' },
        { status: 500 }
      );
    }

    console.log('Creating checkout session with price:', priceId, 'for plan:', plan);

    // Create Stripe checkout session
    const sessionConfig: any = {
      mode: plan === 'MONTHLY' ? 'subscription' : 'payment',
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
    };

    // Allow promotion codes for all plans
    sessionConfig.allow_promotion_codes = true;

    const session = await stripe.checkout.sessions.create(sessionConfig);

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