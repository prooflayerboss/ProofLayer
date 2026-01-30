import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { ensureUserExists } from '@/actions/user';
import { prisma } from '@/lib/prisma';
import { emailLogger } from '@/lib/logger';
import TestimonialRequestEmail from '../../../../../../../emails/testimonial-request';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

// Rate limiting: 2 emails per second (Resend free tier limit)
const RATE_LIMIT_MS = 500;

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(
  request: Request,
  { params }: { params: { campaignId: string } }
) {
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

    // Get campaign and verify ownership
    const campaign = await prisma.emailCampaign.findUnique({
      where: { id: params.campaignId },
      include: {
        form: {
          include: {
            workspace: {
              include: {
                user: true,
              }
            }
          }
        },
        recipients: {
          where: { status: 'PENDING' },
        },
      },
    });

    if (!campaign || campaign.form.workspace.userId !== user.id) {
      return NextResponse.json(
        { error: 'Campaign not found or access denied' },
        { status: 404 }
      );
    }

    if (campaign.status === 'SENDING') {
      return NextResponse.json(
        { error: 'Campaign is already being sent' },
        { status: 400 }
      );
    }

    // Update campaign status to SENDING
    await prisma.emailCampaign.update({
      where: { id: params.campaignId },
      data: { status: 'SENDING' },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const formUrl = `${appUrl}/f/${campaign.form.slug}`;

    let successCount = 0;
    let failureCount = 0;

    // Send emails with rate limiting
    for (const recipient of campaign.recipients) {
      try {
        // Render email
        const emailHtml = await render(
          TestimonialRequestEmail({
            recipientName: recipient.name || undefined,
            senderName: user.name || 'Your team',
            senderCompany: campaign.form.workspace.name,
            formUrl,
            customMessage: campaign.customMessage || undefined,
          })
        );

        // Send via Resend
        const { error } = await resend.emails.send({
          from: 'ProofLayer <noreply@prooflayer.app>',
          to: recipient.email,
          subject: campaign.subject,
          html: emailHtml,
        });

        if (error) {
          // Mark as failed
          await prisma.emailRecipient.update({
            where: { id: recipient.id },
            data: {
              status: 'FAILED',
              errorMessage: error.message || 'Unknown error',
            },
          });
          failureCount++;
        } else {
          // Mark as sent
          await prisma.emailRecipient.update({
            where: { id: recipient.id },
            data: {
              status: 'SENT',
              sentAt: new Date(),
            },
          });
          successCount++;
        }

        // Rate limit: wait 500ms between emails (2/second)
        await sleep(RATE_LIMIT_MS);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        emailLogger.error('Failed to send email', { email: recipient.email, error: errorMessage });
        await prisma.emailRecipient.update({
          where: { id: recipient.id },
          data: {
            status: 'FAILED',
            errorMessage: errorMessage,
          },
        });
        failureCount++;
      }
    }

    // Update campaign status
    await prisma.emailCampaign.update({
      where: { id: params.campaignId },
      data: {
        status: failureCount > 0 && successCount === 0 ? 'FAILED' : 'COMPLETED',
        sentCount: successCount,
        sentAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      successCount,
      failureCount,
      total: campaign.recipients.length,
    });
  } catch (error) {
    emailLogger.error('Campaign send error', { error: String(error) });

    // Update campaign status to failed
    try {
      await prisma.emailCampaign.update({
        where: { id: params.campaignId },
        data: { status: 'FAILED' },
      });
    } catch (e) {
      emailLogger.error('Failed to update campaign status', { error: String(e) });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
