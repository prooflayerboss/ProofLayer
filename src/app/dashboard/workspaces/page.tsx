import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { getWorkspaces } from '@/actions/workspaces';
import { PLAN_LIMITS } from '@/lib/constants';

export default async function WorkspacesPage() {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const workspaces = await getWorkspaces();
  const plan = user.entitlement?.plan || 'TRIAL';
  const limits = PLAN_LIMITS[plan];
  const workspacesUsed = user.entitlement?.workspacesUsed || 0;
  const canCreateMore = workspacesUsed < limits.maxWorkspaces;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Workspaces</h1>
        {canCreateMore ? (
          <Link
            href="/dashboard/workspaces/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + New Workspace
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Limit reached ({workspacesUsed}/{limits.maxWorkspaces})
            </span>
            {plan === 'TRIAL' && (
              <Link 
                href="/dashboard/billing" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Upgrade
              </Link>
            )}
          </div>
        )}
      </div>

      {workspaces.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No workspaces yet</h2>
          <p className="text-gray-600 mb-6">Create your first workspace to start collecting testimonials.</p>
          <Link
            href="/dashboard/workspaces/new"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Create Workspace
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workspaces.map((workspace) => (
                <tr key={workspace.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{workspace.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-500">{workspace._count.forms} forms</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-500">
                      {new Date(workspace.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link
                      href={`/dashboard/workspaces/${workspace.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}