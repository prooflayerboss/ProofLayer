import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ensureUserExists } from '@/actions/user';
import { getWorkspace } from '@/actions/workspaces';
import WorkspaceDetailClient from './workspace-detail-client';

export default async function WorkspaceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: { error?: string; formCreated?: string };
}) {
  const { id } = await params;
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const workspace = await getWorkspace(id);

  if (!workspace) {
    notFound();
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard/workspaces"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Workspaces
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{workspace.name}</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Forms</p>
          <p className="text-2xl font-bold text-gray-900">{workspace.forms.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Submissions</p>
          <p className="text-2xl font-bold text-gray-900">
            {workspace.forms.reduce((acc, form) => acc + form.submissions.length, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-1.5">
            <p className="text-sm text-gray-500">Widget Views</p>
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-purple-600">{workspace.widgetViews?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Created</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date(workspace.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <WorkspaceDetailClient
        workspaceId={id}
        workspaceName={workspace.name}
        workspaceSlug={workspace.slug}
        forms={workspace.forms}
        appUrl={appUrl}
        showError={searchParams.error === 'form_limit_reached'}
      />
    </div>
  );
}