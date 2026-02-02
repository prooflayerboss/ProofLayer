import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ensureUserExists } from '@/actions/user';
import { getWorkspaces } from '@/actions/workspaces';
import { PLAN_LIMITS } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import DashboardStatsPanel from '@/components/DashboardStatsPanel';
import FounderDashboard from '@/components/dashboard/FounderDashboard';
import AdopterDashboard from '@/components/dashboard/AdopterDashboard';

export default async function DashboardPage() {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  // Get full user profile
  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      onboardingCompleted: true,
      userType: true,
      name: true,
      businessName: true,
      interests: true,
    },
  });

  // Check if user needs onboarding
  if (!userProfile?.onboardingCompleted || !userProfile?.userType) {
    redirect('/onboarding');
  }

  const userName = userProfile?.name || user.email?.split('@')[0] || 'there';
  const userType = userProfile.userType;

  // Common data for both user types
  const workspaces = await getWorkspaces();
  const plan = user.entitlement?.plan || 'FREE';
  const limits = PLAN_LIMITS[plan];

  // Helper function to display plan name
  const getPlanDisplayName = (planType: string) => {
    const planNames: Record<string, string> = {
      TRIAL: 'Starter',
      FREE: 'Free',
      STARTER: 'Starter',
      GROWTH: 'Growth',
      LAUNCH: 'Launch',
      CONCIERGE: 'Concierge',
      SOLO: 'Solo',
      PRO: 'Professional',
      AGENCY: 'Agency',
      MONTHLY: 'Monthly',
      LIFETIME: 'Lifetime',
    };
    return planNames[planType] || planType;
  };

  // Get total widget views across all workspaces
  const widgetViewsResult = await prisma.workspace.aggregate({
    where: { userId: user.id },
    _sum: { widgetViews: true },
  });
  const totalWidgetViews = widgetViewsResult._sum.widgetViews || 0;

  const submissionsUsed = user.entitlement?.submissionsUsed || 0;

  // =====================
  // FOUNDER-SPECIFIC DATA
  // =====================
  let founderData = null;
  if (userType === 'FOUNDER') {
    // Get founder's products
    const products = await prisma.product.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            votes: true,
            earlyAdopterSignups: true,
          },
        },
      },
    });

    // Get total votes across all products
    const totalVotes = products.reduce((sum, p) => sum + p._count.votes, 0);

    // Get total signups across all products
    const totalSignups = products.reduce((sum, p) => sum + p._count.earlyAdopterSignups, 0);

    // Get recent signups
    const recentSignups = await prisma.earlyAdopterSignup.findMany({
      where: {
        product: {
          userId: user.id,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        product: {
          select: { name: true },
        },
      },
    });

    // Get approved testimonials count
    const approvedTestimonials = await prisma.submission.count({
      where: {
        status: 'APPROVED',
        form: {
          workspace: {
            userId: user.id,
          },
        },
      },
    });

    founderData = {
      products,
      totalVotes,
      totalSignups,
      recentSignups,
      approvedTestimonials,
      workspaces,
    };
  }

  // ==========================
  // EARLY ADOPTER-SPECIFIC DATA
  // ==========================
  let adopterData = null;
  if (userType === 'EARLY_ADOPTER') {
    // Get products user can discover (active products matching their interests)
    const userInterests = userProfile.interests || [];
    const productsToDiscover = await prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        ...(userInterests.length > 0 && {
          category: {
            in: userInterests,
          },
        }),
      },
      orderBy: { voteCount: 'desc' },
      take: 10,
      include: {
        user: {
          select: { name: true, businessName: true },
        },
      },
    });

    // Get products in voting phase
    const votingProducts = await prisma.product.findMany({
      where: {
        status: 'VOTING',
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        user: {
          select: { name: true, businessName: true },
        },
      },
    });

    // Get user's votes
    const userVotes = await prisma.vote.findMany({
      where: { userId: user.id },
      include: {
        product: {
          select: { id: true, name: true, status: true },
        },
      },
    });

    // Get user's claimed deals
    const claimedDeals = await prisma.earlyAdopterSignup.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            tagline: true,
            offerDescription: true,
            user: {
              select: { businessName: true },
            },
          },
        },
      },
    });

    adopterData = {
      productsToDiscover,
      votingProducts,
      userVotes,
      claimedDeals,
    };
  }

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Welcome Banner */}
        <div className={`relative rounded-3xl p-8 mb-8 overflow-hidden ${
          userType === 'FOUNDER'
            ? 'bg-gradient-to-r from-[#00d084] via-emerald-500 to-teal-500'
            : 'bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500'
        }`}>
          {/* Decorative Elements */}
          <div className="absolute top-4 right-20 w-20 h-20 opacity-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
              <path d="M50 0L61 39L100 50L61 61L50 100L39 61L0 50L39 39L50 0Z" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative">
            <span className="inline-block text-white/80 text-sm font-medium mb-2">
              {userType === 'FOUNDER' ? 'FOUNDER DASHBOARD' : 'EARLY ADOPTER DASHBOARD'}
            </span>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-white/80 text-sm max-w-md">
              {userType === 'FOUNDER'
                ? 'Manage your products and connect with early adopters.'
                : 'Discover new products and claim exclusive deals.'}
            </p>

            <div className="mt-6">
              {userType === 'FOUNDER' ? (
                <Link
                  href="/dashboard/products/new"
                  className="inline-flex items-center gap-2 bg-white text-[#00d084] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Add New Product
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Link>
              ) : (
                <Link
                  href="/dashboard/discover"
                  className="inline-flex items-center gap-2 bg-white text-violet-600 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Discover Products
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* User Type Specific Content */}
        {userType === 'FOUNDER' && founderData && (
          <FounderDashboard data={founderData} />
        )}

        {userType === 'EARLY_ADOPTER' && adopterData && (
          <AdopterDashboard data={adopterData} />
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
