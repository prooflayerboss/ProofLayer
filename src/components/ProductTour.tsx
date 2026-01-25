'use client';

import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface ProductTourProps {
  tourId: string;
  steps: Step[];
  run?: boolean;
  continuous?: boolean;
  showProgress?: boolean;
  showSkipButton?: boolean;
  onComplete?: () => void;
}

export default function ProductTour({
  tourId,
  steps,
  run = false,
  continuous = true,
  showProgress = true,
  showSkipButton = true,
  onComplete,
}: ProductTourProps) {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Check if user has already completed this tour
    const hasCompletedTour = localStorage.getItem(`tour_completed_${tourId}`);

    if (!hasCompletedTour && run) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        setRunTour(true);
      }, 500);
    }
  }, [tourId, run]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
      setRunTour(false);
      // Mark tour as completed
      localStorage.setItem(`tour_completed_${tourId}`, 'true');

      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous={continuous}
      showProgress={showProgress}
      showSkipButton={showSkipButton}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#3B82F6',
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: '#3B82F6',
          borderRadius: '8px',
          fontSize: '14px',
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#6B7280',
          fontSize: '14px',
        },
        buttonSkip: {
          color: '#9CA3AF',
          fontSize: '14px',
        },
        tooltip: {
          borderRadius: '12px',
          fontSize: '15px',
          padding: '16px',
        },
        tooltipContent: {
          padding: '8px 0',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Done',
        next: 'Next',
        skip: 'Skip tour',
      }}
    />
  );
}

// Helper function to reset a specific tour
export function resetTour(tourId: string) {
  localStorage.removeItem(`tour_completed_${tourId}`);
}

// Helper function to reset all tours
export function resetAllTours() {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('tour_completed_')) {
      localStorage.removeItem(key);
    }
  });
}
