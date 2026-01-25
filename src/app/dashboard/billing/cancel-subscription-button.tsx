'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CancelSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      router.refresh();
      setShowConfirm(false);
    } catch (error) {
      console.error('Error canceling subscription:', error);
      alert('Failed to cancel subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="text-sm text-red-600 hover:text-red-700 font-medium"
      >
        Cancel Subscription
      </button>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-sm text-red-900 mb-4">
        Are you sure you want to cancel your subscription? You&apos;ll keep access until the end of your current billing period, then you&apos;ll be downgraded to the Trial plan.
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 text-sm"
        >
          {isLoading ? 'Canceling...' : 'Yes, Cancel'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isLoading}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 text-sm"
        >
          Keep Subscription
        </button>
      </div>
    </div>
  );
}
