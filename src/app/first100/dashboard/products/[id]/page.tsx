'use client';

import { useState, useEffect, use } from 'react';
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

interface Product {
  id: string;
  name: string;
  tagline: string | null;
  url: string | null;
  category: string | null;
  stage: string | null;
  slug: string | null;
  lookingForCount: number | null;
  offerDescription: string | null;
  status: string;
  plan: string | null;
  voteCount: number;
}

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    url: '',
    category: '',
    stage: '',
    lookingForCount: 25,
    offerDescription: '',
  });

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/first100/products/${id}`);
        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            router.push('/first100/login');
            return;
          }
          throw new Error(data.error || 'Failed to load product');
        }

        setProduct(data.product);
        setFormData({
          name: data.product.name || '',
          tagline: data.product.tagline || '',
          url: data.product.url || '',
          category: data.product.category || '',
          stage: data.product.stage || '',
          lookingForCount: data.product.lookingForCount || 25,
          offerDescription: data.product.offerDescription || '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const res = await fetch(`/api/first100/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update product');
      }

      router.push('/first100/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);

    try {
      const res = await fetch(`/api/first100/products/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete product');
      }

      router.push('/first100/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00d084] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold text-white mb-2">Product not found</h1>
          <p className="text-white/50 mb-6">{error || 'This product does not exist or you do not have access to it.'}</p>
          <Link
            href="/first100/dashboard"
            className="inline-flex items-center gap-2 bg-[#00d084] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const statusLabels: Record<string, string> = {
    pending: 'Pending Review',
    voting: 'In Voting',
    approved: 'Approved',
    active: 'Active',
    paused: 'Paused',
  };

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

          {product.slug && (
            <Link
              href={`/p/${product.slug}`}
              target="_blank"
              className="text-[#00d084] hover:underline text-sm flex items-center gap-1"
            >
              View Public Page
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          )}
        </div>
      </header>

      <div className="relative max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Edit Product</h1>
            <p className="text-white/50">Update your product details</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              product.status === 'active' || product.status === 'approved'
                ? 'bg-green-500/20 text-green-400'
                : product.status === 'voting'
                ? 'bg-violet-500/20 text-violet-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              {statusLabels[product.status] || product.status}
            </span>
            {product.status === 'voting' && (
              <span className="text-white/40 text-sm">{product.voteCount}/5 votes</span>
            )}
          </div>
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
                />
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
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              Delete Product
            </button>

            <div className="flex items-center gap-4">
              <Link
                href="/first100/dashboard"
                className="px-6 py-3 text-white/50 hover:text-white transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="bg-[#00d084] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1b] border border-white/10 rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-2">Delete Product?</h3>
              <p className="text-white/50 mb-6">
                This will permanently delete &quot;{product.name}&quot; and all associated data. This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className="px-4 py-2 text-white/50 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
