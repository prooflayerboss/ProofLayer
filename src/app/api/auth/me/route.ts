import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { apiLogger } from '@/lib/logger';

export async function GET() {
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
              // Ignore errors in server components
            }
          },
        },
      }
    );

    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get user from database with their full profile
    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      include: {
        entitlement: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        businessName: user.businessName,
        website: user.website,
        twitterHandle: user.twitterHandle,
        interests: user.interests,
        onboardingCompleted: user.onboardingCompleted,
        plan: user.entitlement?.plan || 'FREE',
        createdAt: user.createdAt,
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    apiLogger.error('Auth me error', { error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
