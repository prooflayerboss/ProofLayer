import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, Users, Rocket } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { ProductImageGallery } from '@/components/ProductImageGallery';

interface Props {
  params: { slug: string };
}

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          name: true,
          twitterHandle: true,
          website: true,
        },
      },
      _count: {
        select: {
          votes: true,
          earlyAdopterSignups: true,
        },
      },
    },
  });

  if (!product || product.status !== 'APPROVED') {
    return null;
  }

  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - ${product.tagline || 'Early Access'} | ProofLayer`,
    description: product.offerDescription || product.tagline || `Get early access to ${product.name}`,
    openGraph: {
      title: product.name,
      description: product.tagline || '',
      type: 'website',
      images: product.images && product.images.length > 0 ? [product.images[0]] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const stageLabels: Record<string, string> = {
  idea: 'Idea Stage',
  building: 'Building',
  alpha: 'Alpha',
  beta: 'Beta',
  launched: 'Launched',
};

export default async function ProductPublicPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00d084] to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">ProofLayer</span>
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Product Header */}
          <div className="p-8 sm:p-12">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#00d084] to-emerald-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold flex-shrink-0 shadow-lg">
                {product.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {product.stage && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                      {stageLabels[product.stage] || product.stage}
                    </span>
                  )}
                  {product.category && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                      {product.category}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                {product.tagline && (
                  <p className="text-lg sm:text-xl text-gray-600">
                    {product.tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Product Images */}
            {product.images && product.images.length > 0 && (
              <div className="mb-8">
                <ProductImageGallery images={product.images} productName={product.name} />
              </div>
            )}

            {/* Founder Info */}
            {(product.user.name || product.user.twitterHandle) && (
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-lg">
                  {product.user.name?.charAt(0) || '@'}
                </div>
                <div>
                  {product.user.name && (
                    <div className="font-medium text-gray-900">{product.user.name}</div>
                  )}
                  {product.user.twitterHandle && (
                    <a
                      href={`https://x.com/${product.user.twitterHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#00d084] hover:underline"
                    >
                      @{product.user.twitterHandle}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Stats & Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{product.lookingForCount || 25}</div>
                    <div className="text-sm text-gray-600">Early adopters wanted</div>
                  </div>
                </div>
              </div>

              {product.url && (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 flex items-center gap-2 mb-1">
                        Visit Website
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                      <div className="text-sm text-gray-600 truncate max-w-[200px]">
                        {product.url.replace(/^https?:\/\//, '')}
                      </div>
                    </div>
                  </div>
                </a>
              )}
            </div>

            {/* Early Adopter Offer */}
            {product.offerDescription && (
              <div className="bg-gradient-to-r from-[#00d084]/10 to-emerald-500/10 border-2 border-[#00d084]/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00d084] flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">Early Adopter Offer</div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.offerDescription}
                </p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="border-t border-gray-100 bg-gray-50 p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Interested in early access?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Sign up to connect with the founder and claim this exclusive offer
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d084] to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all text-lg"
            >
              Get Early Access
            </Link>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">Are you building a product?</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-[#00d084] hover:underline font-semibold"
          >
            List your product and get your first 25 users
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 mt-20">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 ProofLayer</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
