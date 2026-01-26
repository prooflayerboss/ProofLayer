'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setupToken = searchParams?.get('setup');
  const isSetup = !!setupToken;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSetup && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isSetup
        ? '/api/first100/auth/register'
        : '/api/first100/auth/login';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isSetup
            ? { email, password, accessToken: setupToken }
            : { email, password }
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Redirect to dashboard
      router.push('/first100/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] flex items-center justify-center px-4">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00d084]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
            <svg width="40" height="40" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="login-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d084"/>
                  <stop offset="100%" stopColor="#00b371"/>
                </linearGradient>
              </defs>
              <rect x="14" y="4" width="100" height="100" rx="20" fill="#00d084" opacity="0.25"/>
              <rect x="10" y="8" width="100" height="100" rx="20" fill="#00d084" opacity="0.5"/>
              <rect x="6" y="12" width="100" height="100" rx="20" fill="url(#login-icon-gradient)"/>
              <path d="M 36 64 L 48 76 L 76 44" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white">ProofLayer</span>
        </Link>

        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              {isSetup ? 'Set Up Your Account' : 'Founder Login'}
            </h1>
            <p className="text-white/50">
              {isSetup
                ? 'Create a password to access your dashboard anytime'
                : 'Access your founder dashboard'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
                placeholder={isSetup ? 'Create a password (min 8 characters)' : 'Enter your password'}
              />
            </div>

            {isSetup && (
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00d084] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSetup ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                isSetup ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          {!isSetup && (
            <div className="mt-6 text-center">
              <p className="text-white/40 text-sm">
                {"Don't have an account yet? "}
                <Link href="/founders" className="text-[#00d084] hover:underline">
                  Apply as a Founder
                </Link>
              </p>
              <p className="text-white/30 text-xs mt-3">
                Check your email for a portal link to set up your password
              </p>
            </div>
          )}
        </div>

        {/* Help text */}
        <p className="text-center text-white/30 text-sm mt-6">
          Questions? Email{' '}
          <a href="mailto:curtis@prooflayer.app" className="text-[#00d084] hover:underline">
            curtis@prooflayer.app
          </a>
        </p>
      </div>
    </main>
  );
}

export default function FounderLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00d084] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
