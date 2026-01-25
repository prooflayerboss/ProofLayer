import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { getForm } from '@/actions/forms';
import SubmissionsList from './submissions-list';
import EmailSender from '@/components/email-sender';
import CopyLinkButton from '@/components/copy-link-button';
import ImportTestimonials from '@/components/import-testimonials';
import GoogleBusinessIntegration from '@/components/GoogleBusinessIntegration';
import { PLAN_LIMITS } from '@/lib/constants';

export default async function FormDetailPage({
  params,
}: {
  params: Promise<{ id: string; formId: string }>;
}) {
  const { id, formId } = await params;
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const form = await getForm(formId);

  if (!form) {
    notFound();
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const publicUrl = `${appUrl}/f/${form.slug}`;

  const pendingCount = form.submissions.filter(s => s.status === 'PENDING').length;
  const approvedCount = form.submissions.filter(s => s.status === 'APPROVED').length;
  const rejectedCount = form.submissions.filter(s => s.status === 'REJECTED').length;

  // Check if user has campaign access
  const plan = user.entitlement?.plan || 'TRIAL';
  const limits = PLAN_LIMITS[plan];
  const hasCampaignAccess = limits.allowEmailCampaigns;

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/dashboard/workspaces/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {form.workspace.name}
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{form.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {form.isActive ? (
              <span className="text-green-600">● Active</span>
            ) : (
              <span className="text-gray-400">● Inactive</span>
            )}
          </p>
        </div>
      </div>

      {/* Form Link Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Share Your Form</h2>
          <div className="flex items-center gap-2">
            <ImportTestimonials formId={form.id} />
            {hasCampaignAccess && (
              <Link
                href={`/dashboard/workspaces/${id}/forms/${form.id}/campaigns`}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Campaigns
              </Link>
            )}
            <EmailSender
              formUrl={publicUrl}
              formId={form.id}
              senderName={user.name || 'Your team'}
              senderCompany={form.workspace.name}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">Share this link or send email requests to collect testimonials:</p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            readOnly
            value={publicUrl}
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700"
          />
          <CopyLinkButton text={publicUrl} label="Copy Link" />
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Open
          </a>
        </div>
      </div>

      {/* Google Business Integration */}
      <div className="mb-6">
        <GoogleBusinessIntegration workspaceId={id} formId={formId} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
        </div>
      </div>

      {/* Submissions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Submissions</h2>
        <SubmissionsList submissions={form.submissions} formId={formId} />
      </div>
    </div>
  );
}