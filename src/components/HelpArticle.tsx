import Link from 'next/link';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href="/help" className="hover:text-blue-600">Help Center</Link>
            <span>/</span>
            <span className="text-gray-900">{category}</span>
          </div>
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ProofLayer
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
          <p className="text-xl text-gray-600 mb-4">{description}</p>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <Link
            href="/help"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Help Center
          </Link>

          <a
            href="mailto:support@prooflayer.com"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

// Reusable components for help articles
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export function Step({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}

export function Tip({ children }: { children: ReactNode }) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
      <div className="flex gap-3">
        <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="text-blue-900">{children}</div>
      </div>
    </div>
  );
}

export function Warning({ children }: { children: ReactNode }) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
      <div className="flex gap-3">
        <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="text-yellow-900">{children}</div>
      </div>
    </div>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
      <code>{children}</code>
    </pre>
  );
}
