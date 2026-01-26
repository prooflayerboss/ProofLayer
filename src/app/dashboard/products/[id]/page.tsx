'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Users, ThumbsUp, Clock, CheckCircle, XCircle, Loader2, Edit2, Trash2 } from 'lucide-react';

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
  voteCount: number;
  createdAt: string;
  approvedAt: string | null;
  _count: {
    votes: number;
    earlyAdopterSignups: number;
  };
  earlyAdopterSignups: Array<{
    id: string;
    email: string;
    status: string;
    createdAt: string;
  }>;
}

const statusConfig: Record<string, { bg: string; text: string; icon: any; label: string }> = {
  PENDING: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: Clock, label: 'Pending Approval' },
  APPROVED: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Approved' },
  REJECTED: { bg: 'bg-red-50', text: 'text-red-700', icon: XCircle, label: 'Rejected' },
};

const stageLabels: Record<string, string> = {
  idea: 'Idea Stage',
  building: 'Building',
  alpha: 'Alpha',
  beta: 'Beta',
  launched: 'Launched',
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const productId = params?.id as string | undefined;

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;

      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch product');
        }

        setProduct(data.product);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#00d084] animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
          <p className="text-red-700">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  const status = statusConfig[product.status] || statusConfig.PENDING;
  const StatusIcon = status.icon;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d084] to-emerald-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {product.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              {product.tagline && (
                <p className="text-gray-500 mt-1">{product.tagline}</p>
              )}
              <div className="flex items-center gap-3 mt-2">
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${status.bg} ${status.text}`}>
                  <StatusIcon className="w-4 h-4" />
                  {status.label}
                </span>
                {product.category && (
                  <span className="text-sm text-gray-400">{product.category}</span>
                )}
                {product.stage && (
                  <span className="text-sm text-gray-400">• {stageLabels[product.stage] || product.stage}</span>
                )}
              </div>
            </div>
          </div>

          {product.url && (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#00d084] hover:underline font-medium"
            >
              Visit Website
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{product._count.votes}</p>
              <p className="text-sm text-gray-500">Votes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{product._count.earlyAdopterSignups}</p>
              <p className="text-sm text-gray-500">Signups</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{product.lookingForCount || 25}</p>
              <p className="text-sm text-gray-500">Target Adopters</p>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Details */}
      {product.offerDescription && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Early Adopter Offer</h2>
          <p className="text-gray-600">{product.offerDescription}</p>
        </div>
      )}

      {/* Status Info */}
      {product.status === 'PENDING' && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-8">
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Awaiting Approval</h3>
              <p className="text-yellow-700 text-sm mt-1">
                Your product needs 5 votes from early adopters to be approved. Share your product page to get votes!
              </p>
              {product.slug && (
                <p className="text-yellow-700 text-sm mt-2">
                  Public page: <a href={`/p/${product.slug}`} target="_blank" className="underline font-medium">/p/{product.slug}</a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Early Adopter Signups */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Early Adopter Signups</h2>
        </div>

        {product.earlyAdopterSignups.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No signups yet</p>
            <p className="text-gray-400 text-xs mt-1">Early adopters will appear here when they claim your offer</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Email</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Signed Up</th>
              </tr>
            </thead>
            <tbody>
              {product.earlyAdopterSignups.map((signup) => (
                <tr key={signup.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-6 py-4 text-sm text-gray-900">{signup.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      signup.status === 'CLAIMED' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {signup.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(signup.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
