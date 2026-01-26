'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

const stages = [
  { value: 'idea', label: 'Idea Stage', description: 'Just an idea, no code yet' },
  { value: 'building', label: 'Building', description: 'Actively developing' },
  { value: 'alpha', label: 'Alpha', description: 'Early internal testing' },
  { value: 'beta', label: 'Beta', description: 'External testing phase' },
  { value: 'launched', label: 'Launched', description: 'Live and available' },
];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    url: '',
    category: '',
    stage: '',
    lookingForCount: 25,
    offerDescription: '',
  });

  // Check auth
  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('/api/first100/auth/me');
      if (!res.ok) {
        router.push('/first100/login');
        return;
      }
      setChecking(false);
    }
    checkAuth();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/first100/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      router.push('/first100/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00d084] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00d084]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/first100/dashboard" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="relative max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
          <p className="text-white/50">Tell us about your product to connect with early adopters</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Basic Info</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
                  placeholder="My Awesome Product"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  maxLength={100}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
                  placeholder="A brief description of what it does"
                />
                <p className="text-white/30 text-xs mt-1">{formData.tagline.length}/100 characters</p>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
                  placeholder="https://yourproduct.com"
                />
              </div>
            </div>
          </div>

          {/* Category & Stage */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Details</h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all appearance-none"
                >
                  <option value="" className="bg-[#1a1a1b]">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#1a1a1b]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Stage *
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all appearance-none"
                >
                  <option value="" className="bg-[#1a1a1b]">Select a stage</option>
                  {stages.map((stage) => (
                    <option key={stage.value} value={stage.value} className="bg-[#1a1a1b]">
                      {stage.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Early Adopter Settings */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Early Adopter Offer</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  How many early adopters are you looking for?
                </label>
                <input
                  type="number"
                  value={formData.lookingForCount}
                  onChange={(e) => setFormData({ ...formData, lookingForCount: parseInt(e.target.value) || 25 })}
                  min={5}
                  max={1000}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  What are you offering? *
                </label>
                <textarea
                  value={formData.offerDescription}
                  onChange={(e) => setFormData({ ...formData, offerDescription: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all resize-none"
                  placeholder="e.g., Free lifetime access, 50% discount, Extended trial..."
                />
                <p className="text-white/30 text-xs mt-1">
                  Describe the deal you are offering early adopters in exchange for feedback
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <Link
              href="/first100/dashboard"
              className="px-6 py-3 text-white/50 hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00d084] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
