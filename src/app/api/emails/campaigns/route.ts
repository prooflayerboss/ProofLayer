import { NextResponse } from 'next/server';
import { ensureUserExists } from '@/actions/user';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const user = await ensureUserExists();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { formId, name, subject, customMessage, recipients } = body;

    if (!formId || !name || !subject || !recipients || !Array.isArray(recipients)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify form ownership
    const form = await prisma.form.findUnique({
      where: { id: formId },
      include: {
        workspace: {
          include: {
            user: true,
          }
        }
      }
    });

    if (!form || form.workspace.userId !== user.id) {
      return NextResponse.json(
        { error: 'Form not found or access denied' },
        { status: 404 }
      );
    }

    // Create campaign with recipients
    const campaign = await prisma.emailCampaign.create({
      data: {
        formId,
        name,
        subject,
        customMessage,
        totalRecipients: recipients.length,
        recipients: {
          create: recipients.map((r: { email: string; name?: string }) => ({
            email: r.email,
            name: r.name || null,
          })),
        },
      },
      include: {
        recipients: true,
      },
    });

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    console.error('Create campaign error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
