'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LiveWidgetShowcase() {
  const [showHearts, setShowHearts] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder',
      company: 'DesignFlow Studio',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      text: 'ProofLayer made it ridiculously easy to collect testimonials from our clients. The lifetime deal is a no-brainer compared to paying $50/month forever.',
      rating: 5,
    },
    {
      name: 'Marcus Chen',
      role: 'Freelance Developer',
      company: 'Independent',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      text: 'I was using Testimonial.to and paying $29/month. Switched to ProofLayer and saved hundreds. The video testimonials look amazing on my portfolio.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'GrowthStack',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      text: 'The widget customization is incredible. Matches our brand perfectly. Plus, knowing we own it forever gives us peace of mind for the long term.',
      rating: 5,
    },
    {
      name: 'James Parker',
      role: 'Agency Owner',
      company: 'Pixel Perfect Agency',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      text: 'We manage testimonials for 8 clients. The workspace feature keeps everything organized. Best $118 we\'ve spent on agency tools.',
      rating: 5,
    },
    {
      name: 'Lisa Thompson',
      role: 'Course Creator',
      company: 'LearnWithLisa',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      text: 'My students love the video testimonial feature. It\'s so easy for them to record and for me to showcase. Conversions are up 40% since adding these to my sales page.',
      rating: 5,
    },
    {
      name: 'David Kumar',
      role: 'SaaS Founder',
      company: 'CloudMetrics',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      text: 'Tried 3 different testimonial tools before finding ProofLayer. The lifetime pricing sold me, but the features kept me. Worth every penny.',
      rating: 5,
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Trigger hearts animation every 10 seconds
  useEffect(() => {
    const heartsInterval = setInterval(() => {
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 3000);
    }, 10000);
    return () => clearInterval(heartsInterval);
  }, []);

  const triggerHearts = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 3000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Live Interactive Demo
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            See ProofLayer in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This is an actual ProofLayer widget with all our premium features. Click the heart to see the magic!
          </p>
        </div>

        {/* Live Widget Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Widget Wrapper with Gradient Border */}
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1 rounded-3xl shadow-2xl">
            <div className="bg-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">

              {/* Floating Hearts Animation */}
              {showHearts && (
                <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="floating-heart absolute text-4xl opacity-0"
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                      }}
                    >
                      ❤️
                    </div>
                  ))}
                </div>
              )}

              {/* Interactive Heart Button */}
              <div className="absolute top-6 right-6 z-10">
                <button
                  onClick={triggerHearts}
                  className="group relative bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  aria-label="Trigger hearts animation"
                >
                  <svg className="w-6 h-6 group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Click me!
                  </span>
                </button>
              </div>

              {/* Testimonial Grid (3 columns) */}
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 transition-all duration-500 ${
                      index === currentIndex % 3
                        ? 'border-purple-500 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400 p-0.5">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-gray-600">
                          {testimonial.role}
                          {testimonial.company !== 'Independent' && ` at ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row - 3 more testimonials */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                {testimonials.slice(3, 6).map((testimonial, index) => (
                  <div
                    key={index + 3}
                    className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 transition-all duration-500 ${
                      (index + 3) === currentIndex % 6
                        ? 'border-purple-500 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400 p-0.5">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-gray-600">
                          {testimonial.role}
                          {testimonial.company !== 'Independent' && ` at ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ProofLayer Badge */}
              <div className="mt-8 text-center">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors group"
                >
                  <span className="text-xs">Powered by</span>
                  <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                    ProofLayer
                  </span>
                  <svg className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Feature Callouts */}
          <div className="absolute -left-4 top-1/4 hidden lg:block">
            <div className="bg-white rounded-lg shadow-xl p-3 border-2 border-purple-500 animate-pulse">
              <p className="text-xs font-semibold text-purple-600">Auto-rotating!</p>
            </div>
          </div>
          <div className="absolute -right-4 top-1/3 hidden lg:block">
            <div className="bg-white rounded-lg shadow-xl p-3 border-2 border-pink-500 animate-pulse">
              <p className="text-xs font-semibold text-pink-600">Gradient theme</p>
            </div>
          </div>
        </div>

        {/* Value Props */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$59</p>
            <p className="text-gray-600 mt-2">Lifetime Access</p>
          </div>
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">5,000+</p>
            <p className="text-gray-600 mt-2">Testimonials</p>
          </div>
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">&lt;5min</p>
            <p className="text-gray-600 mt-2">Setup Time</p>
          </div>
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$1,129</p>
            <p className="text-gray-600 mt-2">Saved vs Monthly Tools</p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0;
          }
        }
        .floating-heart {
          animation: floatUp 4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
