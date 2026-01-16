'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PLAN_LIMITS } from '@/lib/constants';
import type { PlanType } from '@/lib/constants';

const getSteps = (plan: PlanType) => {
  const limits = PLAN_LIMITS[plan];
  const workspaceLimit = limits.maxWorkspaces === 999 ? 'unlimited' : limits.maxWorkspaces.toString();

  return [
  {
    title: 'Welcome to Prooflayer! 👋',
    description: 'The simple way to collect and display beautiful testimonials without monthly fees.',
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">What you can do:</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Create beautiful testimonial collection forms</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Approve and manage submissions</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Embed testimonial widgets anywhere on your site</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Customize layouts (grid or carousel) and themes</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'Step 1: Create a Workspace',
    description: 'Organize your testimonials by client or project',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What is a Workspace?</h4>
              <p className="text-sm text-gray-600 mb-3">
                A workspace is a container for your testimonials. Create separate workspaces for different clients, products, or websites.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Example:</strong> "Client A Website" or "My SaaS Product"
              </p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Tip:</strong> You can create up to {workspaceLimit} workspace{workspaceLimit === '1' ? '' : 's'} on your current plan.
            {plan === 'TRIAL' && ' Upgrade to get more!'}
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Step 2: Create a Form',
    description: 'Build a testimonial collection form in seconds',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Collecting Testimonials</h4>
              <p className="text-sm text-gray-600 mb-3">
                Each workspace can have multiple forms. Give your form a name and customize the heading and description.
              </p>
              <p className="text-sm text-gray-600">
                You'll get a shareable link to send to your clients or customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Step 3: Share & Collect',
    description: 'Get testimonials from your happy customers',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Share Your Form</h4>
              <p className="text-sm text-gray-600 mb-3">
                Copy the form link and share it via email, text, or social media. Your clients fill out the form with their testimonial, rating, and optional photo.
              </p>
              <p className="text-sm text-gray-600">
                All submissions go to your dashboard where you can review and approve them before they appear publicly.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Step 4: Embed & Display',
    description: 'Show off your testimonials on your website',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Your Widget Code</h4>
              <p className="text-sm text-gray-600 mb-3">
                Go to the Widgets page to get your embed code. Choose between grid or carousel layout, and light or dark theme.
              </p>
              <p className="text-sm text-gray-600">
                Copy the code and paste it anywhere on your website - Webflow, WordPress, Wix, or any HTML site.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-800">
            <strong>You're all set!</strong> The widget updates automatically as you approve new testimonials.
          </p>
        </div>
      </div>
    ),
  },
];
};

export default function OnboardingModal({ userId, plan }: { userId: string; plan: PlanType }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const steps = getSteps(plan);

  const handleComplete = async () => {
    try {
      // Mark onboarding as completed
      await fetch('/api/account/complete-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      setIsOpen(false);
      router.refresh();
    }
  };

  const handleSkip = async () => {
    await handleComplete();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl">✨</div>
              <span className="text-sm font-medium text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Skip tour
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
          <p className="text-gray-600 mt-1">{step.description}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {step.content}
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="text-gray-600 hover:text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {isLastStep ? "Let's Get Started!" : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
