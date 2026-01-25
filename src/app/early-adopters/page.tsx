'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';

const INTEREST_CATEGORIES = [
  { id: 'saas', label: 'SaaS Tools', icon: '💻' },
  { id: 'productivity', label: 'Productivity', icon: '⚡' },
  { id: 'dev-tools', label: 'Developer Tools', icon: '🛠️' },
  { id: 'design', label: 'Design Tools', icon: '🎨' },
  { id: 'marketing', label: 'Marketing', icon: '📣' },
  { id: 'ai', label: 'AI & Automation', icon: '🤖' },
  { id: 'finance', label: 'Finance & Payments', icon: '💰' },
  { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'communication', label: 'Communication', icon: '💬' },
  { id: 'health', label: 'Health & Wellness', icon: '🏃' },
  { id: 'education', label: 'Education', icon: '📚' },
];

export default function EarlyAdoptersSignup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
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

  function toggleInterest(id: string) {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (selectedInterests.length === 0) {
      setError('Please select at least one interest');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/first100/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          type: 'early_adopter',
          interests: selectedInterests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/thank-you?type=early_adopter');
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
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            left: `${mousePosition.x - 20}%`,
            top: `${mousePosition.y - 30}%`,
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] transition-all duration-1500 ease-out"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
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
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <main className="relative pt-20 pb-12 px-6 min-h-[calc(100vh-64px)]">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors animate-slide-up"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          {/* Header */}
          <div className="text-center mb-12 animate-slide-up delay-1">
            <div className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-violet-500/30">
              <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></span>
              For Early Adopters
            </div>

            <h1 className="display-text text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
              Get lifetime deals
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                before anyone else
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Be first to try new products from ambitious founders. Get exclusive early-bird pricing that disappears after launch.
            </p>
          </div>

          {/* Benefits row */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12 animate-slide-up delay-2">
            {[
              { icon: '⚡', title: 'First Access', desc: 'Try before anyone else' },
              { icon: '💎', title: 'Exclusive Deals', desc: 'Lifetime pricing only for you' },
              { icon: '🎯', title: 'Curated Weekly', desc: 'Products matching your interests' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:border-violet-500/30 transition-colors"
              >
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <p className="font-semibold text-white text-sm mb-1">{item.title}</p>
                <p className="text-xs text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="animate-slide-up delay-3">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/10 to-pink-500/20 rounded-3xl blur-xl" />

              <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                    />
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-4">
                      What interests you? <span className="text-white/40">(Select all that apply)</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {INTEREST_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => toggleInterest(category.id)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            selectedInterests.includes(category.id)
                              ? 'bg-violet-500/20 text-violet-300 border-2 border-violet-500 shadow-lg shadow-violet-500/20'
                              : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <span>{category.icon}</span>
                          <span className="truncate">{category.label}</span>
                        </button>
                      ))}
                    </div>
                    {error && (
                      <p className="mt-3 text-sm text-red-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white px-6 py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group hover:shadow-xl hover:shadow-violet-500/25 transition-all"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Joining...
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

                {/* Footer text */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-white/40">
                    Free forever. Unsubscribe anytime. No spam.
                  </p>
                  <p className="mt-4 text-sm text-white/40">
                    Building a product?{' '}
                    <Link href="/founders" className="text-[#00d084] hover:underline">
                      Sign up as a founder
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
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
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
