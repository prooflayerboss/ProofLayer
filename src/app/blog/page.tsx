import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Blog - ProofLayer',
  description: 'Insights on launching products, getting your first users, and building social proof.',
};

const posts = [
  {
    slug: 'introducing-prooflayer-2',
    title: 'Introducing ProofLayer 2.0: A Community Marketplace for Founders',
    excerpt: 'We rebuilt ProofLayer from the ground up. Now it\'s not just about testimonials—it\'s about connecting you with early adopters and proving your product works.',
    date: 'January 24, 2026',
    readTime: '5 min read',
    category: 'Announcement',
    featured: true,
  },
  {
    slug: 'how-i-built-prooflayer',
    title: 'How I Built ProofLayer: From Idea to Launch in 30 Days',
    excerpt: 'The story of building a testimonial collection tool as a solo founder - the tech stack, challenges, and lessons learned along the way.',
    date: 'January 19, 2026',
    readTime: '8 min read',
    category: 'Building in Public',
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPost = posts.find(p => p.featured);
  const otherPosts = posts.filter(p => !p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00d084]/5 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#00d084]/10 via-emerald-100/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-[#00d084] text-sm font-semibold mb-6">
                <div className="w-8 h-px bg-[#00d084]"></div>
                Thoughts & Updates
                <div className="w-8 h-px bg-[#00d084]"></div>
              </div>

              <h1 className="display-text text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0a0a0b] tracking-tight leading-[1.1] mb-6">
                The ProofLayer
                <br />
                <span className="text-gradient">Blog</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#737373] max-w-2xl mx-auto leading-relaxed">
                Stories about building in public, getting your first users, and growing with social proof.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0a0b] via-[#1a1a1b] to-[#0a0a0b]"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}></div>

              {/* Gradient orbs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d084]/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>

              <div className="relative p-8 sm:p-12 lg:p-16">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#00d084] text-[#0a0a0b]">
                    NEW
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70">
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 group-hover:text-[#00d084] transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d084] to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                      CE
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Curtis Ewalt</p>
                      <p className="text-slate-400 text-xs">{featuredPost.date} · {featuredPost.readTime}</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 text-[#00d084] font-medium group-hover:gap-4 transition-all">
                    Read article
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Other Posts Grid */}
        {otherPosts.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#0a0a0b]">More Articles</h2>
              <div className="h-px flex-1 bg-black/10 ml-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl border border-black/5 hover:border-[#00d084]/30 hover:shadow-xl hover:shadow-[#00d084]/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#00d084]/10 text-[#00d084]">
                        {post.category}
                      </span>
                      <span className="text-sm text-[#737373]">{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0a0a0b] mb-3 group-hover:text-[#00d084] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-[#737373] text-sm leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-black/5">
                      <span className="text-xs text-[#737373]">{post.date}</span>
                      <span className="text-sm font-medium text-[#00d084] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Read more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="bg-white border-y border-black/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00d084]/10 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h2 className="display-text text-3xl font-bold text-[#0a0a0b] mb-4">
                Stay in the loop
              </h2>
              <p className="text-[#737373] mb-8">
                Get notified when we publish new articles about launching products and building social proof.
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl border border-black/10 focus:border-[#00d084] focus:outline-none focus:ring-2 focus:ring-[#00d084]/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0a0a0b] text-white font-semibold rounded-xl hover:bg-[#0a0a0b]/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-[#737373] mt-4">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-[#0a0a0b] via-[#1a1a1b] to-[#0a0a0b] rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}></div>

            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#00d084]/20 rounded-full blur-3xl"></div>

            <div className="relative">
              <h2 className="display-text text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to get your first users?
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                Join founders who are getting matched with early adopters and building social proof from day one.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/founders"
                  className="inline-flex items-center justify-center gap-2 bg-[#00d084] text-[#0a0a0b] px-8 py-4 rounded-xl font-semibold hover:bg-[#00d084]/90 transition-colors"
                >
                  Get Started Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/early-adopters"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/10"
                >
                  Join as Early Adopter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
