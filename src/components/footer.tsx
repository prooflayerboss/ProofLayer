'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/first100/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'early_adopter', interests: [] }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('You\'re on the list!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setMessage('Failed to subscribe');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <footer className="bg-[#0a0a0b] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-white/10">
          <div className="max-w-2xl">
            <h3 className="display-text text-3xl font-bold text-white mb-3">
              Get early access to new products
            </h3>
            <p className="text-gray-500 mb-6">
              Join our early adopter community. Be first to try products from ambitious founders.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#00d084] text-white placeholder-gray-500 disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#00d084] text-[#0a0a0b] px-6 py-3.5 rounded-xl font-semibold hover:bg-[#00d084]/90 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : 'Join waitlist'}
              </button>
            </form>
            {message && (
              <p className={`mt-3 text-sm ${status === 'success' ? 'text-[#00d084]' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* For Founders */}
          <div>
            <h3 className="text-white font-semibold mb-5">For Founders</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/founders" className="hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/concierge" className="hover:text-white transition-colors">
                  Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* For Early Adopters */}
          <div>
            <h3 className="text-white font-semibold mb-5">For Early Adopters</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/early-adopters" className="hover:text-white transition-colors">
                  Join Waitlist
                </Link>
              </li>
              <li>
                <Link href="/early-adopters" className="hover:text-white transition-colors">
                  Get Lifetime Deals
                </Link>
              </li>
              <li>
                <Link href="/early-adopters" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-5">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-5">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
              <svg width="32" height="32" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footer-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d084"/>
                    <stop offset="100%" stopColor="#00b371"/>
                  </linearGradient>
                </defs>
                <rect x="14" y="4" width="100" height="100" rx="20" fill="#00d084" opacity="0.25"/>
                <rect x="10" y="8" width="100" height="100" rx="20" fill="#00d084" opacity="0.5"/>
                <rect x="6" y="12" width="100" height="100" rx="20" fill="url(#footer-icon-gradient)"/>
                <path d="M 36 64 L 48 76 L 76 44" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white">ProofLayer</span>
          </Link>

          <div className="text-sm text-gray-500">
            © {currentYear} ProofLayer. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {/* X/Twitter */}
            <a
              href="https://x.com/prooflayer56838"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Follow us on X"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
