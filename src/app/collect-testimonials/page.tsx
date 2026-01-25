'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function CollectTestimonialsPage() {
  const [activeTab, setActiveTab] = useState<'video' | 'text'>('video');

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0b]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#00d084]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          <div className="relative max-w-7xl mx-auto px-6 py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-px bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                  <span className="text-violet-400 font-mono text-sm tracking-wider uppercase">Testimonial Collection</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8">
                  Collect stories
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                    that convert
                  </span>
                </h1>

                <p className="text-xl text-gray-400 max-w-lg leading-relaxed mb-10">
                  Beautiful forms that make it effortless for customers to share their experience. Video or text—capture authentic testimonials in seconds.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/founders"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all shadow-xl shadow-violet-500/25"
                  >
                    Start Collecting Free
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

              {/* Right: Interactive Preview */}
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/10 to-pink-500/20 rounded-3xl blur-2xl" />

                {/* Form Preview Card */}
                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
                  {/* Tab Switcher */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setActiveTab('video')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'video'
                          ? 'bg-violet-500 text-white'
                          : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      Video
                    </button>
                    <button
                      onClick={() => setActiveTab('text')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'text'
                          ? 'bg-violet-500 text-white'
                          : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      Text
                    </button>
                  </div>

                  {activeTab === 'video' ? (
                    <div className="space-y-4">
                      {/* Video recording area */}
                      <div className="aspect-video bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-violet-500/20 flex items-center justify-center animate-pulse">
                            <div className="w-16 h-16 rounded-full bg-violet-500 flex items-center justify-center">
                              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-white/70 text-sm font-mono">00:00</span>
                          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-0 h-full bg-violet-500 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <p className="text-white/50 text-sm text-center">Click to start recording your testimonial</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <label className="text-white/70 text-sm">Your testimonial</label>
                        <textarea
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                          rows={4}
                          placeholder="Share your experience with the product..."
                          readOnly
                        />
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="text-white/70 text-sm">Name</label>
                          <input
                            className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/30"
                            placeholder="John Doe"
                            readOnly
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-white/70 text-sm">Company</label>
                          <input
                            className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/30"
                            placeholder="Acme Inc"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit button preview */}
                  <button className="w-full mt-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-3 rounded-xl font-semibold">
                    Submit Testimonial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Everything you need to collect
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">powerful testimonials</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                No more chasing customers for reviews. Create beautiful collection forms and let testimonials come to you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Video Testimonials',
                  description: 'Record directly in browser or upload files. No apps needed.',
                  color: 'violet',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: 'Text Reviews',
                  description: 'Clean forms for written testimonials with custom questions.',
                  color: 'fuchsia',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  ),
                  title: 'Custom Branding',
                  description: 'Match your brand colors, logo, and style perfectly.',
                  color: 'pink',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  ),
                  title: 'Shareable Links',
                  description: 'Send customers a single link. They submit in seconds.',
                  color: 'violet',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Approval Workflow',
                  description: 'Review and approve testimonials before publishing.',
                  color: 'fuchsia',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Photo Uploads',
                  description: 'Customers can add profile photos and screenshots.',
                  color: 'pink',
                },
              ].map((feature, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full hover:border-white/20 transition-colors">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      feature.color === 'violet' ? 'bg-violet-500/20 text-violet-400' :
                      feature.color === 'fuchsia' ? 'bg-fuchsia-500/20 text-fuchsia-400' :
                      'bg-pink-500/20 text-pink-400'
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

        {/* How It Works */}
        <section className="py-32 px-6 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Three steps to testimonial gold
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Create your form',
                  description: 'Customize questions, branding, and choose video or text format.',
                },
                {
                  step: '02',
                  title: 'Share the link',
                  description: 'Send to happy customers via email, Slack, or embed on your site.',
                },
                {
                  step: '03',
                  title: 'Approve & display',
                  description: 'Review submissions and publish to your widgets instantly.',
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="text-8xl font-bold text-white/5 absolute -top-8 -left-4">{item.step}</div>
                  <div className="relative pt-8">
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-white/20">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/20 rounded-full blur-[120px]" />

          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
              Ready to collect
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                powerful testimonials?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of founders using ProofLayer to collect and display authentic customer stories.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/founders"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all shadow-xl shadow-violet-500/25"
              >
                Get Started Free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/display-social-proof"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/10"
              >
                See Display Options
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
