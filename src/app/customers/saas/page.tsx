import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'ProofLayer for SaaS - Turn Testimonials Into Conversions',
  description: 'Perfect for SaaS companies. Collect and showcase customer testimonials to increase conversions and reduce churn.',
};

export default function SaaSPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Built for SaaS
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
                Social proof that
                <br />
                <span className="text-violet-200">converts visitors</span>
              </h1>

              <p className="text-xl text-violet-100 max-w-2xl mx-auto mb-12">
                Your product is great. Now show the world. Display testimonials on landing pages, pricing pages, and checkout flow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-violet-50 transition-all shadow-lg"
                >
                  Get Pro Plan - $118
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

              <p className="text-violet-200 text-sm mt-6">One-time payment. No MRR wasted on tools.</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: '3', label: 'Workspaces' },
                { value: '30', label: 'Forms' },
                { value: '1,000', label: 'Testimonials' },
                { value: '$118', label: 'One-time' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl lg:text-5xl font-bold text-violet-600 mb-2">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why SaaS Companies Choose ProofLayer</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Strategic social proof to increase conversions across your entire funnel.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Increase Conversions',
                  description: 'Testimonials can increase conversion rates by up to 34%. Show real people love your product.',
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                  gradient: 'from-violet-500 to-purple-600',
                },
                {
                  title: 'Build Trust Instantly',
                  description: '88% of consumers trust testimonials as much as personal recommendations.',
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  gradient: 'from-fuchsia-500 to-pink-600',
                },
                {
                  title: 'One-Time Payment',
                  description: '$118 once. No monthly fees eating into your precious MRR.',
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  gradient: 'from-emerald-500 to-teal-600',
                },
              ].map((feature) => (
                <div key={feature.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-violet-200 hover:shadow-xl transition-all duration-300">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Where to Use Testimonials in Your SaaS</h2>
              <p className="text-gray-600">Strategic placement drives conversions at every stage.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Landing Pages', desc: 'Show testimonials above the fold to instantly build credibility.', metric: '↑ 25% conversion lift' },
                { title: 'Pricing Pages', desc: 'Overcome pricing objections by showing customer value.', metric: '↑ 18% higher upgrades' },
                { title: 'Checkout Flow', desc: 'Reduce abandonment by reassuring customers at purchase.', metric: '↓ 15% abandonment' },
                { title: 'Feature Pages', desc: 'Highlight features with testimonials from users who love them.', metric: '↑ 30% feature adoption' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <span className="text-sm font-semibold text-violet-600">{item.metric}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
              <div className="relative">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready to Boost Conversions?
                </h2>
                <p className="text-xl text-violet-100 mb-10 max-w-2xl mx-auto">
                  Join SaaS companies using ProofLayer to turn social proof into revenue.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-violet-50 transition-all shadow-lg"
                >
                  Get Professional Plan - $118
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <p className="mt-6 text-violet-200 text-sm">
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
