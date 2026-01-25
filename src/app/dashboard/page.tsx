import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ensureUserExists } from '@/actions/user';
import { getWorkspaces } from '@/actions/workspaces';
import { PLAN_LIMITS } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import OnboardingTourWrapper from '@/components/onboarding/OnboardingTourWrapper';
import DashboardStatsPanel from '@/components/DashboardStatsPanel';

export default async function DashboardPage() {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const workspaces = await getWorkspaces();
  const plan = user.entitlement?.plan || 'SOLO';
  const limits = PLAN_LIMITS[plan];

  // Helper function to display plan name
  const getPlanDisplayName = (planType: string) => {
    const planNames: Record<string, string> = {
      TRIAL: 'Starter',
      FREE: 'Free',
      SOLO: 'Solo',
      PRO: 'Professional',
      AGENCY: 'Agency',
      MONTHLY: 'Monthly',
      LIFETIME: 'Lifetime',
    };
    return planNames[planType] || planType;
  };

  // Get full user profile to check onboarding status
  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { onboardingCompleted: true, name: true },
  });

  const isFirstTime = !userProfile?.onboardingCompleted;
  const userName = userProfile?.name || user.email?.split('@')[0] || 'there';

  // Check if user has any submissions (for "waiting for testimonials" state)
  const submissionsUsed = user.entitlement?.submissionsUsed || 0;
  const hasCompletedOnboarding = userProfile?.onboardingCompleted === true;
  const isWaitingForTestimonials = hasCompletedOnboarding && submissionsUsed === 0;

  // Get checklist data
  const hasWorkspace = workspaces.length > 0;
  const totalForms = workspaces.reduce((acc, ws) => acc + ws._count.forms, 0);
  const hasForm = totalForms > 0;

  // Check for approved submissions
  const approvedSubmissionCount = await prisma.submission.count({
    where: {
      status: 'APPROVED',
      form: {
        workspace: {
          userId: user.id,
        },
      },
    },
  });
  const hasApprovedSubmission = approvedSubmissionCount > 0;

  // Get total widget views across all workspaces
  const widgetViewsResult = await prisma.workspace.aggregate({
    where: { userId: user.id },
    _sum: { widgetViews: true },
  });
  const totalWidgetViews = widgetViewsResult._sum.widgetViews || 0;

  // Get first workspace and form IDs for action links
  const firstWorkspaceId = workspaces[0]?.id;
  const firstFormId = hasForm
    ? await prisma.form.findFirst({
        where: {
          workspace: {
            userId: user.id,
          },
        },
        select: { id: true },
      }).then(f => f?.id)
    : undefined;

  // Get recent submissions for display
  const recentSubmissions = await prisma.submission.findMany({
    where: {
      form: {
        workspace: {
          userId: user.id,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      form: {
        select: { name: true },
      },
    },
  });

  return (
    <div className="flex gap-8">
      {isFirstTime && <OnboardingTourWrapper />}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Welcome Banner */}
        <div data-tour="welcome-banner" className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-violet-500 rounded-3xl p-8 mb-8 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-20 w-20 h-20 opacity-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
              <path d="M50 0L61 39L100 50L61 61L50 100L39 61L0 50L39 39L50 0Z" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-40 w-12 h-12 opacity-10">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
              <path d="M50 0L61 39L100 50L61 61L50 100L39 61L0 50L39 39L50 0Z" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative">
            <span className="inline-block text-blue-100 text-sm font-medium mb-2">DASHBOARD</span>
            <h1 className="hero-headline text-3xl font-bold text-white mb-2">
              {isFirstTime ? `Welcome, ${userName}!` : `Welcome back, ${userName}!`}
            </h1>
            <p className="text-blue-100 text-sm max-w-md">
              {isFirstTime
                ? "Let's get started collecting testimonials for your business."
                : "Here's what's happening with your testimonials today."}
            </p>

            <div className="mt-6">
              <Link
                href="/dashboard/workspaces/new"
                data-tour="create-workspace-btn"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors shadow-lg shadow-blue-700/30"
              >
                Create Workspace
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Pills */}
        <div data-tour="stats-overview" className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {[
            { icon: '📊', label: 'Workspaces', value: `${user.entitlement?.workspacesUsed || 0}/${limits.maxWorkspaces}`, href: '/dashboard/workspaces' },
            { icon: '📝', label: 'Forms', value: totalForms.toString(), href: '/dashboard/workspaces' },
            { icon: '💬', label: 'Submissions', value: `${submissionsUsed}/${limits.maxSubmissions}`, href: '/dashboard/workspaces' },
            { icon: '👁️', label: 'Widget Views', value: totalWidgetViews.toLocaleString(), href: '/dashboard/widgets' },
          ].map((stat, i) => (
            <Link
              key={i}
              href={stat.href}
              className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all min-w-fit"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xl">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Waiting for Testimonials Banner */}
        {isWaitingForTestimonials && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-900 mb-1">Waiting for your first testimonial...</h3>
                <p className="text-amber-800 text-sm mb-4">
                  Great job setting up! Now share your form link with clients to start collecting testimonials.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/dashboard/workspaces"
                    className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Get Your Form Link
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Your Workspaces */}
        <div data-tour="workspaces-section" className="mb-8">
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📁</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No workspaces yet</h3>
              <p className="text-gray-500 text-sm mb-6">Create your first workspace to start collecting testimonials</p>
              <Link
                href="/dashboard/workspaces/new"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Workspace
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workspaces.slice(0, 6).map((workspace) => (
                <Link
                  key={workspace.id}
                  href={`/dashboard/workspaces/${workspace.id}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                      {workspace.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {workspace.name}
                      </h3>
                      <p className="text-sm text-gray-500">{workspace._count.forms} forms</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Submissions */}
        {recentSubmissions.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Name</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Form</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.map((submission) => (
                    <tr key={submission.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                            {submission.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <span className="font-medium text-gray-900 text-sm">{submission.name || 'Anonymous'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{submission.form.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'APPROVED'
                            ? 'bg-green-50 text-green-700'
                            : submission.status === 'REJECTED'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {submission.status === 'APPROVED' ? '✓ Approved' : submission.status === 'REJECTED' ? '✗ Rejected' : '● Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">
                          {new Date(submission.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quick Actions for empty state */}
        {recentSubmissions.length === 0 && workspaces.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/dashboard/workspaces/new"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">New Workspace</p>
                  <p className="text-xs text-gray-500">Create a new project</p>
                </div>
              </Link>
              <Link
                href="/dashboard/widgets"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Get Embed Code</p>
                  <p className="text-xs text-gray-500">Add widget to your site</p>
                </div>
              </Link>
              <Link
                href="/dashboard/billing"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Upgrade Plan</p>
                  <p className="text-xs text-gray-500">Get more features</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Right Stats Panel */}
      <DashboardStatsPanel
        userName={userName}
        plan={getPlanDisplayName(plan)}
        submissionsUsed={submissionsUsed}
        maxSubmissions={limits.maxSubmissions}
        workspacesUsed={user.entitlement?.workspacesUsed || 0}
        maxWorkspaces={limits.maxWorkspaces}
        totalWidgetViews={totalWidgetViews}
      />
    </div>
  );
}
