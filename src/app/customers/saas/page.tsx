import Link from 'next/link';
import { Rocket, TrendingUp, Shield } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'ProofLayer for SaaS - Turn Testimonials Into Conversions',
  description: 'Perfect for SaaS companies. Collect and showcase customer testimonials to increase conversions and reduce churn.',
};

export default function SaaSPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Rocket className="h-4 w-4" />
              Built for SaaS
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Social Proof That
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Converts Visitors to Customers
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your product is great. Now show the world. Collect customer testimonials and display them where they matter most—on your landing pages, pricing pages, and checkout flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started - $118
              </Link>
              <Link
                href="/pricing"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all shadow-md border-2 border-gray-200"
              >
                View All Plans
              </Link>
            </div>
          </div>
        </div>

        {/* Why SaaS Companies Love ProofLayer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why SaaS Companies Choose ProofLayer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Increase Conversions</h3>
              <p className="text-gray-600">
                Testimonials can increase conversion rates by up to 34%. Show prospects that real people love your product.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Build Trust Instantly</h3>
              <p className="text-gray-600">
                88% of consumers trust online testimonials as much as personal recommendations. Give them the proof they need.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">One-Time Payment</h3>
              <p className="text-gray-600">
                $118 once. No monthly fees. Your MRR is precious—don't waste it on testimonial tools you should own.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Where to Use Testimonials in Your SaaS
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Strategic placement of social proof can dramatically improve your key metrics.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Landing Pages</h3>
                <p className="text-gray-600 mb-4">
                  Show testimonials above the fold to instantly build credibility and reduce bounce rates.
                </p>
                <span className="text-sm text-blue-600 font-medium">↑ 25% average conversion lift</span>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Pricing Pages</h3>
                <p className="text-gray-600 mb-4">
                  Overcome pricing objections by showing how much value customers get from your product.
                </p>
                <span className="text-sm text-blue-600 font-medium">↑ 18% higher plan upgrades</span>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Checkout Flow</h3>
                <p className="text-gray-600 mb-4">
                  Reduce cart abandonment by reassuring customers right before they commit.
                </p>
                <span className="text-sm text-blue-600 font-medium">↓ 15% abandonment rate</span>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Feature Pages</h3>
                <p className="text-gray-600 mb-4">
                  Highlight specific features with testimonials from customers who love them.
                </p>
                <span className="text-sm text-blue-600 font-medium">↑ 30% feature adoption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Plan Features */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything Your SaaS Needs
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">3 Workspaces</h4>
                  <p className="text-sm text-gray-600">Separate testimonials by product/service</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">30 Forms</h4>
                  <p className="text-sm text-gray-600">Target different customer segments</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">1,000 Testimonials</h4>
                  <p className="text-sm text-gray-600">Scale as your customer base grows</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">No Branding</h4>
                  <p className="text-sm text-gray-600">Keep your testimonials on-brand</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">Multiple Widget Styles</h4>
                  <p className="text-sm text-gray-600">Grid, carousel, marquee layouts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">Easy Integration</h4>
                  <p className="text-sm text-gray-600">Works with React, Vue, Next.js, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Boost Conversions?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join SaaS companies using ProofLayer to turn social proof into revenue.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              Get Professional Plan - $118
            </Link>
            <p className="text-sm text-blue-100 mt-4">One-time payment • Lifetime access</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
