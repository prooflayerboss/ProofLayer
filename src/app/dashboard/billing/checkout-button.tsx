'use client';

import { useState } from 'react';

export default function CheckoutButton({ plan }: { plan: 'MONTHLY' | 'LIFETIME' }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const buttonText = plan === 'MONTHLY'
    ? 'Subscribe - $19/month'
    : 'Get Lifetime - $199';

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Loading...' : buttonText}
    </button>
  );
}