'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { First100Container, First100Button, First100Input } from '@/components/first100/ui';

export default function EarlyAdopterSignup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/first100/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'early_adopter' }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/first100/thank-you?type=early_adopter');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center py-12 bg-white">
      <First100Container size="sm">
        <div className="max-w-md mx-auto">
          <Link
            href="/first100"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Be first to try new products</h1>
          <p className="text-gray-500 mb-8">
            Get exclusive access to lifetime deals and early-bird pricing before public launch.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <First100Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={error}
            />
            <First100Button type="submit" className="w-full" isLoading={isLoading}>
              Join as an early adopter
            </First100Button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Have a product to launch?{' '}
            <Link href="/first100/founders/signup" className="text-emerald-600 hover:underline">
              Sign up as a founder
            </Link>
          </p>
        </div>
      </First100Container>
    </main>
  );
}
