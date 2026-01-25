import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WordPress Integration - ProofLayer',
  description: 'Add ProofLayer testimonials to your WordPress site. Step-by-step installation guide with plugin download.',
  openGraph: {
    title: 'WordPress Integration - ProofLayer',
    description: 'Add ProofLayer testimonials to your WordPress site. Step-by-step installation guide with plugin download.',
  },
};

export default function WordPressIntegrationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Integrations
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#21759b] rounded-xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 19.5c-5.247 0-9.5-4.253-9.5-9.5S6.753 2.5 12 2.5s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5z"/>
                  <path d="M3.5 12c0 4.143 2.812 7.63 6.63 8.652L4.31 7.876A9.45 9.45 0 003.5 12zm15.19-.129c0-1.293-.465-2.188-.864-2.884-.531-.864-.978-1.594-.978-2.456 0-.963.729-1.86 1.759-1.86.046 0 .09.006.135.009A9.43 9.43 0 0012 2.5c-3.475 0-6.531 1.782-8.312 4.48.234.008.454.012.644.012 1.045 0 2.665-.127 2.665-.127.539-.032.603.76.063.823 0 0-.542.064-1.145.095l3.644 10.842 2.19-6.566-1.559-4.276c-.539-.031-1.05-.095-1.05-.095-.54-.032-.476-.855.063-.823 0 0 1.651.127 2.633.127 1.045 0 2.665-.127 2.665-.127.539-.032.603.76.063.823 0 0-.542.064-1.145.095l3.616 10.757.998-3.335c.433-1.385.764-2.378.764-3.236z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  WordPress Integration
                </h1>
                <p className="text-gray-600">Add testimonials to any WordPress site</p>
              </div>
            </div>

            <p className="text-xl text-gray-600 mb-8">
              Display your ProofLayer testimonials on WordPress with our official plugin or simple embed code. Works with any theme including Elementor, Divi, and Gutenberg.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/downloads/prooflayer-wordpress.zip"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Plugin (v1.0.0)
              </a>
              <a
                href="#manual-embed"
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:border-gray-400 transition-all"
              >
                Use Embed Code Instead
              </a>
            </div>
          </div>
        </div>

        {/* Installation Methods */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Method 1: Plugin */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
              <h2 className="text-2xl font-bold text-gray-900">Method 1: WordPress Plugin (Recommended)</h2>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Step 1: Download and Install</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Download the plugin using the button above</li>
                  <li>In your WordPress admin, go to <code className="bg-gray-100 px-2 py-1 rounded text-sm">Plugins → Add New → Upload Plugin</code></li>
                  <li>Choose the downloaded <code className="bg-gray-100 px-2 py-1 rounded text-sm">prooflayer-wordpress.zip</code> file</li>
                  <li>Click <strong>Install Now</strong>, then <strong>Activate</strong></li>
                </ol>
              </div>

              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Step 2: Configure Your Widget</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Go to <code className="bg-gray-100 px-2 py-1 rounded text-sm">Settings → ProofLayer</code></li>
                  <li>Enter your <strong>Workspace ID</strong> (find this in your ProofLayer dashboard under Widgets)</li>
                  <li>Choose your default layout and theme</li>
                  <li>Click <strong>Save Changes</strong></li>
                </ol>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Step 3: Add to Your Pages</h3>
                <p className="text-gray-700 mb-4">Use any of these methods to display testimonials:</p>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Gutenberg Block</h4>
                    <p className="text-sm text-gray-600">Search for "ProofLayer" in the block inserter and add it to any page or post.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Shortcode</h4>
                    <p className="text-sm text-gray-600 mb-2">Add this shortcode anywhere:</p>
                    <code className="block bg-gray-900 text-green-400 px-4 py-2 rounded text-sm">
                      [prooflayer layout="grid" theme="light"]
                    </code>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Widget Area</h4>
                    <p className="text-sm text-gray-600">Go to <code className="bg-gray-100 px-2 py-1 rounded text-sm">Appearance → Widgets</code> and add the ProofLayer widget to any sidebar or footer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Method 2: Manual Embed */}
          <div id="manual-embed" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
              <h2 className="text-2xl font-bold text-gray-900">Method 2: Manual Embed Code</h2>
            </div>

            <p className="text-gray-600 mb-6">
              If you prefer not to use a plugin, you can add ProofLayer directly to your theme or page builder.
            </p>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">For Gutenberg / Block Editor</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Edit your page in the block editor</li>
                  <li>Add a <strong>Custom HTML</strong> block</li>
                  <li>Paste your embed code from the ProofLayer dashboard</li>
                </ol>
              </div>

              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">For Elementor</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Edit your page with Elementor</li>
                  <li>Search for and add an <strong>HTML</strong> widget</li>
                  <li>Paste your embed code</li>
                </ol>
              </div>

              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">For Divi</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Edit your page with Divi Builder</li>
                  <li>Add a <strong>Code</strong> module</li>
                  <li>Paste your embed code</li>
                </ol>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Your Embed Code</h3>
                <p className="text-gray-600 mb-4">Copy this from your ProofLayer dashboard (Widgets section):</p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
{`<!-- ProofLayer Widget -->
<div id="prooflayer-widget"></div>
<script
  src="https://www.prooflayer.app/widget.js"
  data-workspace="YOUR_WORKSPACE_ID"
  data-layout="grid"
  data-theme="light">
</script>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Shortcode Options */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shortcode Options</h2>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Parameter</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Options</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">layout</td>
                    <td className="px-6 py-4 text-sm text-gray-600">grid, list, carousel, masonry, marquee, spotlight</td>
                    <td className="px-6 py-4 text-sm text-gray-600">grid</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">theme</td>
                    <td className="px-6 py-4 text-sm text-gray-600">light, dark</td>
                    <td className="px-6 py-4 text-sm text-gray-600">light</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">animation</td>
                    <td className="px-6 py-4 text-sm text-gray-600">none, fade, slide, hearts</td>
                    <td className="px-6 py-4 text-sm text-gray-600">fade</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">hover</td>
                    <td className="px-6 py-4 text-sm text-gray-600">true, false</td>
                    <td className="px-6 py-4 text-sm text-gray-600">true</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Example:</strong> <code className="bg-blue-100 px-2 py-1 rounded">[prooflayer layout="masonry" theme="dark" animation="slide"]</code>
              </p>
            </div>
          </div>

          {/* Troubleshooting */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Widget not showing?</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>Verify your Workspace ID is correct</li>
                  <li>Check that you have approved testimonials in your dashboard</li>
                  <li>Clear any caching plugins (WP Super Cache, W3 Total Cache, etc.)</li>
                  <li>Check browser console for JavaScript errors</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Styling conflicts?</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>ProofLayer widgets are scoped to avoid conflicts</li>
                  <li>If your theme overrides styles, try adding the widget to a full-width section</li>
                  <li>Contact support if you need custom CSS adjustments</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Performance concerns?</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>The widget script is only 8KB gzipped</li>
                  <li>Testimonials are loaded asynchronously</li>
                  <li>No impact on your Core Web Vitals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our support team is here to help you get set up.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
              >
                Get Started Free
              </Link>
              <a
                href="mailto:support@prooflayer.app"
                className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-all"
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
