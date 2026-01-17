import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Terms of Service - ProofLayer',
  description: 'ProofLayer terms of service and usage agreement.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: January 17, 2026</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using ProofLayer, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">License and Access</h2>
              <p className="text-gray-700 mb-4">
                Upon purchase of a lifetime plan, we grant you a non-exclusive, non-transferable license to use ProofLayer for your business purposes. This license includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Lifetime access to the platform</li>
                <li>All future updates and improvements</li>
                <li>Technical support as specified in your plan</li>
                <li>Data export capabilities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Use the service for any illegal purpose</li>
                <li>Violate any intellectual property rights</li>
                <li>Upload malicious code or viruses</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Resell or redistribute the service without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment and Refunds</h2>
              <p className="text-gray-700 mb-4">
                All lifetime purchases are one-time payments. We offer a 60-day money-back guarantee. If you're not satisfied with ProofLayer, contact us within 60 days of purchase for a full refund.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Ownership</h2>
              <p className="text-gray-700 mb-4">
                You retain all rights to the testimonials and content you collect through ProofLayer. We do not claim ownership of your data. You may export your data at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
              <p className="text-gray-700 mb-4">
                We strive to maintain 99.9% uptime, but we do not guarantee uninterrupted access. We reserve the right to modify or discontinue features with notice to users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                ProofLayer shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-700">
                Questions about these Terms? Contact us at{' '}
                <a href="mailto:support@prooflayer.app" className="text-blue-600 hover:text-blue-700">
                  support@prooflayer.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
