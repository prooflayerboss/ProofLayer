import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { ensureUserExists } from '@/actions/user';
import { prisma } from '@/lib/prisma';
import TestimonialRequestEmail from '../../../../../emails/testimonial-request';
import { emailLogger } from '@/lib/logger';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

// Email subjects based on template
const EMAIL_SUBJECTS: Record<string, string> = {
  friendly: 'Quick favor - Would you share your experience?',
  professional: 'Request for Testimonial',
  quick: 'Got 2 minutes? Quick testimonial request',
};

export async function POST(request: Request) {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    const user = await ensureUserExists();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { formId, recipientEmail, recipientName, customMessage, templateId } = body;

    if (!formId || !recipientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the form and verify ownership
    const form = await prisma.form.findUnique({
      where: { id: formId },
      include: {
        workspace: true
      }
    });

    if (!form || form.workspace.userId !== user.id) {
      return NextResponse.json(
        { error: 'Form not found or access denied' },
        { status: 404 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const formUrl = `${appUrl}/f/${form.slug}`;

    // Render the email
    const emailHtml = await render(
      TestimonialRequestEmail({
        recipientName,
        senderName: user.name || 'Your team',
        senderCompany: form.workspace.name,
        formUrl,
        customMessage,
      })
    );

    // Determine email subject based on template
    const subject = templateId && EMAIL_SUBJECTS[templateId]
      ? EMAIL_SUBJECTS[templateId].replace('{{senderCompany}}', form.workspace.name)
      : `${user.name || form.workspace.name} would love your feedback`;

    // Send the email via Resend
    const { data, error } = await resend.emails.send({
      from: 'ProofLayer <noreply@prooflayer.app>',
      to: recipientEmail,
      subject,
      html: emailHtml,
    });

    if (error) {
      emailLogger.error('Resend error', { error: String(error) });
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (error) {
    emailLogger.error('Email send error', { error: String(error) });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
