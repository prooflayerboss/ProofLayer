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
  const rateLimitResult = checkRateLimit(`login:${clientIp}`, RATE_LIMITS.auth);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      { status: 429, headers: rateLimitHeaders(rateLimitResult) }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find the founder by email
    const founder = await prisma.first100Waitlist.findFirst({
      where: {
        email: email.toLowerCase(),
        type: 'FOUNDER',
      },
    });

    if (!founder) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!founder.hasAccount || !founder.passwordHash) {
      return NextResponse.json(
        { error: 'Please set up your account first. Check your email for the portal link.' },
        { status: 401 }
      );
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, founder.passwordHash);
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

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
      founder: {
        id: founder.id,
        email: founder.email,
        name: founder.name,
      },
    });
  } catch (error) {
    authLogger.error('Login error', { error: String(error) });
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
