import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ensureUserExists } from '@/actions/user';
import { getWorkspace } from '@/actions/workspaces';
import WorkspaceDetailClient from './workspace-detail-client';

export default async function WorkspaceDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string; formCreated?: string };
}) {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const workspace = await getWorkspace(params.id);

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
      <div className="grid grid-cols-3 gap-4 mb-6">
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
          <p className="text-sm text-gray-500">Created</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date(workspace.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <WorkspaceDetailClient
        workspaceId={params.id}
        workspaceName={workspace.name}
        workspaceSlug={workspace.slug}
        forms={workspace.forms}
        appUrl={appUrl}
        showError={searchParams.error === 'form_limit_reached'}
      />
    </div>
  );
}