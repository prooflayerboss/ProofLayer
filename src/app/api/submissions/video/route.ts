import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { canAcceptSubmission } from '@/lib/plan-limits';
import { apiLogger } from '@/lib/logger';
import { safeParseInt } from '@/lib/first100-utils';
import { checkRateLimit, getClientIp, RATE_LIMITS, rateLimitHeaders } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit check
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = checkRateLimit(`video-submission:${clientIp}`, RATE_LIMITS.submissions);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429, headers: rateLimitHeaders(rateLimitResult) }
    );
  }

  try {
    const body = await request.json();
    const { formId, workspaceId, name, company, role, rating, videoUrl } = body;

    // Validate required fields
    if (!formId || !name || !videoUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate video URL format (should be from Uploadthing)
    if (!videoUrl.includes('uploadthing') && !videoUrl.includes('utfs.io')) {
      return NextResponse.json(
        { error: 'Invalid video URL' },
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

    // Check if form allows video
    if (!form.allowVideo) {
      return NextResponse.json(
        { error: 'This form does not accept video testimonials' },
        { status: 403 }
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

    // Video is already uploaded to Uploadthing
    // Extract thumbnail from Uploadthing URL (they provide this automatically)
    // Format: https://utfs.io/f/abc123.mp4 -> thumbnail at https://utfs.io/f/abc123-thumbnail.jpg
    const videoThumbnail = videoUrl.replace(/\.(mp4|mov|webm)$/i, '-thumbnail.jpg');

    // Create submission and increment counter
    await prisma.$transaction(async (tx) => {
      await tx.submission.create({
        data: {
          formId,
          name,
          company: company || null,
          role: role || null,
          testimonial: `Video testimonial from ${name}`, // Placeholder text for video testimonials
          rating: safeParseInt(rating),
          videoUrl,
          videoThumbnail, // Uploadthing provides thumbnails
          videoDuration: null, // Can be extracted client-side if needed
          submissionType: 'VIDEO',
          status: 'PENDING',
        },
      });

      await tx.entitlement.update({
        where: { userId: user.id },
        data: { submissionsUsed: { increment: 1 } },
      });
    });

    return NextResponse.json({ success: true, videoUrl });
  } catch (error) {
    apiLogger.error('Video submission error', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to submit video testimonial' },
      { status: 500 }
    );
  }
}
