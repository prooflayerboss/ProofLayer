'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Rocket, Upload, X, Sparkles, Check } from 'lucide-react';
import { UploadButton } from '@/lib/uploadthing-utils';
import Image from 'next/image';

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
  const [uploadingImages, setUploadingImages] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    tagline: string;
    offerDescription: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    url: '',
    category: '',
    stage: '',
    lookingForCount: 25,
    offerDescription: '',
    images: [] as string[],
  });

  function normalizeUrl(url: string): string {
    if (!url) return '';
    url = url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }

  function removeImage(index: number) {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  }

  async function handleAiImprove() {
    if (!formData.name) {
      setError('Please enter a product name first');
      return;
    }

    setAiLoading(true);
    setError('');
    setAiSuggestions(null);

    try {
      const res = await fetch('/api/ai/improve-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          tagline: formData.tagline,
          category: formData.category,
          stage: formData.stage,
          offerDescription: formData.offerDescription,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to improve content');
      }

      setAiSuggestions({
        tagline: data.tagline,
        offerDescription: data.offerDescription,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI improvement failed');
    } finally {
      setAiLoading(false);
    }
  }

  function applySuggestion(field: 'tagline' | 'offerDescription') {
    if (aiSuggestions) {
      setFormData({
        ...formData,
        [field]: aiSuggestions[field],
      });
    }
  }

  function applyAllSuggestions() {
    if (aiSuggestions) {
      setFormData({
        ...formData,
        tagline: aiSuggestions.tagline,
        offerDescription: aiSuggestions.offerDescription,
      });
      setAiSuggestions(null);
    }
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

        {/* Product Images */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Product Screenshots</h2>
          <p className="text-gray-500 text-sm mb-5">
            Add up to 5 screenshots or images of your product. Great visuals help attract early adopters!
          </p>

          {/* Uploaded Images Grid */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {formData.images.map((imageUrl, index) => (
                <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={imageUrl}
                    alt={`Product screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-[#00d084] text-white text-xs px-2 py-1 rounded font-medium">
                      Main
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          {formData.images.length < 5 && (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-4">
                {formData.images.length === 0
                  ? 'Add your first screenshot'
                  : `Add ${5 - formData.images.length} more screenshot${5 - formData.images.length !== 1 ? 's' : ''}`}
              </p>
              <UploadButton
                endpoint="productImageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    const newImages = res.map((file) => file.url);
                    setFormData({
                      ...formData,
                      images: [...formData.images, ...newImages].slice(0, 5),
                    });
                    setUploadingImages(false);
                  }
                }}
                onUploadBegin={() => {
                  setUploadingImages(true);
                }}
                onUploadError={(error: Error) => {
                  setError(`Upload failed: ${error.message}`);
                  setUploadingImages(false);
                }}
                appearance={{
                  button: 'bg-[#00d084] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity',
                  allowedContent: 'text-gray-500 text-xs mt-2',
                }}
              />
              {uploadingImages && (
                <p className="text-sm text-gray-500 mt-2">Uploading...</p>
              )}
            </div>
          )}

          {formData.images.length > 0 && (
            <p className="text-xs text-gray-400 mt-3">
              The first image will be used as your product&apos;s main image
            </p>
          )}
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

        {/* AI Improve Button */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Improve with AI</h3>
              <p className="text-gray-600 text-sm mb-4">
                Let AI rewrite your tagline and offer to be more compelling
              </p>
              <button
                type="button"
                onClick={handleAiImprove}
                disabled={aiLoading || !formData.name}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {aiLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Improve with AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Suggestions */}
          {aiSuggestions && (
            <div className="mt-6 space-y-4">
              <div className="bg-white rounded-xl p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">Suggested Tagline</span>
                  <button
                    type="button"
                    onClick={() => applySuggestion('tagline')}
                    className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Use this
                  </button>
                </div>
                <p className="text-gray-900">{aiSuggestions.tagline}</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">Suggested Offer</span>
                  <button
                    type="button"
                    onClick={() => applySuggestion('offerDescription')}
                    className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Use this
                  </button>
                </div>
                <p className="text-gray-900">{aiSuggestions.offerDescription}</p>
              </div>

              <button
                type="button"
                onClick={applyAllSuggestions}
                className="w-full bg-purple-100 text-purple-700 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Apply All Suggestions
              </button>
            </div>
          )}
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
            disabled={loading || uploadingImages}
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
