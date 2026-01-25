import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] overflow-x-hidden">
      <Navigation />

      {/* Hero - Bold Editorial Style */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Geometric background elements */}
        <div className="absolute inset-0 geo-grid opacity-50" />
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#00d084]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-violet-500/10 to-transparent blur-3xl" />

        {/* Floating geometric shapes */}
        <div className="absolute top-32 left-[15%] w-16 h-16 border-2 border-[#00d084]/20 rounded-2xl rotate-12 animate-float" />
        <div className="absolute top-48 right-[20%] w-8 h-8 bg-violet-500/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-[25%] w-12 h-12 border-2 border-black/5 rotate-45 animate-float" style={{ animationDelay: '2s' }} />

        <div className="max-w-6xl mx-auto relative">
          {/* Eyebrow */}
          <div className="animate-slide-up delay-1 flex items-center gap-3 mb-8">
            <div className="line-accent" />
            <span className="text-sm font-semibold tracking-wide uppercase text-[#00d084]">
              Launch toolkit for founders
            </span>
          </div>

          {/* Main headline */}
          <h1 className="display-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#0a0a0b] mb-6 animate-slide-up delay-2">
            Get your first
            <br />
            <span className="text-gradient">100 users.</span>
            <br />
            <span className="text-[#737373]">Then prove it.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-[#737373] max-w-2xl mb-12 animate-slide-up delay-3 leading-relaxed">
            We connect you with early adopters who want to try new products.
            They become your first users—and your first testimonials.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up delay-4">
            <Link
              href="/founders"
              className="btn-primary group inline-flex items-center justify-center gap-3 bg-[#0a0a0b] text-white px-8 py-5 rounded-full text-lg font-semibold"
            >
              <span>I'm a founder</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/early-adopters"
              className="group inline-flex items-center justify-center gap-3 bg-white text-[#0a0a0b] px-8 py-5 rounded-full text-lg font-semibold border-2 border-[#0a0a0b]/10 hover:border-[#0a0a0b]/30 transition-all hover:shadow-lg"
            >
              <span>I'm an early adopter</span>
              <span className="text-xs px-2 py-1 bg-violet-100 text-violet-700 rounded-full font-medium">Get deals</span>
            </Link>
          </div>

          {/* Social proof - minimal */}
          <div className="flex items-center gap-6 animate-slide-up delay-5">
            <div className="flex -space-x-3">
              {[
                'bg-gradient-to-br from-amber-400 to-orange-500',
                'bg-gradient-to-br from-emerald-400 to-teal-500',
                'bg-gradient-to-br from-violet-400 to-purple-500',
                'bg-gradient-to-br from-rose-400 to-pink-500',
              ].map((gradient, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full ${gradient} border-3 border-white shadow-lg`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="h-8 w-px bg-black/10" />
            <p className="text-sm text-[#737373]">
              <span className="font-semibold text-[#0a0a0b]">100+</span> founders already joined
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Geometric Cards */}
      <section className="py-32 px-6 bg-white relative">
        <div className="absolute inset-0 geo-dots" />

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="line-accent" />
                <span className="text-sm font-semibold tracking-wide uppercase text-[#00d084]">How It Works</span>
              </div>
              <h2 className="display-text text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0a0a0b]">
                The founder loop
              </h2>
            </div>
            <p className="text-lg text-[#737373] max-w-md">
              From zero users to social proof in one platform. No scattered tools. No complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'List',
                description: 'Tell us what you\'re building and who you need',
                accent: '#00d084',
              },
              {
                step: '02',
                title: 'Match',
                description: 'We connect you with early adopters in your category',
                accent: '#8b5cf6',
              },
              {
                step: '03',
                title: 'Collect',
                description: 'Early adopters try your product and leave reviews',
                accent: '#f59e0b',
              },
              {
                step: '04',
                title: 'Display',
                description: 'Beautiful widgets showcase your social proof',
                accent: '#0a0a0b',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative card-lift"
              >
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-black/10 to-transparent z-0" />
                )}

                <div className="relative bg-[#fafafa] rounded-3xl p-8 border border-black/5 h-full">
                  {/* Step number */}
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 text-xl font-bold text-white"
                    style={{ backgroundColor: item.accent }}
                  >
                    {item.step}
                  </div>

                  <h3 className="display-text text-2xl font-bold text-[#0a0a0b] mb-3">{item.title}</h3>
                  <p className="text-[#737373] leading-relaxed">{item.description}</p>

                  {/* Hover accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: item.accent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Sharp, Modern */}
      <section id="pricing" className="py-32 px-6 bg-[#0a0a0b] relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 geo-grid" style={{ backgroundSize: '40px 40px' }} />
        </div>

        {/* Accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#00d084]/20 to-transparent blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="line-accent" />
              <span className="text-sm font-semibold tracking-wide uppercase text-[#00d084]">Pricing</span>
              <div className="line-accent" />
            </div>
            <h2 className="display-text text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Choose your path
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              Every plan includes testimonial collection + display widgets. One-time payment, own forever.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Free */}
            <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Free Listing</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="display-text text-4xl font-bold text-white">$0</span>
                </div>
                <p className="text-sm text-white/40">Get started at no cost</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Basic product listing',
                  'Early adopter matching',
                  'Basic testimonial form',
                  '10 submissions/month',
                  '1 embed widget',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                    <svg className="w-4 h-4 text-[#00d084] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/founders" className="block text-center bg-white/10 text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors text-sm">
                List for free
              </Link>
            </div>

            {/* Starter */}
            <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Starter</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="display-text text-4xl font-bold text-white">$49</span>
                </div>
                <p className="text-sm text-white/40">Get noticed</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Free',
                  'Featured listing (1 week)',
                  '1 weekly digest feature',
                  'Unlimited testimonials',
                  'All widget layouts',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                    <svg className="w-4 h-4 text-[#00d084] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/founders" className="block text-center bg-white/10 text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors text-sm">
                Get started
              </Link>
            </div>

            {/* Growth - Popular */}
            <div className="relative bg-gradient-to-b from-[#00d084] to-[#00b371] rounded-3xl p-6 flex flex-col lg:scale-[1.02] shadow-2xl shadow-[#00d084]/30 z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="bg-[#0a0a0b] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide inline-block">MOST POPULAR</span>
              </div>

              <div className="mb-6 pt-2">
                <h3 className="text-lg font-bold text-white mb-2">Growth</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="display-text text-4xl font-bold text-white">$149</span>
                </div>
                <p className="text-sm text-white/70">Reach more users</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Starter',
                  '4 weekly digest features',
                  '"Hot Pick" badge',
                  'Priority matching',
                  'Video testimonials',
                  'Analytics dashboard',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white">
                    <svg className="w-4 h-4 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/founders" className="block text-center bg-[#0a0a0b] text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-[#0a0a0b]/90 transition-colors text-sm shadow-lg">
                Choose Growth
              </Link>
            </div>

            {/* Launch */}
            <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Launch</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="display-text text-4xl font-bold text-white">$299</span>
                </div>
                <p className="text-sm text-white/40">Full launch support</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Growth',
                  'Social post to our audience',
                  'Founder spotlight email',
                  'Custom branding',
                  'Priority support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                    <svg className="w-4 h-4 text-[#00d084] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/founders" className="block text-center bg-white/10 text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors text-sm">
                Choose Launch
              </Link>
            </div>

            {/* Concierge */}
            <div className="bg-gradient-to-b from-white to-[#f5f3f0] rounded-3xl p-6 flex flex-col border border-black/5">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 bg-[#0a0a0b] text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  PREMIUM
                </div>
                <h3 className="text-lg font-bold text-[#0a0a0b] mb-2">Concierge</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="display-text text-3xl font-bold text-[#0a0a0b]">Custom</span>
                </div>
                <p className="text-sm text-[#737373]">We handle everything</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Full launch strategy',
                  'We write your copy',
                  'ProofLayer setup done for you',
                  '4-week campaign',
                  'Dedicated support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#0a0a0b]/70">
                    <svg className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/concierge" className="block text-center bg-[#0a0a0b] text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-[#0a0a0b]/90 transition-colors text-sm">
                Let's talk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Early Adopters */}
      <section className="py-32 px-6 bg-[#fafafa] relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-transparent to-rose-50 opacity-60" />

        <div className="max-w-5xl mx-auto relative">
          <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-black/5 border border-black/5 relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-[5rem]" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 bg-violet-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold tracking-wide uppercase text-violet-600">For Early Adopters</span>
              </div>

              <h2 className="display-text text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0b] mb-6">
                Get lifetime deals
                <br />
                <span className="text-gradient-purple">before public launch</span>
              </h2>

              <p className="text-xl text-[#737373] max-w-xl mb-12">
                Be first to try new products from ambitious founders. Get exclusive early-bird pricing that disappears after launch.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                    title: 'First access',
                    desc: 'Try products before anyone else',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: 'Exclusive deals',
                    desc: 'Lifetime pricing not available later',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ),
                    title: 'Shape products',
                    desc: 'Your feedback matters to founders',
                  },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-[#0a0a0b] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#737373]">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link
                  href="/early-adopters"
                  className="btn-primary inline-flex items-center gap-3 bg-[#8b5cf6] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#7c3aed]"
                >
                  Join as an early adopter
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="text-sm text-[#737373]">Free forever. No spam.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ProofLayer - All-in-One */}
      <section className="py-32 px-6 bg-white relative">
        <div className="absolute inset-0 geo-dots opacity-50" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="line-accent" />
              <span className="text-sm font-semibold tracking-wide uppercase text-[#00d084]">Why ProofLayer</span>
              <div className="line-accent" />
            </div>
            <h2 className="display-text text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0a0a0b] mb-4">
              One platform.
              <br />
              Everything you need.
            </h2>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              The all-in-one launch toolkit that takes you from zero users to social proof—without juggling multiple tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Get Users',
                description: 'We match you with early adopters who want to try new products in your category',
                accent: '#00d084',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: 'Collect Testimonials',
                description: 'Beautiful forms for video & text reviews. Customers submit in seconds, no account needed',
                accent: '#8b5cf6',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
                title: 'Display Social Proof',
                description: 'Embed beautiful widgets on your site. Grids, carousels, walls of love—all customizable',
                accent: '#f59e0b',
              },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: `${item.accent}15` }} />
                <div className="relative bg-[#fafafa] rounded-3xl p-8 border border-black/5 h-full group-hover:border-black/10 transition-colors">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white" style={{ backgroundColor: item.accent }}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0a0a0b] mb-3">{item.title}</h3>
                  <p className="text-[#737373] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* One-time payment callout */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-[#0a0a0b] text-white px-6 py-3 rounded-full">
              <svg className="w-5 h-5 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">One-time payment. Own it forever. No monthly fees.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Minimal */}
      <section className="py-32 px-6 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="line-accent" />
              <span className="text-sm font-semibold tracking-wide uppercase text-[#00d084]">FAQ</span>
              <div className="line-accent" />
            </div>
            <h2 className="display-text text-4xl sm:text-5xl font-bold text-[#0a0a0b]">
              Questions?
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does early adopter matching work?',
                a: 'When you list your product, we match you with early adopters who have expressed interest in your category. They receive your product in our weekly digest email, and you get notified when they sign up.',
              },
              {
                q: 'Do I really get testimonials included?',
                a: 'Yes! Every plan includes our full testimonial collection and display toolkit. Create forms, collect video and text testimonials, and embed beautiful widgets on your site.',
              },
              {
                q: 'Is this a one-time payment or subscription?',
                a: 'All plans are one-time payments. You pay once, you own it forever. No monthly fees, no hidden charges.',
              },
              {
                q: 'What if I don\'t get any users?',
                a: 'Our Growth and Launch plans include guaranteed exposure through our weekly digest to our early adopter community. Free listings get matched organically.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-black/5 hover:shadow-lg hover:border-black/10 transition-all cursor-pointer group"
              >
                <h3 className="text-lg font-semibold text-[#0a0a0b] mb-3 flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#00d084]/10 flex items-center justify-center flex-shrink-0 text-[#00d084] font-bold text-sm group-hover:bg-[#00d084] group-hover:text-white transition-colors">
                    {i + 1}
                  </span>
                  {item.q}
                </h3>
                <p className="text-[#737373] pl-12 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Bold */}
      <section className="py-32 px-6 bg-[#0a0a0b] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 geo-grid opacity-[0.02]" style={{ backgroundSize: '80px 80px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#00d084]/20 via-transparent to-transparent blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="display-text text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8">
            Ready to get your
            <br />
            <span className="text-gradient">first 100 users?</span>
          </h2>

          <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto">
            List your product for free. Start getting matched with early adopters today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/founders"
              className="btn-primary group inline-flex items-center justify-center gap-3 bg-[#00d084] text-[#0a0a0b] px-10 py-5 rounded-full text-lg font-bold"
            >
              List your product free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/early-adopters"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors border border-white/10"
            >
              Join as early adopter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
