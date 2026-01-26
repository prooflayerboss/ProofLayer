'use client';

import Link from 'next/link';
import { Search, ThumbsUp, Gift, CheckCircle, ArrowRight, Sparkles, Vote } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  tagline: string | null;
  category: string | null;
  offerDescription: string | null;
  voteCount: number;
  status: string;
  user: {
    name: string | null;
    businessName: string | null;
  };
}

interface UserVote {
  id: string;
  createdAt: Date;
  product: {
    id: string;
    name: string;
    status: string;
  };
}

interface ClaimedDeal {
  id: string;
  status: string;
  createdAt: Date;
  product: {
    id: string;
    name: string;
    tagline: string | null;
    offerDescription: string | null;
    user: {
      businessName: string | null;
    };
  };
}

interface AdopterDashboardProps {
  data: {
    productsToDiscover: Product[];
    votingProducts: Product[];
    userVotes: UserVote[];
    claimedDeals: ClaimedDeal[];
  };
}

export default function AdopterDashboard({ data }: AdopterDashboardProps) {
  const { productsToDiscover, votingProducts, userVotes, claimedDeals } = data;

  return (
    <>
      {/* Quick Stats */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {[
          { icon: ThumbsUp, label: 'Votes Cast', value: userVotes.length.toString(), color: 'bg-violet-100 text-violet-600' },
          { icon: Gift, label: 'Deals Claimed', value: claimedDeals.length.toString(), color: 'bg-[#00d084]/10 text-[#00d084]' },
          { icon: CheckCircle, label: 'Completed', value: claimedDeals.filter(d => d.status === 'COMPLETED').length.toString(), color: 'bg-blue-100 text-blue-600' },
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

      {/* Products in Voting */}
      {votingProducts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">Vote on New Products</h2>
              <span className="text-xs font-medium bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">
                {votingProducts.length} new
              </span>
            </div>
            <Link
              href="/dashboard/vote"
              className="text-sm text-violet-600 hover:underline font-medium flex items-center gap-1"
            >
              <Vote className="w-4 h-4" />
              View all
            </Link>
          </div>

          <div className="grid gap-4">
            {votingProducts.slice(0, 3).map((product) => {
              const hasVoted = userVotes.some(v => v.product.id === product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {product.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        {product.tagline && (
                          <p className="text-sm text-gray-500 mt-0.5">{product.tagline}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">
                            by {product.user.businessName || product.user.name || 'Anonymous'}
                          </span>
                          {product.category && (
                            <>
                              <span className="text-gray-300">|</span>
                              <span className="text-xs text-gray-400">{product.category}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{product.voteCount}/5</p>
                        <p className="text-xs text-gray-500">votes</p>
                      </div>
                      {hasVoted ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Voted
                        </span>
                      ) : (
                        <Link
                          href={`/p/${product.id}`}
                          className="inline-flex items-center gap-1 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          Vote
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Discover Products */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Discover Products</h2>
          <Link
            href="/dashboard/discover"
            className="text-sm text-violet-600 hover:underline font-medium flex items-center gap-1"
          >
            <Search className="w-4 h-4" />
            Explore all
          </Link>
        </div>

        {productsToDiscover.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-violet-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products to discover yet</h3>
            <p className="text-gray-500 text-sm mb-6">
              Check back soon for new products matching your interests
            </p>
            <Link
              href="/dashboard/discover"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors"
            >
              <Search className="w-4 h-4" />
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {productsToDiscover.slice(0, 5).map((product) => (
              <Link
                key={product.id}
                href={`/p/${product.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d084] to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {product.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
                        {product.name}
                      </h3>
                      {product.tagline && (
                        <p className="text-sm text-gray-500 mt-0.5">{product.tagline}</p>
                      )}
                      {product.offerDescription && (
                        <div className="mt-2 flex items-center gap-1.5 text-[#00d084]">
                          <Gift className="w-4 h-4" />
                          <span className="text-sm font-medium">{product.offerDescription}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Your Claimed Deals */}
      {claimedDeals.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Deals</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Product</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Offer</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {claimedDeals.map((deal) => (
                  <tr key={deal.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d084] to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                          {deal.product.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 text-sm">{deal.product.name}</span>
                          {deal.product.user.businessName && (
                            <p className="text-xs text-gray-400">by {deal.product.user.businessName}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{deal.product.offerDescription || 'Special offer'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        deal.status === 'COMPLETED'
                          ? 'bg-green-50 text-green-700'
                          : deal.status === 'CLAIMED'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {deal.status === 'COMPLETED' ? 'Completed' : deal.status === 'CLAIMED' ? 'Claimed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {new Date(deal.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
