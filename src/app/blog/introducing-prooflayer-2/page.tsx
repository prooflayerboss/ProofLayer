import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Introducing ProofLayer 2.0: The All-in-One Launch Toolkit - ProofLayer Blog',
  description: 'We rebuilt ProofLayer from the ground up. Now it\'s not just about testimonials—it\'s about getting you your first 100 users and proving your product works.',
};

export default function BlogPost() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navigation />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-16 lg:py-24 bg-[#0a0a0b] overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d084]/20 rounded-full blur-3xl"></div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to blog
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#00d084] text-[#0a0a0b]">
                NEW
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70">
                Announcement
              </span>
            </div>

            <h1 className="display-text text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Introducing ProofLayer 2.0: The All-in-One Launch Toolkit
            </h1>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d084] to-emerald-500 flex items-center justify-center text-white font-bold">
                CE
              </div>
              <div>
                <p className="text-white font-medium">Curtis Ewalt</p>
                <p className="text-white/50 text-sm">January 24, 2026 · 5 min read</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-20">
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-gray">
            <p className="text-xl text-[#737373] leading-relaxed mb-8">
              When I first built ProofLayer, it was a testimonial collection tool. Simple. Focused.
              Collect reviews, display them beautifully. But as I talked to more and more founders,
              I realized something important: <strong className="text-[#0a0a0b]">collecting testimonials is only half the problem.</strong>
            </p>

            <h2 className="display-text text-2xl font-bold text-[#0a0a0b] mt-12 mb-4">
              The Real Problem
            </h2>
            <p className="text-[#737373] leading-relaxed">
              You can't collect testimonials if you don't have users. And getting your first users?
              That's the hardest part of launching any product. You're caught in a chicken-and-egg situation:
            </p>
            <ul className="space-y-2 my-6">
              <li className="text-[#737373]">You need social proof to convert visitors</li>
              <li className="text-[#737373]">But you need users to get social proof</li>
              <li className="text-[#737373]">And you need traffic to get users</li>
            </ul>
            <p className="text-[#737373] leading-relaxed">
              Most testimonial tools assume you've already solved this. They're designed for companies
              with established customer bases. But what about the founder who just launched last week?
            </p>

            <h2 className="display-text text-2xl font-bold text-[#0a0a0b] mt-12 mb-4">
              Enter ProofLayer 2.0
            </h2>
            <p className="text-[#737373] leading-relaxed">
              We've rebuilt ProofLayer from the ground up with one mission:
              <strong className="text-[#0a0a0b]"> help founders get their first 100 users, then prove it.</strong>
            </p>
            <p className="text-[#737373] leading-relaxed">
              Here's how it works:
            </p>

            <div className="bg-white rounded-2xl border border-black/5 p-6 my-8">
              <h3 className="font-bold text-[#0a0a0b] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#00d084] text-white flex items-center justify-center text-sm font-bold">1</span>
                Get Users
              </h3>
              <p className="text-[#737373] ml-11">
                List your product and we match you with early adopters who want to try new products in your category.
                They're already interested—you just need to reach them.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-6 my-8">
              <h3 className="font-bold text-[#0a0a0b] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#8b5cf6] text-white flex items-center justify-center text-sm font-bold">2</span>
                Collect Testimonials
              </h3>
              <p className="text-[#737373] ml-11">
                Once they try your product, our built-in forms make it easy to collect video and text testimonials.
                No friction, no separate tools needed.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-6 my-8">
              <h3 className="font-bold text-[#0a0a0b] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#f59e0b] text-white flex items-center justify-center text-sm font-bold">3</span>
                Display Social Proof
              </h3>
              <p className="text-[#737373] ml-11">
                Embed beautiful widgets on your site. Grids, carousels, walls of love—all customizable to match your brand.
              </p>
            </div>

            <h2 className="display-text text-2xl font-bold text-[#0a0a0b] mt-12 mb-4">
              One-Time Payment. Forever.
            </h2>
            <p className="text-[#737373] leading-relaxed">
              I've always believed you shouldn't rent your reputation. That's why ProofLayer is a one-time payment.
              No monthly fees. No subscription trap. Pay once, own it forever.
            </p>
            <p className="text-[#737373] leading-relaxed">
              We have plans starting at $0 (yes, really) all the way up to custom concierge packages
              where we handle everything for you.
            </p>

            <h2 className="display-text text-2xl font-bold text-[#0a0a0b] mt-12 mb-4">
              Two Sides of the Same Coin
            </h2>
            <p className="text-[#737373] leading-relaxed">
              ProofLayer now serves two audiences:
            </p>
            <ul className="space-y-2 my-6">
              <li className="text-[#737373]">
                <strong className="text-[#0a0a0b]">Founders</strong> who want to get their first users and build social proof
              </li>
              <li className="text-[#737373]">
                <strong className="text-[#0a0a0b]">Early Adopters</strong> who want to try new products and get exclusive lifetime deals
              </li>
            </ul>
            <p className="text-[#737373] leading-relaxed">
              It's a win-win. Founders get users. Early adopters get deals. Everyone builds something together.
            </p>

            <h2 className="display-text text-2xl font-bold text-[#0a0a0b] mt-12 mb-4">
              What's Next
            </h2>
            <p className="text-[#737373] leading-relaxed">
              We're just getting started. Over the coming months, we'll be adding more features to help
              founders launch successfully—from better matching algorithms to more powerful analytics.
            </p>
            <p className="text-[#737373] leading-relaxed">
              If you're a founder with a product to launch, <Link href="/founders" className="text-[#00d084] hover:underline">get started for free</Link>.
            </p>
            <p className="text-[#737373] leading-relaxed">
              If you're someone who loves trying new products, <Link href="/early-adopters" className="text-[#8b5cf6] hover:underline">join as an early adopter</Link>.
            </p>
            <p className="text-[#737373] leading-relaxed mt-8">
              Let's build together.
            </p>
            <p className="text-[#0a0a0b] font-semibold">
              — Curtis
            </p>
          </article>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-gradient-to-br from-[#0a0a0b] via-[#1a1a1b] to-[#0a0a0b] rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[#00d084]/20 rounded-full blur-3xl"></div>

            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to get your first 100 users?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/founders"
                  className="inline-flex items-center justify-center gap-2 bg-[#00d084] text-[#0a0a0b] px-6 py-3 rounded-xl font-semibold hover:bg-[#00d084]/90 transition-colors"
                >
                  I'm a Founder
                </Link>
                <Link
                  href="/early-adopters"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/10"
                >
                  I'm an Early Adopter
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
