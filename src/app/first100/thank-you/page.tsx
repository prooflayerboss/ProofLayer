import Link from 'next/link';
import { First100Container, First100Button } from '@/components/first100/ui';

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const isFounder = type === 'founder';

  return (
    <main className="min-h-screen flex items-center justify-center py-12 bg-white">
      <First100Container size="sm">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">You&apos;re on the list!</h1>

          {isFounder ? (
            <>
              <p className="text-gray-500 mb-6">
                Thanks for signing up. We&apos;ll reach out soon to learn more about your product and how we can help
                you get your first users.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">1.</span>
                    We&apos;ll review your signup within 24 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">2.</span>
                    You&apos;ll get an email to tell us about your product
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">3.</span>
                    We&apos;ll start matching you with early adopters
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-500 mb-6">
                Thanks for joining as an early adopter. We&apos;ll send you exclusive product launches and lifetime
                deals before anyone else.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">What to expect</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">1.</span>
                    Curated new products in your inbox (not spam)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">2.</span>
                    Exclusive lifetime deals and early pricing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">3.</span>
                    Direct access to founders building cool stuff
                  </li>
                </ul>
              </div>
            </>
          )}

          <Link href="/first100">
            <First100Button variant="secondary">Back to home</First100Button>
          </Link>
        </div>
      </First100Container>
    </main>
  );
}
