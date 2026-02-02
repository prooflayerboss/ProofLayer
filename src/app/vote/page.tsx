'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation';

interface Product {
  id: string;
  productName: string;
  productTagline: string;
  productUrl: string | null;
  productCategory: string | null;
  productStage: string | null;
  lookingForCount: number | null;
  offerDescription: string | null;
  name: string | null;
  twitterHandle: string | null;
  slug: string | null;
  voteCount: number;
  createdAt: string;
}

const VOTE_THRESHOLD = 5;

const STAGE_COLORS: Record<string, string> = {
  idea: 'bg-slate-500/20 text-slate-300',
  building: 'bg-amber-500/20 text-amber-300',
  alpha: 'bg-orange-500/20 text-orange-300',
  beta: 'bg-blue-500/20 text-blue-300',
  launched: 'bg-green-500/20 text-green-300',
};

export default function VotePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [voterEmail, setVoterEmail] = useState('');
  const [votedProducts, setVotedProducts] = useState<Set<string>>(new Set());
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [votingProductId, setVotingProductId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
    // Check if user has email stored
    const storedEmail = localStorage.getItem('prooflayer_voter_email');
    if (storedEmail) {
      setVoterEmail(storedEmail);
      verifyVoter(storedEmail);
    }
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/first100/products/voting');
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }

  async function verifyVoter(email: string) {
    setVerifying(true);
    setError('');

    try {
      // Check if email is registered as early adopter
      const res = await fetch(`/api/first100/vote?productId=check&voterEmail=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (data.isEarlyAdopter) {
        setIsVerified(true);
        localStorage.setItem('prooflayer_voter_email', email);
        // Check votes for all products
        await checkVotesForProducts(email);
      } else {
        setError('This email is not registered as an early adopter. Sign up first!');
        setIsVerified(false);
      }
    } catch (err) {
      setError('Failed to verify email');
    } finally {
      setVerifying(false);
    }
  }

  async function checkVotesForProducts(email: string) {
    const voted = new Set<string>();
    for (const product of products) {
      try {
        const res = await fetch(`/api/first100/vote?productId=${product.id}&voterEmail=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (data.hasVoted) {
          voted.add(product.id);
        }
      } catch (err) {
        // Ignore errors for individual checks
      }
    }
    setVotedProducts(voted);
  }

  async function handleVote(productId: string) {
    if (!isVerified || !voterEmail) {
      setError('Please verify your email first');
      return;
    }

    setVotingProductId(productId);
    setError('');

    try {
      const res = await fetch('/api/first100/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, voterEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.needsSignup) {
          setError('You need to sign up as an early adopter first');
          setIsVerified(false);
        } else {
          setError(data.error || 'Failed to vote');
        }
        return;
      }

      // Update local state
      setVotedProducts(prev => new Set([...Array.from(prev), productId]));
      setProducts(prev => prev.map(p =>
        p.id === productId ? { ...p, voteCount: data.voteCount } : p
      ));

      // If product was approved, show a message
      if (data.approved) {
        // Could show a celebration animation here
      }
    } catch (err) {
      setError('Failed to submit vote');
    } finally {
      setVotingProductId(null);
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (voterEmail) {
      verifyVoter(voterEmail);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b]">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <Navigation />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-violet-400 text-sm font-medium">Community Voting</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Vote for products you&apos;d
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                love to try
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Products need {VOTE_THRESHOLD} votes from early adopters to get approved. Your vote helps founders launch and gets you exclusive early access.
            </p>
          </div>

          {/* Voter verification */}
          {!isVerified && (
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-white mb-2 text-center">Verify to vote</h3>
              <p className="text-white/50 text-sm mb-4 text-center">
                Enter your early adopter email to start voting
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={voterEmail}
                  onChange={(e) => setVoterEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
                <button
                  type="submit"
                  disabled={verifying}
                  className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {verifying ? 'Verifying...' : 'Verify Email'}
                </button>
              </form>
              {error && (
                <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
              )}
              <p className="mt-4 text-xs text-white/40 text-center">
                Not an early adopter?{' '}
                <Link href="/early-adopters" className="text-violet-400 hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          )}

          {/* Verified badge */}
          {isVerified && (
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-400 text-sm font-medium">Verified as {voterEmail}</span>
              </div>
              <button
                onClick={() => {
                  setIsVerified(false);
                  setVoterEmail('');
                  setVotedProducts(new Set());
                  localStorage.removeItem('prooflayer_voter_email');
                }}
                className="text-white/40 hover:text-white text-sm"
              >
                Change
              </button>
            </div>
          )}

          {/* Products grid */}
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No products yet</h3>
              <p className="text-white/50 mb-6">Be the first founder to submit a product!</p>
              <Link
                href="/founders"
                className="inline-flex items-center gap-2 bg-[#00d084] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90"
              >
                Submit Your Product
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product, index) => {
                const hasVoted = votedProducts.has(product.id);
                const isVoting = votingProductId === product.id;
                const progress = Math.min((product.voteCount / VOTE_THRESHOLD) * 100, 100);
                const isApproved = product.voteCount >= VOTE_THRESHOLD;

                return (
                  <div
                    key={product.id}
                    className={`bg-white/[0.03] backdrop-blur-xl border rounded-2xl p-6 transition-all ${
                      isApproved ? 'border-green-500/30 bg-green-500/5' : 'border-white/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Rank */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>

                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white">{product.productName}</h3>
                          {product.productStage && (
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STAGE_COLORS[product.productStage] || 'bg-white/10 text-white/60'}`}>
                              {product.productStage}
                            </span>
                          )}
                          {product.productCategory && (
                            <span className="text-xs text-white/40">{product.productCategory}</span>
                          )}
                          {isApproved && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                              Approved!
                            </span>
                          )}
                        </div>
                        <p className="text-white/60 text-sm mb-3">{product.productTagline}</p>

                        {/* Offer */}
                        {product.offerDescription && (
                          <div className="flex items-center gap-2 mb-3">
                            <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                            <span className="text-violet-300 text-sm">{product.offerDescription}</span>
                          </div>
                        )}

                        {/* Progress bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                            <span>{product.voteCount} votes</span>
                            <span>{VOTE_THRESHOLD - product.voteCount > 0 ? `${VOTE_THRESHOLD - product.voteCount} more needed` : 'Approved!'}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 ${isApproved ? 'bg-green-500' : 'bg-gradient-to-r from-violet-500 to-fuchsia-500'}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Founder */}
                        {(product.name || product.twitterHandle) && (
                          <div className="flex items-center gap-2 text-sm text-white/40">
                            <span>by {product.name || 'Anonymous'}</span>
                            {product.twitterHandle && (
                              <a
                                href={`https://x.com/${product.twitterHandle}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-violet-400 hover:underline"
                              >
                                @{product.twitterHandle}
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Vote button */}
                      <div className="flex-shrink-0 flex sm:flex-col items-center gap-3">
                        <button
                          onClick={() => handleVote(product.id)}
                          disabled={!isVerified || hasVoted || isVoting}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                            hasVoted
                              ? 'bg-violet-500/20 text-violet-300 cursor-default'
                              : isVerified
                                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90'
                                : 'bg-white/10 text-white/40 cursor-not-allowed'
                          }`}
                        >
                          {isVoting ? (
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : hasVoted ? (
                            <>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                              Voted
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              Vote
                            </>
                          )}
                        </button>
                        {product.slug && (
                          <Link
                            href={`/p/${product.slug}`}
                            className="text-sm text-white/40 hover:text-white transition-colors"
                          >
                            View →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom CTAs */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/founders"
                className="inline-flex items-center justify-center gap-2 bg-[#00d084] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90"
              >
                Submit Your Product
              </Link>
              <Link
                href="/early-adopters"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 border border-white/10"
              >
                Become an Early Adopter
              </Link>
            </div>
            <p className="text-white/40 text-sm">
              Early adopters can vote • Products with {VOTE_THRESHOLD}+ votes get approved
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
