import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

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

    // Send welcome email to user
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      if (type === 'founder') {
        await resend.emails.send({
          from: 'Curtis from ProofLayer <curtis@prooflayer.app>',
          to: email.toLowerCase().trim(),
          replyTo: 'curtis@prooflayer.app',
          subject: "You're on the list - let's get you your first users",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="margin-bottom: 30px;">
                <img src="https://www.prooflayer.app/logos/prooflayer-icon-only.svg" alt="ProofLayer" style="width: 48px; height: 48px;" />
              </div>

              <h1 style="font-size: 24px; font-weight: 600; color: #0a0a0b; margin-bottom: 20px;">
                Welcome to ProofLayer
              </h1>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                You're in. I'm building ProofLayer to solve the biggest problem founders face: getting those crucial first users.
              </p>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                Here's what happens next:
              </p>

              <ul style="font-size: 16px; color: #4b5563; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
                <li>I'll personally review your signup</li>
                <li>You'll get matched with early adopters who want to try new products</li>
                <li>Once you have users, you can collect testimonials and display social proof</li>
              </ul>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
                I'll be in touch soon with next steps. In the meantime, reply to this email if you have any questions - I read every one.
              </p>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
                — Curtis<br/>
                <span style="color: #9ca3af;">Founder, ProofLayer</span>
              </p>

              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 12px; color: #9ca3af;">
                  <a href="https://x.com/hookahhd" style="color: #00d084; text-decoration: none;">Follow me on X</a> for updates
                </p>
              </div>
            </div>
          `,
        });
      } else {
        // Early adopter email
        await resend.emails.send({
          from: 'Curtis from ProofLayer <curtis@prooflayer.app>',
          to: email.toLowerCase().trim(),
          replyTo: 'curtis@prooflayer.app',
          subject: "You're in - get ready to discover amazing new products",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="margin-bottom: 30px;">
                <img src="https://www.prooflayer.app/logos/prooflayer-icon-only.svg" alt="ProofLayer" style="width: 48px; height: 48px;" />
              </div>

              <h1 style="font-size: 24px; font-weight: 600; color: #0a0a0b; margin-bottom: 20px;">
                Welcome to ProofLayer
              </h1>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                You're officially an early adopter. That means you'll get first access to new products before anyone else.
              </p>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                Here's what to expect:
              </p>

              <ul style="font-size: 16px; color: #4b5563; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
                <li>Early access to products that match your interests</li>
                <li>Exclusive lifetime deals and discounts</li>
                <li>Direct line to founders who want your feedback</li>
              </ul>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
                I'll reach out when I have products that match what you're looking for. Keep an eye on your inbox.
              </p>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
                — Curtis<br/>
                <span style="color: #9ca3af;">Founder, ProofLayer</span>
              </p>

              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 12px; color: #9ca3af;">
                  <a href="https://x.com/hookahhd" style="color: #8b5cf6; text-decoration: none;">Follow me on X</a> for updates
                </p>
              </div>
            </div>
          `,
        });
      }

      // Also notify admin
      await resend.emails.send({
        from: 'ProofLayer <notifications@prooflayer.app>',
        to: 'curtis@prooflayer.app',
        subject: `🎉 New ${type === 'founder' ? 'Founder' : 'Early Adopter'} Signup!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: ${type === 'founder' ? '#00d084' : '#8b5cf6'};">New ${type === 'founder' ? 'Founder' : 'Early Adopter'} Signup</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0 0 0;"><strong>Type:</strong> ${type}</p>
              ${interestsList.length > 0 ? `<p style="margin: 10px 0 0 0;"><strong>Interests:</strong> ${interestsList.join(', ')}</p>` : ''}
              <p style="margin: 10px 0 0 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the request if email fails
    }

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
