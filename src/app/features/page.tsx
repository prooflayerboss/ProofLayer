import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Features - ProofLayer',
  description: 'Powerful testimonial management features to help you collect, manage, and showcase social proof.',
};

const mainFeatures = [
  {
    id: 'video',
    title: 'Video Testimonials',
    description: 'Collect authentic video testimonials with our frictionless recording experience. Customers can record directly in their browser or upload existing videos.',
    benefits: ['One-click browser recording', 'Upload existing videos (MP4, MOV, WebM)', 'Auto-generated thumbnails', 'Mobile-optimized experience'],
    gradient: 'from-rose-500 to-pink-600',
    bgGradient: 'from-rose-50 to-pink-50',
    iconBg: 'bg-rose-500',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'text',
    title: 'Text Testimonials',
    description: 'Beautiful forms for written reviews. Collect star ratings, detailed feedback, and customer photos all in one streamlined submission.',
    benefits: ['Customizable form fields', '5-star rating system', 'Customer photo uploads', 'Rich formatting support'],
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-blue-500',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'widgets',
    title: 'Embed Widgets',
    description: 'Stunning, responsive widgets that integrate seamlessly into any website. Zero coding required - just copy and paste.',
    benefits: ['Grid, carousel & list layouts', 'Fully responsive design', 'Custom colors & styling', 'Works on any platform'],
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    iconBg: 'bg-emerald-500',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'forms',
    title: 'Custom Forms',
    description: 'Branded collection forms that match your identity. Customize colors, questions, and messaging to create a seamless experience.',
    benefits: ['Custom colors & branding', 'Flexible question fields', 'Logo & messaging customization', 'Multiple form types'],
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-50 to-purple-50',
    iconBg: 'bg-violet-500',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    id: 'wall',
    title: 'Wall of Love',
    description: 'Create stunning dedicated pages to showcase all your social proof. Perfect for sharing with prospects and on social media.',
    benefits: ['Professional showcase pages', 'Filter by tags & ratings', 'Search functionality', 'Custom branding'],
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 to-orange-50',
    iconBg: 'bg-amber-500',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

const moreFeatures = [
  {
    title: 'Smart Approval',
    description: 'Review and approve testimonials before they go live with one-click actions.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Custom Branding',
    description: 'Match collection forms to your brand with custom colors, logos, and messaging.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Email Notifications',
    description: 'Get instant alerts when new testimonials arrive. Never miss feedback.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: 'Analytics',
    description: 'Track views, submissions, and performance to optimize your strategy.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Team Workspaces',
    description: 'Invite team members and manage multiple brands from one account.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Spam Protection',
    description: 'Built-in spam detection and rate limiting to keep your testimonials authentic.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-[#0A0A0F]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[128px]"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/10">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Built for conversion
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Every feature you need
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
                to build trust
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Collect video and text testimonials, embed beautiful widgets, and manage your social proof - all without monthly fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                Start collecting for free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Features</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to collect, curate, and showcase testimonials that convert.
              </p>
            </div>

            <div className="space-y-24">
              {mainFeatures.map((feature, idx) => (
                <div
                  key={feature.title}
                  id={feature.id}
                  className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center scroll-mt-24`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">{feature.description}</p>
                    <ul className="space-y-4">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className="flex-1 w-full">
                    <div className={`bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 lg:p-12`}>
                      <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-[1.02] transition-transform duration-300">
                        {idx === 0 && (
                          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                              <svg className="w-8 h-8 text-rose-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        {idx === 1 && (
                          <div className="space-y-4">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-6 h-6 text-amber-400 fill-current" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-4/6"></div>
                            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full"></div>
                              <div>
                                <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                                <div className="h-2 bg-gray-200 rounded w-16"></div>
                              </div>
                            </div>
                          </div>
                        )}
                        {idx === 2 && (
                          <div className="grid grid-cols-2 gap-4">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="bg-gray-50 rounded-xl p-4">
                                <div className="flex gap-1 mb-3">
                                  {[...Array(5)].map((_, j) => (
                                    <div key={j} className="w-3 h-3 bg-amber-400 rounded-sm"></div>
                                  ))}
                                </div>
                                <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                              </div>
                            ))}
                          </div>
                        )}
                        {idx === 3 && (
                          <div className="space-y-4">
                            {/* Form mockup */}
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl"></div>
                              <div className="h-5 bg-gray-200 rounded w-32"></div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                                <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                              </div>
                              <div>
                                <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                                <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                              </div>
                              <div>
                                <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                                <div className="h-20 bg-gray-100 rounded-lg w-full"></div>
                              </div>
                            </div>
                            <div className="h-11 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg mt-4"></div>
                          </div>
                        )}
                        {idx === 4 && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                              <div className="h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded w-32"></div>
                              <div className="flex gap-2">
                                <div className="h-8 bg-gray-100 rounded-lg w-20"></div>
                                <div className="h-8 bg-gray-100 rounded-lg w-20"></div>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-3">
                                  <div className="w-6 h-6 bg-gray-300 rounded-full mb-2"></div>
                                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Features Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">And so much more</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Every tool you need to manage your testimonials professionally.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {moreFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 text-gray-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Simple Integration
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Works everywhere
                  <br />
                  <span className="text-blue-400">you build</span>
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Copy-paste a single line of code and your testimonials appear. No technical skills required.
                </p>

                {/* Platform logos */}
                <div className="flex flex-wrap gap-4">
                  {['Webflow', 'WordPress', 'Wix', 'Shopify', 'Squarespace', 'HTML'].map((platform) => (
                    <div
                      key={platform}
                      className="px-5 py-3 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition-colors"
                    >
                      {platform}
                    </div>
                  ))}
                </div>
              </div>

              {/* Code preview */}
              <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-500 text-sm ml-2">embed.html</span>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code className="text-gray-300">
                    <span className="text-gray-500">{`<!-- Add this to your website -->`}</span>
                    {`\n`}
                    <span className="text-pink-400">{`<script`}</span>
                    <span className="text-blue-300">{` src`}</span>
                    <span className="text-white">{`=`}</span>
                    <span className="text-green-400">{`"https://prooflayer.app/embed.js"`}</span>
                    {`\n  `}
                    <span className="text-blue-300">{`data-workspace`}</span>
                    <span className="text-white">{`=`}</span>
                    <span className="text-green-400">{`"your-workspace-id"`}</span>
                    <span className="text-pink-400">{`>`}</span>
                    {`\n`}
                    <span className="text-pink-400">{`</script>`}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]"></div>
              <div className="relative">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready to build trust?
                </h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                  Join thousands of businesses using ProofLayer to showcase authentic customer stories.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
                >
                  Get started for free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <p className="mt-6 text-blue-200 text-sm">
                  No credit card required • Free forever plan available
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
