'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

const SAMPLE_TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Founder, TechFlow',
    content: 'ProofLayer helped us get our first 50 users in the first week. The testimonial widgets look amazing on our site.',
    avatar: 'SC',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'CEO, DataPulse',
    content: 'Finally a tool that understands what early-stage founders need. Not just testimonials, but actual users!',
    avatar: 'MJ',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Indie Hacker',
    content: 'The one-time payment model is perfect. No monthly fees eating into my runway.',
    avatar: 'ER',
    rating: 5,
  },
  {
    name: 'Alex Kim',
    role: 'Product Lead, Startup',
    content: 'Beautiful widgets that actually convert. Our sign-up rate increased 40% after adding ProofLayer.',
    avatar: 'AK',
    rating: 5,
  },
];

export default function DisplaySocialProofPage() {
  const [activeWidget, setActiveWidget] = useState<'grid' | 'carousel' | 'wall'>('grid');

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0b]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          <div className="relative max-w-7xl mx-auto px-6 py-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-amber-500 to-orange-500" />
                <span className="text-amber-400 font-mono text-sm tracking-wider uppercase">Social Proof Widgets</span>
                <div className="w-12 h-px bg-gradient-to-r from-orange-500 to-amber-500" />
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8">
                Display proof
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                  that converts
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                Embed stunning testimonial widgets anywhere. Grids, carousels, walls of love—all customizable to match your brand perfectly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/founders"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all shadow-xl shadow-amber-500/25"
                >
                  Start Displaying Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/10"
                >
                  See Pricing
                </Link>
              </div>
            </div>

            {/* Widget Preview */}
            <div className="relative max-w-5xl mx-auto">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-2xl" />

              {/* Widget Type Selector */}
              <div className="relative mb-6 flex justify-center gap-2">
                {[
                  { id: 'grid', label: 'Grid' },
                  { id: 'carousel', label: 'Carousel' },
                  { id: 'wall', label: 'Wall of Love' },
                ].map((widget) => (
                  <button
                    key={widget.id}
                    onClick={() => setActiveWidget(widget.id as 'grid' | 'carousel' | 'wall')}
                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                      activeWidget === widget.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {widget.label}
                  </button>
                ))}
              </div>

              {/* Widget Display */}
              <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden min-h-[400px]">
                {activeWidget === 'grid' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {SAMPLE_TESTIMONIALS.map((testimonial, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, j) => (
                            <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-white/80 mb-4 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{testimonial.name}</p>
                            <p className="text-white/50 text-xs">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeWidget === 'carousel' && (
                  <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex gap-4">
                        {SAMPLE_TESTIMONIALS.slice(0, 2).map((testimonial, i) => (
                          <div key={i} className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                            <div className="flex gap-1 mb-4">
                              {[...Array(testimonial.rating)].map((_, j) => (
                                <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-white/80 mb-6 leading-relaxed text-lg">&ldquo;{testimonial.content}&rdquo;</p>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                                {testimonial.avatar}
                              </div>
                              <div>
                                <p className="text-white font-medium">{testimonial.name}</p>
                                <p className="text-white/50 text-sm">{testimonial.role}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}

                {activeWidget === 'wall' && (
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                    {[...SAMPLE_TESTIMONIALS, ...SAMPLE_TESTIMONIALS.slice(0, 2)].map((testimonial, i) => (
                      <div key={i} className="break-inside-avoid bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition-colors">
                        <p className="text-white/80 mb-4 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-semibold text-xs">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{testimonial.name}</p>
                            <p className="text-white/50 text-xs">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Embed Code Preview */}
              <div className="mt-6 bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <code className="text-white/50 text-sm font-mono truncate">
                  &lt;script src=&quot;https://prooflayer.app/embed.js&quot; data-id=&quot;your-widget-id&quot;&gt;&lt;/script&gt;
                </code>
                <button className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors flex-shrink-0">
                  Copy Code
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Widgets that work
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">everywhere</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Embed on any website. Webflow, WordPress, Wix, Squarespace, custom sites—anywhere that accepts HTML.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                  title: 'Multiple Layouts',
                  description: 'Grid, carousel, masonry, wall of love—pick the perfect layout for your site.',
                  color: 'amber',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  ),
                  title: 'Full Customization',
                  description: 'Colors, fonts, spacing, animations—make it yours.',
                  color: 'orange',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Mobile Responsive',
                  description: 'Looks perfect on every screen size, automatically.',
                  color: 'red',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Lightning Fast',
                  description: 'Optimized loading that won&apos;t slow down your site.',
                  color: 'amber',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Video Support',
                  description: 'Display video testimonials with custom thumbnails.',
                  color: 'orange',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                  title: 'Auto Updates',
                  description: 'New testimonials appear automatically. No re-embedding.',
                  color: 'red',
                },
              ].map((feature, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full hover:border-white/20 transition-colors">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      feature.color === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                      feature.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Compatibility */}
        <section className="py-20 px-6 border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/40 text-sm font-medium uppercase tracking-wider mb-8">Works with your favorite platforms</p>
            <div className="flex flex-wrap justify-center gap-8 text-white/30">
              {['Webflow', 'WordPress', 'Wix', 'Squarespace', 'Shopify', 'Framer', 'Next.js', 'React'].map((platform) => (
                <span key={platform} className="text-lg font-semibold">{platform}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/20 rounded-full blur-[120px]" />

          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
              Ready to show off
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                your social proof?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Create beautiful testimonial widgets that convert visitors into customers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/founders"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all shadow-xl shadow-amber-500/25"
              >
                Get Started Free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/collect-testimonials"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/10"
              >
                See Collection Tools
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
