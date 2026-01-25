'use client';

import { useState } from 'react';

export default function CheckoutButton({ plan }: { plan: 'MONTHLY' | 'LIFETIME' | 'SOLO' | 'PRO' | 'AGENCY' }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || 'Failed to create checkout session');
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const buttonTextMap = {
    MONTHLY: 'Subscribe - $19/month',
    LIFETIME: 'Get Lifetime Access - $49',
    SOLO: 'Get Solo - $59',
    PRO: 'Get Professional - $118',
    AGENCY: 'Get Agency - $177',
  };

  const buttonText = buttonTextMap[plan];

  return (
    <div>
      {error && (
        <div className="mb-3 bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : buttonText}
      </button>
    </div>
  );
}