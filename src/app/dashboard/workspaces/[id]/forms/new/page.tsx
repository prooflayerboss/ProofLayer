import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { getWorkspace } from '@/actions/workspaces';
import { createForm } from '@/actions/forms';
import { prisma } from '@/lib/prisma';
import { canCreateForm, formatLimitDisplay } from '@/lib/plan-limits';
import FormCreator from './form-creator';

export default async function NewFormPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: { error?: string };
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
    redirect(`/dashboard/workspaces/${id}?error=form_limit_reached`);
  }

  // Check if user's plan allows custom colors
  const canUseCustomColors = plan !== 'TRIAL' && plan !== 'SOLO';

  async function handleCreateForm(formData: FormData) {
    'use server';
    formData.append('workspaceId', id);
    const result = await createForm(formData);
    if (result && !result.success) {
      redirect(`/dashboard/workspaces/${id}/forms/new?error=${encodeURIComponent(result.error || 'Unknown error')}`);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/dashboard/workspaces/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {workspace.name}
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Form</h1>
        <p className="text-sm text-gray-500 mt-1">
          Using {formatLimitDisplay(totalForms, limit)} forms
          {remaining === 0 && limit < 999 && (
            <span className="ml-2">
              • <Link href="/dashboard/billing" className="text-blue-600 hover:text-blue-700">Upgrade for more</Link>
            </span>
          )}
        </p>
      </div>

      <FormCreator
        workspaceId={id}
        workspaceName={workspace.name}
        workspaceLogoUrl={workspace.logoUrl}
        workspaceLogoShape={(workspace as any).logoShape}
        onSubmit={handleCreateForm}
        error={searchParams.error}
        canUseCustomColors={canUseCustomColors}
      />
    </div>
  );
}