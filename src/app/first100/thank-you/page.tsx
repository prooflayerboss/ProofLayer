'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const type = searchParams?.get('type') ?? null;
  const isFounder = type === 'founder';

  return (
    <main className="min-h-screen bg-[#0a0a0b] flex items-center justify-center px-4 py-12">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] ${isFounder ? 'bg-[#00d084]/10' : 'bg-violet-500/10'} rounded-full blur-[120px]`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] ${isFounder ? 'bg-emerald-500/10' : 'bg-fuchsia-500/10'} rounded-full blur-[100px]`} />
      </div>

      <div className="relative max-w-md mx-auto text-center">
        {/* Success Icon */}
        <div className={`w-20 h-20 ${isFounder ? 'bg-[#00d084]/10' : 'bg-violet-500/10'} rounded-full flex items-center justify-center mx-auto mb-8`}>
          <svg className={`w-10 h-10 ${isFounder ? 'text-[#00d084]' : 'text-violet-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {isFounder ? (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Application submitted!
            </h1>
            <p className="text-white/60 text-lg mb-8">
              Check your email for your founder portal link. You&apos;ll be able to see early adopters interested in your product there.
            </p>

            {/* What's next card */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left mb-8">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                What happens next
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#00d084]/20 text-[#00d084] text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
                  <div>
                    <div className="text-white font-medium">Check your inbox</div>
                    <div className="text-white/50 text-sm">You&apos;ll receive a welcome email with your portal link</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#00d084]/20 text-[#00d084] text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
                  <div>
                    <div className="text-white font-medium">We review your product</div>
                    <div className="text-white/50 text-sm">Usually within 24 hours</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#00d084]/20 text-[#00d084] text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <div>
                    <div className="text-white font-medium">Get matched with early adopters</div>
                    <div className="text-white/50 text-sm">Start building relationships with your first users</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Email reminder */}
            <div className="bg-[#00d084]/10 border border-[#00d084]/20 rounded-xl p-4 mb-8">
              <p className="text-[#00d084] text-sm">
                <span className="font-semibold">Pro tip:</span> Bookmark your portal link from the email. That&apos;s where you&apos;ll see early adopters who want to try your product.
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              You&apos;re in!
            </h1>
            <p className="text-white/60 text-lg mb-8">
              Welcome to the early adopter community. You&apos;ll get first access to new products with exclusive deals.
            </p>

            {/* What's next card */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left mb-8">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                What to expect
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
                  <div>
                    <div className="text-white font-medium">Curated product launches</div>
                    <div className="text-white/50 text-sm">Only products that match your interests</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
                  <div>
                    <div className="text-white font-medium">Exclusive lifetime deals</div>
                    <div className="text-white/50 text-sm">Early pricing that won&apos;t be offered again</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <div>
                    <div className="text-white font-medium">Direct founder access</div>
                    <div className="text-white/50 text-sm">Shape products before they launch</div>
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}

        <Link
          href="/"
          className={`inline-flex items-center justify-center gap-2 ${isFounder ? 'bg-[#00d084] hover:bg-[#00b371]' : 'bg-violet-500 hover:bg-violet-600'} text-white px-8 py-3 rounded-xl font-semibold transition-colors`}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default function ThankYou() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
