import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { canAcceptSubmission } from '@/lib/plan-limits';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      formId,
      workspaceId,
      name,
      company,
      role,
      rating,
      photoUrl, // Screenshot URL from Uploadthing
      socialPlatform,
      socialAuthorUrl,
    } = body;

    // Validate required fields
    if (!formId || !name || !photoUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: formId, name, photoUrl' },
        { status: 400 }
      );
    }

    // Validate photoUrl is from Uploadthing
    if (!photoUrl.includes('uploadthing') && !photoUrl.includes('utfs.io')) {
      return NextResponse.json(
        { error: 'Invalid screenshot URL' },
        { status: 400 }
      );
    }

    // Get form and validate it exists and is active
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

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    if (!form.isActive) {
      return NextResponse.json(
        { error: 'This form is no longer accepting submissions' },
        { status: 400 }
      );
    }

    // Validate form allows screenshots
    if (!form.allowScreenshot) {
      return NextResponse.json(
        { error: 'This form does not accept screenshot submissions' },
        { status: 400 }
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

    // Create screenshot submission with testimonial placeholder
    const testimonialText = socialAuthorUrl
      ? `Screenshot from ${socialPlatform || 'social media'}: ${socialAuthorUrl}`
      : `Screenshot from ${socialPlatform || 'social media'}`;

    const submission = await prisma.$transaction(async (tx) => {
      // Create submission
      const newSubmission = await tx.submission.create({
        data: {
          formId,
          name,
          company: company || null,
          role: role || null,
          testimonial: testimonialText,
          rating: rating ? parseInt(rating) : null,
          photoUrl,
          socialPlatform: socialPlatform || null,
          socialAuthorUrl: socialAuthorUrl || null,
          submissionType: 'SCREENSHOT',
          status: 'PENDING',
        },
      });

      // Increment submissions counter
      if (user.entitlement) {
        await tx.entitlement.update({
          where: { userId: user.id },
          data: {
            submissionsUsed: { increment: 1 },
          },
        });
      }

      return newSubmission;
    });

    return NextResponse.json({
      success: true,
      screenshotUrl: photoUrl,
    });
  } catch (error) {
    console.error('Screenshot submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit screenshot' },
      { status: 500 }
    );
  }
}
