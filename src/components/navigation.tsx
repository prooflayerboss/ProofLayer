'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { ChevronDown, Menu, X, Rocket, Users, MessageSquare, LayoutGrid, Sparkles, Vote } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [foundersOpen, setFoundersOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setFoundersOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setFoundersOpen(false);
    }, 150);
  };

  const founderLinks = [
    {
      name: 'Get Your First Users',
      href: '/founders',
      description: 'Connect with early adopters in your category',
      icon: Users,
    },
    {
      name: 'Collect Testimonials',
      href: '/collect-testimonials',
      description: 'Beautiful forms for video & text reviews',
      icon: MessageSquare,
    },
    {
      name: 'Display Social Proof',
      href: '/display-social-proof',
      description: 'Embed widgets that convert visitors',
      icon: LayoutGrid,
    },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-black/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Green */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
              <svg width="32" height="32" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="nav-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d084"/>
                    <stop offset="100%" stopColor="#00b371"/>
                  </linearGradient>
                </defs>
                <rect x="14" y="4" width="100" height="100" rx="20" fill="#00d084" opacity="0.25"/>
                <rect x="10" y="8" width="100" height="100" rx="20" fill="#00d084" opacity="0.5"/>
                <rect x="6" y="12" width="100" height="100" rx="20" fill="url(#nav-icon-gradient)"/>
                <path d="M 36 64 L 48 76 L 76 44" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-[#0a0a0b]">ProofLayer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* For Founders Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 px-4 py-2 text-[#737373] hover:text-[#0a0a0b] font-medium transition-colors rounded-lg hover:bg-black/5"
              >
                For Founders
                <ChevronDown className={`h-4 w-4 transition-transform ${foundersOpen ? 'rotate-180' : ''}`} />
              </button>

              {foundersOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-80"
                >
                  <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-black/5 p-2 overflow-hidden">
                  {founderLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#fafafa] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#00d084]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00d084]/20 transition-colors">
                        <item.icon className="w-5 h-5 text-[#00d084]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#0a0a0b] text-sm">{item.name}</div>
                        <div className="text-xs text-[#737373] mt-0.5">{item.description}</div>
                      </div>
                    </Link>
                  ))}

                  <div className="border-t border-black/5 mt-2 pt-2">
                    <Link
                      href="/#pricing"
                      className="flex items-center gap-2 p-3 rounded-xl hover:bg-[#00d084]/10 transition-colors group"
                    >
                      <Sparkles className="w-4 h-4 text-[#00d084]" />
                      <span className="font-semibold text-sm text-[#00d084]">View all pricing plans</span>
                    </Link>
                  </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/early-adopters"
              className="px-4 py-2 text-[#737373] hover:text-[#0a0a0b] font-medium transition-colors rounded-lg hover:bg-black/5"
            >
              For Early Adopters
            </Link>

            <Link
              href="/vote"
              className="px-4 py-2 text-[#737373] hover:text-[#0a0a0b] font-medium transition-colors rounded-lg hover:bg-black/5 flex items-center gap-1.5"
            >
              <Vote className="w-4 h-4" />
              Vote
              <span className="text-[10px] font-semibold bg-[#00d084]/10 text-[#00d084] px-1.5 py-0.5 rounded-full">New</span>
            </Link>

            <Link
              href="/directory"
              className="px-4 py-2 text-[#737373] hover:text-[#0a0a0b] font-medium transition-colors rounded-lg hover:bg-black/5 flex items-center gap-1.5"
            >
              Directory
              <span className="text-[10px] font-semibold bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full">Soon</span>
            </Link>

            <Link
              href="/#pricing"
              className="px-4 py-2 text-[#737373] hover:text-[#0a0a0b] font-medium transition-colors rounded-lg hover:bg-black/5"
            >
              Pricing
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/founders"
              className="btn-primary flex items-center gap-2 bg-[#0a0a0b] text-white px-5 py-2.5 rounded-full font-semibold text-sm"
            >
              <Rocket className="w-4 h-4" />
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#0a0a0b] hover:bg-black/5"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 bg-white">
          <div className="px-6 py-6 space-y-1">
            {/* For Founders Section */}
            <div className="pb-4 mb-4 border-b border-black/5">
              <div className="text-xs font-semibold text-[#737373] uppercase tracking-wide mb-3">For Founders</div>
              <div className="space-y-1">
                {founderLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-[#fafafa] transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-[#00d084]" />
                    <span className="font-medium text-[#0a0a0b]">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Links */}
            <Link
              href="/early-adopters"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-[#fafafa] transition-colors"
            >
              <Users className="w-5 h-5 text-[#8b5cf6]" />
              <span className="font-medium text-[#0a0a0b]">For Early Adopters</span>
            </Link>

            <Link
              href="/vote"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-[#fafafa] transition-colors"
            >
              <Vote className="w-5 h-5 text-[#00d084]" />
              <span className="font-medium text-[#0a0a0b]">Vote on Products</span>
              <span className="text-[10px] font-semibold bg-[#00d084]/10 text-[#00d084] px-1.5 py-0.5 rounded-full">New</span>
            </Link>

            <Link
              href="/directory"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-[#fafafa] transition-colors"
            >
              <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
              <span className="font-medium text-[#0a0a0b]">Directory</span>
              <span className="text-[10px] font-semibold bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full">Soon</span>
            </Link>

            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-[#737373] hover:text-[#0a0a0b] font-medium rounded-xl hover:bg-[#fafafa]"
            >
              Pricing
            </Link>

            {/* CTA Section */}
            <div className="pt-4 mt-4 border-t border-black/5">
              <Link
                href="/founders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#0a0a0b] text-white py-3 px-4 rounded-xl font-semibold"
              >
                <Rocket className="w-4 h-4" />
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
