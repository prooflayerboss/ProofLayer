import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopify Integration - ProofLayer',
  description: 'Add ProofLayer testimonials to your Shopify store. Step-by-step installation guide for product pages, homepages, and more.',
  openGraph: {
    title: 'Shopify Integration - ProofLayer',
    description: 'Add ProofLayer testimonials to your Shopify store. Step-by-step installation guide for product pages, homepages, and more.',
  },
};

export default function ShopifyIntegrationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Integrations
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#96bf48] rounded-xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.337 3.415c-.167-.015-.334-.03-.502-.03-.67 0-1.169.167-1.503.502-.334.334-.501.835-.501 1.503v.67h-1.336v1.67h1.336v6.68h2.006v-6.68h1.336l.167-1.67h-1.503v-.502c0-.334.083-.501.334-.501.167 0 .334 0 .501.083l.167-1.587c-.167-.083-.334-.138-.502-.138z"/>
                  <path d="M20.849 5.585c-.028-.334-.334-.612-.668-.64l-2.342-.278-1.642-1.642c-.111-.139-.306-.222-.5-.222-.056 0-.111 0-.167.028l-.89.278V2.5c0-.139-.028-.25-.111-.334-.083-.111-.194-.166-.334-.166h-2.59c-.25 0-.445.194-.445.445v1.17l-1.002.305c-.028 0-.056.028-.084.028-.194.083-.305.278-.305.5v.028l-.14 1.392-2.34.278c-.334.028-.612.306-.64.64L5.61 21.055c-.028.167.028.334.139.445.111.111.278.167.445.139l7.147-.89 7.147.89c.028 0 .028 0 .056 0 .139 0 .278-.056.389-.167.111-.111.167-.278.139-.445l-1.223-15.442zm-8.786 12.991l-4.252.528.917-11.744 2.034-.25v.583c0 .25.194.445.445.445.028 0 .056 0 .084 0l1.085-.334-.313 10.772zm6.618.835l-5.342-.668.306-10.493 1.085.334c.028 0 .056 0 .084 0 .25 0 .445-.194.445-.445V7.44l2.034.25.917 11.744-.529-.023z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Shopify Integration
                </h1>
                <p className="text-gray-600">Display testimonials in your online store</p>
              </div>
            </div>

            <p className="text-xl text-gray-600 mb-8">
              Add customer testimonials to your Shopify store to boost conversions. Perfect for product pages, homepages, and dedicated testimonial sections.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No app required
              </span>
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Works with all themes
              </span>
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                5 minute setup
              </span>
            </div>
          </div>
        </div>

        {/* Installation Guide */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Method 1: Theme Editor */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
              <h2 className="text-2xl font-bold text-gray-900">Method 1: Using Theme Editor (Recommended)</h2>
            </div>

            <p className="text-gray-600 mb-6">
              The easiest way to add ProofLayer to your Shopify store. No coding required.
            </p>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Step 1: Go to Theme Customizer</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>In your Shopify admin, go to <code className="bg-gray-100 px-2 py-1 rounded text-sm">Online Store → Themes</code></li>
                  <li>Click <strong>Customize</strong> on your current theme</li>
                  <li>Navigate to the page where you want testimonials (e.g., Homepage, Product page)</li>
                </ol>
              </div>

              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Step 2: Add Custom Liquid Section</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Click <strong>Add section</strong> (or <strong>Add block</strong> on product pages)</li>
                  <li>Search for <strong>Custom Liquid</strong> or <strong>Custom HTML</strong></li>
                  <li>Add the section where you want your testimonials</li>
                </ol>
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> If you don't see "Custom Liquid", your theme may call it "Custom HTML" or "Custom content". Most Shopify 2.0 themes include this.
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Step 3: Paste Your Embed Code</h3>
                <p className="text-gray-700 mb-4">Copy this code from your ProofLayer dashboard and paste it into the Custom Liquid section:</p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
{`<!-- ProofLayer Testimonials -->
<div id="prooflayer-widget"></div>
<script
  src="https://www.prooflayer.app/widget.js"
  data-workspace="YOUR_WORKSPACE_ID"
  data-layout="grid"
  data-theme="light">
</script>`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Replace <code className="bg-gray-100 px-2 py-1 rounded">YOUR_WORKSPACE_ID</code> with your actual workspace ID from the ProofLayer dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Method 2: Theme Code */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
              <h2 className="text-2xl font-bold text-gray-900">Method 2: Edit Theme Code</h2>
            </div>

            <p className="text-gray-600 mb-6">
              For more control over placement, you can edit your theme files directly.
            </p>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Adding to Homepage</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Go to <code className="bg-gray-100 px-2 py-1 rounded text-sm">Online Store → Themes → Actions → Edit code</code></li>
                  <li>Find your homepage template (usually <code className="bg-gray-100 px-2 py-1 rounded text-sm">index.liquid</code> or <code className="bg-gray-100 px-2 py-1 rounded text-sm">templates/index.json</code>)</li>
                  <li>Add the embed code where you want testimonials to appear</li>
                </ol>
              </div>

              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Adding to Product Pages</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Navigate to <code className="bg-gray-100 px-2 py-1 rounded text-sm">Sections → main-product.liquid</code></li>
                  <li>Find where you want to add testimonials (usually after the product description)</li>
                  <li>Paste the embed code</li>
                </ol>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Creating a Dedicated Testimonials Page</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>In Shopify admin, go to <code className="bg-gray-100 px-2 py-1 rounded text-sm">Online Store → Pages</code></li>
                  <li>Click <strong>Add page</strong></li>
                  <li>Title it "Customer Reviews" or "Testimonials"</li>
                  <li>Click the <strong>&lt;&gt;</strong> (HTML) button in the content editor</li>
                  <li>Paste your ProofLayer embed code</li>
                  <li>Save and add the page to your navigation</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices for E-Commerce</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Product Page Placement</h3>
                <p className="text-gray-600 text-sm">
                  Place testimonials below the product description but above the "Add to Cart" button fold. This builds trust right before purchase.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Use Grid Layout</h3>
                <p className="text-gray-600 text-sm">
                  The grid layout works best for product pages. For homepages, try carousel or marquee for a dynamic feel.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Video Testimonials</h3>
                <p className="text-gray-600 text-sm">
                  Video testimonials convert 2x better for e-commerce. Enable video collection in your ProofLayer forms.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Request Timing</h3>
                <p className="text-gray-600 text-sm">
                  Use email automation to request testimonials 7-14 days after delivery. Customers are happiest then.
                </p>
              </div>
            </div>
          </div>

          {/* Layout Recommendations */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Layouts by Page</h2>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Page Type</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Best Layout</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Homepage</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Carousel or Marquee</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Eye-catching, doesn't take too much space</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Product Page</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Grid (2-3 columns)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Shows multiple testimonials, builds trust</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Testimonials Page</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Masonry or List</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Showcases all testimonials beautifully</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Cart/Checkout</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Spotlight (single)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Minimal distraction, reinforces purchase</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Troubleshooting */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Widget not showing in Theme Editor preview?</h3>
                <p className="text-gray-600 text-sm">
                  Some themes block external scripts in the editor preview. Save your changes and view the live page to see the widget.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Content Security Policy errors?</h3>
                <p className="text-gray-600 text-sm">
                  If you see CSP errors in the console, you may need to add <code className="bg-gray-100 px-2 py-1 rounded">prooflayer.app</code> to your store's allowed domains. Contact Shopify support for help with this.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Theme doesn't have Custom Liquid?</h3>
                <p className="text-gray-600 text-sm">
                  Older themes (Shopify 1.0) may not have this. You'll need to edit theme code directly or upgrade to a Shopify 2.0 theme.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Boost Your Store's Conversions?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Start collecting and displaying customer testimonials today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all"
              >
                Get Started Free
              </Link>
              <a
                href="mailto:support@prooflayer.app"
                className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
