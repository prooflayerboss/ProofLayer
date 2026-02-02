import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, productId, productSlug, productName } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Get the founder's info
    const founder = await prisma.first100Waitlist.findUnique({
      where: { id: productId },
      select: {
        email: true,
        name: true,
        productName: true,
        productCategory: true,
        offerDescription: true,
        slug: true,
      },
    });

    if (!founder) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if this email already requested access (could add a table for this later)
    // For now, just allow multiple requests and let the founder handle it

    // Send notification to founder
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'ProofLayer <notifications@prooflayer.app>',
        to: founder.email,
        replyTo: email, // Allow founder to reply directly to the requester
        subject: `🎉 Someone wants early access to ${founder.productName || 'your product'}!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="margin-bottom: 30px;">
              <img src="https://www.prooflayer.app/logos/prooflayer-icon-only.svg" alt="ProofLayer" style="width: 48px; height: 48px;" />
            </div>

            <h1 style="font-size: 24px; font-weight: 600; color: #0a0a0b; margin-bottom: 20px;">
              New early access request! 🎉
            </h1>

            <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Someone is interested in getting early access to <strong>${founder.productName || 'your product'}</strong>.
            </p>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #166534; font-weight: 600;">Request details:</p>
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #15803d;">
                <strong>Email:</strong> <a href="mailto:${email}" style="color: #00d084;">${email}</a>
              </p>
              <p style="margin: 0; font-size: 14px; color: #15803d;">
                <strong>Product:</strong> ${founder.productName || 'Your product'}
              </p>
            </div>

            <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              <strong>What to do next:</strong>
            </p>

            <ol style="font-size: 16px; color: #4b5563; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
              <li>Reply to this email to connect with them directly</li>
              <li>Share your offer: ${founder.offerDescription || 'Your early adopter deal'}</li>
              <li>Start building a relationship with your new early adopter!</li>
            </ol>

            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}?subject=Welcome to ${founder.productName || 'our product'} - Early Access&body=Hi!%0A%0AThanks for requesting early access to ${founder.productName || 'our product'}. ${founder.offerDescription ? `Here's your exclusive offer: ${founder.offerDescription}` : ''}%0A%0A" style="display: inline-block; background: #00d084; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Reply to ${email.split('@')[0]}
              </a>
            </div>

            <p style="font-size: 14px; color: #9ca3af; margin-top: 30px;">
              This request came from your product page at <a href="https://prooflayer.app/p/${founder.slug}" style="color: #00d084;">prooflayer.app/p/${founder.slug}</a>
            </p>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 12px; color: #9ca3af;">
                Powered by <a href="https://prooflayer.app" style="color: #00d084; text-decoration: none;">ProofLayer</a> - Community marketplace for founders
              </p>
            </div>
          </div>
        `,
      });

      // Also send confirmation to the requester
      await resend.emails.send({
        from: 'ProofLayer <notifications@prooflayer.app>',
        to: email,
        subject: `Your request for ${productName || 'early access'} has been sent!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="margin-bottom: 30px;">
              <img src="https://www.prooflayer.app/logos/prooflayer-icon-only.svg" alt="ProofLayer" style="width: 48px; height: 48px;" />
            </div>

            <h1 style="font-size: 24px; font-weight: 600; color: #0a0a0b; margin-bottom: 20px;">
              Request sent! 🚀
            </h1>

            <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              You've requested early access to <strong>${productName || 'a product'}</strong>. The founder has been notified and will reach out to you directly if it's a good fit.
            </p>

            ${founder.offerDescription ? `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #166534; font-weight: 600;">The offer you're getting:</p>
              <p style="margin: 0; font-size: 16px; color: #15803d;">${founder.offerDescription}</p>
            </div>
            ` : ''}

            <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Keep an eye on your inbox for a message from the founder.
            </p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 14px; color: #9ca3af;">
                Want to discover more products? <a href="https://prooflayer.app/directory" style="color: #00d084; text-decoration: none;">Browse the directory</a>
              </p>
            </div>
          </div>
        `,
      });

      // Notify admin
      await resend.emails.send({
        from: 'ProofLayer <notifications@prooflayer.app>',
        to: 'curtis@prooflayer.app',
        subject: `🔔 Access Request: ${email} → ${productName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #00d084;">New Access Request</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>Requester:</strong> ${email}</p>
              <p style="margin: 0 0 10px 0;"><strong>Product:</strong> ${productName}</p>
              <p style="margin: 0 0 10px 0;"><strong>Founder:</strong> ${founder.name || founder.email}</p>
              <p style="margin: 0;"><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p>
            </div>
            <p><a href="https://prooflayer.app/p/${founder.slug}" style="color: #00d084;">View product page</a></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send request access emails:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Access request sent',
    });
  } catch (error) {
    console.error('Request access API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
