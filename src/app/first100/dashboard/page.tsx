'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  tagline: string | null;
  url: string | null;
  category: string | null;
  stage: string | null;
  slug: string | null;
  lookingForCount: number | null;
  offerDescription: string | null;
  status: string;
  plan: string | null;
  voteCount: number;
  createdAt: string;
}

interface Founder {
  id: string;
  email: string;
  name: string | null;
  twitterHandle: string | null;
  // Legacy product fields
  productName: string | null;
  productTagline: string | null;
  productCategory: string | null;
  productStage: string | null;
  productUrl: string | null;
  lookingForCount: number | null;
  offerDescription: string | null;
  status: string | null;
  voteCount: number;
  slug: string | null;
}

interface DashboardData {
  founder: Founder;
  products: Product[];
  stats: {
    totalEarlyAdopters: number;
  };
}

const VOTE_THRESHOLD = 5;

const stageLabels: Record<string, string> = {
  idea: 'Idea Stage',
  building: 'Building',
  alpha: 'Alpha',
  beta: 'Beta',
  launched: 'Launched',
};

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  voting: { bg: 'bg-violet-500/20', text: 'text-violet-400' },
  approved: { bg: 'bg-green-500/20', text: 'text-green-400' },
  active: { bg: 'bg-green-500/20', text: 'text-green-400' },
  paused: { bg: 'bg-gray-500/20', text: 'text-gray-400' },
};

export default function FounderDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/first100/auth/me');
        const result = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            router.push('/first100/login');
            return;
          }
          throw new Error(result.error || 'Failed to load dashboard');
        }

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch('/api/first100/auth/logout', { method: 'POST' });
      router.push('/first100/login');
    } catch {
      setLoggingOut(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00d084] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
          <p className="text-white/50 mb-6">{error}</p>
          <Link
            href="/first100/login"
            className="inline-flex items-center gap-2 bg-[#00d084] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  const { founder, products, stats } = data;

  // Combine legacy product with new products
  const allProducts: Array<{
    id: string;
    name: string;
    tagline: string | null;
    category: string | null;
    stage: string | null;
    slug: string | null;
    status: string;
    voteCount: number;
    isLegacy?: boolean;
  }> = [];

  // Add legacy product if exists
  if (founder.productName) {
    allProducts.push({
      id: 'legacy',
      name: founder.productName,
      tagline: founder.productTagline,
      category: founder.productCategory,
      stage: founder.productStage,
      slug: founder.slug,
      status: founder.status || 'pending',
      voteCount: founder.voteCount,
      isLegacy: true,
    });
  }

  // Add new products
  products.forEach((p) => {
    allProducts.push({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      category: p.category,
      stage: p.stage,
      slug: p.slug,
      status: p.status,
      voteCount: p.voteCount,
    });
  });

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00d084]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
              <svg width="32" height="32" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="dash-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d084"/>
                    <stop offset="100%" stopColor="#00b371"/>
                  </linearGradient>
                </defs>
                <rect x="14" y="4" width="100" height="100" rx="20" fill="#00d084" opacity="0.25"/>
                <rect x="10" y="8" width="100" height="100" rx="20" fill="#00d084" opacity="0.5"/>
                <rect x="6" y="12" width="100" height="100" rx="20" fill="url(#dash-icon-gradient)"/>
                <path d="M 36 64 L 48 76 L 76 44" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white">ProofLayer</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm hidden sm:block">{founder.email}</span>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              {loggingOut ? 'Logging out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome{founder.name ? `, ${founder.name}` : ' back'}!
          </h1>
          <p className="text-white/50">Manage your products and connect with early adopters</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#00d084]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{allProducts.length}</div>
                <div className="text-white/50 text-sm">Products</div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {allProducts.reduce((sum, p) => sum + p.voteCount, 0)}
                </div>
                <div className="text-white/50 text-sm">Total Votes</div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stats.totalEarlyAdopters}</div>
                <div className="text-white/50 text-sm">Early Adopters</div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Your Products</h2>
            <Link
              href="/first100/dashboard/products/new"
              className="inline-flex items-center gap-2 bg-[#00d084] text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </Link>
          </div>

          {allProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">No products yet</h3>
              <p className="text-white/50 text-sm max-w-md mx-auto mb-6">
                Add your first product to start connecting with early adopters
              </p>
              <Link
                href="/first100/dashboard/products/new"
                className="inline-flex items-center gap-2 bg-[#00d084] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {allProducts.map((product) => {
                const status = statusColors[product.status] || statusColors.pending;
                const voteProgress = Math.min((product.voteCount / VOTE_THRESHOLD) * 100, 100);
                const isApproved = product.status === 'approved' || product.status === 'active';

                return (
                  <div
                    key={product.id}
                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Product Icon */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d084] to-emerald-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {product.name.charAt(0)}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-semibold truncate">{product.name}</h3>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                            {product.status === 'voting'
                              ? `${product.voteCount}/${VOTE_THRESHOLD} votes`
                              : product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                          </span>
                        </div>
                        {product.tagline && (
                          <p className="text-white/50 text-sm truncate">{product.tagline}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
                          {product.category && <span>{product.category}</span>}
                          {product.stage && (
                            <>
                              <span>•</span>
                              <span>{stageLabels[product.stage] || product.stage}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Vote Progress (if voting) */}
                      {product.status === 'voting' && (
                        <div className="w-full sm:w-32">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full transition-all"
                              style={{ width: `${voteProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {product.slug && (
                          <Link
                            href={`/p/${product.slug}`}
                            target="_blank"
                            className="p-2 text-white/40 hover:text-white transition-colors"
                            title="View public page"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                        )}
                        <Link
                          href={product.isLegacy
                            ? `/first100/portal?token=${founder.id}`
                            : `/first100/dashboard/products/${product.id}`
                          }
                          className="p-2 text-white/40 hover:text-white transition-colors"
                          title="Edit product"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <Link
            href="/vote"
            target="_blank"
            className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6 hover:bg-violet-500/20 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">View Voting Page</h3>
                <p className="text-white/50 text-sm">See how others vote on products</p>
              </div>
            </div>
          </Link>

          <Link
            href="/pricing"
            className="bg-[#00d084]/10 border border-[#00d084]/20 rounded-2xl p-6 hover:bg-[#00d084]/20 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00d084]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Upgrade Your Plan</h3>
                <p className="text-white/50 text-sm">Get instant approval & premium features</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm">
            Questions? Email{' '}
            <a href="mailto:curtis@prooflayer.app" className="text-[#00d084] hover:underline">
              curtis@prooflayer.app
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
