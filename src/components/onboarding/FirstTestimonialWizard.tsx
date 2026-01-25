'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type WizardStep = 0 | 1 | 2 | 3;

interface CreatedData {
  workspaceId: string;
  workspaceName: string;
  formSlug: string;
  formName: string;
}

// Confetti component for celebration
function Confetti() {
  const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];
  const confettiCount = 50;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {[...Array(confettiCount)].map((_, i) => {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 2 + Math.random() * 2;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomRotation = Math.random() * 360;
        const size = 8 + Math.random() * 8;

        return (
          <motion.div
            key={i}
            initial={{
              x: `${randomX}vw`,
              y: -20,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              y: '110vh',
              rotate: randomRotation + 720,
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              backgroundColor: randomColor,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
          />
        );
      })}
    </div>
  );
}

// Animated illustration components
function WorkspaceIllustration() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <motion.div
        className="absolute"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-violet-600 rounded-3xl shadow-2xl shadow-blue-500/30 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
      {/* Floating elements */}
      <motion.div
        className="absolute -top-2 -right-4 w-12 h-12 bg-amber-400 rounded-xl shadow-lg"
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
      />
      <motion.div
        className="absolute -bottom-4 -left-6 w-8 h-8 bg-emerald-400 rounded-lg shadow-lg"
        initial={{ scale: 0, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.6, type: 'spring' }}
      />
      <motion.div
        className="absolute top-4 -left-8 w-6 h-6 bg-pink-400 rounded-full shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: 'spring' }}
      />
    </div>
  );
}

function FormIllustration() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-4 w-56 border border-gray-100"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Mock form */}
        <motion.div
          className="h-3 w-24 bg-gray-200 rounded mb-3"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
        <motion.div
          className="h-8 w-full bg-gray-100 rounded-lg mb-2 border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
        <motion.div
          className="h-8 w-full bg-gray-100 rounded-lg mb-3 border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        <motion.div
          className="flex gap-1 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-5 h-5 text-amber-400"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
            >
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="h-7 w-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
        />
      </motion.div>
    </div>
  );
}

function SuccessIllustration() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-emerald-400 rounded-full blur-2xl opacity-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
        {/* Main circle */}
        <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40">
          <motion.svg
            className="w-16 h-16 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </motion.svg>
        </div>
      </motion.div>
      {/* Celebration particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 80;
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'][i % 4],
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0
            }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0, 1, 0]
            }}
            transition={{
              delay: 0.8,
              duration: 1,
              ease: 'easeOut'
            }}
          />
        );
      })}
    </div>
  );
}

// Step indicator component
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-2">
      {[...Array(totalSteps)].map((_, i) => (
        <div key={i} className="flex items-center">
          <motion.div
            className={`relative flex items-center justify-center`}
            initial={false}
            animate={{
              scale: i === currentStep ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {i < currentStep ? (
              <motion.div
                className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            ) : i === currentStep ? (
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/20">
                <span className="text-sm font-bold text-gray-900">{i + 1}</span>
              </div>
            ) : (
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-sm font-medium text-white/60">{i + 1}</span>
              </div>
            )}
          </motion.div>
          {i < totalSteps - 1 && (
            <motion.div
              className="w-12 h-1 mx-1 rounded-full overflow-hidden bg-white/20"
            >
              <motion.div
                className="h-full bg-emerald-400"
                initial={{ width: '0%' }}
                animate={{ width: i < currentStep ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FirstTestimonialWizard({ userId: _userId }: { userId: string }) {
  const router = useRouter();
  const [step, setStep] = useState<WizardStep>(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Form data
  const [workspaceName, setWorkspaceName] = useState('');
  const [formName, setFormName] = useState('');

  // Created data (after step 2)
  const [createdData, setCreatedData] = useState<CreatedData | null>(null);

  // Copy states
  const [linkCopied, setLinkCopied] = useState(false);

  const formLink = createdData
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/f/${createdData.formSlug}`
    : '';

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on step change
    if (inputRef.current && (step === 1 || step === 2)) {
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [step]);

  const handleStep1Submit = () => {
    if (!workspaceName.trim()) {
      setError('Please enter a workspace name');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleStep2Submit = async () => {
    if (!formName.trim()) {
      setError('Please enter a form name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const workspaceRes = await fetch('/api/workspaces/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: workspaceName.trim() }),
      });

      if (!workspaceRes.ok) {
        const data = await workspaceRes.json();
        throw new Error(data.error || 'Failed to create workspace');
      }

      const workspaceData = await workspaceRes.json();

      const formData = new FormData();
      formData.append('name', formName.trim());
      formData.append('workspaceId', workspaceData.workspace.id);
      formData.append('headerTitle', 'Share your feedback');
      formData.append('collectEmail', 'on');
      formData.append('collectCompany', 'on');
      formData.append('collectRole', 'on');
      formData.append('collectRating', 'on');
      formData.append('allowText', 'on');
      formData.append('allowVideo', 'on');

      const formRes = await fetch('/api/onboarding/create-form', {
        method: 'POST',
        body: formData,
      });

      if (!formRes.ok) {
        const data = await formRes.json();
        throw new Error(data.error || 'Failed to create form');
      }

      const formResponseData = await formRes.json();

      setCreatedData({
        workspaceId: workspaceData.workspace.id,
        workspaceName: workspaceData.workspace.name,
        formSlug: formResponseData.form.slug,
        formName: formResponseData.form.name,
      });

      // Trigger confetti!
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);

      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(formLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleComplete = async () => {
    try {
      await fetch('/api/account/complete-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
      setIsOpen(false);
      router.refresh();
    }
  };

  const handleSkip = async () => {
    await handleComplete();
  };

  if (!isOpen) return null;

  const stepContent = [
    // Step 0: Welcome
    {
      title: "Welcome to ProofLayer",
      subtitle: "The easiest way to collect and display testimonials",
      illustration: <WorkspaceIllustration />,
      explanation: "In the next 60 seconds, we'll set up everything you need to start collecting powerful social proof from your customers.",
      whyItMatters: "Testimonials increase conversions by up to 34%. Let's get you set up.",
    },
    // Step 1: Workspace
    {
      title: "Name your workspace",
      subtitle: "A workspace organizes all your testimonials",
      illustration: <WorkspaceIllustration />,
      explanation: "Think of a workspace as a folder for a specific client or project. All testimonials collected here will stay organized together.",
      whyItMatters: "This helps you manage testimonials for multiple clients or products without mixing them up.",
    },
    // Step 2: Form
    {
      title: "Create your collection form",
      subtitle: "This is what your customers will see",
      illustration: <FormIllustration />,
      explanation: "Give your form a name to identify it later. We'll generate a beautiful, mobile-friendly form your customers can fill out.",
      whyItMatters: "A well-named form helps you track which campaign or request generated each testimonial.",
    },
    // Step 3: Success
    {
      title: "You're all set!",
      subtitle: "Your testimonial collection system is ready",
      illustration: <SuccessIllustration />,
      explanation: "Share the link below with your customers. When they submit testimonials, you'll see them in your dashboard where you can approve them for display.",
      whyItMatters: "Now you can embed beautiful testimonial widgets anywhere on your website.",
    },
  ];

  const current = stepContent[step];

  return (
    <>
      {showConfetti && <Confetti />}

      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Floating gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Main content */}
        <motion.div
          className="relative z-10 w-full max-w-2xl mx-4"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Skip button */}
          {step < 3 && (
            <motion.button
              onClick={handleSkip}
              className="absolute -top-12 right-0 text-sm text-white/50 hover:text-white/80 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Skip for now →
            </motion.button>
          )}

          {/* Progress indicator */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StepIndicator currentStep={step} totalSteps={4} />
          </motion.div>

          {/* Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl"
            layout
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Illustration area */}
                <div className="p-8 pb-4">
                  {current.illustration}
                </div>

                {/* Content area */}
                <div className="px-8 pb-8">
                  {/* Title */}
                  <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {current.title}
                    </h2>
                    <p className="text-white/60">
                      {current.subtitle}
                    </p>
                  </motion.div>

                  {/* Why it matters badge */}
                  <motion.div
                    className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-white/80">{current.explanation}</p>
                        <p className="text-xs text-violet-400 mt-2 font-medium">{current.whyItMatters}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Step-specific content */}
                  {step === 0 && (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: '📝', text: 'Collect testimonials' },
                          { icon: '✅', text: 'Approve & manage' },
                          { icon: '🎨', text: 'Customize widgets' },
                          { icon: '🚀', text: 'Embed anywhere' },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm text-white/80">{item.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={workspaceName}
                          onChange={(e) => setWorkspaceName(e.target.value)}
                          placeholder="e.g., My Business, Client Name"
                          className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-lg"
                          onKeyDown={(e) => e.key === 'Enter' && handleStep1Submit()}
                        />
                        <motion.div
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: workspaceName.length > 0 ? 1 : 0 }}
                        >
                          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                      <p className="text-xs text-white/40 mt-3 text-center">
                        💡 Tip: Use your business name or project name
                      </p>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {/* Show workspace confirmation */}
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-emerald-400">
                          Workspace "<span className="font-semibold">{workspaceName}</span>" ready
                        </span>
                      </div>

                      <div className="relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g., Customer Feedback"
                          className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-lg"
                          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleStep2Submit()}
                        />
                        <motion.div
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: formName.length > 0 ? 1 : 0 }}
                        >
                          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && createdData && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-4"
                    >
                      {/* Success badges */}
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                          ✓ Workspace created
                        </span>
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                          ✓ Form ready
                        </span>
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                          ✓ Link generated
                        </span>
                      </div>

                      {/* Form link */}
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">
                          Your testimonial form link
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            readOnly
                            value={formLink}
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                          />
                          <motion.button
                            onClick={handleCopyLink}
                            className={`px-4 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                              linkCopied
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white text-gray-900 hover:bg-white/90'
                            }`}
                            whileTap={{ scale: 0.95 }}
                          >
                            {linkCopied ? (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Copied!
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>

                      {/* Try it yourself */}
                      <a
                        href={formLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 rounded-xl p-4 text-violet-300 text-sm transition-colors"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview your form (try it yourself!)
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </a>
                    </motion.div>
                  )}

                  {/* Error message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <p className="text-sm text-red-400">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer with actions */}
                <div className="px-8 pb-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  {step > 0 && step < 3 ? (
                    <button
                      onClick={() => setStep((step - 1) as WizardStep)}
                      className="text-white/50 hover:text-white transition-colors text-sm font-medium"
                    >
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step === 0 && (
                    <motion.button
                      onClick={() => setStep(1)}
                      className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all ml-auto flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Let's go
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.button>
                  )}

                  {step === 1 && (
                    <motion.button
                      onClick={handleStep1Submit}
                      disabled={!workspaceName.trim()}
                      className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      whileHover={{ scale: workspaceName.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: workspaceName.trim() ? 0.98 : 1 }}
                    >
                      Continue
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.button>
                  )}

                  {step === 2 && (
                    <motion.button
                      onClick={handleStep2Submit}
                      disabled={isLoading || !formName.trim()}
                      className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      whileHover={{ scale: !isLoading && formName.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: !isLoading && formName.trim() ? 0.98 : 1 }}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Creating magic...
                        </>
                      ) : (
                        <>
                          Create & Launch
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  )}

                  {step === 3 && (
                    <motion.button
                      onClick={handleComplete}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all ml-auto flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Go to Dashboard
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Help text */}
          <motion.p
            className="text-center text-white/30 text-xs mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Need help? Check out our <a href="/help/getting-started/quick-start" className="underline hover:text-white/50 transition-colors">quick start guide</a>
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
}
