'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { First100Container, First100Button, First100Input } from '@/components/first100/ui';

export default function FounderSignup() {
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
        body: JSON.stringify({ email, type: 'founder' }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/first100/thank-you?type=founder');
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

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get your first 100 users</h1>
          <p className="text-gray-500 mb-8">
            Join the waitlist and we&apos;ll reach out when we&apos;re ready to help you launch.
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
              Join the founder waitlist
            </First100Button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Already an early adopter?{' '}
            <Link href="/first100/early-adopters/signup" className="text-emerald-600 hover:underline">
              Sign up here instead
            </Link>
          </p>
        </div>
      </First100Container>
    </main>
  );
}
