import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authLogger } from '@/lib/logger';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import WelcomeEmail from '../../../../emails/welcome';
import NewSignupNotificationEmail from '../../../../emails/new-signup-notification';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

// Helper to wait for a short time (helps with cookie propagation)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Type for auth exchange result
interface AuthExchangeResult {
  data: { user: { id: string; email?: string; user_metadata?: Record<string, unknown> } } | null;
  error: { message?: string } | null;
}

// Attempt to exchange code for session with retries
async function exchangeCodeWithRetry(
  supabase: ReturnType<typeof createServerClient>,
  code: string,
  maxRetries: number = 3
): Promise<AuthExchangeResult> {
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

    authLogger.debug(`Attempt ${attempt} failed, retrying in ${attempt * 100}ms...`);
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
      authLogger.error('OAuth error', { error_code, error_description });
      return NextResponse.redirect(
        new URL(`/login?error=${error_code}&message=${encodeURIComponent(error_description || 'Authentication failed')}`, request.url)
      );
    }

    if (!code) {
      authLogger.warn('No code parameter in URL');
      return NextResponse.redirect(new URL('/login?error=no_code', request.url));
    }

    authLogger.debug('Starting OAuth callback');

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
              authLogger.error('Error setting cookies', { error: String(error) });
            }
          },
        },
      }
    );

    // Use retry logic for the exchange
    const { data, error } = await exchangeCodeWithRetry(supabase, code);

    if (error) {
      authLogger.error('Supabase auth error after retries', { error: error.message });

      // Check if this is a PKCE error (usually from domain mismatch or timing)
      if (error.message?.includes('PKCE') || error.message?.includes('code verifier')) {
        authLogger.error('PKCE error', { availableCookies: cookieStore.getAll().map(c => c.name) });
        return NextResponse.redirect(
          new URL(`/login?error=exchange_failed&retry=true&message=${encodeURIComponent('Session verification failed. Please try signing in again.')}`, request.url)
        );
      }

      return NextResponse.redirect(
        new URL(`/login?error=exchange_failed&message=${encodeURIComponent(error.message || 'Authentication failed')}`, request.url)
      );
    }

    if (!data?.user) {
      authLogger.error('No user data after exchange');
      return NextResponse.redirect(new URL('/login?error=no_user', request.url));
    }

    authLogger.info('Session exchange successful', { email: data.user.email });

    // Create user and entitlement in database
    let needsOnboarding = false;
    try {
      // Check if user already exists (to detect new signups)
      const existingUser = await prisma.user.findUnique({
        where: { id: data.user.id },
      });

      const isNewUser = !existingUser;
      const rawName = data.user.user_metadata?.name;
      const userName: string = typeof rawName === 'string' ? rawName : (data.user.email?.split('@')[0] || '');
      const userEmail = data.user.email || '';

      authLogger.debug('Processing user', { isNewUser, userEmail });

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
      authLogger.debug('User created/updated successfully');

      // Check if user needs to complete onboarding
      needsOnboarding = !upsertedUser.onboardingCompleted || !upsertedUser.userType;

      // Send emails for new users only
      if (isNewUser && userEmail && process.env.RESEND_API_KEY) {
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
          authLogger.info('Welcome email sent', { to: userEmail });
        } catch (emailError) {
          authLogger.error('Failed to send welcome email', { error: String(emailError) });
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
            authLogger.info('Signup notification sent to owner');
          } catch (emailError) {
            authLogger.error('Failed to send notification email', { error: String(emailError) });
          }
        }
      }
    } catch (dbError) {
      authLogger.error('Database error', { error: String(dbError) });
      // Continue with redirect - user is authenticated even if DB fails
      // Default to onboarding on error to be safe
      needsOnboarding = true;
    }

    // If user needs onboarding, redirect there instead of dashboard
    if (needsOnboarding) {
      authLogger.debug('User needs onboarding, redirecting');
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    authLogger.error('Unexpected error', { error: errorMessage });
    return NextResponse.redirect(
      new URL(`/login?error=callback_failed&message=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}
