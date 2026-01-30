import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { authLogger } from '@/lib/logger';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('founder_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify JWT
    let payload;
    try {
      const result = await jwtVerify(token, JWT_SECRET);
      payload = result.payload as { founderId: string; email: string };
    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get founder data with products
    const founder = await prisma.first100Waitlist.findUnique({
      where: { id: payload.founderId },
      include: {
        products: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!founder) {
      return NextResponse.json(
        { error: 'Founder not found' },
        { status: 404 }
      );
    }

    // Get total early adopters for stats
    const totalEarlyAdopters = await prisma.first100Waitlist.count({
      where: { type: 'EARLY_ADOPTER' },
    });

    return NextResponse.json({
      founder: {
        id: founder.id,
        email: founder.email,
        name: founder.name,
        twitterHandle: founder.twitterHandle,
        createdAt: founder.createdAt,
        // Legacy product fields (for backwards compatibility)
        productName: founder.productName,
        productTagline: founder.productTagline,
        productCategory: founder.productCategory,
        productStage: founder.productStage,
        productUrl: founder.productUrl,
        lookingForCount: founder.lookingForCount,
        offerDescription: founder.offerDescription,
        status: founder.status,
        voteCount: founder.voteCount,
        slug: founder.slug,
      },
      products: founder.products.map(p => ({
        id: p.id,
        name: p.name,
        tagline: p.tagline,
        url: p.url,
        category: p.category,
        stage: p.stage,
        slug: p.slug,
        lookingForCount: p.lookingForCount,
        offerDescription: p.offerDescription,
        status: p.status,
        plan: p.plan,
        voteCount: p.voteCount,
        createdAt: p.createdAt,
      })),
      stats: {
        totalEarlyAdopters,
      },
    });
  } catch (error) {
    authLogger.error('Auth check error', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}
