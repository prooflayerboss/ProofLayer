import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PLAN_LIMITS } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formId, workspaceId, name, company, role, testimonial, rating } = body;

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
    const limits = PLAN_LIMITS[plan];
    const submissionsUsed = user.entitlement?.submissionsUsed || 0;

    if (submissionsUsed >= limits.maxSubmissions) {
      return NextResponse.json(
        { error: 'This form has reached its submission limit' },
        { status: 403 }
      );
    }

    // Create submission and increment counter
    await prisma.$transaction(async (tx) => {
      await tx.submission.create({
        data: {
          formId,
          name,
          company: company || null,
          role: role || null,
          testimonial,
          rating: rating || null,
          status: 'PENDING',
        },
      });

      await tx.entitlement.update({
        where: { userId: user.id },
        data: { submissionsUsed: { increment: 1 } },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}