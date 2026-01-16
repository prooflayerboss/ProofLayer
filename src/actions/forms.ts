'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import { ensureUserExists } from './user';

export async function getForms(workspaceId: string) {
  const user = await ensureUserExists();

  if (!user) {
    return [];
  }

  const forms = await prisma.form.findMany({
    where: {
      workspaceId,
      workspace: {
        userId: user.id,
      },
    },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { submissions: true },
      },
    },
  });

  return forms;
}

export async function getForm(formId: string) {
  const user = await ensureUserExists();

  if (!user) {
    return null;
  }

  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      workspace: {
        userId: user.id,
      },
    },
    include: {
      workspace: true,
      submissions: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  return form;
}

export async function createForm(formData: FormData) {
  const user = await ensureUserExists();

  if (!user) {
    return { success: false, error: 'You must be logged in to create a form.' };
  }

  const name = formData.get('name') as string;
  const workspaceId = formData.get('workspaceId') as string;

  if (!name || name.trim().length === 0) {
    return { success: false, error: 'Form name is required.' };
  }

  if (!workspaceId) {
    return { success: false, error: 'Workspace ID is required.' };
  }

  // Verify workspace ownership
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      userId: user.id,
    },
  });

  if (!workspace) {
    return { success: false, error: 'Workspace not found.' };
  }

  // Generate unique slug
  const slug = nanoid(10);

  try {
    await prisma.form.create({
      data: {
        workspaceId,
        name: name.trim(),
        slug,
        isActive: true,
      },
    });

    revalidatePath(`/dashboard/workspaces/${workspaceId}`);
  } catch (error) {
    console.error('Failed to create form:', error);
    return { success: false, error: 'Failed to create form. Please try again.' };
  }

  redirect(`/dashboard/workspaces/${workspaceId}`);
}

export async function toggleFormStatus(formId: string, isActive: boolean) {
  const user = await ensureUserExists();

  if (!user) {
    return { success: false, error: 'You must be logged in.' };
  }

  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      workspace: {
        userId: user.id,
      },
    },
  });

  if (!form) {
    return { success: false, error: 'Form not found.' };
  }

  await prisma.form.update({
    where: { id: formId },
    data: { isActive },
  });

  revalidatePath(`/dashboard/workspaces/${form.workspaceId}`);

  return { success: true };
}

export async function deleteForm(formId: string) {
  const user = await ensureUserExists();

  if (!user) {
    return { success: false, error: 'You must be logged in.' };
  }

  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      workspace: {
        userId: user.id,
      },
    },
  });

  if (!form) {
    return { success: false, error: 'Form not found.' };
  }

  await prisma.form.delete({
    where: { id: formId },
  });

  revalidatePath(`/dashboard/workspaces/${form.workspaceId}`);

  return { success: true };
}
