'use client';

import CountdownTimer from './CountdownTimer';

export default function EarlyBirdBanner() {
  // Set launch offer to end 30 days from now
  // In production, you'd set this to a specific date
  const launchEndDate = new Date();
  launchEndDate.setDate(launchEndDate.getDate() + 30);

  return (
    <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-4">
            <svg className="w-5 h-5 text-yellow-300 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white font-bold text-sm uppercase tracking-wide">Limited Time Offer</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Early Bird Special: $49 Solo Plan
          </h2>
          <p className="text-xl text-white/90 mb-2">
            Launch pricing for the first 30 days
          </p>
          <p className="text-lg text-white/80">
            <span className="line-through">$59</span> → <span className="font-bold text-2xl text-yellow-300">$49</span> lifetime
          </p>
        </div>

        <div className="mb-6">
          <CountdownTimer endDate={launchEndDate} />
        </div>

        <div className="text-center">
          <p className="text-white/90 text-sm">
            ⚡ Offer ends when timer hits zero
          </p>
        </div>
      </div>
    </div>
  );
}
