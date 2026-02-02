import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import WelcomeEmail from '../../../../emails/welcome';
import NewSignupNotificationEmail from '../../../../emails/new-signup-notification';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

// Helper to wait for a short time (helps with cookie propagation)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Attempt to exchange code for session with retries
async function exchangeCodeWithRetry(
  supabase: ReturnType<typeof createServerClient>,
  code: string,
  maxRetries: number = 3
): Promise<{ data: any; error: any }> {
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return { data, error: null };
    }

    lastError = error;

    // Only retry on PKCE/timing errors, not other auth errors
    const isPKCEError = error.message?.includes('PKCE') ||
                        error.message?.includes('code verifier') ||
                        error.message?.includes('invalid');

    if (!isPKCEError || attempt === maxRetries) {
      break;
    }

    console.log(`[Auth Callback] Attempt ${attempt} failed, retrying in ${attempt * 100}ms...`);
    await delay(attempt * 100); // Progressive backoff: 100ms, 200ms, 300ms
  }

  return { data: null, error: lastError };
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const error_code = requestUrl.searchParams.get('error');
    const error_description = requestUrl.searchParams.get('error_description');

    // Check for OAuth errors from Supabase
    if (error_code) {
      console.error('[Auth Callback] OAuth error:', error_code, error_description);
      return NextResponse.redirect(
        new URL(`/login?error=${error_code}&message=${encodeURIComponent(error_description || 'Authentication failed')}`, request.url)
      );
    }

    if (!code) {
      console.warn('[Auth Callback] No code parameter in URL');
      return NextResponse.redirect(new URL('/login?error=no_code', request.url));
    }

    console.log('[Auth Callback] Starting OAuth callback');

    const cookieStore = await cookies();

    // Build the response early so we can set cookies on it
    // We'll update the redirect URL later based on onboarding status
    let redirectUrl = new URL('/dashboard', request.url);
    let response = NextResponse.redirect(redirectUrl);

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
                // Set on both the cookie store and response
                cookieStore.set(name, value, options);
                response.cookies.set(name, value, options);
              });
            } catch (error) {
              console.error('[Auth Callback] Error setting cookies:', error);
            }
          },
        },
      }
    );

    // Use retry logic for the exchange
    const { data, error } = await exchangeCodeWithRetry(supabase, code);

    if (error) {
      console.error('[Auth Callback] Supabase auth error after retries:', error);

      // Check if this is a PKCE error (usually from domain mismatch or timing)
      if (error.message?.includes('PKCE') || error.message?.includes('code verifier')) {
        console.error('[Auth Callback] PKCE error - cookies available:', cookieStore.getAll().map(c => c.name));
        return NextResponse.redirect(
          new URL(`/login?error=exchange_failed&retry=true&message=${encodeURIComponent('Session verification failed. Please try signing in again.')}`, request.url)
        );
      }

      return NextResponse.redirect(
        new URL(`/login?error=exchange_failed&message=${encodeURIComponent(error.message)}`, request.url)
      );
    }

    if (!data?.user) {
      console.error('[Auth Callback] No user data after exchange');
      return NextResponse.redirect(new URL('/login?error=no_user', request.url));
    }

    console.log('[Auth Callback] Session exchange successful:', data.user.email);

    // Create user and entitlement in database
    let needsOnboarding = false;
    try {
      // Check if user already exists (to detect new signups)
      const existingUser = await prisma.user.findUnique({
        where: { id: data.user.id },
      });

      const isNewUser = !existingUser;
      const userName = data.user.user_metadata?.name || data.user.email?.split('@')[0] || '';
      const userEmail = data.user.email || '';

      console.log('[Auth Callback] isNewUser:', isNewUser, '| userEmail:', userEmail);
      console.log('[Auth Callback] RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
      console.log('[Auth Callback] OWNER_NOTIFICATION_EMAIL:', process.env.OWNER_NOTIFICATION_EMAIL);

      const upsertedUser = await prisma.user.upsert({
        where: { id: data.user.id },
        update: {
          email: userEmail,
          name: userName,
        },
        create: {
          id: data.user.id,
          email: userEmail,
          name: userName,
          entitlement: {
            create: {
              plan: 'FREE',
            },
          },
        },
      });
      console.log('[Auth Callback] User created/updated successfully');

      // Check if user needs to complete onboarding
      needsOnboarding = !upsertedUser.onboardingCompleted || !upsertedUser.userType;

      // Send emails for new users only
      console.log('[Auth Callback] Email conditions - isNewUser:', isNewUser, '| hasEmail:', !!userEmail, '| hasResendKey:', !!process.env.RESEND_API_KEY);
      if (isNewUser && userEmail && process.env.RESEND_API_KEY) {
        console.log('[Auth Callback] Starting email send process...');
        const signupTime = new Date().toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        });

        // Send welcome email to new user
        try {
          const welcomeHtml = await render(WelcomeEmail({ userName: userName || undefined }));
          await resend.emails.send({
            from: 'Curtis from ProofLayer <curtis@prooflayer.app>',
            to: userEmail,
            subject: 'Welcome to ProofLayer - Let\'s collect some testimonials!',
            html: welcomeHtml,
            replyTo: 'curtis@prooflayer.app',
          });
          console.log('[Auth Callback] Welcome email sent to:', userEmail);
        } catch (emailError) {
          console.error('[Auth Callback] Failed to send welcome email:', emailError);
        }

        // Send notification to owner
        const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL;
        if (ownerEmail) {
          try {
            const notificationHtml = await render(
              NewSignupNotificationEmail({
                userEmail,
                userName: userName || undefined,
                signupTime,
              })
            );
            await resend.emails.send({
              from: 'ProofLayer <noreply@prooflayer.app>',
              to: ownerEmail,
              subject: `🎉 New signup: ${userEmail}`,
              html: notificationHtml,
            });
            console.log('[Auth Callback] Signup notification sent to owner');
          } catch (emailError) {
            console.error('[Auth Callback] Failed to send notification email:', emailError);
          }
        }
      }
    } catch (dbError: any) {
      console.error('[Auth Callback] Database error:', dbError);
      // Continue with redirect - user is authenticated even if DB fails
      // Default to onboarding on error to be safe
      needsOnboarding = true;
    }

    // If user needs onboarding, redirect there instead of dashboard
    if (needsOnboarding) {
      console.log('[Auth Callback] User needs onboarding, redirecting...');
      redirectUrl = new URL('/onboarding', request.url);
      response = NextResponse.redirect(redirectUrl);
      // Re-copy cookies to the new response
      const allCookies = cookieStore.getAll();
      allCookies.forEach(cookie => {
        response.cookies.set(cookie.name, cookie.value);
      });
    }

    // Success - redirect to appropriate page (using response that has cookies set)
    return response;
  } catch (error: any) {
    console.error('[Auth Callback] Unexpected error:', error);
    return NextResponse.redirect(
      new URL(`/login?error=callback_failed&message=${encodeURIComponent(error?.message || 'Unknown error')}`, request.url)
    );
  }
}
