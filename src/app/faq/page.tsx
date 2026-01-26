'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Getting Started',
    question: 'How does early adopter matching work?',
    answer: 'When you list your product, we match you with early adopters who have expressed interest in your category. They receive your product in our weekly digest email, and you get notified when they sign up to try it.',
  },
  {
    category: 'Getting Started',
    question: 'What kind of products can I list?',
    answer: 'Any digital product: SaaS tools, developer tools, productivity apps, AI products, design tools, marketing software, and more. We focus on products that early adopters love to try.',
  },
  {
    category: 'Getting Started',
    question: 'How do I get started as an early adopter?',
    answer: 'Simply sign up, select the categories that interest you, and we\'ll send you a weekly digest of new products to try. You get exclusive early-bird pricing and lifetime deals.',
  },
  {
    category: 'Pricing & Plans',
    question: 'Is this really a one-time payment?',
    answer: 'Yes! All our paid plans are one-time payments. You pay once, you own it forever. No monthly fees, no hidden charges, no subscription trap.',
  },
  {
    category: 'Pricing & Plans',
    question: 'What\'s included in the free plan?',
    answer: 'The free plan includes a basic product listing, early adopter matching, basic testimonial collection forms, 10 testimonial submissions per month, and 1 embed widget.',
  },
  {
    category: 'Pricing & Plans',
    question: 'What\'s the difference between Growth and Launch plans?',
    answer: 'Growth ($149) includes 4 weekly digest features, priority matching, and video testimonials. Launch ($299) adds social posts to our audience, founder spotlight emails, and custom branding.',
  },
  {
    category: 'Pricing & Plans',
    question: 'Do you offer refunds?',
    answer: 'Yes! We offer a 14-day money-back guarantee. If ProofLayer isn\'t right for you, just let us know within 14 days for a full refund.',
  },
  {
    category: 'Features',
    question: 'Do I really get testimonials included?',
    answer: 'Yes! Every plan includes our full testimonial collection and display toolkit. Create beautiful forms, collect video and text testimonials, and embed widgets on your site.',
  },
  {
    category: 'Features',
    question: 'Can I collect video testimonials?',
    answer: 'Yes! Customers can record videos directly in their browser or upload video files. Videos are automatically hosted and optimized for web playback.',
  },
  {
    category: 'Features',
    question: 'Will the widgets work on my website?',
    answer: 'Yes! ProofLayer widgets work with any website: Webflow, WordPress, Wix, Squarespace, custom sites—anywhere that accepts HTML/JavaScript embeds.',
  },
  {
    category: 'Features',
    question: 'How does the weekly digest work?',
    answer: 'We send curated product recommendations to early adopters based on their interests. Paid plans get featured placement in these digests to maximize visibility.',
  },
  {
    category: 'Early Adopters',
    question: 'Is it free to be an early adopter?',
    answer: 'Yes! It\'s completely free to join as an early adopter. You get access to exclusive deals and can try new products before anyone else.',
  },
  {
    category: 'Early Adopters',
    question: 'What kind of deals do early adopters get?',
    answer: 'Early adopters get exclusive lifetime deals, early-bird pricing, and special discounts that are only available before public launch. These deals often disappear after launch.',
  },
  {
    category: 'Early Adopters',
    question: 'How often will I receive product recommendations?',
    answer: 'We send a weekly digest with curated products matching your selected interests. You can adjust your preferences or unsubscribe at any time.',
  },
  {
    category: 'Support',
    question: 'What makes ProofLayer different?',
    answer: 'ProofLayer is a community marketplace that connects founders with early adopters. Other tools just collect testimonials—we help you GET users first, then collect testimonials, then display them. One platform, one-time payment.',
  },
  {
    category: 'Support',
    question: 'Is there customer support?',
    answer: 'Yes! All plans include email support. Paid plans get priority support with faster response times. We\'re here to help you succeed.',
  },
];

const categories = ['All', 'Getting Started', 'Pricing & Plans', 'Features', 'Early Adopters', 'Support'];

function FAQAccordion({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium text-gray-900 group-hover:text-violet-600 transition-colors pr-8">
          {faq.question}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-violet-600 rotate-180' : 'bg-gray-100 group-hover:bg-violet-100'}`}>
          <svg
            className={`w-4 h-4 transition-colors ${isOpen ? 'text-white' : 'text-gray-600 group-hover:text-violet-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
      >
        <p className="text-gray-600 leading-relaxed pr-16">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = activeCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-50 to-white pointer-events-none"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-200/30 via-fuchsia-200/20 to-violet-200/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help Center
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Frequently Asked
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Questions</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Find answers to common questions about ProofLayer. Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>

            {/* Search-like visual (decorative) */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full px-6 py-4 pl-14 bg-white border border-gray-200 rounded-2xl shadow-lg shadow-violet-500/5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                />
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-lg z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 p-8 lg:p-12">
              {filteredFaqs.map((faq, index) => (
                <FAQAccordion
                  key={index}
                  faq={faq}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-violet-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Still have questions?
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Can&apos;t find the answer you&apos;re looking for? Our team is here to help you get started.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Support
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-all"
                  >
                    Get Started Free
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link href="/features" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                    <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
                      <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    Explore Features
                  </Link>
                  <Link href="/#pricing" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    View Pricing
                  </Link>
                  <Link href="/help" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    Help Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
