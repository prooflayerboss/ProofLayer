'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  'SaaS / Software',
  'Developer Tools',
  'AI / Machine Learning',
  'Productivity',
  'Marketing',
  'Design',
  'Analytics',
  'E-commerce',
  'Finance / Fintech',
  'Education',
  'Health / Fitness',
  'Other',
];

const STAGES = [
  { value: 'idea', label: 'Idea stage', description: 'Still planning' },
  { value: 'building', label: 'Building', description: 'Actively developing' },
  { value: 'alpha', label: 'Alpha', description: 'Early testing' },
  { value: 'beta', label: 'Beta', description: 'Limited release' },
  { value: 'launched', label: 'Launched', description: 'Live and accepting users' },
];

export default function FounderSignup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    twitterHandle: '',
    productName: '',
    productTagline: '',
    productUrl: '',
    productCategory: '',
    productStage: '',
    lookingForCount: 25,
    offerDescription: '',
  });

  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/first100/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          type: 'founder',
          name: formData.name,
          twitterHandle: formData.twitterHandle,
          productName: formData.productName,
          productTagline: formData.productTagline,
          productUrl: formData.productUrl,
          productCategory: formData.productCategory,
          productStage: formData.productStage,
          lookingForCount: formData.lookingForCount,
          offerDescription: formData.offerDescription,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/first100/thank-you?type=founder');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  const canProceedStep1 = formData.email && formData.name;
  const canProceedStep2 = formData.productName && formData.productTagline && formData.productCategory;
  const canSubmit = canProceedStep1 && canProceedStep2 && formData.productStage && formData.offerDescription;

  return (
    <main className="min-h-screen bg-[#0a0a0b] py-12 px-4">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00d084]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-xl mx-auto">
        {/* Back link */}
        <Link
          href="/founders"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/50">Step {step} of 3</span>
            <span className="text-sm text-white/50">{Math.round((step / 3) * 100)}% complete</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00d084] to-emerald-400 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Let&apos;s get started</h1>
                  <p className="text-white/50">Tell us about yourself first.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Your name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Email address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      X/Twitter handle <span className="text-white/30">(optional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
                      <input
                        type="text"
                        value={formData.twitterHandle}
                        onChange={(e) => updateField('twitterHandle', e.target.value.replace('@', ''))}
                        placeholder="yourhandle"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="w-full bg-gradient-to-r from-[#00d084] to-emerald-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Product Info */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">About your product</h1>
                  <p className="text-white/50">Tell us what you&apos;re building.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Product name *</label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => updateField('productName', e.target.value)}
                      placeholder="My Awesome Product"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">One-line description *</label>
                    <input
                      type="text"
                      value={formData.productTagline}
                      onChange={(e) => updateField('productTagline', e.target.value)}
                      placeholder="A tool that helps founders do X"
                      maxLength={100}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084] focus:border-transparent"
                      required
                    />
                    <p className="mt-1 text-xs text-white/30">{formData.productTagline.length}/100 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Product URL <span className="text-white/30">(optional)</span>
                    </label>
                    <input
                      type="url"
                      value={formData.productUrl}
                      onChange={(e) => updateField('productUrl', e.target.value)}
                      placeholder="https://yourproduct.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Category *</label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => updateField('productCategory', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00d084] focus:border-transparent appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-[#1a1a1b]">Select a category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#1a1a1b]">{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white/5 text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep2}
                    className="flex-1 bg-gradient-to-r from-[#00d084] to-emerald-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: What You're Looking For */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">What are you looking for?</h1>
                  <p className="text-white/50">Tell early adopters what you&apos;re offering.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Product stage *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {STAGES.map((stage) => (
                        <button
                          key={stage.value}
                          type="button"
                          onClick={() => updateField('productStage', stage.value)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            formData.productStage === stage.value
                              ? 'border-[#00d084] bg-[#00d084]/10'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className={`text-sm font-medium ${formData.productStage === stage.value ? 'text-[#00d084]' : 'text-white'}`}>
                            {stage.label}
                          </div>
                          <div className="text-xs text-white/40">{stage.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      How many early adopters are you looking for? *
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={formData.lookingForCount}
                        onChange={(e) => updateField('lookingForCount', parseInt(e.target.value))}
                        className="flex-1 accent-[#00d084]"
                      />
                      <span className="text-white font-semibold w-12 text-center">{formData.lookingForCount}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      What are you offering early adopters? *
                    </label>
                    <textarea
                      value={formData.offerDescription}
                      onChange={(e) => updateField('offerDescription', e.target.value)}
                      placeholder="e.g., 50% lifetime discount, free access for 6 months, lifetime deal at $49..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084] focus:border-transparent resize-none"
                      required
                    />
                    <p className="mt-1 text-xs text-white/30">Be specific about the deal - this is what attracts early adopters!</p>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-white/5 text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!canSubmit || isLoading}
                    className="flex-1 bg-gradient-to-r from-[#00d084] to-emerald-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>

                <p className="text-xs text-white/30 text-center">
                  We&apos;ll review your application and get back to you within 24 hours.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* What happens next */}
        <div className="mt-8 text-center text-white/40 text-sm">
          <p className="font-medium text-white/60 mb-2">What happens next?</p>
          <p>We review your product → Match you with early adopters → You get your first users</p>
        </div>
      </div>
    </main>
  );
}
