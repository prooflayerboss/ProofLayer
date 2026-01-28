import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyEmailActionToken } from '@/lib/email-token';
import { apiLogger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/error?message=Invalid token', request.url));
    }

    // Verify token
    const payload = verifyEmailActionToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/error?message=Invalid or expired token', request.url));
    }

    const { submissionId, action } = payload;

    // Get submission
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        form: {
          include: {
            workspace: true,
          },
        },
      },
    });

    if (!submission) {
      return NextResponse.redirect(new URL('/error?message=Submission not found', request.url));
    }

    // Check if already moderated
    if (submission.status !== 'PENDING') {
      return NextResponse.redirect(
        new URL(`/moderation-success?action=${action}&already=${submission.status.toLowerCase()}`, request.url)
      );
    }

    // Update submission status
    const newStatus = action === 'approve' ? 'APPROVED' : 'REJECTED';
    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: newStatus },
    });

    // Redirect to success page with workspace context
    const workspaceId = submission.form.workspaceId;
    return NextResponse.redirect(
      new URL(`/moderation-success?action=${action}&workspace=${workspaceId}`, request.url)
    );
  } catch (error) {
    apiLogger.error('Moderation error', { error: String(error) });
    return NextResponse.redirect(new URL('/error?message=Failed to moderate submission', request.url));
  }
}
