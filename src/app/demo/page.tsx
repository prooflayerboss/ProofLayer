'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation';

type LayoutType = 'grid' | 'carousel' | 'masonry' | 'wall';
type ThemeType = 'light' | 'dark' | 'gradient';

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    testimonial: '',
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [layout, setLayout] = useState<LayoutType>('grid');
  const [theme, setTheme] = useState<ThemeType>('light');
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const [cardStyle, setCardStyle] = useState<'default' | 'minimal' | 'bordered'>('default');
  const [showRatings, setShowRatings] = useState(true);
  const [showCompany, setShowCompany] = useState(true);
  const [columns, setColumns] = useState(2);

  const demoTestimonials = [
    {
      name: 'Sarah Mitchell',
      company: 'DesignFlow Studio',
      role: 'Founder',
      text: 'ProofLayer made collecting testimonials incredibly easy. The lifetime pricing is unbeatable!',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      name: 'Marcus Chen',
      company: 'Freelance Developer',
      role: 'Developer',
      text: 'Switched from other tools and saved hundreds. Best decision for my portfolio.',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    {
      name: 'Emily Rodriguez',
      company: 'GrowthStack',
      role: 'Marketing Director',
      text: 'The widget customization is amazing. Matches our brand perfectly!',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
    {
      name: 'James Parker',
      company: 'Pixel Perfect Agency',
      role: 'Agency Owner',
      text: 'Managing testimonials for multiple clients has never been easier. Worth every penny!',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    },
  ];

  const allTestimonials = submitted
    ? [...demoTestimonials, {
        ...formData,
        text: formData.testimonial,
        role: 'Demo User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo'
      }]
    : demoTestimonials;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowFloatingHearts(true);
    setTimeout(() => setShowFloatingHearts(false), 3000);
    setTimeout(() => {
      document.getElementById('widget-demo')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      testimonial: '',
      rating: 5,
    });
    setSubmitted(false);
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'gradient':
        return 'bg-gradient-to-br from-blue-600 to-violet-600 text-white';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const getCardClasses = () => {
    const base = theme === 'dark' || theme === 'gradient' ? 'bg-white/10 backdrop-blur border-white/20' : 'bg-gray-50';

    switch (cardStyle) {
      case 'minimal':
        return `${base} rounded-xl p-4`;
      case 'bordered':
        return `${base} rounded-2xl p-6 border-2 ${theme === 'dark' || theme === 'gradient' ? 'border-white/30' : 'border-blue-200'}`;
      default:
        return `${base} rounded-2xl p-5 border ${theme === 'dark' || theme === 'gradient' ? 'border-white/20' : 'border-gray-200'}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Navigation />

      {/* Floating Hearts Animation */}
      {showFloatingHearts && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${20 + Math.random() * 30}px`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-[15%] w-24 h-24 opacity-10 hidden lg:block">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-blue-600">
            <path d="M50 0L61 39L100 50L61 61L50 100L39 61L0 50L39 39L50 0Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-10 left-[10%] w-16 h-16 opacity-10 hidden lg:block">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-violet-600">
            <path d="M50 0L61 39L100 50L61 61L50 100L39 61L0 50L39 39L50 0Z" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-100 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Interactive Demo
          </div>
          <h1 className="hero-headline text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Experience ProofLayer
            <br />
            <span className="text-blue-600">live</span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Submit a testimonial, customize the widget, and see floating hearts. No signup required.
          </p>

          {/* Quick feature pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {['4 Layouts', '3 Themes', 'Live Preview', 'Floating Hearts'].map((feature, i) => (
              <span key={i} className="bg-white px-4 py-2 rounded-full text-sm text-gray-600 shadow-sm border border-gray-100">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sticky top-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Share Your Feedback</h2>
                  <p className="text-sm text-gray-500">Submit to see floating hearts ❤️</p>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Acme Inc"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <svg
                            className={`w-10 h-10 transition-colors ${
                              star <= formData.rating ? 'text-amber-400' : 'text-gray-200'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Testimonial
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.testimonial}
                      onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your experience..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                  >
                    Submit Testimonial
                    <span className="text-lg">❤️</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Amazing! 🎉</h3>
                  <p className="text-gray-500 mb-8">
                    Your testimonial appeared in the preview! Now play with the customization options →
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Submit Another
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Widget Preview & Controls */}
          <div className="space-y-6">
            {/* Widget Customization Panel */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🎨</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Customize Widget</h3>
              </div>

              {/* Layout Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Layout Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'grid' as LayoutType, label: 'Grid', icon: '▦' },
                    { value: 'carousel' as LayoutType, label: 'Carousel', icon: '→' },
                    { value: 'masonry' as LayoutType, label: 'Masonry', icon: '▨' },
                    { value: 'wall' as LayoutType, label: 'Wall of Love', icon: '❤️' },
                  ].map((l) => (
                    <button
                      key={l.value}
                      onClick={() => setLayout(l.value)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        layout === l.value
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      <span className="mr-2">{l.icon}</span>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'light' as ThemeType, label: 'Light', preview: 'bg-white border border-gray-200' },
                    { value: 'dark' as ThemeType, label: 'Dark', preview: 'bg-gray-900' },
                    { value: 'gradient' as ThemeType, label: 'Gradient', preview: 'bg-gradient-to-r from-blue-600 to-violet-600' },
                  ].map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTheme(t.value)}
                      className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                        theme === t.value
                          ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-600'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${t.preview}`}></div>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Style */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Card Style</label>
                <div className="flex gap-2">
                  {[
                    { value: 'default' as const, label: 'Default' },
                    { value: 'minimal' as const, label: 'Minimal' },
                    { value: 'bordered' as const, label: 'Bordered' },
                  ].map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setCardStyle(s.value)}
                      className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        cardStyle === s.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Columns */}
              {layout === 'grid' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Columns: <span className="text-blue-600">{columns}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={columns}
                    onChange={(e) => setColumns(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              )}

              {/* Toggle Options */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm text-gray-700">Show star ratings</span>
                  <div className={`w-11 h-6 rounded-full transition-colors ${showRatings ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform mt-0.5 ${showRatings ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`}></div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showRatings}
                    onChange={(e) => setShowRatings(e.target.checked)}
                    className="sr-only"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm text-gray-700">Show company names</span>
                  <div className={`w-11 h-6 rounded-full transition-colors ${showCompany ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform mt-0.5 ${showCompany ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`}></div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showCompany}
                    onChange={(e) => setShowCompany(e.target.checked)}
                    className="sr-only"
                  />
                </label>
              </div>

              {/* Floating Hearts Button */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowFloatingHearts(true);
                    setTimeout(() => setShowFloatingHearts(false), 3000);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3.5 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
                >
                  <span>❤️</span>
                  Try Floating Hearts
                  <span>❤️</span>
                </button>
              </div>
            </div>

            {/* Live Widget Preview */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-200/50 to-violet-200/50 rounded-[2rem] blur-xl opacity-50"></div>
              <div className={`relative rounded-3xl p-8 transition-all shadow-xl ${getThemeClasses()}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider opacity-60">Live Preview</span>
                    <h2 className="text-xl font-bold">Widget Preview</h2>
                  </div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>

                <div id="widget-demo">
                  {submitted && (
                    <div className={`${theme === 'dark' || theme === 'gradient' ? 'bg-amber-500/20 border-amber-400/40' : 'bg-amber-50 border-amber-200'} border rounded-xl p-4 mb-4`}>
                      <p className={`text-sm font-medium ${theme === 'dark' || theme === 'gradient' ? 'text-amber-200' : 'text-amber-800'}`}>
                        ✨ Your testimonial appeared! See it highlighted below.
                      </p>
                    </div>
                  )}

                  <div className={
                    layout === 'grid'
                      ? `grid gap-4 grid-cols-${columns}`
                      : layout === 'carousel'
                      ? 'flex overflow-x-auto gap-4 pb-4 snap-x'
                      : layout === 'masonry'
                      ? 'columns-2 gap-4 space-y-4'
                      : 'space-y-4'
                  }>
                    {allTestimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className={`${getCardClasses()} transition-all hover:scale-[1.02] ${
                          layout === 'carousel' ? 'min-w-[280px] snap-start' : ''
                        } ${
                          submitted && index === allTestimonials.length - 1
                            ? 'ring-2 ring-amber-400 animate-pulse-once'
                            : ''
                        }`}
                      >
                        {showRatings && (
                          <div className="flex gap-0.5 mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        )}
                        <p className="mb-4 leading-relaxed text-sm">"{testimonial.text}"</p>
                        <div className="flex items-center gap-3">
                          <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-semibold text-sm">{testimonial.name}</p>
                            {showCompany && testimonial.company && (
                              <p className="text-xs opacity-60">{testimonial.company}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-current/10">
                  <p className="text-xs text-center opacity-50">
                    Powered by <span className="font-semibold">ProofLayer</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 font-medium text-sm tracking-wide uppercase mb-4">Features</span>
            <h2 className="hero-headline text-4xl font-bold text-gray-900">
              Everything you just tested
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎨', title: '4 Layout Styles', desc: 'Grid, Carousel, Masonry, Wall of Love', color: 'from-blue-500 to-indigo-500' },
              { icon: '🌈', title: 'Custom Themes', desc: 'Light, Dark, Gradient + brand colors', color: 'from-violet-500 to-purple-500' },
              { icon: '❤️', title: 'Floating Hearts', desc: 'Celebrate testimonials with animations', color: 'from-pink-500 to-rose-500' },
              { icon: '⭐', title: 'Star Ratings', desc: 'Show/hide ratings, fully customizable', color: 'from-amber-500 to-orange-500' },
              { icon: '🎭', title: 'Card Styles', desc: 'Default, Minimal, Bordered options', color: 'from-emerald-500 to-teal-500' },
              { icon: '📱', title: 'Mobile Ready', desc: 'Responsive on all devices', color: 'from-cyan-500 to-blue-500' },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <section className="mt-20 py-20 px-8 bg-gray-900 rounded-3xl relative overflow-hidden">
          {/* Subtle gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>

          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="hero-headline text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to add this to your site?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Get all these features with a one-time payment. Setup takes 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-xl shadow-black/20"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Free forever plan • Lifetime access from $49
            </p>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up 3s ease-in-out forwards;
        }
        .animate-pulse-once {
          animation: pulse 1s ease-in-out 2;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
