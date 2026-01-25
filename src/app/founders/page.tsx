'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';

export default function FoundersSignup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/first100/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'founder' }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/thank-you?type=founder');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] overflow-hidden">
      <Navigation />

      {/* Dynamic background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs that follow mouse */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, #00d084 0%, transparent 70%)',
            left: `${mousePosition.x - 20}%`,
            top: `${mousePosition.y - 30}%`,
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] transition-all duration-1500 ease-out"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            right: `${100 - mousePosition.x - 10}%`,
            bottom: `${100 - mousePosition.y - 20}%`,
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <main className="relative pt-20 pb-12 px-6 min-h-[calc(100vh-64px)] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="animate-slide-up">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>

              {/* Headline */}
              <h1 className="display-text text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
                Launch your
                <br />
                <span className="text-gradient">product</span> to
                <br />
                <span className="text-white/40">real users</span>
              </h1>

              <p className="text-xl text-white/60 mb-10 max-w-md leading-relaxed">
                Join founders who are getting their first 100 users and collecting testimonials from day one.
              </p>

              {/* Stats */}
              <div className="flex gap-8 mb-10">
                {[
                  { value: '100+', label: 'Founders joined' },
                  { value: '500+', label: 'Early adopters' },
                  { value: '24h', label: 'Avg response' },
                ].map((stat, i) => (
                  <div key={i} className="animate-slide-up" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                    <div className="display-text text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* What you get */}
              <div className="space-y-3">
                {[
                  'Get matched with early adopters in your category',
                  'Collect video & text testimonials automatically',
                  'Display social proof with embeddable widgets',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-white/70 animate-slide-up"
                    style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#00d084]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Form */}
            <div className="animate-slide-up delay-2">
              <div className="relative">
                {/* Glow effect behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00d084]/20 via-[#00d084]/10 to-[#8b5cf6]/20 rounded-3xl blur-xl" />

                {/* Card */}
                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10">
                  {/* Card header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00d084] to-[#00b371] flex items-center justify-center shadow-lg shadow-[#00d084]/30">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Start free today</h2>
                    <p className="text-white/50">No credit card required</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="founder@startup.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-[#00d084] transition-all"
                      />
                      {error && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {error}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary w-full bg-gradient-to-r from-[#00d084] to-[#00b371] text-[#0a0a0b] px-6 py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Getting you in...
                        </>
                      ) : (
                        <>
                          Get early access
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Social proof */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex -space-x-2">
                        {['from-amber-400 to-orange-500', 'from-emerald-400 to-teal-500', 'from-violet-400 to-purple-500', 'from-rose-400 to-pink-500'].map((gradient, i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-[#0a0a0b]`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-white/50">
                        Join <span className="text-white font-medium">100+ founders</span>
                      </p>
                    </div>
                  </div>

                  {/* Alternative CTA */}
                  <p className="mt-6 text-sm text-white/40 text-center">
                    Looking to try new products?{' '}
                    <Link href="/early-adopters" className="text-[#00d084] hover:underline">
                      Join as early adopter
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="relative py-6 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2025 ProofLayer. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
