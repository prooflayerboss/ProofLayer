import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiLogger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Access token required' }, { status: 401 });
    }

    // Find the founder by access token
    const founder = await prisma.first100Waitlist.findUnique({
      where: { accessToken: token },
    });

    if (!founder) {
      return NextResponse.json({ error: 'Invalid access token' }, { status: 404 });
    }

    if (founder.type !== 'FOUNDER') {
      return NextResponse.json({ error: 'Invalid access' }, { status: 403 });
    }

    // Get early adopters who have matching interests to the founder's category
    const earlyAdopters = await prisma.first100Waitlist.findMany({
      where: {
        type: 'EARLY_ADOPTER',
        // Match early adopters whose interests include the founder's product category
        interests: founder.productCategory ? {
          has: founder.productCategory,
        } : undefined,
      },
      select: {
        id: true,
        email: true,
        interests: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get total early adopter count for stats
    const totalEarlyAdopters = await prisma.first100Waitlist.count({
      where: { type: 'EARLY_ADOPTER' },
    });

    return NextResponse.json({
      founder: {
        name: founder.name,
        email: founder.email,
        productName: founder.productName,
        productTagline: founder.productTagline,
        productCategory: founder.productCategory,
        productStage: founder.productStage,
        lookingForCount: founder.lookingForCount,
        offerDescription: founder.offerDescription,
        status: founder.status,
        createdAt: founder.createdAt,
        voteCount: founder.voteCount,
        slug: founder.slug,
        hasAccount: founder.hasAccount,
        accessToken: founder.accessToken,
      },
      earlyAdopters,
      stats: {
        matchingCount: earlyAdopters.length,
        totalCount: totalEarlyAdopters,
      },
    });
  } catch (error) {
    apiLogger.error('Portal API error', { error: String(error) });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
