import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiLogger } from '@/lib/logger';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const product = await prisma.first100Waitlist.findUnique({
      where: { slug },
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
        status: true,
        slug: true,
        createdAt: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Only show approved/active products publicly (or pending for preview)
    // For now, show all products so founders can preview their page

    return NextResponse.json({ product });
  } catch (error) {
    apiLogger.error('Product API error', { error: String(error) });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
