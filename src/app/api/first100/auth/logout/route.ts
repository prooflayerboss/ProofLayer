import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authLogger } from '@/lib/logger';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('founder_token');

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    authLogger.error('Logout error', { error: String(error) });
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
