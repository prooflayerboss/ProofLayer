import Link from 'next/link';
import { User, Zap, DollarSign } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'ProofLayer for Freelancers - Build Trust, Win More Clients',
  description: 'Perfect for freelancers. Collect and showcase testimonials to win more clients. One-time payment, no monthly fees.',
};

export default function FreelancersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <User className="h-4 w-4" />
              Built for Freelancers
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Portfolio Deserves
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Proof That Works
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stop losing clients to freelancers with better testimonials. Build trust, stand out, and win more projects with social proof that converts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started - $59
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

        {/* Why Freelancers Choose ProofLayer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Freelancers Love ProofLayer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pay Once, Own Forever</h3>
              <p className="text-gray-600">
                $59 one-time payment. No monthly subscriptions eating into your freelance income. Your testimonials, your property.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Set Up in Minutes</h3>
              <p className="text-gray-600">
                No technical skills needed. Create your testimonial page, send the link to clients, and start collecting proof.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <User className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Presentation</h3>
              <p className="text-gray-600">
                Showcase testimonials on your portfolio, proposals, or website. Make potential clients feel confident choosing you.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Perfect For Every Type of Freelancer
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Whether you're just starting out or you're an established freelancer, testimonials are your secret weapon.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Designers</h3>
                <p className="text-sm text-gray-600">Show potential clients what past clients loved about your design work</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Developers</h3>
                <p className="text-sm text-gray-600">Prove your code quality and professionalism with real client feedback</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Writers</h3>
                <p className="text-sm text-gray-600">Let your clients' words showcase your writing excellence</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Consultants</h3>
                <p className="text-sm text-gray-600">Build credibility with testimonials from satisfied clients</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Photographers</h3>
                <p className="text-sm text-gray-600">Share client experiences alongside your stunning portfolio</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Marketers</h3>
                <p className="text-sm text-gray-600">Demonstrate real results with testimonials from happy clients</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Video Editors</h3>
                <p className="text-sm text-gray-600">Let clients rave about your editing skills and turnaround times</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Virtual Assistants</h3>
                <p className="text-sm text-gray-600">Highlight your reliability and organizational skills</p>
              </div>
            </div>
          </div>
        </div>

        {/* Solo Plan Features */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need as a Freelancer
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">1 Workspace</h4>
                  <p className="text-sm text-gray-600">Perfect for your freelance business</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">3 Collection Forms</h4>
                  <p className="text-sm text-gray-600">Different forms for different services</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">150 Testimonials</h4>
                  <p className="text-sm text-gray-600">Plenty for most freelancers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">Easy Embed Code</h4>
                  <p className="text-sm text-gray-600">Add to your website in seconds</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">Shareable Links</h4>
                  <p className="text-sm text-gray-600">Send to clients via email or social</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">Approval System</h4>
                  <p className="text-sm text-gray-600">You control what gets published</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Win More Clients?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of freelancers using testimonials to stand out and get hired.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              Get Started for $59
            </Link>
            <p className="text-sm text-blue-100 mt-4">One-time payment • Own it forever</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
