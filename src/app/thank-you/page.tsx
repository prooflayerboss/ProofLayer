import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const isFounder = type === 'founder';

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-20 pb-24 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className={`w-20 h-20 ${isFounder ? 'bg-emerald-50' : 'bg-purple-50'} rounded-full flex items-center justify-center mx-auto mb-8`}>
            <svg className={`w-10 h-10 ${isFounder ? 'text-emerald-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">You're on the list!</h1>

          {isFounder ? (
            <>
              <p className="text-lg text-gray-600 mb-8">
                Thanks for signing up. We'll reach out soon to learn more about your product and how we can help you get your first users.
              </p>

              <div className="bg-gray-50 rounded-2xl p-8 text-left mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-600 text-sm font-bold">1</span>
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">We'll review your signup within 24 hours</p>
                      <p className="text-sm text-gray-500">Check your inbox for next steps</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-600 text-sm font-bold">2</span>
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">Tell us about your product</p>
                      <p className="text-sm text-gray-500">What you're building, who you need</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-600 text-sm font-bold">3</span>
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">Get matched with early adopters</p>
                      <p className="text-sm text-gray-500">We connect you with users in your category</p>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-600 mb-8">
                Thanks for joining as an early adopter. We'll send you exclusive product launches and lifetime deals based on your interests.
              </p>

              <div className="bg-gray-50 rounded-2xl p-8 text-left mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">What to expect</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-600 text-sm font-bold">1</span>
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">Weekly digest of new products</p>
                      <p className="text-sm text-gray-500">Curated based on your interests (not spam)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-600 text-sm font-bold">2</span>
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">Exclusive lifetime deals</p>
                      <p className="text-sm text-gray-500">Early-bird pricing not available later</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-600 text-sm font-bold">3</span>
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">Direct access to founders</p>
                      <p className="text-sm text-gray-500">Shape products with your feedback</p>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}

          <Link
            href="/"
            className={`inline-flex items-center gap-2 ${isFounder ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors`}
          >
            Back to home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
