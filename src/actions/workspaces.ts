'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PLAN_LIMITS } from '@/lib/constants';
import { ensureUserExists } from './user';
import { apiLogger } from '@/lib/logger';

/**
 * Generate a URL-friendly slug from a workspace name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .substring(0, 50); // Limit length
}

/**
 * Create a new workspace for the current user.
 * Accepts FormData from a form submission.
 * Enforces plan limits.
 */
export async function createWorkspace(formData: FormData) {
  const user = await ensureUserExists();

  if (!user) {
    return { success: false, error: 'You must be logged in to create a workspace.' };
  }

  const name = formData.get('name') as string;

  if (!name || name.trim().length === 0) {
    return { success: false, error: 'Workspace name is required.' };
  }

  if (name.trim().length > 50) {
    return { success: false, error: 'Workspace name must be 50 characters or less.' };
  }

  const plan = user.entitlement?.plan || 'TRIAL';
  const limits = PLAN_LIMITS[plan];
  const workspacesUsed = user.entitlement?.workspacesUsed || 0;

  if (workspacesUsed >= limits.maxWorkspaces) {
    if (plan === 'TRIAL') {
      return {
        success: false,
        error: `You've reached the limit of ${limits.maxWorkspaces} workspace on the Trial plan. Upgrade to Lifetime for up to ${PLAN_LIMITS.LIFETIME.maxWorkspaces} workspaces.`,
      };
    }
    return {
      success: false,
      error: `You've reached the maximum of ${limits.maxWorkspaces} workspaces on your plan.`,
    };
  }

  try {
    let slug = generateSlug(name);

    // Ensure slug is unique by appending number if needed
    let counter = 1;
    let isUnique = false;
    while (!isUnique) {
      const existing = await prisma.workspace.findUnique({
        where: { slug: counter > 1 ? `${slug}-${counter}` : slug },
      });

      if (!existing) {
        if (counter > 1) slug = `${slug}-${counter}`;
        isUnique = true;
      } else {
        counter++;
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.workspace.create({
        data: {
          userId: user.id,
          name: name.trim(),
          slug,
        },
      });

      await tx.entitlement.update({
        where: { userId: user.id },
        data: { workspacesUsed: { increment: 1 } },
      });
    });

    revalidatePath('/dashboard/workspaces');
    revalidatePath('/dashboard');
  } catch (error) {
    apiLogger.error('Failed to create workspace', { error: String(error) });
    return { success: false, error: 'Failed to create workspace. Please try again.' };
  }

  redirect('/dashboard/workspaces');
}

/**
 * Get all workspaces for the current user.
 */
export async function getWorkspaces() {
  const user = await ensureUserExists();

  if (!user) {
    return [];
  }

  const workspaces = await prisma.workspace.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { forms: true },
      },
    },
  });

  return workspaces;
}

/**
 * Get a single workspace by ID (only if owned by current user).
 */
export async function getWorkspace(workspaceId: string) {
  const user = await ensureUserExists();

  if (!user) {
    return null;
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      userId: user.id,
    },
    include: {
      forms: {
        orderBy: { createdAt: 'desc' },
        include: {
          submissions: true,
        },
      },
      widgetConfig: true,
    },
  });

  return workspace;
}

/**
 * Delete a workspace (only if owned by current user).
 */
export async function deleteWorkspace(formData: FormData) {
  const user = await ensureUserExists();

  if (!user) {
    return { success: false, error: 'You must be logged in.' };
  }

  const workspaceId = formData.get('workspaceId') as string;

  if (!workspaceId) {
    return { success: false, error: 'Workspace ID is required.' };
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      userId: user.id,
    },
  });

  if (!workspace) {
    return { success: false, error: 'Workspace not found.' };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.workspace.delete({
        where: { id: workspaceId },
      });

      await tx.entitlement.update({
        where: { userId: user.id },
        data: { workspacesUsed: { decrement: 1 } },
      });
    });

    revalidatePath('/dashboard/workspaces');
    revalidatePath('/dashboard');
  } catch (error) {
    apiLogger.error('Failed to delete workspace', { error: String(error) });
    return { success: false, error: 'Failed to delete workspace. Please try again.' };
  }

  redirect('/dashboard/workspaces');
}

/**
 * Update workspace customization (Wall of Love branding).
 */
export async function updateWorkspaceCustomization(formData: FormData) {
  const user = await ensureUserExists();

  if (!user) {
    return { success: false, error: 'You must be logged in.' };
  }

  const workspaceId = formData.get('workspaceId') as string;
  const headline = formData.get('headline') as string;
  const description = formData.get('description') as string;
  const logoUrl = formData.get('logoUrl') as string;

  if (!workspaceId) {
    return { success: false, error: 'Workspace ID is required.' };
  }

  // Verify ownership
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      userId: user.id,
    },
  });

  if (!workspace) {
    return { success: false, error: 'Workspace not found.' };
  }

  try {
    await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        headline: headline || null,
        description: description || null,
        logoUrl: logoUrl || null,
      },
    });

    revalidatePath(`/dashboard/workspaces/${workspaceId}`);
    revalidatePath(`/w/${workspace.slug}`);

    return { success: true };
  } catch (error) {
    apiLogger.error('Failed to update workspace customization', { error: String(error) });
    return { success: false, error: 'Failed to update customization. Please try again.' };
  }
}
