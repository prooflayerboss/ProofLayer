import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Create waitlist table if it doesn't exist (you'll need to do this in Supabase)
    const { error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          created_at: new Date().toISOString(),
          source: 'homepage',
        },
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      // If duplicate email, that's okay
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed!' });
      }
      // Return more helpful error info
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    // Send notification email to admin
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'ProofLayer <notifications@prooflayer.app>',
        to: process.env.ADMIN_EMAIL || 'admin@example.com',
        subject: '🎉 New Waitlist Signup!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Waitlist Signup</h2>
            <p>Someone just joined your waitlist!</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0 0 0;"><strong>Source:</strong> Homepage</p>
              <p style="margin: 10px 0 0 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              View all signups in your <a href="https://supabase.com/dashboard/project/vnfsacxvbpygklfawqsr/editor" style="color: #2563eb;">Supabase Dashboard</a>
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      // Log but don't fail the request if email fails
      console.error('Failed to send notification email:', emailError);
    }

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
