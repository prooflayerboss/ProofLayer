import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // Ignore errors
            }
          },
        },
      }
    );

    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
    });

    if (!user || user.userType !== 'EARLY_ADOPTER') {
      return NextResponse.json(
        { error: 'Only early adopters can claim offers' },
        { status: 403 }
      );
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || product.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if already claimed
    const existing = await prisma.earlyAdopterSignup.findFirst({
      where: {
        productId,
        email: user.email,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'You have already claimed this offer' },
        { status: 400 }
      );
    }

    // Create signup
    const signup = await prisma.earlyAdopterSignup.create({
      data: {
        productId,
        email: user.email,
        status: 'CLAIMED',
      },
    });

    return NextResponse.json({ signup }, { status: 201 });
  } catch (error) {
    console.error('Error claiming offer:', error);
    return NextResponse.json(
      { error: 'Failed to claim offer' },
      { status: 500 }
    );
  }
}
