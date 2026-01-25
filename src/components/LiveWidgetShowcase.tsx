'use client';

import { useState, useEffect } from 'react';

// Avatar colors for variety
const avatarColors = [
  'from-blue-500 to-purple-500',
  'from-green-500 to-teal-500',
  'from-orange-500 to-red-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-500',
  'from-amber-500 to-orange-500',
];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function LiveWidgetShowcase() {
  const [showHearts, setShowHearts] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rachel Torres',
      role: 'Webflow Developer',
      company: 'Independent',
      text: 'Finally ditched the screenshot-pasting workflow. Clients submit testimonials directly and I embed them in Webflow with one line of code. Game changer.',
      rating: 5,
    },
    {
      name: 'Mike Brennan',
      role: 'Freelance Designer',
      company: 'Independent',
      text: 'Was paying $29/mo for Testimonial.to. ProofLayer does the same thing for a one-time fee. Already saved over $300 in the first year.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Marketing Consultant',
      company: 'Independent',
      text: 'Setup took maybe 5 minutes. Sent the link to 3 clients, had video testimonials on my site the same day. The embed widget looks clean too.',
      rating: 5,
    },
    {
      name: 'Jake Morrison',
      role: 'Agency Owner',
      company: 'Morrison Digital',
      text: 'Managing testimonials for 6 clients used to be chaos. Now each client has their own workspace and I can embed widgets on any of their sites.',
      rating: 5,
    },
    {
      name: 'Nina Volkov',
      role: 'Course Creator',
      company: 'Independent',
      text: 'The video testimonials convert way better than text. Students record directly in browser, I approve, and they show up on my sales page. Simple.',
      rating: 5,
    },
    {
      name: 'Dan Okonkwo',
      role: 'SaaS Founder',
      company: 'Independent',
      text: 'We tested 4 testimonial tools. ProofLayer had the cleanest UI and lifetime pricing made the decision easy. No regrets 6 months in.',
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
    console.log('Heart button clicked!');
    setShowHearts(true);
    setTimeout(() => {
      setShowHearts(false);
      console.log('Hearts animation ended');
    }, 3000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M19 9l-7 7-7-7" />
            </svg>
            See it in action ↓
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Look What ProofLayer Can Do
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

              {/* Interactive Heart Button */}
              <div className="absolute top-6 right-6 z-[60]">
                <button
                  onClick={triggerHearts}
                  type="button"
                  className="group relative bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
                  aria-label="Trigger hearts animation"
                >
                  <svg className="w-6 h-6 group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow">
                    Click me!
                  </span>
                </button>
              </div>

              {/* Floating Hearts Animation */}
              {showHearts && (
                <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden rounded-3xl">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="floating-heart absolute text-4xl"
                      style={{
                        left: `${Math.random() * 100}%`,
                        bottom: '0',
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                      }}
                    >
                      ❤️
                    </div>
                  ))}
                </div>
              )}

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
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[index]} flex items-center justify-center text-white font-bold text-sm`}>
                        {getInitials(testimonial.name)}
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
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[index + 3]} flex items-center justify-center text-white font-bold text-sm`}>
                        {getInitials(testimonial.name)}
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
        </div>

        {/* Value Props */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">Free Forever</p>
            <p className="text-gray-500 text-sm mt-1">No credit card needed</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">5 Widget Styles</p>
            <p className="text-gray-500 text-sm mt-1">Grid, carousel, & more</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">5 Min Setup</p>
            <p className="text-gray-500 text-sm mt-1">Live in minutes, not hours</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">Pay Once</p>
            <p className="text-gray-500 text-sm mt-1">Own it forever</p>
          </div>
        </div>

        {/* CTA to Full Demo */}
        <div className="mt-12 text-center">
          <a
            href="/demo"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>Try the Full Interactive Demo</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-sm text-gray-500 mt-3">Experience all features hands-on • No signup required</p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 1;
          }
          10% {
            transform: translateY(-10vh) scale(1);
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) scale(1.2);
            opacity: 0;
          }
        }
        .floating-heart {
          animation: floatUp 4s ease-out forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
}
