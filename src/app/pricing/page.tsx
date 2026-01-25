'use client';

import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

const pricingTiers = [
  {
    name: 'Free Listing',
    price: 0,
    description: 'Get started at no cost',
    features: [
      'Basic product listing',
      'Early adopter matching',
      'Basic testimonial form',
      '10 submissions/month',
      '1 embed widget',
    ],
    cta: 'List for free',
    ctaHref: '/founders',
    popular: false,
    isFree: true,
  },
  {
    name: 'Starter',
    price: 49,
    description: 'Get noticed',
    features: [
      'Everything in Free',
      'Featured listing (1 week)',
      '1 weekly digest feature',
      'Unlimited testimonials',
      'All widget layouts',
    ],
    cta: 'Get started',
    ctaHref: '/founders',
    popular: false,
  },
  {
    name: 'Growth',
    price: 149,
    description: 'Reach more users',
    features: [
      'Everything in Starter',
      '4 weekly digest features',
      '"Hot Pick" badge',
      'Priority matching',
      'Video testimonials',
      'Analytics dashboard',
    ],
    cta: 'Choose Growth',
    ctaHref: '/founders',
    popular: true,
  },
  {
    name: 'Launch',
    price: 299,
    description: 'Full launch support',
    features: [
      'Everything in Growth',
      'Social post to our audience',
      'Founder spotlight email',
      'Custom branding',
      'Priority support',
    ],
    cta: 'Choose Launch',
    ctaHref: '/founders',
    popular: false,
  },
  {
    name: 'Concierge',
    price: null,
    description: 'We handle everything',
    features: [
      'Full launch strategy',
      'We write your copy',
      'ProofLayer setup done for you',
      '4-week campaign',
      'Dedicated support',
    ],
    cta: "Let's talk",
    ctaHref: 'mailto:curtis@prooflayer.app?subject=Concierge%20Plan%20Inquiry',
    popular: false,
    isPremium: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0b]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative py-20 sm:py-28 overflow-hidden">
          {/* Background gradient effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00d084]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 text-[#00d084] text-sm font-medium mb-6">
              <span className="w-8 h-px bg-[#00d084]" />
              PRICING
              <span className="w-8 h-px bg-[#00d084]" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Choose your path
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
              Every plan includes testimonial collection + display widgets. One-time payment, own forever.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  tier.popular
                    ? 'bg-[#00d084] text-white'
                    : tier.isPremium
                    ? 'bg-white/[0.03] border border-white/10'
                    : 'bg-white/[0.03] border border-white/10'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#0a0a0b] text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    MOST POPULAR
                  </div>
                )}
                {tier.isPremium && (
                  <div className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
                    <Sparkles className="w-3 h-3" />
                    PREMIUM
                  </div>
                )}

                <div className="mb-4">
                  <h3 className={`text-lg font-bold mb-1 ${tier.popular ? 'text-white' : 'text-white'}`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    {tier.price === null ? (
                      <span className={`text-3xl font-bold ${tier.popular ? 'text-white' : 'text-white'}`}>
                        Custom
                      </span>
                    ) : tier.price === 0 ? (
                      <span className={`text-3xl font-bold ${tier.popular ? 'text-white' : 'text-white'}`}>
                        $0
                      </span>
                    ) : (
                      <span className={`text-3xl font-bold ${tier.popular ? 'text-white' : 'text-white'}`}>
                        ${tier.price}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${tier.popular ? 'text-white/80' : 'text-white/50'}`}>
                    {tier.description}
                  </p>
                </div>

                <div className="flex-1 space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check
                        className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                          tier.popular ? 'text-white' : 'text-[#00d084]'
                        }`}
                      />
                      <span className={`text-sm ${tier.popular ? 'text-white/90' : 'text-white/70'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={tier.ctaHref}
                  className={`block w-full text-center py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                    tier.popular
                      ? 'bg-[#0a0a0b] text-white hover:bg-black'
                      : tier.isPremium
                      ? 'bg-white text-[#0a0a0b] hover:bg-white/90'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Guarantee Badge */}
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-full px-6 py-3">
              <div className="w-10 h-10 bg-[#00d084]/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">60-Day Money-Back Guarantee</p>
                <p className="text-white/50 text-xs">Not satisfied? Full refund, no questions asked.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-white/5 py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Is this really a one-time payment?
                </h3>
                <p className="text-white/60">
                  Yes! You pay once and get lifetime access. No recurring charges, no hidden fees.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  What's included in all plans?
                </h3>
                <p className="text-white/60">
                  Every plan includes testimonial collection forms, display widgets for your website, and access to early adopters in your category.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Can I upgrade later?
                </h3>
                <p className="text-white/60">
                  Absolutely! You can upgrade to a higher plan at any time by paying the difference.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  What's the Concierge plan?
                </h3>
                <p className="text-white/60">
                  Concierge is our done-for-you service. We handle everything from strategy to execution, including writing your copy and running your campaign.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-white/5 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to get your first users?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              List your product for free and start connecting with early adopters today.
            </p>
            <Link
              href="/founders"
              className="inline-flex items-center gap-2 bg-[#00d084] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all"
            >
              Get Started Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
