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
    name: 'Solo',
    price: 59,
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
  Workspaces: ['1', '3', '10'],
  'Forms per workspace': ['3', '30', '50'],
  'Total testimonials': ['150', '1,000', '5,000'],
  'Video testimonials': [true, true, true],
  'Text testimonials': [true, true, true],
  'Custom branding': [true, true, true],
  'Thank you page': [true, true, true],
  'Embed widgets': [true, true, true],
  'Wall of Love': [true, true, true],
  'Custom CSS': [false, true, true],
  'Custom JavaScript': [false, false, true],
  'Email notifications': [true, true, true],
  Analytics: ['Basic', 'Advanced', 'Advanced'],
  'Team members': ['1', '3', '10'],
  'API access': [false, false, true],
  'Email support': [true, true, true],
  'Priority support': [false, true, true],
  'Account manager': [false, false, true],
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 ${
                  tier.popular
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl border-4 border-blue-400 transform md:scale-105'
                    : 'bg-white border-2 border-gray-200 shadow-lg'
                } relative`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-sm font-bold px-6 py-2 rounded-full whitespace-nowrap shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm ${tier.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                      ${tier.price}
                    </span>
                    <span className={`text-lg ${tier.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                      lifetime
                    </span>
                  </div>
                </div>

                <Link
                  href="/signup"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold mb-8 transition-all ${
                    tier.popular
                      ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md'
                  }`}
                >
                  {tier.cta}
                </Link>

                <div className="space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check
                        className={`h-5 w-5 flex-shrink-0 ${tier.popular ? 'text-blue-200' : 'text-blue-600'}`}
                      />
                      <span className={`text-sm ${tier.popular ? 'text-blue-50' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
                          <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">
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
              Join thousands of businesses using ProofLayer to build trust and grow faster.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
