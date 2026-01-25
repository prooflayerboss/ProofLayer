import Link from 'next/link';
import { Check, Zap } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Pricing - ProofLayer',
  description: 'Simple, transparent lifetime pricing. Pay once, own forever.',
};

const pricingTiers = [
  {
    name: 'Free',
    price: 0,
    earlyBirdPrice: 0,
    description: 'Get started with no commitment',
    features: [
      '1 Workspace',
      '1 Form',
      '25 Testimonials',
      'Video & Text Testimonials',
      'Grid Layout Widget',
      'Embed Widget',
      'Email Notifications',
    ],
    cta: 'Start Free',
    popular: false,
    isFree: true,
  },
  {
    name: 'Solo',
    price: 59,
    earlyBirdPrice: 49,
    description: 'Perfect for freelancers and solo entrepreneurs',
    features: [
      '1 Workspace',
      '3 Forms',
      '150 Testimonials',
      'Video & Text Testimonials',
      'Custom Branding',
      'Embed Widgets',
      'Email Notifications',
      'Basic Analytics',
    ],
    cta: 'Get Solo',
    popular: false,
  },
  {
    name: 'Professional',
    price: 118,
    earlyBirdPrice: 79,
    description: 'Ideal for growing businesses and professionals',
    features: [
      '3 Workspaces',
      '30 Forms',
      '1,000 Testimonials',
      'Video & Text Testimonials',
      'Custom Branding',
      'Advanced Embed Widgets',
      'Email Notifications',
      'Advanced Analytics',
      'Priority Support',
      'Custom CSS',
    ],
    cta: 'Get Professional',
    popular: true,
  },
  {
    name: 'Agency',
    price: 177,
    earlyBirdPrice: 118,
    description: 'Built for agencies managing multiple clients',
    features: [
      '10 Workspaces',
      '50 Forms',
      '5,000 Testimonials',
      'Video & Text Testimonials',
      'White Label Options',
      'All Widget Types',
      'Email Notifications',
      'Advanced Analytics',
      'Priority Support',
      'Custom CSS & JavaScript',
      'API Access',
      'Dedicated Account Manager',
    ],
    cta: 'Get Agency',
    popular: false,
  },
];

const comparisonFeatures = [
  { category: 'Workspace & Forms', features: ['Workspaces', 'Forms per workspace', 'Total testimonials'] },
  { category: 'Collection', features: ['Video testimonials', 'Text testimonials', 'Custom branding', 'Thank you page'] },
  { category: 'Display', features: ['Embed widgets', 'Wall of Love', 'Custom CSS', 'Custom JavaScript'] },
  { category: 'Management', features: ['Email notifications', 'Analytics', 'Team members', 'API access'] },
  { category: 'Support', features: ['Email support', 'Priority support', 'Account manager'] },
];

const comparisonData = {
  Workspaces: ['1', '1', '3', '10'],
  'Forms per workspace': ['1', '3', '30', '50'],
  'Total testimonials': ['25', '150', '1,000', '5,000'],
  'Video testimonials': [true, true, true, true],
  'Text testimonials': [true, true, true, true],
  'Custom branding': [false, true, true, true],
  'Thank you page': [true, true, true, true],
  'Embed widgets': [true, true, true, true],
  'Wall of Love': [true, true, true, true],
  'Custom CSS': [false, false, true, true],
  'Custom JavaScript': [false, false, false, true],
  'Email notifications': [true, true, true, true],
  Analytics: ['Basic', 'Basic', 'Advanced', 'Advanced'],
  'Team members': ['1', '1', '3', '10'],
  'API access': [false, false, false, true],
  'Email support': [true, true, true, true],
  'Priority support': [false, false, true, true],
  'Account manager': [false, false, false, true],
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Launch Pricing Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-3 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white font-semibold text-sm sm:text-base">
              ⚡ <strong>Launch Special:</strong> Save up to $59 on lifetime access - First 30 days only!
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Lifetime Access - Pay Once, Own Forever
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              No monthly fees. No hidden charges. Choose your plan and get lifetime access to ProofLayer.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-8">
          <div className="grid md:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 ${
                  tier.popular
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl border-4 border-blue-400 transform md:scale-105'
                    : 'isFree' in tier && tier.isFree
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 shadow-lg'
                    : 'bg-white border-2 border-gray-200 shadow-lg'
                } relative`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap shadow">
                    MOST POPULAR
                  </div>
                )}
                {'isFree' in tier && tier.isFree && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap shadow">
                    FREE FOREVER
                  </div>
                )}

                <div className="mb-6 mt-2">
                  <h3 className={`text-xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-xs ${tier.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  {'isFree' in tier && tier.isFree ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-green-600">$0</span>
                      </div>
                      <span className="text-xs text-gray-500">No credit card required</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-sm line-through ${tier.popular ? 'text-blue-200' : 'text-gray-500'}`}>
                          ${tier.price}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-bold ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                          ${tier.earlyBirdPrice}
                        </span>
                      </div>
                      <span className={`text-xs ${tier.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                        One-time · Launch price
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  href="/signup"
                  className={`block w-full text-center py-3 px-4 rounded-lg font-semibold mb-6 transition-all text-sm ${
                    tier.popular
                      ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
                      : 'isFree' in tier && tier.isFree
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md'
                  }`}
                >
                  {tier.cta}
                </Link>

                <div className="space-y-2">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check
                        className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                          tier.popular ? 'text-blue-200' :
                          'isFree' in tier && tier.isFree ? 'text-green-500' :
                          'text-blue-600'
                        }`}
                      />
                      <span className={`text-xs ${tier.popular ? 'text-blue-50' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Money-Back Guarantee Badge */}
          <div className="flex justify-center mt-10">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-full px-6 py-3 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-green-800 font-semibold">60-Day Money-Back Guarantee</p>
                <p className="text-green-600 text-sm">Not satisfied? Get a full refund, no questions asked.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Compare All Features
            </h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                      {pricingTiers.map((tier) => (
                        <th key={tier.name} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                          {tier.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisonFeatures.map((section) => (
                      <>
                        <tr key={section.category} className="bg-gray-50">
                          <td colSpan={5} className="px-6 py-3 text-sm font-semibold text-gray-900">
                            {section.category}
                          </td>
                        </tr>
                        {section.features.map((feature) => (
                          <tr key={feature} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-700">{feature}</td>
                            {comparisonData[feature as keyof typeof comparisonData].map((value, idx) => (
                              <td key={idx} className="px-6 py-4 text-center text-sm">
                                {typeof value === 'boolean' ? (
                                  value ? (
                                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )
                                ) : (
                                  <span className="text-gray-900 font-medium">{value}</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is this really a one-time payment?
              </h3>
              <p className="text-gray-700">
                Yes! You pay once and get lifetime access. No recurring charges, no hidden fees. Your account stays active forever.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade later?
              </h3>
              <p className="text-gray-700">
                You can upgrade to a higher plan at any time by paying the difference. Downgrades are not available as these are lifetime purchases.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if I need more testimonials?
              </h3>
              <p className="text-gray-700">
                Each plan includes generous testimonial limits. If you reach your limit, you can upgrade to a higher plan or contact us for custom enterprise pricing.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-700">
                Yes! We offer a 60-day money-back guarantee. If you're not satisfied, we'll refund your purchase, no questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Collecting Testimonials?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start free today. No credit card required.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              Start Free →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
