'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation';

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    testimonial: '',
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'carousel'>('grid');

  const demoTestimonials = [
    {
      name: 'Sarah Mitchell',
      company: 'DesignFlow Studio',
      text: 'ProofLayer made collecting testimonials incredibly easy. The lifetime pricing is unbeatable!',
      rating: 5,
    },
    {
      name: 'Marcus Chen',
      company: 'Freelance Developer',
      text: 'Switched from Testimonial.to and saved hundreds. Best decision for my portfolio.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      company: 'GrowthStack',
      text: 'The widget customization is amazing. Matches our brand perfectly!',
      rating: 5,
    },
  ];

  const allTestimonials = submitted
    ? [...demoTestimonials, { ...formData, text: formData.testimonial }]
    : demoTestimonials;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />

      {/* Hero */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            Interactive Demo
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Try ProofLayer Live
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Submit a testimonial and see it appear instantly in the widget below. No signup required!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
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
                  <p className="text-sm text-gray-600">This is what your customers see</p>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Acme Inc"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Testimonial *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.testimonial}
                      onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us about your experience..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                  >
                    Submit Demo Testimonial →
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Testimonial Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Check out the widget on the right to see your testimonial live →
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

          {/* Right: Widget Preview */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Live Widget Preview</h2>
                  <p className="text-sm text-gray-600">This is how it looks on your site</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      layout === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setLayout('carousel')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      layout === 'carousel'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              <div id="widget-demo" className="space-y-4">
                {submitted && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-yellow-800 font-medium">
                      ✨ Your testimonial appeared! This is what happens in real-time when customers submit.
                    </p>
                  </div>
                )}

                <div className={layout === 'grid' ? 'grid gap-4' : 'space-y-4'}>
                  {allTestimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`bg-gray-50 rounded-lg p-5 border-2 transition-all ${
                        submitted && index === allTestimonials.length - 1
                          ? 'border-blue-500 shadow-lg animate-pulse-once'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">"{testimonial.text}"</p>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      {testimonial.company && (
                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Powered by <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ProofLayer</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Like What You See?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start collecting real testimonials from your customers today. Setup takes less than 5 minutes.
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
    </div>
  );
}
