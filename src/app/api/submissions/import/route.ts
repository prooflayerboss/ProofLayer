import { NextResponse } from 'next/server';
import { ensureUserExists } from '@/actions/user';
import { prisma } from '@/lib/prisma';

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
    const { formId, name, company, role, testimonial, rating, importSource } = body;

    if (!formId || !name || !testimonial) {
      return NextResponse.json(
        { error: 'Missing required fields: formId, name, and testimonial are required' },
        { status: 400 }
      );
    }

    // Verify form ownership
    const form = await prisma.form.findFirst({
      where: {
        id: formId,
        workspace: {
          userId: user.id,
        },
      },
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
      return NextResponse.json(
        { error: 'Form not found or access denied' },
        { status: 404 }
      );
    }

    // Check submission limits
    const entitlement = form.workspace.user.entitlement;
    if (!entitlement) {
      return NextResponse.json(
        { error: 'No entitlement found' },
        { status: 403 }
      );
    }

    const PLAN_LIMITS: Record<string, number> = {
      TRIAL: 25,
      SOLO: 150,
      PRO: 1000,
      AGENCY: 5000,
      MONTHLY: 1000,
      LIFETIME: 5000,
    };

    const maxSubmissions = PLAN_LIMITS[entitlement.plan] || 25;
    if (entitlement.submissionsUsed >= maxSubmissions) {
      return NextResponse.json(
        { error: 'Submission limit reached. Please upgrade your plan.' },
        { status: 403 }
      );
    }

    // Create the imported submission
    const submission = await prisma.$transaction(async (tx) => {
      // Create submission with imported flag
      const newSubmission = await tx.submission.create({
        data: {
          formId,
          name,
          company: company || null,
          role: role || null,
          testimonial,
          rating: rating || null,
          status: 'PENDING',
          submissionType: 'TEXT',
          importSource: importSource || 'manual',
        },
      });

      // Increment submission count
      await tx.entitlement.update({
        where: { userId: user.id },
        data: { submissionsUsed: { increment: 1 } },
      });

      return newSubmission;
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error('Import submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
