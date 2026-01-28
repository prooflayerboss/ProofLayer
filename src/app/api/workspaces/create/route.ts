import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureUserExists } from '@/actions/user';
import { canCreateWorkspace } from '@/lib/plan-limits';
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

    const plan = user.entitlement?.plan || 'TRIAL';
    const workspacesUsed = user.entitlement?.workspacesUsed || 0;

    // Check if user can create more workspaces
    const { allowed } = canCreateWorkspace(workspacesUsed, plan);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Workspace limit reached. Please upgrade your plan.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      name,
      logoUrl,
      logoShape,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Workspace name is required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Ensure unique slug
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.workspace.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create workspace with only branding
    const workspace = await prisma.workspace.create({
      data: {
        userId: user.id,
        name: name.trim(),
        slug,
        logoUrl: logoUrl?.trim() || null,
        logoShape: logoShape || 'rectangle',
      },
    });

    // Update workspace count
    await prisma.entitlement.update({
      where: { userId: user.id },
      data: {
        workspacesUsed: { increment: 1 },
      },
    });

    return NextResponse.json({
      success: true,
      workspace: {
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug,
      },
    });
  } catch (error) {
    apiLogger.error('Error creating workspace', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to create workspace' },
      { status: 500 }
    );
  }
}
