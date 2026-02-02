'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

const EXAMPLE_PRODUCTS = [
  {
    name: 'FlowMetrics',
    tagline: 'Analytics dashboard for indie hackers',
    category: 'Analytics',
    stage: 'Beta',
    lookingFor: '25 early adopters',
    offer: '60% lifetime discount',
    logo: 'FM',
    color: '#3b82f6',
  },
  {
    name: 'ShipFast UI',
    tagline: 'React component library for startups',
    category: 'Developer Tools',
    stage: 'Alpha',
    lookingFor: '50 early adopters',
    offer: 'Free lifetime access',
    logo: 'SF',
    color: '#8b5cf6',
  },
  {
    name: 'ContentPilot',
    tagline: 'AI writing assistant for newsletters',
    category: 'AI / Writing',
    stage: 'Beta',
    lookingFor: '30 early adopters',
    offer: '50% off first year',
    logo: 'CP',
    color: '#ec4899',
  },
  {
    name: 'LaunchDay',
    tagline: 'Product launch checklist & scheduler',
    category: 'Productivity',
    stage: 'Beta',
    lookingFor: '40 early adopters',
    offer: 'Lifetime deal $49',
    logo: 'LD',
    color: '#f59e0b',
  },
  {
    name: 'FeedbackLoop',
    tagline: 'Customer feedback collection made simple',
    category: 'Feedback',
    stage: 'Alpha',
    lookingFor: '20 early adopters',
    offer: 'Free forever plan',
    logo: 'FL',
    color: '#10b981',
  },
  {
    name: 'InvoiceNinja',
    tagline: 'Dead simple invoicing for freelancers',
    category: 'Finance',
    stage: 'Beta',
    lookingFor: '35 early adopters',
    offer: '70% lifetime discount',
    logo: 'IN',
    color: '#06b6d4',
  },
];

const CATEGORIES = ['All', 'Developer Tools', 'AI / Writing', 'Analytics', 'Productivity', 'Finance', 'Feedback'];

export default function DirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const filteredProducts = selectedCategory === 'All'
    ? EXAMPLE_PRODUCTS
    : EXAMPLE_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0b]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00d084]/10 rounded-full blur-[100px]" />

          <div className="relative max-w-6xl mx-auto px-6">
            {/* Coming Soon Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                <span className="text-violet-400 text-sm font-medium">Coming Soon — Preview</span>
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Discover products
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  before everyone else
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Browse startups looking for early adopters. Get exclusive deals, lifetime discounts, and direct access to founders.
              </p>

              {/* Preview Notice */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12 max-w-xl mx-auto">
                <p className="text-white/70 text-sm">
                  <span className="text-white font-semibold">This is a preview.</span> The products below are examples of what you&apos;ll see when the directory launches. Join as an early adopter to get notified when real products are available.
                </p>
                <Link
                  href="/early-adopters"
                  className="inline-flex items-center gap-2 mt-4 text-violet-400 hover:text-violet-300 font-medium text-sm transition-colors"
                >
                  Join the early adopter list
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-violet-500 text-white'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.name}
                  onMouseEnter={() => setHoveredProduct(product.name)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="group relative"
                >
                  {/* Example Badge */}
                  <div className="absolute -top-2 -right-2 z-10">
                    <span className="bg-white/10 backdrop-blur-sm text-white/50 text-xs font-medium px-2 py-1 rounded-full border border-white/10">
                      Example
                    </span>
                  </div>

                  <div className={`relative bg-white/[0.03] border rounded-2xl p-6 transition-all duration-300 ${
                    hoveredProduct === product.name
                      ? 'border-violet-500/50 bg-white/[0.05]'
                      : 'border-white/10'
                  }`}>
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: product.color }}
                      >
                        {product.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg truncate">{product.name}</h3>
                        <p className="text-white/50 text-sm truncate">{product.tagline}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-sm">Category</span>
                        <span className="text-white/70 text-sm">{product.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-sm">Stage</span>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${
                          product.stage === 'Alpha'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {product.stage}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-sm">Looking for</span>
                        <span className="text-white/70 text-sm">{product.lookingFor}</span>
                      </div>
                    </div>

                    {/* Offer */}
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        <span className="text-violet-300 text-sm font-medium">{product.offer}</span>
                      </div>
                    </div>

                    {/* CTA - Disabled since it's a preview */}
                    <button
                      disabled
                      className="w-full py-3 rounded-xl text-sm font-semibold bg-white/5 text-white/30 cursor-not-allowed"
                    >
                      Request Access
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <Link
                  href="/early-adopters"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all shadow-xl shadow-violet-500/25"
                >
                  Get Notified When We Launch
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </Link>
                <Link
                  href="/founders"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/10"
                >
                  List Your Product
                </Link>
              </div>
              <p className="text-white/40 text-sm mt-4">
                Be first to know when products go live
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              How the directory works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Browse products',
                  description: 'Filter by category, stage, or offer type to find products that interest you.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                },
                {
                  step: '02',
                  title: 'Request access',
                  description: 'Click to request early access. Founders review and approve testers.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  ),
                },
                {
                  step: '03',
                  title: 'Get exclusive deals',
                  description: 'Receive lifetime discounts, free access, or special early adopter pricing.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="text-violet-400 text-sm font-mono mb-2">{item.step}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
