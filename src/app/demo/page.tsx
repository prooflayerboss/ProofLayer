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
        return 'bg-gradient-to-br from-blue-600 to-purple-600 text-white';
      default:
        return 'bg-gray-50 text-gray-900';
    }
  };

  const getCardClasses = () => {
    const base = theme === 'dark' || theme === 'gradient' ? 'bg-white/10 backdrop-blur border-white/20' : 'bg-white';

    switch (cardStyle) {
      case 'minimal':
        return `${base} rounded-lg p-4 shadow-sm`;
      case 'bordered':
        return `${base} rounded-xl p-6 border-2 ${theme === 'dark' || theme === 'gradient' ? 'border-white/30' : 'border-blue-200'} shadow-lg`;
      default:
        return `${base} rounded-xl p-5 border ${theme === 'dark' || theme === 'gradient' ? 'border-white/20' : 'border-gray-200'} shadow-md`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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

      {/* Hero */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            Interactive Demo - Try Every Feature!
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Experience ProofLayer Live
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Submit a testimonial, customize the widget, and see all our features in action. No signup required!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Share Your Feedback</h2>
                  <p className="text-sm text-gray-600">Submit to see floating hearts ❤️</p>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Acme Inc"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating *
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
                            className={`w-8 h-8 transition-colors ${
                              star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Testimonial *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.testimonial}
                      onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us about your experience..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                  >
                    Submit & See Floating Hearts ❤️
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Amazing! 🎉</h3>
                  <p className="text-gray-600 mb-6">
                    Your testimonial appeared! Now play with the widget customization options →
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Submit Another
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Widget Preview & Controls */}
          <div className="space-y-6">
            {/* Widget Customization Panel */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🎨 Customize Your Widget</h3>

              {/* Layout Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Layout Style</label>
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
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        layout === l.value
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {l.icon} {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'light' as ThemeType, label: 'Light', color: 'bg-white' },
                    { value: 'dark' as ThemeType, label: 'Dark', color: 'bg-gray-900' },
                    { value: 'gradient' as ThemeType, label: 'Gradient', color: 'bg-gradient-to-r from-blue-600 to-purple-600' },
                  ].map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTheme(t.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === t.value
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Style */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'default' as const, label: 'Default' },
                    { value: 'minimal' as const, label: 'Minimal' },
                    { value: 'bordered' as const, label: 'Bordered' },
                  ].map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setCardStyle(s.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        cardStyle === s.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Columns */}
              {layout === 'grid' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Columns: {columns}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={columns}
                    onChange={(e) => setColumns(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}

              {/* Toggle Options */}
              <div className="space-y-2 border-t pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showRatings}
                    onChange={(e) => setShowRatings(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Show star ratings</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCompany}
                    onChange={(e) => setShowCompany(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Show company names</span>
                </label>
              </div>

              {/* Floating Hearts Test Button */}
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowFloatingHearts(true);
                    setTimeout(() => setShowFloatingHearts(false), 3000);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>❤️</span>
                  Try Floating Hearts Animation
                  <span>❤️</span>
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Also triggers automatically on testimonial submission
                </p>
              </div>
            </div>

            {/* Live Widget Preview */}
            <div className={`rounded-2xl p-8 transition-all ${getThemeClasses()}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Live Preview</h2>
                  <p className="text-sm opacity-80">Changes apply instantly</p>
                </div>
              </div>

              <div id="widget-demo">
                {submitted && (
                  <div className={`${theme === 'dark' || theme === 'gradient' ? 'bg-yellow-500/20 border-yellow-400/40' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-4 mb-4`}>
                    <p className={`text-sm font-medium ${theme === 'dark' || theme === 'gradient' ? 'text-yellow-200' : 'text-yellow-800'}`}>
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
                      className={`${getCardClasses()} transition-all hover:scale-105 ${
                        layout === 'carousel' ? 'min-w-[300px] snap-start' : ''
                      } ${
                        submitted && index === allTestimonials.length - 1
                          ? 'ring-2 ring-yellow-400 animate-pulse-once'
                          : ''
                      }`}
                    >
                      {showRatings && (
                        <div className="flex gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      )}
                      <p className="mb-3 leading-relaxed">"{testimonial.text}"</p>
                      <div className="flex items-center gap-3">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          {showCompany && testimonial.company && (
                            <p className="text-sm opacity-75">{testimonial.company}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-current/20">
                <p className="text-sm text-center opacity-75">
                  Powered by <span className="font-semibold">ProofLayer</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Everything You Just Tested 👆
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2">4 Layout Styles</h3>
              <p className="text-sm text-gray-600">Grid, Carousel, Masonry, Wall of Love</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌈</span>
              </div>
              <h3 className="font-semibold mb-2">Custom Themes</h3>
              <p className="text-sm text-gray-600">Light, Dark, Gradient + brand colors</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="font-semibold mb-2">Floating Hearts</h3>
              <p className="text-sm text-gray-600">Celebrate new testimonials with animations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold mb-2">Star Ratings</h3>
              <p className="text-sm text-gray-600">Show/hide ratings, fully customizable</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="font-semibold mb-2">Card Styles</h3>
              <p className="text-sm text-gray-600">Default, Minimal, Bordered options</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold mb-2">Mobile Ready</h3>
              <p className="text-sm text-gray-600">Responsive on all devices</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Add This to Your Site?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get all these features (and more!) with a one-time payment. Setup takes less than 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Get Started from $59 →
            </Link>
            <Link
              href="/compare"
              className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/30 transition-colors border border-white/30 inline-block"
            >
              Compare Plans
            </Link>
          </div>
        </div>
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
