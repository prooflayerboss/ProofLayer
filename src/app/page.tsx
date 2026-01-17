import Link from 'next/link';
import FeaturesSection from '@/components/features-section';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import VideoPlayer from '@/components/video-player';

export default async function HomePage() {
  // Pricing tiers for AppSumo launch
  const pricingTiers = {
    SOLO: { price: 59, workspaces: 1, testimonials: 150, popular: false },
    PRO: { price: 118, workspaces: 3, testimonials: 1000, popular: true },
    AGENCY: { price: 177, workspaces: 10, testimonials: 5000, popular: false },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Lifetime Access Starting at ${pricingTiers.SOLO.price}
          </div>
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
              Stop Renting Your Reputation
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Collect video & text testimonials.<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Embed them anywhere.</span><br />
            <span className="text-gray-600">Pay once, own forever.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The simple alternative to expensive monthly tools. Collect video and written testimonials, display them beautifully, all with a single lifetime payment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              Get Started from ${pricingTiers.SOLO.price} →
            </Link>
            <a
              href="#pricing"
              className="bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
            >
              View Pricing
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            One-time payment • Lifetime access • 14-Day Money Back Guarantee
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Stop pasting screenshots into paint.
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Managing reviews is messy. Screenshots look unprofessional. Monthly tools cost $300/year.<br />
            <span className="font-semibold text-gray-900">ProofLayer fixes the mess without the monthly fee.</span>
          </p>

          {/* Comparison Grid */}
          <div className="max-w-3xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h3 className="font-bold text-red-900">Monthly Subscriptions</h3>
              </div>
              <ul className="space-y-3 text-sm text-red-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>$29-$99/month forever</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Data locked if you stop paying</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>$348-$1,188/year adds up fast</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Cancel = lose all testimonials</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="font-bold text-green-900">ProofLayer Lifetime</h3>
              </div>
              <ul className="space-y-3 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span><strong>From ${pricingTiers.SOLO.price} once</strong> - that's it, forever</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span><strong>Your data</strong> - export anytime, keep forever</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span><strong>Own it</strong> - no recurring charges ever</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span><strong>All updates</strong> - new features included free</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              See it in action
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Collect beautiful testimonials in minutes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch how simple it is to set up your first form and start collecting testimonials.
            </p>
          </div>

          {/* Video Container */}
          <VideoPlayer src="/videos/demo.mp4" />

          {/* Video features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Lightning Fast Setup</h3>
              <p className="text-sm text-gray-600">Create your first form in under 2 minutes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Fully Customizable</h3>
              <p className="text-sm text-gray-600">Match your brand with themes and layouts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">One-Line Embed</h3>
              <p className="text-sm text-gray-600">Works with any website builder or CMS</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Three simple steps. No monthly subscription required.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Create your form</h3>
              <p className="text-gray-600">
                Get a custom link in seconds. Share it with clients—they fill it in 30 seconds.
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Approve the best ones</h3>
              <p className="text-gray-600">
                Review submissions in your dashboard. One click to approve or reject.
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Embed on your site</h3>
              <p className="text-gray-600">
                Copy one line of code. Beautiful testimonial widgets on any website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600 mb-8 font-medium">Perfect for</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-900 font-semibold">Webflow Developers</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-gray-900 font-semibold">Freelancers</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-900 font-semibold">Agencies</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-gray-900 font-semibold">Consultants</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Pay once, use forever. No monthly fees. No surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Solo Tier */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-8 hover:border-blue-300 transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Solo</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-gray-900">${pricingTiers.SOLO.price}</span>
                </div>
                <p className="text-sm text-gray-500">One-time payment</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-semibold">1 Workspace</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-semibold">3 Forms</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-semibold">150 Testimonials</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Grid layout</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Embed widget</span>
                </li>
              </ul>

              <Link
                href="/signup"
                className="block text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Tier - Popular */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl border-4 border-blue-400 p-8 transform md:scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                MOST POPULAR
              </div>
              <div className="text-center mb-6 mt-2">
                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-white">${pricingTiers.PRO.price}</span>
                </div>
                <p className="text-sm text-blue-100">One-time payment</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white"><span className="font-semibold">3 Workspaces</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white"><span className="font-semibold">30 Forms</span> (10 per workspace)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white"><span className="font-semibold">1,000 Testimonials</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Grid, Carousel, Marquee</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white"><span className="font-semibold">Branding removal</span></span>
                </li>
              </ul>

              <Link
                href="/signup"
                className="block text-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <p className="text-xs text-blue-100 text-center mt-4">
                14-Day Money Back Guarantee
              </p>
            </div>

            {/* Agency Tier */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-8 hover:border-blue-300 transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Agency</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-gray-900">${pricingTiers.AGENCY.price}</span>
                </div>
                <p className="text-sm text-gray-500">One-time payment</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-semibold">10 Workspaces</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-semibold">50 Forms</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-semibold">5,000 Testimonials</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">All layouts & styles</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Popup & Floating widgets</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-semibold">Priority support</span></span>
                </li>
              </ul>

              <Link
                href="/signup"
                className="block text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-12 text-sm">
            All plans include video & text testimonials, customizable widgets, and lifetime updates
          </p>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I collect video testimonials?</h3>
              <p className="text-gray-600">Yes! Your customers can record videos directly in their browser or upload video files. Videos are automatically hosted and played inline.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is this really a one-time payment?</h3>
              <p className="text-gray-600">Yes. You pay once, you own the account forever. No hidden fees, no monthly charges.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Will it work on my website builder?</h3>
              <p className="text-gray-600">Yes! Prooflayer works with Webflow, WordPress, Wix, Squarespace, and any site that accepts HTML/JavaScript embeds.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I'm not happy with it?</h3>
              <p className="text-gray-600">14-day money back guarantee, no questions asked. Just email us and we'll refund you immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to collect amazing testimonials?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Choose your plan and get started today. Pay once, own forever.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started from ${pricingTiers.SOLO.price} →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
