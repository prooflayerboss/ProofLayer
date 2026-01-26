'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rocket, Users, ArrowRight, Check } from 'lucide-react';

const categories = [
  'SaaS',
  'Developer Tools',
  'AI/ML',
  'No-Code',
  'Design',
  'Marketing',
  'Productivity',
  'E-commerce',
  'Finance',
  'Health',
  'Education',
  'Other',
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<'type' | 'founder' | 'adopter'>('type');
  const [userType, setUserType] = useState<'FOUNDER' | 'EARLY_ADOPTER' | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');

  // Founder fields
  const [founderData, setFounderData] = useState({
    businessName: '',
    website: '',
  });

  // Early adopter fields
  const [adopterData, setAdopterData] = useState({
    twitterHandle: '',
    interests: [] as string[],
  });

  useEffect(() => {
    // Check if user is authenticated and needs onboarding
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();

        if (!res.ok || !data.user) {
          router.push('/login');
          return;
        }

        // If user already completed onboarding, redirect to dashboard
        if (data.user.onboardingCompleted && data.user.userType) {
          router.push('/dashboard');
          return;
        }

        setCheckingAuth(false);
      } catch {
        router.push('/login');
      }
    }

    checkAuth();
  }, [router]);

  const handleTypeSelect = (type: 'FOUNDER' | 'EARLY_ADOPTER') => {
    setUserType(type);
    setStep(type === 'FOUNDER' ? 'founder' : 'adopter');
  };

  const toggleInterest = (category: string) => {
    setAdopterData(prev => ({
      ...prev,
      interests: prev.interests.includes(category)
        ? prev.interests.filter(i => i !== category)
        : [...prev.interests, category],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userType,
          ...(userType === 'FOUNDER' ? founderData : adopterData),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete onboarding');
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00d084] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00d084]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <svg width="32" height="32" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d084"/>
                    <stop offset="100%" stopColor="#00b371"/>
                  </linearGradient>
                </defs>
                <rect x="14" y="4" width="100" height="100" rx="20" fill="#00d084" opacity="0.25"/>
                <rect x="10" y="8" width="100" height="100" rx="20" fill="#00d084" opacity="0.5"/>
                <rect x="6" y="12" width="100" height="100" rx="20" fill="url(#icon-gradient)"/>
                <path d="M 36 64 L 48 76 L 76 44" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white">ProofLayer</span>
          </Link>
        </div>
      </header>

      <div className="relative max-w-2xl mx-auto px-4 py-16">
        {/* Step: Choose Type */}
        {step === 'type' && (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to ProofLayer
            </h1>
            <p className="text-white/60 text-lg mb-12">
              Tell us about yourself so we can personalize your experience
            </p>

            <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
              {/* Founder Card */}
              <button
                onClick={() => handleTypeSelect('FOUNDER')}
                className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-left hover:border-[#00d084]/50 hover:bg-white/[0.05] transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00d084]/10 flex items-center justify-center mb-6 group-hover:bg-[#00d084]/20 transition-colors">
                  <Rocket className="w-7 h-7 text-[#00d084]" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">I&apos;m a Founder</h2>
                <p className="text-white/50 text-sm">
                  Get early users for your product and collect testimonials
                </p>
                <ArrowRight className="absolute top-8 right-8 w-5 h-5 text-white/20 group-hover:text-[#00d084] transition-colors" />
              </button>

              {/* Early Adopter Card */}
              <button
                onClick={() => handleTypeSelect('EARLY_ADOPTER')}
                className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-left hover:border-violet-500/50 hover:bg-white/[0.05] transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors">
                  <Users className="w-7 h-7 text-violet-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">I&apos;m an Early Adopter</h2>
                <p className="text-white/50 text-sm">
                  Discover new products and get exclusive deals
                </p>
                <ArrowRight className="absolute top-8 right-8 w-5 h-5 text-white/20 group-hover:text-violet-400 transition-colors" />
              </button>
            </div>
          </div>
        )}

        {/* Step: Founder Details */}
        {step === 'founder' && (
          <div>
            <button
              onClick={() => setStep('type')}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#00d084]/10 flex items-center justify-center">
                <Rocket className="w-7 h-7 text-[#00d084]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Tell us about your business</h1>
                <p className="text-white/50">This helps us match you with the right early adopters</p>
              </div>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Business or Product Name
                </label>
                <input
                  type="text"
                  value={founderData.businessName}
                  onChange={(e) => setFounderData({ ...founderData, businessName: e.target.value })}
                  placeholder="Your company or product name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Website (optional)
                </label>
                <input
                  type="url"
                  value={founderData.website}
                  onChange={(e) => setFounderData({ ...founderData, website: e.target.value })}
                  placeholder="https://yourproduct.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 w-full bg-[#00d084] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Continue to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Step: Early Adopter Details */}
        {step === 'adopter' && (
          <div>
            <button
              onClick={() => setStep('type')}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-violet-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">What are you interested in?</h1>
                <p className="text-white/50">We&apos;ll show you products that match your interests</p>
              </div>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Twitter/X Handle (optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
                  <input
                    type="text"
                    value={adopterData.twitterHandle}
                    onChange={(e) => setAdopterData({ ...adopterData, twitterHandle: e.target.value.replace('@', '') })}
                    placeholder="username"
                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-3">
                  Categories you&apos;re interested in
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleInterest(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        adopterData.interests.includes(category)
                          ? 'bg-violet-500 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {adopterData.interests.includes(category) && (
                        <Check className="w-4 h-4 inline-block mr-1 -mt-0.5" />
                      )}
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 w-full bg-violet-500 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Continue to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
