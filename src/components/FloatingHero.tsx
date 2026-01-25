'use client';

import Link from 'next/link';

export default function FloatingHero() {
  return (
    <section className="relative min-h-[90vh] bg-[#f8f9fb] overflow-hidden flex items-center">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent pointer-events-none" />

      {/* Floating Elements - Left Side */}
      <div className="absolute left-[5%] top-[15%] floating-element floating-delay-1 hidden lg:block">
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 p-4 w-64 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
              JM
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Jessica Miller</p>
              <p className="text-xs text-gray-500">Product Designer</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">"This tool saved us hours of work collecting testimonials!"</p>
          <div className="flex gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Video Thumbnail - Left Bottom */}
      <div className="absolute left-[8%] bottom-[20%] floating-element floating-delay-3 hidden lg:block">
        <div className="bg-white rounded-xl shadow-xl shadow-black/5 p-3 w-48 transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg aspect-video flex items-center justify-center">
            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-blue-600 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2 font-medium">Video Testimonial</p>
        </div>
      </div>

      {/* Sticky Note - Left Mid */}
      <div className="absolute left-[2%] top-[45%] floating-element floating-delay-2 hidden xl:block">
        <div className="bg-yellow-100 rounded-lg shadow-lg p-4 w-40 transform -rotate-12 hover:-rotate-6 transition-transform duration-500" style={{ boxShadow: '2px 2px 10px rgba(0,0,0,0.08)' }}>
          <p className="text-yellow-900 text-xs font-handwriting leading-relaxed">Collect reviews easily & embed anywhere!</p>
          <div className="w-6 h-6 bg-blue-500 rounded-md mt-2 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Elements - Right Side */}
      <div className="absolute right-[5%] top-[12%] floating-element floating-delay-2 hidden lg:block">
        <div className="bg-white rounded-xl shadow-xl shadow-black/5 p-4 w-56 transform rotate-6 hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold text-gray-700">Recording</span>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-auto"></span>
          </div>
          <div className="h-8 bg-gray-100 rounded-lg flex items-center px-2 gap-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-blue-400 rounded-full"
                style={{ height: `${Math.random() * 16 + 8}px` }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">00:42 / 02:00</p>
        </div>
      </div>

      {/* Rating Badge - Right */}
      <div className="absolute right-[15%] top-[35%] floating-element floating-delay-4 hidden lg:block">
        <div className="bg-white rounded-full shadow-lg shadow-black/5 px-4 py-2 flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          <span className="text-2xl font-bold text-gray-900">4.9</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Icons - Right Bottom */}
      <div className="absolute right-[8%] bottom-[25%] floating-element floating-delay-1 hidden lg:block">
        <div className="bg-white rounded-xl shadow-xl shadow-black/5 p-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <p className="text-xs text-gray-500 mb-3 font-medium">Works with</p>
          <div className="flex gap-2">
            {/* Shopify - using shopping bag emoji style icon */}
            <div className="w-10 h-10 bg-[#96BF48] rounded-lg flex items-center justify-center" title="Shopify">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            {/* Wix */}
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center" title="Wix">
              <span className="text-white font-extrabold text-xs">Wix</span>
            </div>
            {/* WordPress - W in circle */}
            <div className="w-10 h-10 bg-[#21759B] rounded-lg flex items-center justify-center" title="WordPress">
              <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">W</span>
              </div>
            </div>
            {/* More integrations */}
            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border border-gray-200" title="And more">
              <span className="text-gray-500 font-bold text-sm">+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Another Testimonial Card - Right Side Lower */}
      <div className="absolute right-[3%] bottom-[45%] floating-element floating-delay-3 hidden xl:block">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg shadow-black/5 p-4 w-52 transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
              AK
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs">Alex K.</p>
              <p className="text-[10px] text-emerald-600">Verified</p>
            </div>
          </div>
          <p className="text-gray-700 text-xs leading-relaxed">"Best investment for my agency."</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 py-20">
        {/* Headline */}
        <h1 className="hero-headline text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
          Stop Paying Monthly
          <br />
          <span className="text-blue-600">For Your Own Testimonials</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
          Import your Google reviews in 30 seconds. Collect new testimonials. Display beautiful widgets. Pay once, own forever.
        </p>

        {/* Product Demo Video - Placeholder for demo video */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl shadow-gray-300/50 overflow-hidden border border-gray-200">
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Product demo coming soon</p>
                <p className="text-sm text-gray-500 mt-2">See ProofLayer in action in under 20 seconds</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-105 active:scale-100"
          >
            Start Free - No Credit Card
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-sm text-gray-500">
            Free forever plan • Lifetime access from <span className="font-semibold text-gray-900">$49</span>
          </p>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium">Lifetime access</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">Video & text</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-sm font-medium">One-line embed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
