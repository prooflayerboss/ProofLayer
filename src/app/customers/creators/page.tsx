import Link from 'next/link';
import { Video, Users, Sparkles } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'ProofLayer for Course Creators - Build Trust & Sell More Courses',
  description: 'Perfect for course creators and educators. Showcase student success stories and testimonials to increase course enrollments.',
};

export default function CreatorsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Video className="h-4 w-4" />
              Built for Creators
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Let Student Success
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Sell Your Courses
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your students got results. Show the world. Collect testimonials and transformation stories to prove your course delivers real value.
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

        {/* Why Course Creators Love ProofLayer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Course Creators Choose ProofLayer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Showcase Transformations</h3>
              <p className="text-gray-600">
                Before/after stories sell better than features. Let students share their wins and watch enrollments grow.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Build Social Proof</h3>
              <p className="text-gray-600">
                90% of people trust peer recommendations. Turn happy students into your most powerful marketing asset.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Video Testimonials</h3>
              <p className="text-gray-600">
                Video testimonials convert 2x better than text. Make it easy for students to record and share theirs.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Where to Display Testimonials
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Strategic placement of student success stories can dramatically increase your course sales.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Sales Pages</h3>
                <p className="text-gray-600 mb-4">
                  Show testimonials throughout your sales page to overcome objections and build trust at every step.
                </p>
                <span className="text-sm text-blue-600 font-medium">↑ 35% conversion rate increase</span>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Course Landing Pages</h3>
                <p className="text-gray-600 mb-4">
                  Feature success stories above the fold to instantly prove your course delivers results.
                </p>
                <span className="text-sm text-blue-600 font-medium">↑ 28% enrollment increase</span>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Checkout Pages</h3>
                <p className="text-gray-600 mb-4">
                  Reduce cart abandonment by showing testimonials right before the purchase decision.
                </p>
                <span className="text-sm text-blue-600 font-medium">↓ 20% cart abandonment</span>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Email Campaigns</h3>
                <p className="text-gray-600 mb-4">
                  Include testimonials in your email sequences to nurture leads and drive conversions.
                </p>
                <span className="text-sm text-blue-600 font-medium">↑ 45% click-through rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Perfect For Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perfect For All Types of Creators
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Online Courses</h3>
              <p className="text-sm text-gray-600">Showcase student transformations and learning outcomes</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Coaching Programs</h3>
              <p className="text-sm text-gray-600">Share client success stories and breakthrough moments</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Membership Sites</h3>
              <p className="text-sm text-gray-600">Display member testimonials to attract new subscribers</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Digital Products</h3>
              <p className="text-sm text-gray-600">Prove your product's value through customer reviews</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Workshops</h3>
              <p className="text-sm text-gray-600">Share attendee feedback and key takeaways</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Masterminds</h3>
              <p className="text-sm text-gray-600">Highlight member results and community impact</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">eBooks & Guides</h3>
              <p className="text-sm text-gray-600">Show how your content helped readers succeed</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Templates & Tools</h3>
              <p className="text-sm text-gray-600">Let customers share their implementation wins</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Everything You Need as a Creator
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Video Testimonials</h4>
                    <p className="text-sm text-gray-600">Students can record directly from their device</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Easy Sharing</h4>
                    <p className="text-sm text-gray-600">Send collection links via email or in-course</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Custom Questions</h4>
                    <p className="text-sm text-gray-600">Ask about specific outcomes and transformations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Automatic Widgets</h4>
                    <p className="text-sm text-gray-600">Embed on any page with one line of code</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Approval Workflow</h4>
                    <p className="text-sm text-gray-600">Review before publishing to your site</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mobile-Friendly</h4>
                    <p className="text-sm text-gray-600">Students can submit from any device</p>
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
              Ready to Showcase Student Success?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join creators using ProofLayer to turn testimonials into course enrollments.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              Get Started for $59
            </Link>
            <p className="text-sm text-blue-100 mt-4">One-time payment • Lifetime access</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
