import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { paymentLogger } from '@/lib/logger';
import { checkRateLimit, getClientIp, RATE_LIMITS, rateLimitHeaders } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit check
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = checkRateLimit(`checkout:${clientIp}`, RATE_LIMITS.strict);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: rateLimitHeaders(rateLimitResult) }
    );
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
    });

    const body = await request.json();
    const { token, plan } = body;

    if (!token) {
      return NextResponse.json({ error: 'Access token required' }, { status: 401 });
    }

    // Validate plan
    const validPlans = ['STARTER', 'GROWTH', 'LAUNCH'];
    if (!plan || !validPlans.includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    // Find founder by access token
    const founder = await prisma.first100Waitlist.findUnique({
      where: { accessToken: token },
    });

    if (!founder) {
      return NextResponse.json({ error: 'Invalid access token' }, { status: 401 });
    }

    if (founder.type !== 'FOUNDER') {
      return NextResponse.json({ error: 'Only founders can upgrade' }, { status: 403 });
    }

    // Get app URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ||
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // Get price ID based on plan
    let priceId: string | undefined;

    switch (plan) {
      case 'STARTER':
        priceId = process.env.STRIPE_PRICE_STARTER;
        break;
      case 'GROWTH':
        priceId = process.env.STRIPE_PRICE_GROWTH;
        break;
      case 'LAUNCH':
        priceId = process.env.STRIPE_PRICE_LAUNCH;
        break;
    }

    if (!priceId) {
      paymentLogger.error('Stripe price ID not configured', { plan });
      return NextResponse.json({ error: 'Stripe price ID not configured' }, { status: 500 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/first100/portal?token=${token}&upgraded=true`,
      cancel_url: `${appUrl}/first100/portal?token=${token}&canceled=true`,
      customer_email: founder.email,
      metadata: {
        founderId: founder.id,
        founderEmail: founder.email,
        productName: founder.productName || '',
        plan: plan,
        type: 'first100', // Mark this as a First100 purchase
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session';
    paymentLogger.error('First100 checkout error', { error: errorMessage });
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
