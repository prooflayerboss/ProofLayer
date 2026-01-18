import { redirect } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { canCreateWorkspace } from '@/lib/plan-limits';
import WorkspaceCreator from './workspace-creator';

export default async function NewWorkspacePage() {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const plan = user.entitlement?.plan || 'TRIAL';
  const workspacesUsed = user.entitlement?.workspacesUsed || 0;

  // Check if user can create more workspaces
  const { allowed } = canCreateWorkspace(workspacesUsed, plan);

  if (!allowed) {
    redirect('/dashboard/workspaces?error=limit_reached');
  }

  // PRO and AGENCY plans can use custom colors
  const canUseCustomColors = plan === 'PRO' || plan === 'AGENCY';

  return (
    <WorkspaceCreator
      canUseCustomColors={canUseCustomColors}
    />
  );
}
