import Link from 'next/link';
import { Users, Briefcase, Zap } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'ProofLayer for Agencies - Manage Client Testimonials',
  description: 'Perfect for agencies managing multiple clients. Get 10 workspaces and 5,000 testimonials with our Agency plan.',
};

export default function AgenciesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Briefcase className="h-4 w-4" />
              Built for Agencies
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Manage Testimonials for
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                All Your Clients
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              One platform to collect and showcase testimonials for every client. Separate workspaces, branded forms, and unlimited possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started - $177
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

        {/* Why Agencies Love ProofLayer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Agencies Choose ProofLayer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">10 Separate Workspaces</h3>
              <p className="text-gray-600">
                Manage each client in their own isolated workspace. No confusion, complete organization.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">White Label Ready</h3>
              <p className="text-gray-600">
                Custom branding for each client. Your clients see their brand, not yours.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">One-Time Payment</h3>
              <p className="text-gray-600">
                Pay $177 once, use forever. No per-client fees, no monthly charges to track.
              </p>
            </div>
          </div>
        </div>

        {/* Agency Plan Features */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Everything Your Agency Needs
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">10 Workspaces</h4>
                    <p className="text-sm text-gray-600">One per client or project</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">50 Forms Total</h4>
                    <p className="text-sm text-gray-600">Multiple forms per client</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">5,000 Testimonials</h4>
                    <p className="text-sm text-gray-600">Plenty for all clients</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Priority Support</h4>
                    <p className="text-sm text-gray-600">Faster response times</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Custom Branding</h4>
                    <p className="text-sm text-gray-600">Match each client's brand</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">All Widget Types</h4>
                    <p className="text-sm text-gray-600">Grid, carousel, popup, floating</p>
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
              Ready to Scale Your Agency?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join agencies using ProofLayer to deliver better results for their clients.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              Get Agency Plan - $177
            </Link>
            <p className="text-sm text-blue-100 mt-4">60-day money-back guarantee</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
