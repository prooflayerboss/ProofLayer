import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'ProofLayer for Course Creators - Build Trust & Sell More Courses',
  description: 'Perfect for course creators and educators. Showcase student success stories and testimonials to increase course enrollments.',
};

export default function CreatorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-red-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Built for Creators
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
                Let student success
                <br />
                <span className="text-pink-200">sell your courses</span>
              </h1>

              <p className="text-xl text-pink-100 max-w-2xl mx-auto mb-12">
                Your students got results. Show the world. Collect transformation stories to prove your course delivers real value.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-pink-50 transition-all shadow-lg"
                >
                  Get Started - $59
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
                >
                  View All Plans
                </Link>
              </div>

              <p className="text-pink-200 text-sm mt-6">One-time payment. No subscription trap.</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: '2x', label: 'Video testimonials convert better than text' },
                { value: '90%', label: 'trust peer recommendations' },
                { value: '35%', label: 'conversion lift with testimonials' },
                { value: '$59', label: 'One-time price' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl lg:text-5xl font-bold text-pink-600 mb-2">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Course Creators Choose ProofLayer</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Turn happy students into your most powerful marketing asset.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Showcase Transformations',
                  description: 'Before/after stories sell better than features. Let students share their wins.',
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                  gradient: 'from-pink-500 to-rose-600',
                },
                {
                  title: 'Build Social Proof',
                  description: '90% of people trust peer recommendations. Leverage your community.',
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  gradient: 'from-violet-500 to-purple-600',
                },
                {
                  title: 'Video Testimonials',
                  description: 'Video converts 2x better. Make it easy for students to record and share.',
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  ),
                  gradient: 'from-red-500 to-orange-600',
                },
              ].map((feature) => (
                <div key={feature.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Where to Display Testimonials</h2>
              <p className="text-gray-600">Strategic placement drives enrollments at every stage.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Sales Pages', desc: 'Show testimonials throughout to overcome objections.', metric: '↑ 35% conversion lift' },
                { title: 'Course Landing Pages', desc: 'Feature success stories above the fold.', metric: '↑ 28% enrollment increase' },
                { title: 'Checkout Pages', desc: 'Reduce abandonment right before purchase.', metric: '↓ 20% cart abandonment' },
                { title: 'Email Campaigns', desc: 'Include testimonials to nurture leads.', metric: '↑ 45% click-through rate' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <span className="text-sm font-semibold text-pink-600">{item.metric}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perfect For */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect For All Types of Creators</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Online Courses', desc: 'Showcase student transformations' },
                { title: 'Coaching Programs', desc: 'Share client breakthrough moments' },
                { title: 'Membership Sites', desc: 'Display member testimonials' },
                { title: 'Digital Products', desc: 'Prove product value with reviews' },
                { title: 'Workshops', desc: 'Share attendee feedback' },
                { title: 'Masterminds', desc: 'Highlight member results' },
                { title: 'eBooks & Guides', desc: 'Show how content helped readers' },
                { title: 'Templates & Tools', desc: 'Let customers share wins' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
              <div className="relative">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready to Showcase Student Success?
                </h2>
                <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto">
                  Join creators using ProofLayer to turn testimonials into course enrollments.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-pink-50 transition-all shadow-lg"
                >
                  Get Started for $59
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <p className="mt-6 text-pink-200 text-sm">
                  One-time payment. Lifetime access.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
