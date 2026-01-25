'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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
  status: string | null;
  slug: string;
  createdAt: string;
}

const STAGE_LABELS: Record<string, { label: string; color: string }> = {
  idea: { label: 'Idea Stage', color: 'bg-slate-500/20 text-slate-300' },
  building: { label: 'Building', color: 'bg-amber-500/20 text-amber-300' },
  alpha: { label: 'Alpha', color: 'bg-orange-500/20 text-orange-300' },
  beta: { label: 'Beta', color: 'bg-blue-500/20 text-blue-300' },
  launched: { label: 'Launched', color: 'bg-green-500/20 text-green-300' },
};

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [requestEmail, setRequestEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;

      try {
        const res = await fetch(`/api/first100/product/${slug}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Product not found');
        }

        setProduct(data.product);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  async function handleRequestAccess(e: React.FormEvent) {
    e.preventDefault();
    if (!requestEmail || !product) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/first100/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: requestEmail,
          productId: product.id,
          productSlug: product.slug,
          productName: product.productName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setRequestSent(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00d084] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Product not found</h1>
          <p className="text-white/50 mb-8">This product page doesn&apos;t exist or has been removed.</p>
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 bg-[#00d084] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Browse Directory
          </Link>
        </div>
      </div>
    );
  }

  const stage = product.productStage ? STAGE_LABELS[product.productStage] : null;

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00d084]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
              <svg width="32" height="32" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="product-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d084"/>
                    <stop offset="100%" stopColor="#00b371"/>
                  </linearGradient>
                </defs>
                <rect x="14" y="4" width="100" height="100" rx="20" fill="#00d084" opacity="0.25"/>
                <rect x="10" y="8" width="100" height="100" rx="20" fill="#00d084" opacity="0.5"/>
                <rect x="6" y="12" width="100" height="100" rx="20" fill="url(#product-icon-gradient)"/>
                <path d="M 36 64 L 48 76 L 76 44" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white">ProofLayer</span>
          </Link>

          <Link
            href="/founders"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            List your product
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="relative px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Product card */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            {/* Top section */}
            <div className="p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
                {/* Logo */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#00d084] to-emerald-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold flex-shrink-0 shadow-xl shadow-[#00d084]/20">
                  {product.productName?.charAt(0) || 'P'}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {stage && (
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${stage.color}`}>
                        {stage.label}
                      </span>
                    )}
                    {product.productCategory && (
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/60">
                        {product.productCategory}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                    {product.productName}
                  </h1>

                  <p className="text-lg sm:text-xl text-white/60 leading-relaxed">
                    {product.productTagline}
                  </p>
                </div>
              </div>

              {/* Founder info */}
              {(product.name || product.twitterHandle) && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
                    {product.name?.charAt(0) || '@'}
                  </div>
                  <div>
                    {product.name && (
                      <div className="text-white font-medium">{product.name}</div>
                    )}
                    {product.twitterHandle && (
                      <a
                        href={`https://x.com/${product.twitterHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#00d084] hover:underline"
                      >
                        @{product.twitterHandle}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white">{product.lookingForCount || 25}</div>
                  <div className="text-sm text-white/50">Early adopters wanted</div>
                </div>
                {product.productUrl && (
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group"
                  >
                    <div className="text-white font-medium flex items-center gap-2">
                      Visit Website
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="text-sm text-white/50 truncate">{product.productUrl.replace(/^https?:\/\//, '')}</div>
                  </a>
                )}
              </div>

              {/* Offer */}
              {product.offerDescription && (
                <div className="bg-gradient-to-r from-[#00d084]/10 to-emerald-500/10 border border-[#00d084]/20 rounded-2xl p-6 mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00d084]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                    <div className="text-[#00d084] font-semibold">Early Adopter Offer</div>
                  </div>
                  <p className="text-white text-lg">{product.offerDescription}</p>
                </div>
              )}
            </div>

            {/* Request access section */}
            <div className="border-t border-white/10 bg-white/[0.02] p-8 sm:p-12">
              {requestSent ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#00d084]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Request sent!</h3>
                  <p className="text-white/60">
                    The founder will review your request and reach out if it&apos;s a good fit.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-2 text-center">
                    Want early access?
                  </h3>
                  <p className="text-white/60 text-center mb-6">
                    Request access and the founder will reach out with the exclusive offer.
                  </p>

                  <form onSubmit={handleRequestAccess} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={requestEmail}
                        onChange={(e) => setRequestEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084] focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-[#00d084] to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Request Access'
                        )}
                      </button>
                    </div>
                    {submitError && (
                      <p className="mt-3 text-sm text-red-400 text-center">{submitError}</p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-white/40 mb-4">Are you a founder?</p>
            <Link
              href="/founders"
              className="inline-flex items-center gap-2 text-[#00d084] hover:underline font-medium"
            >
              List your product and get your first users
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2025 ProofLayer</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
