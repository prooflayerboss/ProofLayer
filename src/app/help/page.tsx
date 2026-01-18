import Link from 'next/link';

export default function HelpCenter() {
  const sections = [
    {
      title: 'Getting Started',
      description: 'New to ProofLayer? Start here to learn the basics',
      icon: '🚀',
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
      icon: '📁',
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
      icon: '📝',
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
      icon: '✅',
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
      icon: '🎨',
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
      icon: '💜',
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
      icon: '💳',
      articles: [
        { title: 'Plan Comparison', href: '/help/billing/plan-comparison' },
        { title: 'Upgrading Your Plan', href: '/help/billing/upgrading' },
        { title: 'Managing Billing', href: '/help/billing/managing' },
        { title: 'Feature Limits', href: '/help/billing/limits' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ProofLayer
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          How can we help you?
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Everything you need to know about collecting, managing, and showcasing testimonials
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full px-6 py-4 pl-12 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{section.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {section.articles.map((article) => (
                  <li key={article.href}>
                    <Link
                      href={article.href}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{article.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Still need help?</h2>
          <p className="text-lg mb-6 opacity-90">
            Our support team is here to assist you
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="mailto:support@prooflayer.com"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Support
            </a>
            <Link
              href="/dashboard"
              className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
