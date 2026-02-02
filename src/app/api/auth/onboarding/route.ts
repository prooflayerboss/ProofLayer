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
              // Ignore errors in server components
            }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { userType, businessName, website, twitterHandle, interests } = body;

    if (!userType || !['FOUNDER', 'EARLY_ADOPTER'].includes(userType)) {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    // Update user with onboarding data
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        userType,
        onboardingCompleted: true,
        // Founder fields
        ...(userType === 'FOUNDER' && {
          businessName: businessName || null,
          website: website || null,
        }),
        // Early adopter fields
        ...(userType === 'EARLY_ADOPTER' && {
          twitterHandle: twitterHandle || null,
          interests: interests || [],
        }),
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        userType: updatedUser.userType,
        onboardingCompleted: updatedUser.onboardingCompleted,
      }
    });
  } catch (error: any) {
    console.error('[Onboarding API] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
