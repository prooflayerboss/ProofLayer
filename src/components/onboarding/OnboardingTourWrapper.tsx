'use client';

import { useState } from 'react';
import DashboardOnboardingTour from './DashboardOnboardingTour';

export default function OnboardingTourWrapper() {
  const [showTour, setShowTour] = useState(true);

  if (!showTour) return null;

  return (
    <DashboardOnboardingTour onComplete={() => setShowTour(false)} />
  );
}
