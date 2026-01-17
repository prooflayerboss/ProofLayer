import Link from 'next/link';
import { Mail, MessageSquare } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Contact Us - ProofLayer',
  description: 'Get in touch with the ProofLayer team. We\'re here to help!',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Get help with technical issues, billing questions, or general inquiries.
                </p>
                <a
                  href="mailto:support@prooflayer.app"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  support@prooflayer.app
                </a>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Feedback & Suggestions</h3>
                <p className="text-gray-600 mb-4">
                  We're always looking to improve. Share your ideas with us.
                </p>
                <a
                  href="mailto:support@prooflayer.app"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  support@prooflayer.app
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Need Help Getting Started?</h2>
              <p className="text-blue-100 mb-6">
                Check out our FAQ page for answers to common questions.
              </p>
              <Link
                href="/faq"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
