import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

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

// GET - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const founder = await getAuthenticatedFounder();

    if (!founder) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;

    const product = await prisma.founderProduct.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Verify ownership
    if (product.founderId !== founder.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json({ error: 'Failed to get product' }, { status: 500 });
  }
}

// PATCH - Update a product
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const founder = await getAuthenticatedFounder();

    if (!founder) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Find the product
    const product = await prisma.founderProduct.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Verify ownership
    if (product.founderId !== founder.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // Only allow updating certain fields
    const allowedFields = ['name', 'tagline', 'url', 'category', 'stage', 'lookingForCount', 'offerDescription'];
    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const updated = await prisma.founderProduct.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      product: {
        id: updated.id,
        name: updated.name,
        tagline: updated.tagline,
        url: updated.url,
        category: updated.category,
        stage: updated.stage,
        lookingForCount: updated.lookingForCount,
        offerDescription: updated.offerDescription,
        status: updated.status,
      },
    });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const founder = await getAuthenticatedFounder();

    if (!founder) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;

    // Find the product
    const product = await prisma.founderProduct.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Verify ownership
    if (product.founderId !== founder.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    await prisma.founderProduct.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
