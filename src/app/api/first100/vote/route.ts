import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const VOTE_THRESHOLD = 5; // Number of votes needed for auto-approval

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, voterEmail } = body;

    if (!productId || !voterEmail) {
      return NextResponse.json({ error: 'Product ID and voter email are required' }, { status: 400 });
    }

    // Verify the voter is a registered early adopter
    const voter = await prisma.first100Waitlist.findUnique({
      where: { email: voterEmail.toLowerCase().trim() },
    });

    if (!voter) {
      return NextResponse.json({
        error: 'You need to sign up as an early adopter to vote',
        needsSignup: true
      }, { status: 403 });
    }

    if (voter.type !== 'EARLY_ADOPTER') {
      return NextResponse.json({
        error: 'Only early adopters can vote on products'
      }, { status: 403 });
    }

    // Get the product
    const product = await prisma.first100Waitlist.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (product.type !== 'FOUNDER') {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    // Check if already voted
    const existingVote = await prisma.productVote.findUnique({
      where: {
        productId_voterId: {
          productId: productId,
          voterId: voter.id,
        },
      },
    });

    if (existingVote) {
      return NextResponse.json({ error: 'You have already voted for this product' }, { status: 409 });
    }

    // Create the vote and update vote count
    const [vote, updatedProduct] = await prisma.$transaction([
      prisma.productVote.create({
        data: {
          productId: productId,
          voterId: voter.id,
        },
      }),
      prisma.first100Waitlist.update({
        where: { id: productId },
        data: {
          voteCount: { increment: 1 },
        },
      }),
    ]);

    const newVoteCount = updatedProduct.voteCount;

    // Check if product should be auto-approved
    if (newVoteCount >= VOTE_THRESHOLD && updatedProduct.status !== 'approved') {
      await prisma.first100Waitlist.update({
        where: { id: productId },
        data: {
          status: 'approved',
          approvedAt: new Date(),
        },
      });

      // Notify the founder that their product was approved
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: 'ProofLayer <notifications@prooflayer.app>',
          to: product.email,
          subject: `🎉 ${product.productName} has been approved by the community!`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="margin-bottom: 30px;">
                <img src="https://www.prooflayer.app/logos/prooflayer-icon-only.svg" alt="ProofLayer" style="width: 48px; height: 48px;" />
              </div>

              <h1 style="font-size: 24px; font-weight: 600; color: #0a0a0b; margin-bottom: 20px;">
                Your product is approved! 🎉
              </h1>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                <strong>${product.productName}</strong> received ${newVoteCount} votes from early adopters and is now officially approved!
              </p>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #166534; font-weight: 600;">What this means:</p>
                <ul style="margin: 0; padding-left: 20px; color: #15803d; font-size: 14px; line-height: 1.8;">
                  <li>Your product is now live in the directory</li>
                  <li>Early adopters can discover and request access</li>
                  <li>${newVoteCount} people are already interested!</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://prooflayer.app/p/${product.slug}" style="display: inline-block; background: #00d084; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  View Your Product Page
                </a>
              </div>

              <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
                — The ProofLayer Community
              </p>
            </div>
          `,
        });

        // Notify admin
        await resend.emails.send({
          from: 'ProofLayer <notifications@prooflayer.app>',
          to: 'curtis@prooflayer.app',
          subject: `✅ Auto-approved: ${product.productName} (${newVoteCount} votes)`,
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2 style="color: #00d084;">Product Auto-Approved</h2>
              <p><strong>${product.productName}</strong> reached ${newVoteCount} votes and was automatically approved.</p>
              <p><a href="https://prooflayer.app/p/${product.slug}">View product page</a></p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send approval email:', emailError);
      }

      return NextResponse.json({
        success: true,
        message: 'Vote recorded! Product has been approved!',
        voteCount: newVoteCount,
        approved: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Vote recorded!',
      voteCount: newVoteCount,
      votesNeeded: VOTE_THRESHOLD - newVoteCount,
      approved: false,
    });
  } catch (error) {
    console.error('Vote API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET endpoint to check if a user has voted for a product
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const voterEmail = searchParams.get('voterEmail');

    if (!productId || !voterEmail) {
      return NextResponse.json({ error: 'Product ID and voter email are required' }, { status: 400 });
    }

    const voter = await prisma.first100Waitlist.findUnique({
      where: { email: voterEmail.toLowerCase().trim() },
    });

    if (!voter) {
      return NextResponse.json({ hasVoted: false, isEarlyAdopter: false });
    }

    const existingVote = await prisma.productVote.findUnique({
      where: {
        productId_voterId: {
          productId: productId,
          voterId: voter.id,
        },
      },
    });

    return NextResponse.json({
      hasVoted: !!existingVote,
      isEarlyAdopter: voter.type === 'EARLY_ADOPTER',
    });
  } catch (error) {
    console.error('Vote check API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
