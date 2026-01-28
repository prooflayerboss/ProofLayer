import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { canAcceptSubmission } from '@/lib/plan-limits';
import { Resend } from 'resend';
import { generateEmailActionToken } from '@/lib/email-token';
import { apiLogger } from '@/lib/logger';
import { checkRateLimit, getClientIp, RATE_LIMITS, rateLimitHeaders } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit check
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = checkRateLimit(`submissions:${clientIp}`, RATE_LIMITS.submissions);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429, headers: rateLimitHeaders(rateLimitResult) }
    );
  }

  try {
    const body = await request.json();
    const { formId, workspaceId, name, company, role, testimonial, rating, submissionType } = body;

    // Validate required fields
    if (!formId || !name || !testimonial) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get form and check if active
    const form = await prisma.form.findUnique({
      where: { id: formId },
      include: {
        workspace: {
          include: {
            user: {
              include: {
                entitlement: true,
              },
            },
          },
        },
      },
    });

    if (!form || !form.isActive) {
      return NextResponse.json(
        { error: 'Form not found or inactive' },
        { status: 404 }
      );
    }

    // Check submission limits
    const user = form.workspace.user;
    const plan = user.entitlement?.plan || 'TRIAL';
    const submissionsUsed = user.entitlement?.submissionsUsed || 0;

    const { allowed } = canAcceptSubmission(submissionsUsed, plan);

    if (!allowed) {
      return NextResponse.json(
        { error: 'This form has reached its submission limit' },
        { status: 403 }
      );
    }

    // Create submission and increment counter
    const submission = await prisma.$transaction(async (tx) => {
      const newSubmission = await tx.submission.create({
        data: {
          formId,
          name,
          company: company || null,
          role: role || null,
          testimonial,
          rating: rating || null,
          submissionType: submissionType || 'TEXT',
          status: 'PENDING',
        },
      });

      await tx.entitlement.update({
        where: { userId: user.id },
        data: { submissionsUsed: { increment: 1 } },
      });

      return newSubmission;
    });

    // Send notification email to workspace owner
    try {
      const adminEmail = user.email;
      if (adminEmail && process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Generate secure tokens for approve/reject actions
        const approveToken = generateEmailActionToken(submission.id, 'approve');
        const rejectToken = generateEmailActionToken(submission.id, 'reject');

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const approveUrl = `${appUrl}/api/submissions/moderate?token=${approveToken}`;
        const rejectUrl = `${appUrl}/api/submissions/moderate?token=${rejectToken}`;

        await resend.emails.send({
          from: 'ProofLayer <notifications@prooflayer.app>',
          to: adminEmail,
          subject: '🎉 New Testimonial Received!',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">New Testimonial Submitted</h2>
              <p>You received a new testimonial for <strong>${form.name}</strong>!</p>

              <div style="background: #f3f4f6; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <div style="margin-bottom: 16px;">
                  <strong style="color: #374151;">From:</strong>
                  <p style="margin: 4px 0 0 0; color: #1f2937;">${name}${role ? ` - ${role}` : ''}${company ? ` at ${company}` : ''}</p>
                </div>

                ${rating ? `
                <div style="margin-bottom: 16px;">
                  <strong style="color: #374151;">Rating:</strong>
                  <p style="margin: 4px 0 0 0; color: #1f2937;">${'⭐'.repeat(rating)}</p>
                </div>
                ` : ''}

                <div style="margin-bottom: 16px;">
                  <strong style="color: #374151;">Testimonial:</strong>
                  <p style="margin: 4px 0 0 0; color: #1f2937; line-height: 1.6;">"${testimonial}"</p>
                </div>

                <div>
                  <strong style="color: #374151;">Type:</strong>
                  <p style="margin: 4px 0 0 0; color: #1f2937;">${submissionType || 'TEXT'}</p>
                </div>
              </div>

              <!-- Quick Action Buttons -->
              <div style="margin: 30px 0;">
                <p style="font-weight: 600; color: #374151; margin-bottom: 12px;">Quick Actions:</p>
                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                  <tr>
                    <td style="padding-right: 8px; width: 50%;">
                      <a href="${approveUrl}" style="display: block; background: #10b981; color: white; text-align: center; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                        ✓ Approve
                      </a>
                    </td>
                    <td style="padding-left: 8px; width: 50%;">
                      <a href="${rejectUrl}" style="display: block; background: #ef4444; color: white; text-align: center; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                        ✗ Reject
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Or manage it in your <a href="${appUrl}/dashboard/workspaces/${form.workspaceId}/submissions" style="color: #2563eb; text-decoration: none;">dashboard</a>.
              </p>

              <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  This is an automated notification from ProofLayer. These action links expire in 30 days.
                </p>
              </div>
            </div>
          `,
        });
      }
    } catch (emailError) {
      // Log but don't fail the request if email fails
      apiLogger.error('Failed to send notification email', { error: String(emailError) });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    apiLogger.error('Submission error', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}