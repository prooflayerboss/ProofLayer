import Link from 'next/link';
import { Video, FileText, Code, Layout, Palette, Bell, BarChart3, Shield, Zap, Users, Star, Globe } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Features - ProofLayer',
  description: 'Powerful testimonial management features to help you collect, manage, and showcase social proof.',
};

const mainFeatures = [
  {
    icon: Video,
    title: 'Video Testimonials',
    description: 'Collect authentic video testimonials from your customers with our easy-to-use recording interface. Support for camera recording and file uploads.',
    benefits: ['One-click recording', 'Upload existing videos', 'Auto-thumbnails', 'Mobile-friendly'],
  },
  {
    icon: FileText,
    title: 'Text Testimonials',
    description: 'Simple forms for written testimonials with customizable fields. Collect ratings, feedback, and customer details all in one place.',
    benefits: ['Custom form fields', 'Star ratings', 'Customer photos', 'Rich text editing'],
  },
  {
    icon: Code,
    title: 'Embed Widgets',
    description: 'Beautiful, responsive widgets that seamlessly integrate into your website. Choose from grid, carousel, or list layouts.',
    benefits: ['Multiple layouts', 'Fully responsive', 'Custom styling', 'No coding required'],
  },
  {
    icon: Layout,
    title: 'Wall of Love',
    description: 'Create stunning testimonial showcase pages to display all your social proof in one beautiful location.',
    benefits: ['Professional design', 'Filter by tags', 'Search functionality', 'Share anywhere'],
  },
  {
    icon: Palette,
    title: 'Custom Branding',
    description: 'Make collection forms match your brand with custom colors, logos, and thank you pages.',
    benefits: ['Custom colors', 'Logo upload', 'Custom thank you pages', 'Brand consistency'],
  },
  {
    icon: Bell,
    title: 'Email Notifications',
    description: 'Get notified instantly when new testimonials are submitted. Never miss important feedback.',
    benefits: ['Instant alerts', 'Multiple recipients', 'Custom templates', 'Submission summaries'],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Track form views, submission rates, and testimonial performance to optimize your collection strategy.',
    benefits: ['Submission tracking', 'Conversion metrics', 'Performance insights', 'Export reports'],
  },
  {
    icon: Shield,
    title: 'Approval Workflow',
    description: 'Review and approve testimonials before they go live. Maintain quality control over your social proof.',
    benefits: ['Manual approval', 'Edit submissions', 'Reject/archive', 'Bulk actions'],
  },
];

const additionalFeatures = [
  { icon: Users, title: 'Team Collaboration', description: 'Invite team members to manage testimonials together' },
  { icon: Star, title: 'Star Ratings', description: 'Collect 5-star ratings alongside testimonials' },
  { icon: Globe, title: 'Shareable Links', description: 'Generate unique links to collect testimonials anywhere' },
  { icon: Zap, title: 'Fast & Reliable', description: 'Lightning-fast performance with 99.9% uptime' },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Everything You Need
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Social Proof Success
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to collect, manage, and showcase testimonials that build trust and drive conversions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started Free
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

        {/* Main Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, idx) => (
              <div
                key={feature.title}
                id={feature.title.toLowerCase().replace(/\s+/g, '-')}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-lg shadow-md">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
                <div className="ml-16">
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-gray-700">
                        <div className="h-1.5 w-1.5 bg-blue-600 rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              And Much More
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {additionalFeatures.map((feature) => (
                <div key={feature.title} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget Showcase Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4" id="widgets">
            Beautiful Embed Widgets
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Showcase your testimonials anywhere on your website with fully customizable, responsive widgets.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-5/6"></div>
              </div>
              <h3 className="font-semibold text-gray-900 text-center">Grid Layout</h3>
              <p className="text-sm text-gray-600 text-center mt-2">Classic card grid display</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
              <div className="flex gap-3 overflow-hidden mb-4">
                <div className="bg-white rounded-lg shadow-md p-4 flex-shrink-0 w-48">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-gray-100 rounded w-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 flex-shrink-0 w-48 opacity-50">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-gray-100 rounded w-full"></div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-center">Carousel</h3>
              <p className="text-sm text-gray-600 text-center mt-2">Scrolling testimonial slider</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
              <div className="space-y-3 mb-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-2 bg-gray-100 rounded w-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-center">List View</h3>
              <p className="text-sm text-gray-600 text-center mt-2">Vertical testimonial list</p>
            </div>
          </div>
        </div>

        {/* Wall of Love Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-16" id="wall">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Your Own Wall of Love
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Create a dedicated page to showcase all your testimonials in one beautiful location. Perfect for sharing with prospects and on social media.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Collecting Testimonials?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses using ProofLayer to build trust and grow faster.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
