'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Rocket, Users, ThumbsUp, MessageSquare, Plus, ArrowRight, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  tagline: string | null;
  category: string | null;
  stage: string | null;
  status: string;
  voteCount: number;
  slug: string | null;
  images: string[];
  _count: {
    votes: number;
    earlyAdopterSignups: number;
  };
}

interface EarlyAdopterSignup {
  id: string;
  email: string;
  status: string;
  createdAt: Date;
  product: {
    name: string;
  };
}

interface Workspace {
  id: string;
  name: string;
  _count: {
    forms: number;
  };
}

interface FounderDashboardProps {
  data: {
    products: Product[];
    totalVotes: number;
    totalSignups: number;
    recentSignups: EarlyAdopterSignup[];
    approvedTestimonials: number;
    workspaces: Workspace[];
  };
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  PENDING: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending Review' },
  VOTING: { bg: 'bg-violet-100', text: 'text-violet-700', label: 'In Voting' },
  APPROVED: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Approved' },
  ACTIVE: { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' },
  PAUSED: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Paused' },
};

export default function FounderDashboard({ data }: FounderDashboardProps) {
  const { products, totalVotes, totalSignups, recentSignups, approvedTestimonials, workspaces } = data;

  return (
    <>
      {/* Quick Stats */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {[
          { icon: Package, label: 'Products', value: products.length.toString(), color: 'bg-[#00d084]/10 text-[#00d084]' },
          { icon: ThumbsUp, label: 'Total Votes', value: totalVotes.toString(), color: 'bg-violet-100 text-violet-600' },
          { icon: Users, label: 'Early Adopters', value: totalSignups.toString(), color: 'bg-blue-100 text-blue-600' },
          { icon: MessageSquare, label: 'Testimonials', value: approvedTestimonials.toString(), color: 'bg-amber-100 text-amber-600' },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 min-w-fit"
          >
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Your Products */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Products</h2>
          <Link
            href="/dashboard/products/new"
            className="text-sm text-[#00d084] hover:underline font-medium flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-[#00d084]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-[#00d084]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-500 text-sm mb-6">
              List your product to start connecting with early adopters
            </p>
            <Link
              href="/dashboard/products/new"
              className="inline-flex items-center gap-2 bg-[#00d084] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => {
              const status = statusColors[product.status] || statusColors.PENDING;
              return (
                <Link
                  key={product.id}
                  href={`/dashboard/products/${product.id}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {product.images && product.images.length > 0 ? (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00d084] to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
                          {product.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#00d084] transition-colors">
                          {product.name}
                        </h3>
                        {product.tagline && (
                          <p className="text-sm text-gray-500 mt-0.5">{product.tagline}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>
                          {product.category && (
                            <span className="text-xs text-gray-400">{product.category}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{product._count.votes}</p>
                        <p className="text-xs text-gray-500">votes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{product._count.earlyAdopterSignups}</p>
                        <p className="text-xs text-gray-500">signups</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#00d084] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Early Adopter Signups */}
      {recentSignups.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Signups</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Email</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Product</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSignups.map((signup) => (
                  <tr key={signup.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900 text-sm">{signup.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{signup.product.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        signup.status === 'COMPLETED'
                          ? 'bg-green-50 text-green-700'
                          : signup.status === 'CLAIMED'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {signup.status === 'COMPLETED' ? 'Completed' : signup.status === 'CLAIMED' ? 'Claimed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {new Date(signup.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Testimonials</h2>
          <Link
            href="/dashboard/workspaces"
            className="text-sm text-[#00d084] hover:underline font-medium"
          >
            Manage testimonials
          </Link>
        </div>

        {workspaces.length === 0 ? (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-900 mb-1">Set up testimonial collection</h3>
                <p className="text-amber-800 text-sm mb-4">
                  Create a workspace to start collecting testimonials from your early adopters.
                </p>
                <Link
                  href="/dashboard/workspaces/new"
                  className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create Workspace
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workspaces.slice(0, 3).map((workspace) => (
              <Link
                key={workspace.id}
                href={`/dashboard/workspaces/${workspace.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {workspace.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate group-hover:text-[#00d084] transition-colors">
                      {workspace.name}
                    </h3>
                    <p className="text-sm text-gray-500">{workspace._count.forms} forms</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
