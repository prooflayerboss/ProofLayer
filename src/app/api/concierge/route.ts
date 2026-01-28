import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { apiLogger } from '@/lib/logger';
import { checkRateLimit, getClientIp, RATE_LIMITS, rateLimitHeaders } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

export async function POST(request: NextRequest) {
  // Rate limit check
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = checkRateLimit(`concierge:${clientIp}`, RATE_LIMITS.strict);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: rateLimitHeaders(rateLimitResult) }
    );
  }

  try {
    const body = await request.json();
    const { name, email, company, website, description, budget } = body;

    // Validate required fields
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Name, email, and description are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      apiLogger.warn('Concierge inquiry received but email not configured');
      return NextResponse.json({ success: true, message: 'Inquiry received' });
    }

    // Build email content
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0a0a0b; margin-bottom: 24px;">New Concierge Inquiry</h2>

        <div style="background: #f5f5f5; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p style="margin: 0 0 12px 0;"><strong>Company:</strong> ${company}</p>` : ''}
          ${website ? `<p style="margin: 0 0 12px 0;"><strong>Website:</strong> <a href="${website}">${website}</a></p>` : ''}
          ${budget ? `<p style="margin: 0 0 12px 0;"><strong>Budget:</strong> ${budget}</p>` : ''}
        </div>

        <div style="background: #fafafa; padding: 24px; border-radius: 12px; border-left: 4px solid #00d084;">
          <h3 style="color: #0a0a0b; margin: 0 0 12px 0;">Project Description</h3>
          <p style="margin: 0; color: #333; white-space: pre-wrap;">${description}</p>
        </div>

        <p style="margin-top: 24px; color: #737373; font-size: 14px;">
          Reply directly to this email to respond to ${name}.
        </p>
      </div>
    `;

    // Send email
    const { error } = await resend.emails.send({
      from: 'ProofLayer <noreply@prooflayer.app>',
      to: 'curtis@prooflayer.app',
      replyTo: email,
      subject: `Concierge Inquiry from ${name}${company ? ` (${company})` : ''}`,
      html: emailHtml,
    });

    if (error) {
      apiLogger.error('Resend error', { error: String(error) });
      return NextResponse.json(
        { error: 'Failed to send inquiry' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully' });
  } catch (error) {
    apiLogger.error('Concierge API error', { error: String(error) });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
