'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RestartOnboardingButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRestartOnboarding = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/account/restart-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to restart onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRestartOnboarding}
      disabled={isLoading}
      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Run Setup Wizard Again
        </>
      )}
    </button>
  );
}
