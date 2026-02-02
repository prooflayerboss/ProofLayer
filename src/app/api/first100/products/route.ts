import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

// Helper to generate URL-friendly slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

async function getAuthenticatedFounder() {
  const cookieStore = await cookies();
  const token = cookieStore.get('founder_token')?.value;

  if (!token) {
    return null;
  }

  try {
    const result = await jwtVerify(token, JWT_SECRET);
    const payload = result.payload as { founderId: string; email: string };

    const founder = await prisma.first100Waitlist.findUnique({
      where: { id: payload.founderId },
    });

    return founder;
  } catch {
    return null;
  }
}

// GET - List all products for the authenticated founder
export async function GET() {
  try {
    const founder = await getAuthenticatedFounder();

    if (!founder) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const products = await prisma.founderProduct.findMany({
      where: { founderId: founder.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json({ error: 'Failed to get products' }, { status: 500 });
  }
}

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
    const founder = await getAuthenticatedFounder();

    if (!founder) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { name, tagline, url, category, stage, lookingForCount, offerDescription } = body;

    // Validate required fields
    if (!name || !category || !stage || !offerDescription) {
      return NextResponse.json(
        { error: 'Name, category, stage, and offer description are required' },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = generateSlug(name);
    let slugExists = await prisma.founderProduct.findUnique({ where: { slug } });
    let counter = 1;

    while (slugExists) {
      slug = `${generateSlug(name)}-${counter}`;
      slugExists = await prisma.founderProduct.findUnique({ where: { slug } });
      counter++;
    }

    // Create product
    const product = await prisma.founderProduct.create({
      data: {
        founderId: founder.id,
        name,
        tagline: tagline || null,
        url: url || null,
        category,
        stage,
        slug,
        lookingForCount: lookingForCount || 25,
        offerDescription,
        status: 'voting', // New products start in voting status
      },
    });

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        status: product.status,
      },
    });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
