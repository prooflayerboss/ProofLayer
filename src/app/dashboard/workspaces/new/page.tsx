import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { createWorkspace } from '@/actions/workspaces';
import { PLAN_LIMITS } from '@/lib/constants';

export default async function NewWorkspacePage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const plan = user.entitlement?.plan || 'TRIAL';
  const limits = PLAN_LIMITS[plan];
  const workspacesUsed = user.entitlement?.workspacesUsed || 0;

  // Check if user can create more workspaces
  if (workspacesUsed >= limits.maxWorkspaces) {
    redirect('/dashboard/workspaces?error=limit');
  }

  async function handleCreateWorkspace(formData: FormData) {
    'use server';
    const result = await createWorkspace(formData);
    if (result && !result.success) {
      redirect(`/dashboard/workspaces/new?error=${encodeURIComponent(result.error || 'Unknown error')}`);
    }
  }

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

      <div className="max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Workspace</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form action={handleCreateWorkspace} className="space-y-6">
            {searchParams.error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {searchParams.error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Workspace Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={50}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Acme Corp, My Agency"
              />
              <p className="mt-1 text-sm text-gray-500">
                A workspace represents a client or project you collect testimonials for.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Create Workspace
              </button>
              <Link
                href="/dashboard/workspaces"
                className="text-gray-600 hover:text-gray-700 text-sm font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Using {workspacesUsed} of {limits.maxWorkspaces} workspaces
          {plan === 'TRIAL' && (
            <span className="ml-2">
              • <Link href="/dashboard/billing" className="text-blue-600 hover:text-blue-700">Upgrade for more</Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}