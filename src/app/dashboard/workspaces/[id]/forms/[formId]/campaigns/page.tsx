import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { getForm } from '@/actions/forms';
import { prisma } from '@/lib/prisma';
import { PLAN_LIMITS } from '@/lib/constants';
import CampaignManager from './campaign-manager';

export default async function CampaignsPage({
  params,
}: {
  params: Promise<{ id: string; formId: string }>;
}) {
  const { id, formId } = await params;
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  // Check if user has campaign access
  const plan = user.entitlement?.plan || 'TRIAL';
  const limits = PLAN_LIMITS[plan];

  if (!limits.allowEmailCampaigns) {
    return (
      <div>
        <div className="mb-6">
          <Link
            href={`/dashboard/workspaces/${id}/forms/${formId}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Form
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Campaigns</h2>
          <p className="text-gray-600 mb-6">
            Email campaigns with CSV import are available on Professional and Agency plans.
          </p>
          <Link
            href="/dashboard/billing"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Upgrade to Professional
          </Link>
        </div>
      </div>
    );
  }

  const form = await getForm(formId);

  if (!form) {
    notFound();
  }

  // Get all campaigns for this form
  const campaigns = await prisma.emailCampaign.findMany({
    where: { formId: formId },
    include: {
      recipients: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/dashboard/workspaces/${id}/forms/${formId}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {form.name}
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>
        <p className="text-sm text-gray-500 mt-1">
          Send testimonial requests to multiple customers at once
        </p>
      </div>

      <CampaignManager
        formId={formId}
        workspaceId={id}
        formName={form.name}
        campaigns={campaigns}
        senderName={user.name || 'Your team'}
        senderCompany={form.workspace.name}
      />
    </div>
  );
}
