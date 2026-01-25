'use client';

import { useEffect, useState } from 'react';
import ProductTour from '@/components/ProductTour';
import { Step } from 'react-joyride';

interface WorkspaceTourProps {
  onComplete?: () => void;
}

export default function WorkspaceTour({ onComplete }: WorkspaceTourProps) {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Start tour after component mounts
    const timer = setTimeout(() => {
      setRunTour(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const tourSteps: Step[] = [
    {
      target: 'body',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">Welcome to ProofLayer! 👋</h3>
          <p className="text-sm text-gray-600 mb-3">
            Let&apos;s create your first <strong>workspace</strong>. Think of it as a folder for organizing your testimonials.
          </p>
          <p className="text-sm text-gray-600">
            Perfect for separating different brands, products, or clients!
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="workspace-name"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Workspace Name</h3>
          <p className="text-sm text-gray-600">
            Give your workspace a name. This is just for your reference - your customers won&apos;t see it.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            💡 Examples: "My SaaS", "Client ABC", "Product Reviews"
          </p>
        </div>
      ),
      placement: 'right',
    },
    {
      target: '[data-tour="workspace-logo"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Add Your Logo (Optional)</h3>
          <p className="text-sm text-gray-600 mb-2">
            Upload your brand logo. It will appear on all testimonial forms in this workspace.
          </p>
          <p className="text-xs text-gray-500">
            Supported: PNG, JPG, WebP up to 8MB
          </p>
        </div>
      ),
      placement: 'right',
    },
    {
      target: '[data-tour="live-preview"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Live Preview ✨</h3>
          <p className="text-sm text-gray-600">
            See how your workspace branding will look in real-time as you make changes!
          </p>
        </div>
      ),
      placement: 'left',
    },
    {
      target: 'body',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">Next Step: Create a Form</h3>
          <p className="text-sm text-gray-600 mb-3">
            After creating your workspace, you&apos;ll create a <strong>form</strong> - this is what your customers will fill out to submit testimonials.
          </p>
          <p className="text-xs text-gray-500">
            💡 You can create multiple forms per workspace with different settings!
          </p>
        </div>
      ),
      placement: 'center',
    },
  ];

  return (
    <ProductTour
      tourId="workspace-creator"
      steps={tourSteps}
      run={runTour}
      onComplete={onComplete}
    />
  );
}
