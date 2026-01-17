import Link from 'next/link';
import { ShoppingCart, Star, TrendingUp } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'ProofLayer for eCommerce - Increase Sales with Social Proof',
  description: 'Perfect for online stores. Collect product reviews and testimonials to increase trust and boost conversions.',
};

export default function EcommercePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ShoppingCart className="h-4 w-4" />
              Built for eCommerce
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Turn Customers Into
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Your Best Salespeople
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              70% of shoppers read reviews before making a purchase. Show them what happy customers are saying and watch your conversion rates soar.
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
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Why eCommerce Stores Love ProofLayer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Online Stores Choose ProofLayer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Increase Product Sales</h3>
              <p className="text-gray-600">
                Products with reviews see 18% higher sales on average. Make every product page a conversion machine.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Build Brand Trust</h3>
              <p className="text-gray-600">
                Showcase customer experiences to overcome skepticism and reduce cart abandonment rates.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Own Your Reviews</h3>
              <p className="text-gray-600">
                Pay once, own forever. Stop renting your reputation with monthly subscription tools.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              The Power of Social Proof in eCommerce
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">93%</div>
                <p className="text-gray-600">of consumers say online reviews influence their purchase decisions</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">270%</div>
                <p className="text-gray-600">increase in purchase likelihood when products have 5 reviews vs. none</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">63%</div>
                <p className="text-gray-600">of customers are more likely to purchase from a site with product ratings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perfect For Any Online Store
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Fashion & Apparel</h3>
              <p className="text-sm text-gray-600">Show fit, quality, and style through customer photos and reviews</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Beauty & Cosmetics</h3>
              <p className="text-sm text-gray-600">Let customers share their before/after results and experiences</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Electronics</h3>
              <p className="text-sm text-gray-600">Build trust with detailed product reviews and ratings</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Home & Garden</h3>
              <p className="text-sm text-gray-600">Showcase how products look in real customer homes</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Jewelry & Accessories</h3>
              <p className="text-sm text-gray-600">Display craftsmanship and quality through testimonials</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Food & Beverage</h3>
              <p className="text-sm text-gray-600">Share taste experiences and product satisfaction</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Sports & Fitness</h3>
              <p className="text-sm text-gray-600">Highlight product performance and durability</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Pet Products</h3>
              <p className="text-sm text-gray-600">Let pet owners share their furry friends' reactions</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Everything Your Store Needs
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Product-Specific Forms</h4>
                    <p className="text-sm text-gray-600">Collect reviews for different products</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Photo & Video Reviews</h4>
                    <p className="text-sm text-gray-600">Let customers show, not just tell</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Star Ratings</h4>
                    <p className="text-sm text-gray-600">Display average ratings at a glance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Easy Shopify Integration</h4>
                    <p className="text-sm text-gray-600">Works perfectly with your store</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Moderation Tools</h4>
                    <p className="text-sm text-gray-600">Approve reviews before publishing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Customizable Widgets</h4>
                    <p className="text-sm text-gray-600">Match your store's branding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Boost Your Sales?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join online stores using ProofLayer to turn reviews into revenue.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              Get Started Today
            </Link>
            <p className="text-sm text-blue-100 mt-4">One-time payment • No monthly fees ever</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
