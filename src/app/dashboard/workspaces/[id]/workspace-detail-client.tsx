'use client';

import Link from 'next/link';
import CopyUrlButton from './copy-url-button';
import SuccessTour from './success-tour';

interface Form {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  submissions: Array<{
    status: string;
  }>;
}

interface WorkspaceDetailClientProps {
  workspaceId: string;
  workspaceName: string;
  workspaceSlug: string | null;
  forms: Form[];
  appUrl: string;
  showError?: boolean;
}

export default function WorkspaceDetailClient({
  workspaceId,
  workspaceName,
  workspaceSlug,
  forms,
  appUrl,
  showError = false,
}: WorkspaceDetailClientProps) {
  const firstFormSlug = forms.length > 0 ? forms[0].slug : undefined;

  return (
    <>
      <SuccessTour workspaceName={workspaceName} formSlug={firstFormSlug} />

      {/* Error Message */}
      {showError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-900 mb-1">Form Limit Reached</h3>
              <p className="text-sm text-red-700 mb-3">
                You've reached your plan's form limit. Upgrade to create more forms and unlock additional features.
              </p>
              <Link
                href="/dashboard/billing"
                className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Upgrade Plan →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Wall of Love - Shareable Page */}
      {workspaceSlug && (
        <div
          data-tour="wall-of-love"
          className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6 mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wall of Love - Shareable Page
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Share this public page with clients or embed it on your site. Perfect for non-technical users who can't use embed codes!
              </p>
              <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm text-gray-700 break-all">
                    {appUrl}/w/{workspaceSlug}
                  </code>
                  <CopyUrlButton url={`${appUrl}/w/${workspaceSlug}`} />
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={`/w/${workspaceSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                >
                  Preview Page
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <Link
                  href={`/dashboard/workspaces/${workspaceId}/customize`}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Customize Page →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forms Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Forms</h2>
          <Link
            data-tour="create-widget"
            href={`/dashboard/workspaces/${workspaceId}/forms/new`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Create Form
          </Link>
        </div>

        {forms.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-4">No forms yet. Create your first form to start collecting testimonials.</p>
            <Link
              href={`/dashboard/workspaces/${workspaceId}/forms/new`}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Create your first form →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {forms.map((form, index) => {
              const pendingCount = form.submissions.filter(s => s.status === 'PENDING').length;
              const approvedCount = form.submissions.filter(s => s.status === 'APPROVED').length;

              return (
                <div
                  key={form.id}
                  data-tour={index === 0 ? "form-link" : undefined}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-gray-900">{form.name}</p>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${form.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                        {form.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-sm text-gray-500">
                        {appUrl}/f/{form.slug}
                      </p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-sm text-gray-500">
                        {pendingCount} pending, {approvedCount} approved
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/workspaces/${workspaceId}/forms/${form.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium ml-4"
                  >
                    Manage →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
