import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { apiLogger } from '@/lib/logger';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const { formId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get format from query params (default to csv)
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'csv';
    const status = searchParams.get('status'); // Optional filter: PENDING, APPROVED, REJECTED

    // Verify user owns this form
    const form = await prisma.form.findUnique({
      where: { id: formId },
      include: {
        workspace: true,
        submissions: {
          orderBy: { createdAt: 'desc' },
          where: status ? { status: status as any } : undefined,
        },
      },
    });

    if (!form || form.workspace.userId !== user.id) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    const submissions = form.submissions;

    if (format === 'csv') {
      // Generate CSV
      const headers = [
        'Name',
        'Email',
        'Company',
        'Role',
        'Social Link',
        'Testimonial',
        'Rating',
        'Status',
        'Type',
        'Video URL',
        'Photo URL',
        'Social Platform',
        'Social Author URL',
        'Submitted At',
      ];

      const rows = submissions.map((s) => [
        escapeCSV(s.name),
        escapeCSV(s.email || ''),
        escapeCSV(s.company || ''),
        escapeCSV(s.role || ''),
        escapeCSV(s.socialLink || ''),
        escapeCSV(s.testimonial),
        s.rating?.toString() || '',
        s.status,
        s.submissionType,
        s.videoUrl || '',
        s.photoUrl || '',
        s.socialPlatform || '',
        s.socialAuthorUrl || '',
        new Date(s.createdAt).toISOString(),
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n');

      const filename = `${form.slug}-testimonials-${new Date().toISOString().split('T')[0]}.csv`;

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } else if (format === 'json') {
      // Generate JSON
      const jsonData = submissions.map((s) => ({
        name: s.name,
        email: s.email,
        company: s.company,
        role: s.role,
        socialLink: s.socialLink,
        testimonial: s.testimonial,
        rating: s.rating,
        status: s.status,
        type: s.submissionType,
        videoUrl: s.videoUrl,
        videoThumbnail: s.videoThumbnail,
        videoDuration: s.videoDuration,
        photoUrl: s.photoUrl,
        socialPlatform: s.socialPlatform,
        socialAuthorUrl: s.socialAuthorUrl,
        submittedAt: s.createdAt.toISOString(),
      }));

      const filename = `${form.slug}-testimonials-${new Date().toISOString().split('T')[0]}.json`;

      return new NextResponse(JSON.stringify(jsonData, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } else {
      return NextResponse.json({ error: 'Invalid format. Use csv or json' }, { status: 400 });
    }
  } catch (error) {
    apiLogger.error('Export error', { error: String(error) });
    return NextResponse.json({ error: 'Failed to export testimonials' }, { status: 500 });
  }
}

// Helper function to escape CSV fields
function escapeCSV(value: string): string {
  if (!value) return '';

  // If the value contains comma, newline, or quotes, wrap in quotes and escape internal quotes
  if (value.includes(',') || value.includes('\n') || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}
