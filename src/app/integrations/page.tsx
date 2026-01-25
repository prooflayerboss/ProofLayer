import Link from 'next/link';
import { Code, Webhook, Zap, Globe, FileCode, CheckCircle } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Integrations - ProofLayer',
  description: 'Embed ProofLayer anywhere. Simple integrations that work with any website or platform.',
};

const integrations = [
  {
    icon: Code,
    title: 'JavaScript Embed',
    description: 'Add testimonials to any website with a simple script tag. Works with all modern frameworks and CMSs.',
    features: ['One-line installation', 'Automatic updates', 'Customizable styling', 'Lightweight script'],
    available: true,
    docs: '/docs/embed',
  },
  {
    icon: Globe,
    title: 'Direct Links',
    description: 'Share unique collection links via email, social media, or anywhere online to gather testimonials.',
    features: ['QR code generation', 'Custom slugs', 'No signup required', 'Mobile optimized'],
    available: true,
    docs: '/docs/links',
  },
  {
    icon: FileCode,
    title: 'HTML/CSS Export',
    description: 'Export your testimonials as static HTML and CSS for ultimate flexibility and control.',
    features: ['No dependencies', 'SEO friendly', 'Full customization', 'Offline compatible'],
    available: true,
    docs: '/docs/export',
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description: 'Get real-time notifications when new testimonials are submitted to integrate with your workflow.',
    features: ['Real-time updates', 'Custom payloads', 'Retry logic', 'Secure delivery'],
    available: true,
    docs: '/docs/webhooks',
  },
];

const platforms = [
  { name: 'WordPress', compatible: true, note: 'Official plugin available', link: '/integrations/wordpress' },
  { name: 'Shopify', compatible: true, note: 'Step-by-step guide', link: '/integrations/shopify' },
  { name: 'Webflow', compatible: true, note: 'Simple embed code integration', link: null },
  { name: 'Wix', compatible: true, note: 'Use custom HTML element', link: null },
  { name: 'Squarespace', compatible: true, note: 'Add via code injection', link: null },
  { name: 'Framer', compatible: true, note: 'Embed in any component', link: null },
  { name: 'React', compatible: true, note: 'Native component support', link: null },
  { name: 'Next.js', compatible: true, note: 'Server & client components', link: null },
  { name: 'Vue.js', compatible: true, note: 'Simple integration', link: null },
  { name: 'HTML', compatible: true, note: 'Works anywhere HTML works', link: null },
];

const comingSoon = [
  {
    icon: Zap,
    title: 'Zapier Integration',
    description: 'Connect ProofLayer with 5,000+ apps. Automate your testimonial workflow.',
    eta: 'Q2 2026',
  },
  {
    icon: Code,
    title: 'REST API',
    description: 'Full programmatic access to manage testimonials, forms, and widgets.',
    eta: 'Q2 2026',
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="h-4 w-4" />
              Works Everywhere
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Integrations That
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Just Work
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              ProofLayer integrates seamlessly with your existing tools and workflows. No complex setup, no API keys to manage.
            </p>
          </div>
        </div>

        {/* Available Integrations */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Available Now
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {integrations.map((integration) => (
              <div
                key={integration.title}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-lg shadow-md">
                    <integration.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{integration.title}</h3>
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                    <p className="text-gray-600">{integration.description}</p>
                  </div>
                </div>
                <div className="ml-16">
                  <ul className="space-y-2 mb-4">
                    {integration.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={integration.docs}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                  >
                    View Documentation →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Compatibility */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Works With Your Platform
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              ProofLayer works with any platform that supports HTML/JavaScript. Here are some popular platforms we've tested.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {platforms.map((platform) => {
                const content = (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                      {platform.compatible && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{platform.note}</p>
                    {platform.link && (
                      <p className="text-xs text-blue-600 mt-2 font-medium">View Guide →</p>
                    )}
                  </>
                );

                if (platform.link) {
                  return (
                    <Link
                      key={platform.name}
                      href={platform.link}
                      className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-200"
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <div
                    key={platform.name}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Embed Code Preview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Simple Integration
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Add ProofLayer to your website in under 60 seconds. Just copy and paste the embed code.
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm ml-4">index.html</span>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-300">
{`<!-- Add this to your HTML -->
<div id="prooflayer-widget"></div>

<script src="https://prooflayer.com/widget.js"></script>
<script>
  ProofLayer.init({
    workspaceId: 'your-workspace-id',
    layout: 'grid',
    theme: 'light'
  });
</script>`}
                </pre>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/signup"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                Get Your Embed Code
              </Link>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              We're constantly adding new integrations. Here's what's on our roadmap.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {comingSoon.map((integration) => (
                <div
                  key={integration.title}
                  className="bg-white rounded-xl shadow-lg p-8 border-2 border-dashed border-gray-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 text-gray-600 p-3 rounded-lg">
                      <integration.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{integration.title}</h3>
                        <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {integration.eta}
                        </span>
                      </div>
                      <p className="text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start collecting testimonials today. Integrates with your website in minutes.
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
