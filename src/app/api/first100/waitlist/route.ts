import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, type, interests } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate type
    if (!type || !['founder', 'early_adopter'].includes(type)) {
      return NextResponse.json({ error: "Type must be 'founder' or 'early_adopter'" }, { status: 400 });
    }

    // Validate interests for early adopters
    const interestsList = Array.isArray(interests) ? interests : [];

    // Map type to Prisma enum
    const waitlistType = type === 'founder' ? 'FOUNDER' : 'EARLY_ADOPTER';

    // Check if email already exists
    const existing = await prisma.first100Waitlist.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json({ error: 'This email is already on the waitlist' }, { status: 409 });
    }

    // Insert into waitlist
    const entry = await prisma.first100Waitlist.create({
      data: {
        email: email.toLowerCase().trim(),
        type: waitlistType,
        interests: interestsList,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Added to waitlist',
      data: entry,
    });
  } catch (error) {
    console.error('First100 Waitlist API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
