/**
 * Shared utilities for First100 authentication and common operations
 */

import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// JWT Secret - must be set via environment variable in production
const jwtSecretValue = process.env.JWT_SECRET;
if (!jwtSecretValue && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}
export const JWT_SECRET = new TextEncoder().encode(
  jwtSecretValue || 'dev-only-secret-do-not-use-in-production'
);

// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Generate URL-friendly slug from a name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

/**
 * Generate a unique slug by checking the database
 */
export async function generateUniqueSlug(
  name: string,
  checkExists: (slug: string) => Promise<boolean>
): Promise<string> {
  const baseSlug = generateSlug(name);
  let slug = baseSlug;
  let counter = 1;

  while (await checkExists(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
    // Safety limit to prevent infinite loops
    if (counter > 100) {
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }

  return slug;
}

/**
 * Get authenticated founder from JWT token in cookies
 */
export async function getAuthenticatedFounder() {
  const cookieStore = await cookies();
  const token = cookieStore.get('founder_token')?.value;

  if (!token) {
    return null;
  }

  try {
    const result = await jwtVerify(token, JWT_SECRET);
    const payload = result.payload as { founderId: string; email: string };

    const founder = await prisma.first100Waitlist.findUnique({
      where: { id: payload.founderId },
    });

    return founder;
  } catch {
    return null;
  }
}

/**
 * Parse integer safely, returning null if invalid
 */
export function safeParseInt(value: string | undefined | null): number | null {
  if (value === undefined || value === null) {
    return null;
  }
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}
