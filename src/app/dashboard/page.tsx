import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ensureUserExists } from '@/actions/user';
import { getWorkspaces } from '@/actions/workspaces';
import { PLAN_LIMITS } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import OnboardingModal from './onboarding-modal';

export default async function DashboardPage() {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const workspaces = await getWorkspaces();
  const plan = user.entitlement?.plan || 'TRIAL';
  const limits = PLAN_LIMITS[plan];

  // Get full user profile to check onboarding status
  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { onboardingCompleted: true, name: true },
  });

  const isFirstTime = !userProfile?.onboardingCompleted;
  const userName = userProfile?.name || user.email?.split('@')[0] || 'there';

  return (
    <div>
      {isFirstTime && <OnboardingModal userId={user.id} />}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isFirstTime ? `Welcome, ${userName}!` : `Welcome back, ${userName}!`}
        </h1>
        <p className="text-gray-600 mt-1">
          {isFirstTime ? "Let's get started with Prooflayer." : "Here's an overview of your account."}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Plan</p>
          <p className="text-2xl font-bold text-gray-900">
            {plan === 'TRIAL' ? 'Trial' : 'Lifetime'}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Workspaces</p>
          <p className="text-2xl font-bold text-gray-900">
            {user.entitlement?.workspacesUsed || 0}
            <span className="text-sm font-normal text-gray-500"> / {limits.maxWorkspaces}</span>
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Submissions</p>
          <p className="text-2xl font-bold text-gray-900">
            {user.entitlement?.submissionsUsed || 0}
            <span className="text-sm font-normal text-gray-500"> / {limits.maxSubmissions}</span>
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Forms</p>
          <p className="text-2xl font-bold text-gray-900">
            {workspaces.reduce((acc, ws) => acc + ws._count.forms, 0)}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/workspaces/new"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">Create new workspace</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/dashboard/widgets"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">Get embed code</span>
              <span className="text-gray-400">→</span>
            </Link>
            {plan === 'TRIAL' && (
              <Link
                href="/dashboard/billing"
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-sm font-medium text-blue-700">Upgrade to Lifetime</span>
                <span className="text-blue-400">→</span>
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h2>
          <ol className="space-y-3">
            <li className="flex items-start">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3 mt-0.5">1</span>
              <span className="text-sm text-gray-600">Create a workspace for your client or project</span>
            </li>
            <li className="flex items-start">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3 mt-0.5">2</span>
              <span className="text-sm text-gray-600">Create a form to collect testimonials</span>
            </li>
            <li className="flex items-start">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3 mt-0.5">3</span>
              <span className="text-sm text-gray-600">Share the form link with your clients</span>
            </li>
            <li className="flex items-start">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3 mt-0.5">4</span>
              <span className="text-sm text-gray-600">Approve submissions and embed the widget</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Recent Workspaces */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Workspaces</h2>
          <Link
            href="/dashboard/workspaces"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>
        {workspaces.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No workspaces yet</p>
            <Link
              href="/dashboard/workspaces/new"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Create your first workspace
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {workspaces.slice(0, 5).map((workspace) => (
              <Link
                key={workspace.id}
                href={`/dashboard/workspaces/${workspace.id}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{workspace.name}</p>
                  <p className="text-xs text-gray-500">{workspace._count.forms} forms</p>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}