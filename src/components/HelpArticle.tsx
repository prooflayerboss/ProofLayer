import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

interface HelpArticleProps {
  title: string;
  description: string;
  category: string;
  lastUpdated?: string;
  children: ReactNode;
}

export default function HelpArticle({
  title,
  description,
  category,
  lastUpdated,
  children,
}: HelpArticleProps) {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
                  <Image
                    src="/logos/prooflayer-icon-only.svg"
                    alt="ProofLayer"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-lg font-bold text-gray-900 hidden sm:inline">
                  ProofLayer
                </span>
              </Link>

              {/* Breadcrumb */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/help" className="hover:text-gray-900 transition-colors">
                  Help Center
                </Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-900 font-medium">{category}</span>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <Link
                href="/help"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="hidden sm:inline">All Articles</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          {/* Main Content */}
          <article>
            {/* Title Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {category}
                </span>
                {lastUpdated && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400 text-xs">Updated {lastUpdated}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Article Body */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-slate-900/5 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-code:before:content-[''] prose-code:after:content-[''] prose-li:marker:text-gray-400">
                  {children}
                </div>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-gray-100">
              <Link
                href="/help"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Help Center
              </Link>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Was this helpful?</span>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Yes
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                    No
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Quick Links */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/help/getting-started/quick-start" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Quick Start Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/help/widgets/embedding" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Embedding Widgets
                    </Link>
                  </li>
                  <li>
                    <Link href="/help/billing/plan-comparison" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Plan Comparison
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Need Help */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
                <h3 className="text-sm font-semibold mb-2">Need more help?</h3>
                <p className="text-slate-300 text-xs mb-4 leading-relaxed">
                  Our support team is ready to assist you.
                </p>
                <a
                  href="mailto:support@prooflayer.com"
                  className="inline-flex items-center gap-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

// Reusable components for help articles
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-10 last:mb-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
        {title}
      </h2>
      {children}
    </div>
  );
}

export function Step({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 mb-6 last:mb-0">
      <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/25">
        {number}
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="text-gray-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function Tip({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 rounded-xl p-4 my-5">
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1 text-sky-900 text-[15px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function Warning({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-4 my-5">
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1 text-amber-900 text-[15px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <div className="my-5 rounded-xl overflow-hidden border border-gray-800">
      <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-gray-500 text-xs font-medium">Code</span>
      </div>
      <pre className="bg-gray-950 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
