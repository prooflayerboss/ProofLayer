import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How I Built ProofLayer: From Idea to Launch in 30 Days',
  description: 'The story of building a testimonial collection tool as a solo founder - the tech stack, challenges, and lessons learned.',
  openGraph: {
    title: 'How I Built ProofLayer: From Idea to Launch in 30 Days',
    description: 'The story of building a testimonial collection tool as a solo founder - the tech stack, challenges, and lessons learned.',
    type: 'article',
  },
};

export default function HowIBuiltProoflayerPost() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FEFDFB]">
      <Navigation />

      <main className="flex-1">
        {/* Hero */}
        <header className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-transparent to-transparent"></div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 group transition-colors"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                Building in Public
              </span>
              <span className="text-sm text-gray-500">January 19, 2026</span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-500">8 min read</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-8">
              How I Built ProofLayer: From Idea to Launch in 30 Days
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              The story of building a testimonial collection tool as a solo founder - the tech stack,
              challenges, and lessons learned along the way.
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pb-10 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                CE
              </div>
              <div>
                <p className="font-semibold text-gray-900">Curtis Ewalt</p>
                <p className="text-gray-500 text-sm">Founder of ProofLayer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-amber-700 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:my-6 prose-li:text-gray-700 prose-li:marker:text-amber-500">

            <h2>The Problem I Wanted to Solve</h2>
            <p>
              As someone who has worked with agencies and freelancers, I noticed a consistent pain point:
              collecting and displaying client testimonials was always a messy process. People would screenshot
              LinkedIn recommendations, copy-paste emails into documents, or just... never collect testimonials at all.
            </p>
            <p>
              The existing tools were either too expensive (charging $20-50/month for something that should be simple)
              or too complicated for the average user. I wanted to build something that was dead simple, looked great,
              and didn't require a monthly subscription eating into your profits.
            </p>

            <h2>The Tech Stack</h2>
            <p>
              I chose technologies that would let me move fast while still building something production-ready:
            </p>
            <ul>
              <li><strong>Next.js 14</strong> - React framework with App Router for the frontend and API routes</li>
              <li><strong>TypeScript</strong> - Type safety from day one (trust me, it saves time)</li>
              <li><strong>Tailwind CSS</strong> - Rapid UI development without fighting CSS</li>
              <li><strong>Prisma</strong> - Type-safe database ORM that just works</li>
              <li><strong>Supabase</strong> - PostgreSQL database + authentication</li>
              <li><strong>Vercel</strong> - Deployment and hosting</li>
              <li><strong>Stripe</strong> - Payment processing</li>
              <li><strong>Cloudflare R2</strong> - File storage for videos and images</li>
            </ul>
            <p>
              This stack might seem like a lot, but each piece serves a specific purpose and they all integrate
              beautifully together. The total monthly cost for infrastructure? Under $20 until I hit serious scale.
            </p>

            <h2>Week 1: Core Functionality</h2>
            <p>
              The first week was all about getting the core loop working: users should be able to create a
              workspace, generate a collection form, and receive testimonial submissions.
            </p>
            <p>
              I started with the database schema - users, workspaces, forms, and submissions. Getting this right
              early is crucial because changing your data model later is painful. I spent a full day just thinking
              through relationships and edge cases.
            </p>
            <p>
              By the end of week 1, I had a working prototype where someone could submit a text testimonial
              through a form, and it would appear in the dashboard awaiting approval.
            </p>

            <h2>Week 2: Polish and Features</h2>
            <p>
              Week 2 was about making the product actually useful. I added:
            </p>
            <ul>
              <li>Video testimonial uploads with automatic thumbnail generation</li>
              <li>Screenshot testimonials for capturing social proof from other platforms</li>
              <li>Approval workflow (pending → approved/rejected)</li>
              <li>Embeddable widgets that work on any website</li>
              <li>The "Wall of Love" public page for each workspace</li>
            </ul>
            <p>
              The widget system was the trickiest part. I needed to create JavaScript files that could be embedded
              on any website without breaking anything. This meant no dependencies, careful CSS isolation, and
              handling all sorts of edge cases.
            </p>

            <h2>Week 3: Payments and Plans</h2>
            <p>
              Week 3 was all about the business model. I decided on lifetime deals instead of subscriptions for
              a few reasons:
            </p>
            <ul>
              <li>Lower barrier to entry for customers</li>
              <li>Simpler to implement (one-time payments are easier than subscription management)</li>
              <li>Better for indie hackers and freelancers who hate recurring costs</li>
              <li>Creates urgency for the launch ("lifetime deal, limited time")</li>
            </ul>
            <p>
              Stripe made payment integration surprisingly smooth. The webhook handling took some debugging
              (tip: make sure your webhook URL matches your production domain exactly, including www), but
              once it worked, it was rock solid.
            </p>

            <h2>Week 4: Launch Prep</h2>
            <p>
              The final week was about all the things you forget until the last minute:
            </p>
            <ul>
              <li>Help documentation (way more work than you'd think)</li>
              <li>SEO basics - sitemap, meta tags, Open Graph images</li>
              <li>Error handling and edge cases</li>
              <li>Mobile responsiveness fixes</li>
              <li>Testing the full user flow, over and over</li>
            </ul>
            <p>
              I also spent time on the landing page and pricing page. First impressions matter, and you only
              get one shot to convince someone your product is worth their money.
            </p>

            <h2>Lessons Learned</h2>

            <h3>1. Ship faster than you think you should</h3>
            <p>
              There are features I wanted to add but didn't. Filters on the Wall of Love. Social sharing buttons.
              Analytics dashboards. But none of that matters if nobody uses the product. Ship the core value
              proposition first, then iterate based on real user feedback.
            </p>

            <h3>2. Documentation is a feature</h3>
            <p>
              I almost skipped writing help docs. "The product is intuitive enough," I told myself. Wrong.
              Good documentation reduces support burden, builds trust, and helps users get value from your
              product faster. Write the docs.
            </p>

            <h3>3. Test payments early</h3>
            <p>
              I left Stripe integration until week 3 and ran into issues with webhooks, environment variables,
              and production vs test mode. Test your payment flow in production (with real test cards) before
              you announce your launch.
            </p>

            <h3>4. The details matter</h3>
            <p>
              Open Graph images for link previews. Proper error messages. Loading states. These "small" things
              add up to create a professional product that people trust with their money.
            </p>

            <h2>What's Next</h2>
            <p>
              ProofLayer is live and I'm actively collecting feedback from early users. The roadmap includes:
            </p>
            <ul>
              <li>More widget customization options</li>
              <li>Filtering and search on the Wall of Love</li>
              <li>Import testimonials from Google Reviews, G2, etc.</li>
              <li>AI-powered testimonial highlights</li>
              <li>Team collaboration features</li>
            </ul>
            <p>
              But the priority right now is listening to users and making sure the core product is rock solid.
            </p>

            <h2>Try It Out</h2>
            <p>
              If you're an agency, freelancer, or anyone who needs to collect and display testimonials,
              I'd love for you to try ProofLayer. There's a free trial, and the lifetime pricing means
              you'll never pay another monthly fee.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-3">Ready to collect testimonials?</h3>
              <p className="text-slate-300 mb-6">Start your free trial today. No credit card required.</p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Author Box */}
          <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-100">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                CE
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Curtis Ewalt</h3>
                <p className="text-gray-500 text-sm mb-3">Founder of ProofLayer</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Building tools for creators and businesses. Sharing the journey of building in public.
                </p>
                <a
                  href="https://x.com/hookahhd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow on X
                </a>
              </div>
            </div>
          </div>

          {/* Share & Navigation */}
          <div className="mt-10 pt-10 border-t border-gray-200 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">All Articles</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=How%20I%20Built%20ProofLayer%3A%20From%20Idea%20to%20Launch%20in%2030%20Days&url=${encodeURIComponent('https://prooflayer.com/blog/how-i-built-prooflayer')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://prooflayer.com/blog/how-i-built-prooflayer')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
