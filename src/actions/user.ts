'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

/**
 * Ensures a User row exists for the current Supabase-authenticated user.
 * If missing, creates the user with a default TRIAL entitlement.
 */
export async function ensureUserExists() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser || !authUser.email) {
    return null;
  }

  let user = await prisma.user.findUnique({
    where: { id: authUser.id },
    include: { entitlement: true },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: authUser.id,
        email: authUser.email,
        entitlement: {
          create: {
            plan: 'TRIAL',
            workspacesUsed: 0,
            submissionsUsed: 0,
          },
        },
      },
      include: { entitlement: true },
    });
  }

  return user;
}

/**
 * Returns the current authenticated user with entitlement.
 * Does NOT create a user if missing.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: authUser.id },
    include: { entitlement: true },
  });
}
