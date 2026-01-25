import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all products in voting status, ordered by vote count and then by date
    const products = await prisma.first100Waitlist.findMany({
      where: {
        type: 'FOUNDER',
        status: { in: ['voting', 'pending'] }, // Show both for now
      },
      select: {
        id: true,
        productName: true,
        productTagline: true,
        productUrl: true,
        productCategory: true,
        productStage: true,
        lookingForCount: true,
        offerDescription: true,
        name: true,
        twitterHandle: true,
        slug: true,
        voteCount: true,
        createdAt: true,
      },
      orderBy: [
        { voteCount: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    // Get total early adopters for stats
    const totalEarlyAdopters = await prisma.first100Waitlist.count({
      where: { type: 'EARLY_ADOPTER' },
    });

    return NextResponse.json({
      products,
      stats: {
        totalProducts: products.length,
        totalEarlyAdopters,
      },
    });
  } catch (error) {
    console.error('Voting products API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
