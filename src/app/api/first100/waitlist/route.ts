import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { randomBytes } from 'crypto';

// Generate URL-friendly slug from product name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .substring(0, 50); // Limit length
}

// Ensure slug is unique by checking DB and appending suffix if needed
async function getUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let suffix = 0;

  while (true) {
    const existing = await prisma.first100Waitlist.findUnique({
      where: { slug },
    });

    if (!existing) {
      return slug;
    }

    suffix++;
    slug = `${baseSlug}-${suffix}`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      type,
      interests,
      // Founder-specific fields
      name,
      twitterHandle,
      productName,
      productTagline,
      productUrl,
      productCategory,
      productStage,
      lookingForCount,
      offerDescription,
    } = body;

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

    // Generate access token and slug for founders
    const accessToken = type === 'founder' ? randomBytes(32).toString('hex') : undefined;
    let slug: string | undefined;

    if (type === 'founder' && productName) {
      const baseSlug = generateSlug(productName);
      slug = await getUniqueSlug(baseSlug);
    }

    // Build data object based on type
    const createData: {
      email: string;
      type: 'FOUNDER' | 'EARLY_ADOPTER';
      interests: string[];
      status?: string;
      name?: string;
      twitterHandle?: string;
      productName?: string;
      productTagline?: string;
      productUrl?: string;
      productCategory?: string;
      productStage?: string;
      lookingForCount?: number;
      offerDescription?: string;
      accessToken?: string;
      slug?: string;
    } = {
      email: email.toLowerCase().trim(),
      type: waitlistType,
      interests: interestsList,
      // Founders start in voting status for community approval
      status: type === 'founder' ? 'voting' : undefined,
    };

    // Add access token and slug for founders
    if (accessToken) {
      createData.accessToken = accessToken;
    }
    if (slug) {
      createData.slug = slug;
    }

    // Add founder-specific fields
    if (type === 'founder') {
      if (name) createData.name = name;
      if (twitterHandle) createData.twitterHandle = twitterHandle;
      if (productName) createData.productName = productName;
      if (productTagline) createData.productTagline = productTagline;
      if (productUrl) createData.productUrl = productUrl;
      if (productCategory) createData.productCategory = productCategory;
      if (productStage) createData.productStage = productStage;
      if (lookingForCount) createData.lookingForCount = parseInt(lookingForCount);
      if (offerDescription) createData.offerDescription = offerDescription;
    }

    // Insert into waitlist
    const entry = await prisma.first100Waitlist.create({
      data: createData,
    });

    // Send emails
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      if (type === 'founder') {
        // Welcome email to founder
        await resend.emails.send({
          from: 'Curtis from ProofLayer <curtis@prooflayer.app>',
          to: email.toLowerCase().trim(),
          replyTo: 'curtis@prooflayer.app',
          subject: `${productName ? `${productName} is` : "You're"} on the list - let's get you your first users`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="margin-bottom: 30px;">
                <img src="https://www.prooflayer.app/logos/prooflayer-icon-only.svg" alt="ProofLayer" style="width: 48px; height: 48px;" />
              </div>

              <h1 style="font-size: 24px; font-weight: 600; color: #0a0a0b; margin-bottom: 20px;">
                Application received${name ? `, ${name.split(' ')[0]}` : ''}!
              </h1>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                Thanks for submitting ${productName || 'your product'}! Your product is now <strong>live for community voting</strong>.
              </p>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #166534; font-weight: 600;">Your submission:</p>
                <p style="margin: 0 0 5px 0; font-size: 14px; color: #15803d;"><strong>Product:</strong> ${productName || 'N/A'}</p>
                <p style="margin: 0 0 5px 0; font-size: 14px; color: #15803d;"><strong>Category:</strong> ${productCategory || 'N/A'}</p>
                <p style="margin: 0 0 5px 0; font-size: 14px; color: #15803d;"><strong>Looking for:</strong> ${lookingForCount || 25} early adopters</p>
                <p style="margin: 0; font-size: 14px; color: #15803d;"><strong>Offering:</strong> ${offerDescription || 'N/A'}</p>
              </div>

              <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #7c3aed; font-weight: 600;">🗳️ Community Voting</p>
                <p style="margin: 0; font-size: 14px; color: #6d28d9; line-height: 1.6;">
                  Our early adopters vote on products they're excited about. Once you get <strong>5 votes</strong>, your product is automatically approved and added to the directory.
                </p>
              </div>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                <strong>What happens next:</strong>
              </p>

              <ol style="font-size: 16px; color: #4b5563; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
                <li>Early adopters see your product on the <a href="https://prooflayer.app/vote" style="color: #00d084;">voting page</a></li>
                <li>Once you get 5 votes, you're automatically approved</li>
                <li>You'll appear in our directory for early adopters to request access</li>
                <li>You approve who gets in and start building relationships</li>
              </ol>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #166534; font-weight: 600;">Your Founder Portal</p>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #15803d;">Bookmark this link to check for early adopters who want to try your product:</p>
                <a href="https://prooflayer.app/first100/portal?token=${accessToken}" style="display: inline-block; background: #00d084; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">View Your Portal</a>
              </div>

              ${slug ? `
              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #1e40af; font-weight: 600;">Your Public Product Page</p>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #1d4ed8;">Share this link to attract early adopters:</p>
                <p style="margin: 0; font-size: 14px;">
                  <a href="https://prooflayer.app/p/${slug}" style="color: #2563eb; font-weight: 600;">prooflayer.app/p/${slug}</a>
                </p>
              </div>
              ` : ''}

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
                Reply to this email anytime - I read every message.
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

        // Detailed notification to admin (Curtis)
        await resend.emails.send({
          from: 'ProofLayer <notifications@prooflayer.app>',
          to: 'curtis@prooflayer.app',
          subject: `🚀 NEW FOUNDER: ${productName || 'Unknown Product'} - ${name || email}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #00d084; font-size: 24px; margin-bottom: 20px;">New Founder Application!</h1>

              <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #0a0a0b;">👤 Founder Info</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; width: 120px;">Name:</td>
                    <td style="padding: 8px 0; color: #0a0a0b; font-weight: 500;">${name || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                    <td style="padding: 8px 0; color: #0a0a0b; font-weight: 500;">
                      <a href="mailto:${email}" style="color: #00d084;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Twitter:</td>
                    <td style="padding: 8px 0; color: #0a0a0b; font-weight: 500;">
                      ${twitterHandle ? `<a href="https://x.com/${twitterHandle}" style="color: #00d084;">@${twitterHandle}</a>` : 'Not provided'}
                    </td>
                  </tr>
                </table>
              </div>

              <div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #166534;">📦 Product Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #15803d; width: 120px;">Product:</td>
                    <td style="padding: 8px 0; color: #166534; font-weight: 600; font-size: 16px;">${productName || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #15803d;">Tagline:</td>
                    <td style="padding: 8px 0; color: #166534;">${productTagline || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #15803d;">URL:</td>
                    <td style="padding: 8px 0; color: #166534;">
                      ${productUrl ? `<a href="${productUrl}" style="color: #00d084;">${productUrl}</a>` : 'Not provided'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #15803d;">Category:</td>
                    <td style="padding: 8px 0; color: #166534;">${productCategory || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #15803d;">Stage:</td>
                    <td style="padding: 8px 0; color: #166534; text-transform: capitalize;">${productStage || 'Not provided'}</td>
                  </tr>
                </table>
              </div>

              <div style="background: #fef3c7; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #92400e;">🎁 What They're Offering</h2>
                <p style="margin: 0 0 10px 0; color: #92400e;">
                  <strong>Looking for:</strong> ${lookingForCount || 25} early adopters
                </p>
                <p style="margin: 0; color: #92400e;">
                  <strong>Offer:</strong> ${offerDescription || 'Not specified'}
                </p>
              </div>

              <div style="background: #0a0a0b; border-radius: 12px; padding: 20px; text-align: center;">
                <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px;">Quick Actions</p>
                <a href="mailto:${email}?subject=Welcome to ProofLayer - ${productName}" style="display: inline-block; background: #00d084; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px;">Reply to Founder</a>
                ${productUrl ? `<a href="${productUrl}" style="display: inline-block; background: #374151; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px;">View Product</a>` : ''}
                ${slug ? `<a href="https://prooflayer.app/p/${slug}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px;">Public Page</a>` : ''}
                <a href="https://prooflayer.app/first100/portal?token=${accessToken}" style="display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px;">View Portal</a>
              </div>

              <p style="color: #9ca3af; font-size: 12px; margin-top: 20px; text-align: center;">
                Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
              </p>
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
                <li><strong>Vote on products</strong> you want to see approved</li>
              </ul>

              <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #7c3aed; font-weight: 600;">🗳️ Your Voice Matters</p>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #6d28d9; line-height: 1.6;">
                  As an early adopter, you help decide which products get approved. Vote for the ones you're excited about!
                </p>
                <a href="https://prooflayer.app/vote" style="display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Vote on Products</a>
              </div>

              ${interestsList.length > 0 ? `
              <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px; color: #5b21b6;"><strong>Your interests:</strong> ${interestsList.join(', ')}</p>
              </div>
              ` : ''}

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

        // Admin notification for early adopter
        await resend.emails.send({
          from: 'ProofLayer <notifications@prooflayer.app>',
          to: 'curtis@prooflayer.app',
          subject: `👋 New Early Adopter: ${email}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #8b5cf6;">New Early Adopter Signup</h2>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
                ${interestsList.length > 0 ? `<p style="margin: 10px 0 0 0;"><strong>Interests:</strong> ${interestsList.join(', ')}</p>` : ''}
                <p style="margin: 10px 0 0 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
            </div>
          `,
        });
      }
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
