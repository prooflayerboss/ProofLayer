'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { ensureUserExists } from './user';

export async function getSubmissions(formId: string) {
  const user = await ensureUserExists();

  if (!user) {
    return [];
  }

  const submissions = await prisma.submission.findMany({
    where: {
      formId,
      form: {
        workspace: {
          userId: user.id,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return submissions;
}

export async function updateSubmissionStatus(
  submissionId: string,
  status: 'APPROVED' | 'REJECTED'
) {
  const user = await ensureUserExists();

  if (!user) {
    return { success: false, error: 'You must be logged in.' };
  }

  const submission = await prisma.submission.findFirst({
    where: {
      id: submissionId,
      form: {
        workspace: {
          userId: user.id,
        },
      },
    },
    include: {
      form: true,
    },
  });

  if (!submission) {
    return { success: false, error: 'Submission not found.' };
  }

  await prisma.submission.update({
    where: { id: submissionId },
    data: { status },
  });

  revalidatePath(`/dashboard/workspaces/${submission.form.workspaceId}`);

  return { success: true };
}

export async function deleteSubmission(submissionId: string) {
  const user = await ensureUserExists();

  if (!user) {
    return { success: false, error: 'You must be logged in.' };
  }

  const submission = await prisma.submission.findFirst({
    where: {
      id: submissionId,
      form: {
        workspace: {
          userId: user.id,
        },
      },
    },
    include: {
      form: {
        include: {
          workspace: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!submission) {
    return { success: false, error: 'Submission not found.' };
  }

  // Delete and decrement counter
  await prisma.$transaction(async (tx) => {
    await tx.submission.delete({
      where: { id: submissionId },
    });

    await tx.entitlement.update({
      where: { userId: user.id },
      data: { submissionsUsed: { decrement: 1 } },
    });
  });

  revalidatePath(`/dashboard/workspaces/${submission.form.workspaceId}`);

  return { success: true };
}