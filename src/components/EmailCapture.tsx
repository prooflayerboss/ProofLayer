'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thanks! We\'ll keep you updated on new features and updates.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Email capture error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Stay in the Loop
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Get updates on new features, tips for collecting better testimonials, and exclusive early-bird offers.
        </p>

        {status === 'success' ? (
          <div className="bg-white/20 backdrop-blur border border-white/30 rounded-lg p-6">
            <svg className="w-12 h-12 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Get Updates'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-red-200 text-sm">{message}</p>
        )}

        <p className="mt-4 text-sm text-blue-100">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </div>
  );
}
