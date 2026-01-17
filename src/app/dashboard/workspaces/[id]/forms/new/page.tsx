import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { getWorkspace } from '@/actions/workspaces';
import { createForm } from '@/actions/forms';
import { prisma } from '@/lib/prisma';
import { canCreateForm, formatLimitDisplay } from '@/lib/plan-limits';

export default async function NewFormPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const workspace = await getWorkspace(params.id);

  if (!workspace) {
    notFound();
  }

  const plan = user.entitlement?.plan || 'TRIAL';

  // Count total forms across ALL user's workspaces
  const totalForms = await prisma.form.count({
    where: {
      workspace: {
        userId: user.id,
      },
    },
  });

  // Check if user can create more forms
  const { allowed, limit, remaining } = canCreateForm(totalForms, plan);

  if (!allowed) {
    redirect(`/dashboard/workspaces/${params.id}?error=form_limit_reached`);
  }

  async function handleCreateForm(formData: FormData) {
    'use server';
    formData.append('workspaceId', params.id);
    const result = await createForm(formData);
    if (result && !result.success) {
      redirect(`/dashboard/workspaces/${params.id}/forms/new?error=${encodeURIComponent(result.error || 'Unknown error')}`);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/dashboard/workspaces/${params.id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {workspace.name}
        </Link>
      </div>

      <div className="max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Form</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form action={handleCreateForm} className="space-y-6">
            {searchParams.error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {searchParams.error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Form Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Client Feedback, Project Review"
              />
              <p className="mt-1 text-sm text-gray-500">
                This is for your reference only. Clients won&apos;t see this name.
              </p>
            </div>

            {/* Hidden inputs to always enable both text and video */}
            <input type="hidden" name="allowText" value="on" />
            <input type="hidden" name="allowVideo" value="on" />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your form will accept both text and video testimonials. Customers can choose which format works best for them.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Create Form
              </button>
              <Link
                href={`/dashboard/workspaces/${params.id}`}
                className="text-gray-600 hover:text-gray-700 text-sm font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Using {formatLimitDisplay(totalForms, limit)} forms
          {remaining === 0 && limit < 999 && (
            <span className="ml-2">
              • <Link href="/dashboard/billing" className="text-blue-600 hover:text-blue-700">Upgrade for more</Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}