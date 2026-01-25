import Link from 'next/link';
import Image from 'next/image';
import { Code, Globe, FileCode, Webhook, ChevronRight, Home, BookOpen } from 'lucide-react';

const docsNavigation = [
  {
    title: 'JavaScript Embed',
    href: '/docs/embed',
    icon: Code,
    description: 'Add testimonials to any website',
  },
  {
    title: 'Direct Links',
    href: '/docs/links',
    icon: Globe,
    description: 'Share collection links',
  },
  {
    title: 'HTML/CSS Export',
    href: '/docs/export',
    icon: FileCode,
    description: 'Export as static files',
  },
  {
    title: 'Webhooks',
    href: '/docs/webhooks',
    icon: Webhook,
    description: 'Real-time notifications',
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0f1a]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
                  <Image
                    src="/logos/prooflayer-icon-only.svg"
                    alt="ProofLayer"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-lg font-bold text-white">
                  ProofLayer
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-1 text-sm">
                <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" />
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <Link href="/help" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  Help
                </Link>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-emerald-400 font-medium">Docs</span>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/20"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
                Integration Guides
              </p>
              {docsNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <item.icon className="w-5 h-5 mt-0.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-slate-500 group-hover:text-slate-400">{item.description}</p>
                  </div>
                </Link>
              ))}

              <div className="pt-6 mt-6 border-t border-white/5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
                  Resources
                </p>
                <Link
                  href="/help"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <BookOpen className="w-5 h-5 text-slate-500" />
                  <span className="font-medium text-sm">Help Center</span>
                </Link>
                <Link
                  href="/integrations"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Code className="w-5 h-5 text-slate-500" />
                  <span className="font-medium text-sm">All Integrations</span>
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logos/prooflayer-icon-only.svg"
                alt="ProofLayer"
                width={24}
                height={24}
              />
              <span className="font-semibold text-white">ProofLayer</span>
            </Link>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              <Link href="/help" className="hover:text-white transition-colors">Help</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
