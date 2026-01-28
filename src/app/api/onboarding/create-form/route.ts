import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureUserExists } from '@/actions/user';
import { nanoid } from 'nanoid';
import { apiLogger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const user = await ensureUserExists();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const name = formData.get('name') as string;
    const workspaceId = formData.get('workspaceId') as string;
    const headerTitle = formData.get('headerTitle') as string || 'Share your feedback';

    // Collection preferences
    const collectEmail = formData.get('collectEmail') === 'on';
    const collectCompany = formData.get('collectCompany') === 'on';
    const collectRole = formData.get('collectRole') === 'on';
    const collectRating = formData.get('collectRating') === 'on';

    // Form types
    const allowText = formData.get('allowText') === 'on';
    const allowVideo = formData.get('allowVideo') === 'on';

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Form name is required' },
        { status: 400 }
      );
    }

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'Workspace ID is required' },
        { status: 400 }
      );
    }

    // Verify workspace ownership
    const workspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        userId: user.id,
      },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      );
    }

    // Generate unique slug
    const slug = nanoid(10);

    const form = await prisma.form.create({
      data: {
        workspaceId,
        name: name.trim(),
        slug,
        isActive: true,
        headerTitle,
        collectEmail,
        collectCompany,
        collectRole,
        collectRating,
        allowText: allowText || true,
        allowVideo: allowVideo || true,
        allowScreenshot: false,
      },
    });

    return NextResponse.json({
      success: true,
      form: {
        id: form.id,
        name: form.name,
        slug: form.slug,
      },
    });
  } catch (error) {
    apiLogger.error('Error creating form during onboarding', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to create form' },
      { status: 500 }
    );
  }
}
