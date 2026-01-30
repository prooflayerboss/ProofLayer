import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureUserExists } from '@/actions/user';
import { apiLogger } from '@/lib/logger';

export async function POST() {
  try {
    const user = await ensureUserExists();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Reset onboarding status
    await prisma.user.update({
      where: { id: user.id },
      data: { onboardingCompleted: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    apiLogger.error('Error restarting onboarding', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to restart onboarding' },
      { status: 500 }
    );
  }
}
