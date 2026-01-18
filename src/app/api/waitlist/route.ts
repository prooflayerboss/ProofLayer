import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Create waitlist table if it doesn't exist (you'll need to do this in Supabase)
    const { error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          created_at: new Date().toISOString(),
          source: 'homepage',
        },
      ]);

    if (error) {
      // If duplicate email, that's okay
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed!' });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
