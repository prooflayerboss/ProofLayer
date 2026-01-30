import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiLogger } from '@/lib/logger';

/**
 * Checks if Google Business Profile is connected for a workspace
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const workspaceId = searchParams.get('workspaceId');

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'Workspace ID is required' },
        { status: 400 }
      );
    }

    // Check for existing integration
    const integration = await prisma.googleIntegration.findUnique({
      where: { workspaceId },
      select: {
        accountName: true,
        locationName: true,
        lastSyncAt: true,
        autoSync: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      connected: !!integration,
      integration: integration || null,
    });
  } catch (error) {
    apiLogger.error('Error checking Google integration status', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to check connection status' },
      { status: 500 }
    );
  }
}
