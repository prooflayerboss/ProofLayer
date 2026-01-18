import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { ensureUserExists } from '@/actions/user';
import { prisma } from '@/lib/prisma';
import TestimonialRequestEmail from '../../../../../emails/testimonial-request';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const user = await ensureUserExists();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { formId, recipientEmail, recipientName, customMessage } = body;

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
        workspace: {
          include: {
            members: {
              where: { userId: user.id }
            }
          }
        }
      }
    });

    if (!form || form.workspace.members.length === 0) {
      return NextResponse.json(
        { error: 'Form not found or access denied' },
        { status: 404 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const formUrl = `${appUrl}/f/${form.slug}`;

    // Render the email
    const emailHtml = render(
      TestimonialRequestEmail({
        recipientName,
        senderName: user.name || 'Your team',
        senderCompany: form.workspace.name,
        formUrl,
        customMessage,
      })
    );

    // Send the email via Resend
    const { data, error } = await resend.emails.send({
      from: 'ProofLayer <noreply@prooflayer.app>',
      to: recipientEmail,
      subject: `${user.name || form.workspace.name} would love your feedback`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
