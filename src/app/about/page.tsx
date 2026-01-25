import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'About ProofLayer - The Launch Toolkit for Founders',
  description: 'The story of ProofLayer: built by a founder who realized getting your first users shouldn\'t be the hardest part of launching.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section - Dramatic Dark */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00d084]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px]"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-[#00d084] to-emerald-400"></div>
                <span className="text-[#00d084] font-mono text-sm tracking-wider uppercase">Our Story</span>
              </div>

              {/* Main headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-8">
                Getting your first users
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d084] via-emerald-400 to-teal-400">
                  shouldn&apos;t be impossible
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-12">
                That single thought sparked everything. Here&apos;s the story of a founder who got frustrated and decided to build the launch toolkit he wished existed.
              </p>

              {/* Scroll indicator */}
              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-1">
                  <div className="w-1.5 h-3 bg-[#00d084] rounded-full animate-bounce"></div>
                </div>
                <span className="text-sm font-medium">Scroll to read</span>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Introduction */}
        <section className="relative py-32 bg-[#0F0F10]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Avatar and name */}
              <div className="relative">
                <div className="relative inline-block">
                  {/* Decorative ring */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-xl"></div>

                  {/* Avatar */}
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-1">
                    <div className="w-full h-full rounded-full bg-[#0F0F10] flex items-center justify-center">
                      <span className="text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-500">CE</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Curtis Ewalt</h2>
                  <p className="text-amber-400 font-medium">Founder & Builder</p>
                </div>
              </div>

              {/* Right: Introduction text */}
              <div className="space-y-6">
                <p className="text-2xl sm:text-3xl text-white font-medium leading-relaxed">
                  By day, I work a 9-to-5 in the corporate world. And I love it. But I&apos;ve always been that person who can&apos;t help but solve problems.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  You know the type. Someone mentions a challenge, and my brain immediately starts mapping out solutions. It&apos;s not work for me. It&apos;s just how I&apos;m wired.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  ProofLayer was born from one of those moments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem - Highlighted Quote */}
        <section className="relative py-32 overflow-hidden">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent"></div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Large quote mark */}
              <svg className="absolute -top-8 -left-4 w-24 h-24 text-amber-500/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="relative z-10">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  At my day job, we had this recurring problem: getting testimonials from customers was{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">like pulling teeth.</span>
                </p>
              </blockquote>

              <div className="mt-12 max-w-3xl">
                <p className="text-xl text-gray-400 leading-relaxed mb-6">
                  People were happy with our work, but actually getting them to write something? Nearly impossible. So I started looking for tools to make this easier.
                </p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  That&apos;s when I stumbled into the world of testimonial platforms. And honestly, I couldn&apos;t believe what I saw.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Realization - Dramatic Cards */}
        <section className="py-32 bg-[#0F0F10]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* The shocking truth */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 text-red-400 text-sm font-mono tracking-wider uppercase mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                The Problem
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Every. Single. One.
                <br />
                <span className="text-gray-500">Was a monthly subscription.</span>
              </h2>
            </div>

            {/* Cards showing the problem */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              <div className="bg-[#1A1A1B] border border-gray-800 rounded-2xl p-8 hover:border-red-500/30 transition-colors">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Your Testimonials</h3>
                <p className="text-gray-400">From <em>your</em> customers. About <em>your</em> business. Built through <em>your</em> hard work.</p>
              </div>

              <div className="bg-[#1A1A1B] border border-gray-800 rounded-2xl p-8 hover:border-red-500/30 transition-colors">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Rented Platform</h3>
                <p className="text-gray-400">Paying month after month just to display what&apos;s already yours?</p>
              </div>

              <div className="bg-[#1A1A1B] border border-gray-800 rounded-2xl p-8 hover:border-red-500/30 transition-colors">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Poof. Gone.</h3>
                <p className="text-gray-400">Stop paying and your social proof disappears. That&apos;s not a tool. It&apos;s a hostage situation.</p>
              </div>
            </div>

            {/* The question */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl sm:text-3xl text-gray-300 leading-relaxed">
                You don&apos;t rent your website. You don&apos;t rent your logo. You don&apos;t rent your customer database.
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-white mt-6">
                Why would you rent your testimonials?
              </p>
            </div>
          </div>
        </section>

        {/* The Solution - Bright Gradient Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500"></div>

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-8">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                The Lightbulb Moment
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                When I get frustrated,
                <br />
                I don&apos;t complain.
                <br />
                <span className="text-white/80">I build.</span>
              </h2>
            </div>

            {/* The model */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 lg:p-14 max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">The ProofLayer Model</h3>
              <ul className="space-y-4">
                {[
                  'Pay once. Own it forever.',
                  'No monthly fees eating into your margins.',
                  'No "premium tier" to unlock basic features.',
                  'No watching your testimonials disappear.',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-white/90">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-32 bg-[#0A0A0B]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Header */}
              <div className="lg:sticky lg:top-32">
                <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                  Built for people who hate subscriptions
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                  ProofLayer is for anyone who&apos;s ever thought: &quot;I just want something that works and doesn&apos;t cost me every month for the rest of time.&quot;
                </p>
              </div>

              {/* Right: List */}
              <div className="space-y-6">
                {[
                  {
                    title: 'Freelancers',
                    desc: 'Tired of monthly fees eating into already-thin margins.',
                    gradient: 'from-blue-400 to-cyan-400',
                  },
                  {
                    title: 'Agencies',
                    desc: 'Managing multiple clients who need separate workspaces without separate bills.',
                    gradient: 'from-violet-400 to-purple-400',
                  },
                  {
                    title: 'Course Creators',
                    desc: 'Wanting to showcase student wins without worrying about subscription renewals.',
                    gradient: 'from-pink-400 to-rose-400',
                  },
                  {
                    title: 'SaaS Founders',
                    desc: 'Building social proof while bootstrapping on a budget.',
                    gradient: 'from-amber-400 to-orange-400',
                  },
                  {
                    title: 'eCommerce Stores',
                    desc: 'Collecting product reviews without paying per review or per month.',
                    gradient: 'from-emerald-400 to-teal-400',
                  },
                ].map((item, i) => (
                  <div key={i} className="group flex items-start gap-5 p-6 rounded-2xl bg-[#1A1A1B] border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.gradient} mt-2 flex-shrink-0`}></div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-32 bg-[#0F0F10]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">What We Stand For</h2>
              <p className="text-xl text-gray-400">The principles that guide every decision.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Ownership Over Rental',
                  description: "Your reputation shouldn't have a monthly fee attached. Pay once, own forever.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  gradient: 'from-emerald-400 to-teal-400',
                },
                {
                  title: 'Simplicity Over Complexity',
                  description: "Powerful tools don't have to be complicated. We keep it simple so you can focus on your business.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  gradient: 'from-amber-400 to-orange-400',
                },
                {
                  title: 'Value Over Hype',
                  description: 'No inflated promises. No misleading marketing. Just honest tools that solve real problems.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                  gradient: 'from-violet-400 to-purple-400',
                },
              ].map((value) => (
                <div key={value.title} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl -z-10" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
                  <div className="bg-[#1A1A1B] border border-gray-800 rounded-3xl p-10 h-full hover:border-gray-700 transition-colors">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center text-white mb-8`}>
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Building */}
        <section className="py-32 bg-[#0A0A0B]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#1A1A1B] to-[#151516] border border-gray-800 rounded-3xl p-10 lg:p-14">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-sm tracking-wider uppercase">Still Building</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                This isn&apos;t a &quot;quit your job&quot; startup story
              </h2>

              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                <p>
                  I still have my day job. I still love it. ProofLayer is a &quot;solve a real problem and help people&quot; story.
                </p>
                <p>
                  Development happens in focused sprints: early mornings, late nights, weekends. Features are built based on what users actually need, not what sounds impressive in a pitch deck.
                </p>
                <p>
                  Every dollar you pay goes into making the product better, not into inflated marketing budgets or &quot;growth hacking.&quot;
                </p>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-800">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Bootstrapped. Sustainable. Built to last.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d084] via-emerald-500 to-teal-500"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to get your
              <br />
              first 100 users?
            </h2>
            <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
              Join founders who are getting matched with early adopters and building social proof from day one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/founders"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0a0a0b] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all shadow-xl shadow-black/20"
              >
                I&apos;m a Founder
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/early-adopters"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                I&apos;m an Early Adopter
              </Link>
            </div>

            <p className="text-white/70">
              Questions? Email me directly at{' '}
              <a href="mailto:curtis@prooflayer.app" className="text-white font-medium hover:underline">
                curtis@prooflayer.app
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
