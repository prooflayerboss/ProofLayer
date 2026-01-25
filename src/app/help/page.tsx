import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Help Center - ProofLayer',
  description: 'Everything you need to know about collecting, managing, and showcasing testimonials with ProofLayer.',
};

export default function HelpCenter() {
  const sections = [
    {
      title: 'Getting Started',
      description: 'New to ProofLayer? Start here to learn the basics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-sky-500 to-blue-600',
      bgLight: 'bg-sky-50',
      textColor: 'text-sky-600',
      articles: [
        { title: 'What is ProofLayer?', href: '/help/getting-started/what-is-prooflayer' },
        { title: 'Quick Start Guide', href: '/help/getting-started/quick-start' },
        { title: 'Account Setup', href: '/help/getting-started/account-setup' },
        { title: 'Understanding Plans & Pricing', href: '/help/getting-started/plans-pricing' },
      ],
    },
    {
      title: 'Workspaces',
      description: 'Organize your testimonials by brand or project',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'from-violet-500 to-purple-600',
      bgLight: 'bg-violet-50',
      textColor: 'text-violet-600',
      articles: [
        { title: 'Creating a Workspace', href: '/help/workspaces/creating-workspace' },
        { title: 'Workspace Settings', href: '/help/workspaces/workspace-settings' },
        { title: 'Managing Multiple Workspaces', href: '/help/workspaces/multiple-workspaces' },
        { title: 'Workspace Branding', href: '/help/workspaces/branding' },
      ],
    },
    {
      title: 'Forms',
      description: 'Create and customize testimonial collection forms',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      articles: [
        { title: 'Creating Your First Form', href: '/help/forms/creating-form' },
        { title: 'Form Customization', href: '/help/forms/customization' },
        { title: 'Collection Preferences', href: '/help/forms/collection-preferences' },
        { title: 'Submission Types', href: '/help/forms/submission-types' },
        { title: 'Sharing Your Form', href: '/help/forms/sharing' },
      ],
    },
    {
      title: 'Submissions',
      description: 'Manage and moderate testimonial submissions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
      articles: [
        { title: 'Managing Submissions', href: '/help/submissions/managing' },
        { title: 'Approving & Rejecting', href: '/help/submissions/moderation' },
        { title: 'Text Testimonials', href: '/help/submissions/text' },
        { title: 'Video Testimonials', href: '/help/submissions/video' },
        { title: 'Screenshot Testimonials', href: '/help/submissions/screenshots' },
      ],
    },
    {
      title: 'Widgets',
      description: 'Embed testimonials on your website',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      color: 'from-pink-500 to-rose-600',
      bgLight: 'bg-pink-50',
      textColor: 'text-pink-600',
      articles: [
        { title: 'Widget Overview', href: '/help/widgets/overview' },
        { title: 'Creating a Widget', href: '/help/widgets/creating' },
        { title: 'Widget Layouts', href: '/help/widgets/layouts' },
        { title: 'Embedding Widgets', href: '/help/widgets/embedding' },
        { title: 'Widget Customization', href: '/help/widgets/customization' },
      ],
    },
    {
      title: 'Wall of Love',
      description: 'Your public testimonial showcase page',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'from-red-500 to-pink-600',
      bgLight: 'bg-red-50',
      textColor: 'text-red-600',
      articles: [
        { title: 'What is Wall of Love?', href: '/help/wall-of-love/overview' },
        { title: 'Customizing Your Page', href: '/help/wall-of-love/customization' },
        { title: 'Sharing Your Wall', href: '/help/wall-of-love/sharing' },
        { title: 'SEO & Performance', href: '/help/wall-of-love/seo' },
      ],
    },
    {
      title: 'Billing & Plans',
      description: 'Manage your subscription and billing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      color: 'from-slate-600 to-slate-800',
      bgLight: 'bg-slate-100',
      textColor: 'text-slate-600',
      articles: [
        { title: 'Plan Comparison', href: '/help/billing/plan-comparison' },
        { title: 'Upgrading Your Plan', href: '/help/billing/upgrading' },
        { title: 'Managing Billing', href: '/help/billing/managing' },
        { title: 'Feature Limits', href: '/help/billing/limits' },
      ],
    },
  ];

  const popularArticles = [
    { title: 'Quick Start Guide', href: '/help/getting-started/quick-start', category: 'Getting Started' },
    { title: 'Embedding Widgets', href: '/help/widgets/embedding', category: 'Widgets' },
    { title: 'Creating Your First Form', href: '/help/forms/creating-form', category: 'Forms' },
    { title: 'Plan Comparison', href: '/help/billing/plan-comparison', category: 'Billing' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 transition-transform group-hover:scale-105">
                <Image
                  src="/logos/prooflayer-icon-only.svg"
                  alt="ProofLayer"
                  width={36}
                  height={36}
                  className="w-full h-full"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">
                ProofLayer
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Dashboard
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>

        {/* Subtle glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border border-white/10">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Help Center
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
            How can we help?
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto mb-10">
            Find answers, learn best practices, and get the most out of ProofLayer.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for articles..."
                className="w-full px-5 py-4 pl-12 text-base rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:bg-white/15 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="relative -mt-8 z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-900/5 border border-gray-100 p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Popular Articles
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {popularArticles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-500">{article.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-lg`}>
                    {section.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-800">
                      {section.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Articles List */}
              <div className="px-6 pb-6">
                <div className="border-t border-gray-100 pt-4">
                  <ul className="space-y-1">
                    {section.articles.map((article) => (
                      <li key={article.href}>
                        <Link
                          href={article.href}
                          className={`flex items-center gap-2 py-2 px-3 -mx-3 rounded-lg text-gray-600 hover:${section.bgLight} hover:${section.textColor} transition-colors group/link`}
                        >
                          <svg className="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-sm group-hover/link:-translate-x-0 translate-x-[-24px] transition-transform">
                            {article.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>

          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="relative px-8 py-14 sm:px-14 sm:py-16 text-center">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
              Our support team is here to help. Reach out and we'll get back to you as soon as possible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@prooflayer.com"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <a
                href="https://x.com/hookahhd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/10"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Message on X
              </a>
            </div>

            <p className="text-sm text-slate-400 mt-6">
              Typical response time: within 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logos/prooflayer-icon-only.svg"
                alt="ProofLayer"
                width={24}
                height={24}
              />
              <span className="font-semibold text-gray-900">ProofLayer</span>
            </Link>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/features" className="hover:text-gray-900 transition-colors">Features</Link>
              <Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
              <Link href="/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
