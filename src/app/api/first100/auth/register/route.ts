import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { authLogger } from '@/lib/logger';
import { JWT_SECRET } from '@/lib/first100-utils';
import { checkRateLimit, getClientIp, RATE_LIMITS, rateLimitHeaders } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit check
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = checkRateLimit(`register:${clientIp}`, RATE_LIMITS.auth);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many registration attempts. Please try again later.' },
      { status: 429, headers: rateLimitHeaders(rateLimitResult) }
    );
  }

  try {
    const body = await request.json();
    const { email, password, accessToken } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Find the founder by email or access token
    let founder = await prisma.first100Waitlist.findFirst({
      where: accessToken
        ? { accessToken, type: 'FOUNDER' }
        : { email: email.toLowerCase(), type: 'FOUNDER' },
    });

    if (!founder) {
      return NextResponse.json(
        { error: 'No founder account found with this email. Please sign up as a founder first.' },
        { status: 404 }
      );
    }

    if (founder.hasAccount) {
      return NextResponse.json(
        { error: 'This account already has a password set. Please login instead.' },
        { status: 400 }
      );
    }

    // Hash password and update founder record
    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.first100Waitlist.update({
      where: { id: founder.id },
      data: {
        passwordHash,
        hasAccount: true,
      },
    });

    // Create JWT token
    const token = await new SignJWT({
      founderId: founder.id,
      email: founder.email,
      type: 'founder'
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(JWT_SECRET);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('founder_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      founder: {
        id: founder.id,
        email: founder.email,
        name: founder.name,
      },
    });
  } catch (error) {
    authLogger.error('Register error', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
