'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface TourStep {
  target: string;
  title: string;
  content: string;
  whyItMatters: string;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  highlight?: boolean;
}

const tourSteps: TourStep[] = [
  {
    target: 'body',
    title: "Welcome to your dashboard! 👋",
    content: "This is your command center for collecting and managing testimonials. Let me show you around.",
    whyItMatters: "In 60 seconds, you'll know exactly where everything is.",
    placement: 'center',
  },
  {
    target: '[data-tour="welcome-banner"]',
    title: "Your Home Base",
    content: "This banner gives you a quick welcome and shows your most important action: creating a workspace.",
    whyItMatters: "Everything in ProofLayer starts with a workspace.",
    placement: 'bottom',
    highlight: true,
  },
  {
    target: '[data-tour="create-workspace-btn"]',
    title: "Start Here: Create a Workspace",
    content: "Click this button to create your first workspace. A workspace is like a folder that holds all testimonials for one client or project.",
    whyItMatters: "You'll create a workspace, then a form, then share the link to collect testimonials.",
    placement: 'bottom',
    highlight: true,
  },
  {
    target: '[data-tour="nav-workspaces"]',
    title: "Workspaces Navigation",
    content: "All your workspaces live here. Click to see them all, manage forms, and review testimonial submissions.",
    whyItMatters: "This is where you'll spend most of your time approving testimonials.",
    placement: 'right',
    highlight: true,
  },
  {
    target: '[data-tour="nav-widgets"]',
    title: "Widgets & Embed Codes",
    content: "Once you have approved testimonials, come here to get your embed code. Choose from grids, carousels, or single testimonial displays.",
    whyItMatters: "One line of code adds beautiful testimonials to any website.",
    placement: 'right',
    highlight: true,
  },
  {
    target: '[data-tour="stats-overview"]',
    title: "Your Stats at a Glance",
    content: "Track your workspaces, forms, submissions, and widget views. These update in real-time as you collect testimonials.",
    whyItMatters: "Monitor your social proof growth over time.",
    placement: 'bottom',
    highlight: true,
  },
  {
    target: '[data-tour="workspaces-section"]',
    title: "Your Workspaces Appear Here",
    content: "After creating workspaces, they'll show up in this section. Click any workspace to manage its forms and testimonials.",
    whyItMatters: "Quick access to your most recent projects.",
    placement: 'top',
    highlight: true,
  },
  {
    target: 'body',
    title: "You're all set! 🎉",
    content: "Ready to collect your first testimonial? Click 'Create Workspace' to get started. The process takes about 60 seconds.",
    whyItMatters: "Testimonials increase conversions by up to 34%. Let's get you some!",
    placement: 'center',
  },
];

interface DashboardOnboardingTourProps {
  onComplete: () => void;
}

export default function DashboardOnboardingTour({ onComplete }: DashboardOnboardingTourProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = tourSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tourSteps.length - 1;
  const isCenterPlacement = step.placement === 'center';

  // Calculate tooltip position based on target element
  const updatePosition = useCallback(() => {
    if (isCenterPlacement) {
      setTargetRect(null);
      setTooltipPosition({
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
      });
      return;
    }

    const targetEl = document.querySelector(step.target);
    if (!targetEl) {
      // If target not found, center the tooltip
      setTargetRect(null);
      setTooltipPosition({
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
      });
      return;
    }

    const rect = targetEl.getBoundingClientRect();
    setTargetRect(rect);

    const padding = 16;
    const tooltipWidth = 380;
    const tooltipHeight = 200;

    let top = 0;
    let left = 0;

    switch (step.placement) {
      case 'top':
        top = rect.top - tooltipHeight - padding;
        left = rect.left + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + padding;
        left = rect.left + rect.width / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - tooltipWidth - padding;
        break;
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + padding;
        break;
    }

    // Keep tooltip within viewport
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));

    setTooltipPosition({ top, left });
  }, [step, isCenterPlacement]);

  // Initialize tour with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, 500);

    return () => clearTimeout(timer);
  }, [updatePosition]);

  // Update position on step change or resize
  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, updatePosition]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    setIsVisible(false);
    try {
      await fetch('/api/account/complete-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
    }
    onComplete();
    router.refresh();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 z-[9998]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Dark overlay with spotlight cutout */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {targetRect && step.highlight && (
                <motion.rect
                  x={targetRect.left - 8}
                  y={targetRect.top - 8}
                  width={targetRect.width + 16}
                  height={targetRect.height + 16}
                  rx="12"
                  fill="black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.75)"
            mask="url(#spotlight-mask)"
          />
        </svg>

        {/* Animated ring around target */}
        {targetRect && step.highlight && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 rounded-xl border-2 border-blue-400 animate-pulse" />
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-blue-400"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className={`fixed z-[9999] ${isCenterPlacement ? '-translate-x-1/2 -translate-y-1/2' : ''}`}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            maxWidth: 380,
          }}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Progress bar */}
            <div className="h-1 bg-gray-100">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {tourSteps.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentStep
                          ? 'bg-blue-500'
                          : i < currentStep
                          ? 'bg-emerald-500'
                          : 'bg-gray-200'
                      }`}
                      animate={{
                        scale: i === currentStep ? 1.2 : 1,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">
                  {currentStep + 1} / {tourSteps.length}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {step.content}
              </p>

              {/* Why it matters */}
              <div className="bg-blue-50 rounded-xl p-3 mb-4 border border-blue-100">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-blue-700">
                    {step.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div>
                  {!isFirstStep && (
                    <button
                      onClick={handlePrev}
                      className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                    >
                      ← Back
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {!isLastStep && (
                    <button
                      onClick={handleSkip}
                      className="text-sm text-gray-400 hover:text-gray-600"
                    >
                      Skip tour
                    </button>
                  )}
                  <motion.button
                    onClick={handleNext}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      isLastStep
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLastStep ? (
                      <>
                        Get Started
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Next
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Pointer arrow */}
          {!isCenterPlacement && targetRect && (
            <div
              className={`absolute w-4 h-4 bg-white border-gray-200 transform rotate-45 ${
                step.placement === 'bottom'
                  ? '-top-2 left-1/2 -translate-x-1/2 border-l border-t'
                  : step.placement === 'top'
                  ? '-bottom-2 left-1/2 -translate-x-1/2 border-r border-b'
                  : step.placement === 'right'
                  ? '-left-2 top-8 border-l border-b'
                  : '-right-2 top-8 border-r border-t'
              }`}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
