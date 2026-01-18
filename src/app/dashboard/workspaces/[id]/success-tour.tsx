'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductTour from '@/components/ProductTour';
import { Step } from 'react-joyride';

interface SuccessTourProps {
  workspaceName: string;
  formSlug?: string;
}

export default function SuccessTour({ workspaceName, formSlug }: SuccessTourProps) {
  const searchParams = useSearchParams();
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Only run tour if formCreated=true is in URL
    if (searchParams?.get('formCreated') === 'true') {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        setRunTour(true);
      }, 800);
    }
  }, [searchParams]);

  const tourSteps: Step[] = [
    {
      target: 'body',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">Form Created Successfully! 🎉</h3>
          <p className="text-sm text-gray-600 mb-3">
            Congratulations! You've created your first form in <strong>{workspaceName}</strong>.
          </p>
          <p className="text-sm text-gray-600">
            Let me show you what you can do next!
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="form-link"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Your Form Link</h3>
          <p className="text-sm text-gray-600 mb-2">
            This is your unique form URL. Share it with customers to start collecting testimonials!
          </p>
          <p className="text-sm text-gray-600">
            Click "Manage" to copy the link, view submissions, or customize settings.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '[data-tour="wall-of-love"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Wall of Love - Shareable Page</h3>
          <p className="text-sm text-gray-600 mb-2">
            This is a beautiful public page displaying all your approved testimonials.
          </p>
          <p className="text-sm text-gray-600">
            Perfect for sharing with clients or embedding on your website!
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '[data-tour="create-widget"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Create Widgets</h3>
          <p className="text-sm text-gray-600 mb-2">
            Want to display testimonials on your site? Create a widget!
          </p>
          <p className="text-sm text-gray-600">
            Widgets are customizable, embeddable components you can add to any webpage.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: 'body',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">You're All Set! 🚀</h3>
          <p className="text-sm text-gray-600 mb-3">
            Here's a quick recap of what to do next:
          </p>
          <ul className="text-sm text-gray-600 space-y-2 mb-3">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Share your form link to collect testimonials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Approve/reject submissions as they come in</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Create widgets to display testimonials on your site</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Share your Wall of Love page with clients</span>
            </li>
          </ul>
          <p className="text-sm text-gray-500">
            Need help? Click the "Help" menu in the top navigation to retake any tour!
          </p>
        </div>
      ),
      placement: 'center',
    },
  ];

  return (
    <ProductTour
      tourId="form-created-success"
      steps={tourSteps}
      run={runTour}
    />
  );
}
