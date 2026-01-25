import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import WelcomeEmail from '../../../../../emails/welcome';
import NewSignupNotificationEmail from '../../../../../emails/new-signup-notification';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

export async function POST() {
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

    // Check if user already exists in database
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    const isNewUser = !existingUser;
    const userName = user.user_metadata?.name || user.email?.split('@')[0] || '';
    const userEmail = user.email || '';

    console.log('[New User API] isNewUser:', isNewUser, '| userEmail:', userEmail);

    // Create user in database if they don't exist
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: userEmail,
        name: userName,
      },
      create: {
        id: user.id,
        email: userEmail,
        name: userName,
        entitlement: {
          create: {
            plan: 'TRIAL',
          },
        },
      },
    });

    // Send emails for new users only
    if (isNewUser && userEmail && process.env.RESEND_API_KEY) {
      console.log('[New User API] Starting email send process...');
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
        console.log('[New User API] Welcome email sent to:', userEmail);
      } catch (emailError) {
        console.error('[New User API] Failed to send welcome email:', emailError);
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
          console.log('[New User API] Signup notification sent to owner');
        } catch (emailError) {
          console.error('[New User API] Failed to send notification email:', emailError);
        }
      }
    }

    return NextResponse.json({ success: true, isNewUser });
  } catch (error: any) {
    console.error('[New User API] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
