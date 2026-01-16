import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ensureUserExists } from '@/actions/user';
import { getWorkspace } from '@/actions/workspaces';

export default async function WorkspaceDetailPage({
  params,
}: {
  params: { id: string };
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

      {/* Forms Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Forms</h2>
          <Link
            href={`/dashboard/workspaces/${params.id}/forms/new`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Create Form
          </Link>
        </div>

        {workspace.forms.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-4">No forms yet. Create your first form to start collecting testimonials.</p>
            <Link
              href={`/dashboard/workspaces/${params.id}/forms/new`}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Create your first form →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {workspace.forms.map((form) => {
              const pendingCount = form.submissions.filter(s => s.status === 'PENDING').length;
              const approvedCount = form.submissions.filter(s => s.status === 'APPROVED').length;
              
              return (
                <div
                  key={form.id}
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
                    href={`/dashboard/workspaces/${params.id}/forms/${form.id}`}
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
    </div>
  );
}