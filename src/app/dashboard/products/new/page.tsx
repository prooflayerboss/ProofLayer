'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Rocket } from 'lucide-react';

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

  function normalizeUrl(url: string): string {
    if (!url) return '';
    url = url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const submitData = {
      ...formData,
      url: normalizeUrl(formData.url),
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00d084] to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Rocket className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-500">List your product to connect with early adopters</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Info</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="My Awesome Product"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                maxLength={100}
                placeholder="A short description of your product"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">{formData.tagline.length}/100 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="myproduct.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">https:// will be added automatically</p>
            </div>
          </div>
        </div>

        {/* Category & Stage */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stage *
              </label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option value="">Select a stage</option>
                {stages.map((stage) => (
                  <option key={stage.value} value={stage.value}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Early Adopter Offer */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Early Adopter Offer</h2>
          <p className="text-gray-500 text-sm mb-5">
            What are you offering early adopters? This could be a discount, lifetime deal, or exclusive access.
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many early adopters are you looking for?
              </label>
              <input
                type="number"
                value={formData.lookingForCount}
                onChange={(e) => setFormData({ ...formData, lookingForCount: parseInt(e.target.value) || 25 })}
                min={5}
                max={1000}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are you offering? *
              </label>
              <textarea
                value={formData.offerDescription}
                onChange={(e) => setFormData({ ...formData, offerDescription: e.target.value })}
                required
                rows={3}
                placeholder="e.g., 50% lifetime discount, 3 months free, exclusive beta access..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-blue-900">What happens next?</h3>
              <p className="text-blue-700 text-sm mt-1">
                Your product will enter the community voting phase. Once you reach 5 votes from early adopters, your product will be approved and visible to the community.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00d084] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5" />
                Create Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
