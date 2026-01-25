import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ workspaceId: string }> }
) {
  try {
    const { workspaceId } = await context.params;

    // Increment the view count for this workspace
    await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        widgetViews: { increment: 1 },
        lastWidgetView: new Date(),
      },
    });

    const response = NextResponse.json({ success: true });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    // Silently fail - we don't want to break the widget if tracking fails
    console.error('Widget view tracking error:', error);
    const response = NextResponse.json({ success: false });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}
