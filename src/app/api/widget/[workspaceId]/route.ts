import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PLAN_LIMITS } from '@/lib/constants';
import { apiLogger } from '@/lib/logger';

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ workspaceId: string }> }
) {
  try {
    const { workspaceId } = await context.params;

    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        user: {
          include: {
            entitlement: true,
          },
        },
        forms: {
          include: {
            submissions: {
              where: { status: 'APPROVED' },
              orderBy: { createdAt: 'desc' },
            },
          },
        },
      },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      );
    }

    // Gather all approved submissions from all forms
    const testimonials = workspace.forms.flatMap((form) =>
      form.submissions.map((sub) => ({
        id: sub.id,
        name: sub.name,
        company: sub.company,
        role: sub.role,
        testimonial: sub.testimonial,
        rating: sub.rating,
        photoUrl: sub.photoUrl,
        videoUrl: sub.videoUrl,
        submissionType: sub.submissionType,
        socialPlatform: sub.socialPlatform,
        socialAuthorUrl: sub.socialAuthorUrl,
        createdAt: sub.createdAt,
      }))
    );

    // Check if we should show badge
    const plan = workspace.user.entitlement?.plan || 'TRIAL';
    const showBadge = PLAN_LIMITS[plan].showBadge;

    // Set CORS headers to allow embedding on any site
    const response = NextResponse.json({
      testimonials,
      showBadge,
      workspaceName: workspace.name,
      logoUrl: workspace.logoUrl,
      logoShape: (workspace as any).logoShape || 'rectangle',
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    apiLogger.error('Widget API error', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}