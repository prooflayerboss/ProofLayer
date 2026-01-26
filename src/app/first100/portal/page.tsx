'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Founder {
  name: string;
  email: string;
  productName: string;
  productTagline: string;
  productCategory: string;
  productStage: string;
  lookingForCount: number;
  offerDescription: string;
  status: string;
  voteCount: number;
  slug: string;
  createdAt: string;
  hasAccount: boolean;
  accessToken: string;
}

interface EarlyAdopter {
  id: string;
  email: string;
  interests: string[];
  createdAt: string;
}

interface PortalData {
  founder: Founder;
  earlyAdopters: EarlyAdopter[];
  stats: {
    matchingCount: number;
    totalCount: number;
  };
}

const VOTE_THRESHOLD = 5;

function PortalContent() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token') ?? null;
  const upgraded = searchParams?.get('upgraded') === 'true';

  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [upgrading, setUpgrading] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        setError('No access token provided');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/first100/portal?token=${token}`);
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || 'Failed to load portal');
        }

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  async function handleUpgrade(plan: string) {
    if (!token) return;
    setUpgrading(plan);

    try {
      const res = await fetch('/api/first100/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, plan }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to start checkout');
      }

      // Redirect to Stripe
      window.location.href = result.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setUpgrading(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00d084] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading your portal...</p>
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
          <h1 className="text-xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-white/50 mb-6">{error || 'Invalid or expired portal link'}</p>
          <Link
            href="/founders"
            className="inline-flex items-center gap-2 bg-[#00d084] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Go to Founders Page
          </Link>
        </div>
      </div>
    );
  }

  const { founder, earlyAdopters, stats } = data;
  const stageLabels: Record<string, string> = {
    idea: 'Idea Stage',
    building: 'Building',
    alpha: 'Alpha',
    beta: 'Beta',
    launched: 'Launched',
  };

  const voteProgress = Math.min((founder.voteCount / VOTE_THRESHOLD) * 100, 100);
  const isVoting = founder.status === 'voting';
  const isApproved = founder.status === 'approved' || founder.status === 'active';

  return (
    <main className="min-h-screen bg-[#0a0a0b] py-8 px-4">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00d084]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Upgrade Success Banner */}
        {upgraded && (
          <div className="bg-[#00d084]/10 border border-[#00d084]/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00d084]/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-[#00d084] font-semibold">Upgrade successful!</p>
              <p className="text-white/60 text-sm">Your listing has been upgraded and auto-approved.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
              <svg width="32" height="32" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="portal-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d084"/>
                    <stop offset="100%" stopColor="#00b371"/>
                  </linearGradient>
                </defs>
                <rect x="14" y="4" width="100" height="100" rx="20" fill="#00d084" opacity="0.25"/>
                <rect x="10" y="8" width="100" height="100" rx="20" fill="#00d084" opacity="0.5"/>
                <rect x="6" y="12" width="100" height="100" rx="20" fill="url(#portal-icon-gradient)"/>
                <path d="M 36 64 L 48 76 L 76 44" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white">ProofLayer</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              isApproved
                ? 'bg-green-500/20 text-green-400'
                : isVoting
                ? 'bg-violet-500/20 text-violet-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              {isApproved ? 'Approved' :
               isVoting ? `Voting (${founder.voteCount}/${VOTE_THRESHOLD})` :
               founder.status === 'pending' ? 'Pending Review' : founder.status}
            </span>
          </div>
        </div>

        {/* Set Up Account Banner */}
        {!founder.hasAccount && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Set up your account</p>
                  <p className="text-white/60 text-sm">Create a password to access your dashboard anytime</p>
                </div>
              </div>
              <Link
                href={`/first100/login?setup=${founder.accessToken}`}
                className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-600 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Set Up Account
              </Link>
            </div>
          </div>
        )}

        {/* Voting Progress Card (if in voting status) */}
        {isVoting && (
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Community Voting</h3>
                <p className="text-white/50 text-sm">Get {VOTE_THRESHOLD} votes to be approved</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">{founder.voteCount} votes</span>
                <span className="text-violet-400">{VOTE_THRESHOLD - founder.voteCount} more needed</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full transition-all duration-500"
                  style={{ width: `${voteProgress}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {founder.slug && (
                <Link
                  href={`/p/${founder.slug}`}
                  target="_blank"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/20 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Public Page
                </Link>
              )}
              <Link
                href="/vote"
                target="_blank"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-violet-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-violet-600 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                View Voting Page
              </Link>
            </div>
          </div>
        )}

        {/* Product Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00d084] to-emerald-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {founder.productName?.charAt(0) || 'P'}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">{founder.productName || 'Your Product'}</h1>
              <p className="text-white/50">{founder.productTagline}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-white/40 text-sm mb-1">Category</div>
              <div className="text-white font-medium">{founder.productCategory || 'Not set'}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-white/40 text-sm mb-1">Stage</div>
              <div className="text-white font-medium">{stageLabels[founder.productStage] || founder.productStage || 'Not set'}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-white/40 text-sm mb-1">Looking For</div>
              <div className="text-white font-medium">{founder.lookingForCount || 25} early adopters</div>
            </div>
          </div>

          {founder.offerDescription && (
            <div className="mt-4 bg-[#00d084]/10 border border-[#00d084]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <span className="text-[#00d084] font-semibold text-sm">Your Offer</span>
              </div>
              <p className="text-white/80">{founder.offerDescription}</p>
            </div>
          )}
        </div>

        {/* Upgrade Section (show for voting/pending status) */}
        {!isApproved && (
          <div className="bg-gradient-to-br from-[#00d084]/5 to-emerald-500/5 border border-[#00d084]/20 rounded-3xl p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Skip the Wait - Get Approved Instantly</h2>
              <p className="text-white/50 text-sm">Upgrade your listing for instant approval + premium features</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {/* Starter */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-bold mb-1">Starter</h3>
                <div className="text-2xl font-bold text-white mb-2">$49</div>
                <ul className="text-white/60 text-sm space-y-1.5 mb-4">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Instant approval
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Featured listing (1 week)
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Weekly digest feature
                  </li>
                </ul>
                <button
                  onClick={() => handleUpgrade('STARTER')}
                  disabled={upgrading === 'STARTER'}
                  className="w-full bg-white/10 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all disabled:opacity-50"
                >
                  {upgrading === 'STARTER' ? 'Loading...' : 'Get Starter'}
                </button>
              </div>

              {/* Growth (Popular) */}
              <div className="bg-[#00d084] rounded-2xl p-5 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0a0b] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <h3 className="text-white font-bold mb-1">Growth</h3>
                <div className="text-2xl font-bold text-white mb-2">$149</div>
                <ul className="text-white/80 text-sm space-y-1.5 mb-4">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Starter
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    &quot;Hot Pick&quot; badge
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority matching
                  </li>
                </ul>
                <button
                  onClick={() => handleUpgrade('GROWTH')}
                  disabled={upgrading === 'GROWTH'}
                  className="w-full bg-[#0a0a0b] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-black transition-all disabled:opacity-50"
                >
                  {upgrading === 'GROWTH' ? 'Loading...' : 'Get Growth'}
                </button>
              </div>

              {/* Launch */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-bold mb-1">Launch</h3>
                <div className="text-2xl font-bold text-white mb-2">$299</div>
                <ul className="text-white/60 text-sm space-y-1.5 mb-4">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Growth
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Social post to audience
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Founder spotlight email
                  </li>
                </ul>
                <button
                  onClick={() => handleUpgrade('LAUNCH')}
                  disabled={upgrading === 'LAUNCH'}
                  className="w-full bg-white/10 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all disabled:opacity-50"
                >
                  {upgrading === 'LAUNCH' ? 'Loading...' : 'Get Launch'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#00d084]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stats.matchingCount}</div>
                <div className="text-white/50 text-sm">Matching Early Adopters</div>
              </div>
            </div>
            <p className="text-white/40 text-xs">Interested in {founder.productCategory}</p>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stats.totalCount}</div>
                <div className="text-white/50 text-sm">Total Early Adopters</div>
              </div>
            </div>
            <p className="text-white/40 text-xs">In the ProofLayer network</p>
          </div>
        </div>

        {/* Early Adopters List */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Early Adopters in Your Category</h2>
            {!isApproved && (
              <span className="text-violet-400 text-sm">Visible after approval</span>
            )}
          </div>

          {!isApproved ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">
                {isVoting ? 'Waiting for community votes' : 'Your application is being reviewed'}
              </h3>
              <p className="text-white/50 text-sm max-w-md mx-auto">
                {isVoting
                  ? `Once you get ${VOTE_THRESHOLD} votes from early adopters, you'll be approved and can see matching users here.`
                  : `Once approved, you'll see early adopters who are interested in ${founder.productCategory} products right here.`
                }
              </p>
            </div>
          ) : earlyAdopters.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">No matching early adopters yet</h3>
              <p className="text-white/50 text-sm max-w-md mx-auto">
                We&apos;re actively growing our early adopter network. Check back soon or share your portal link to attract testers.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {earlyAdopters.map((adopter) => (
                <div
                  key={adopter.id}
                  className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-semibold">
                      {adopter.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-medium">{adopter.email}</div>
                      <div className="text-white/40 text-sm">
                        Interested in: {adopter.interests.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="text-white/30 text-sm">
                    {new Date(adopter.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm">
            Questions? Reply to your welcome email or reach out to{' '}
            <a href="mailto:curtis@prooflayer.app" className="text-[#00d084] hover:underline">
              curtis@prooflayer.app
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function FounderPortal() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00d084] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading your portal...</p>
        </div>
      </div>
    }>
      <PortalContent />
    </Suspense>
  );
}
