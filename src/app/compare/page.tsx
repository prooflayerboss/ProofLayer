import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />

      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Why Choose ProofLayer?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            See how we stack up against monthly subscription tools. Spoiler: you save thousands.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">ProofLayer</span>
                        <span className="text-xs text-blue-100 mt-1">That's us! 🎉</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Monthly Tool A</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Monthly Tool B</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Monthly Tool C</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Pricing */}
                  <tr className="bg-blue-50/50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Pricing Model</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        $59-$177 Lifetime
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">$20-$99/month</td>
                    <td className="px-6 py-4 text-center text-gray-600">$19-$79/month</td>
                    <td className="px-6 py-4 text-center text-gray-600">$29-$99/month</td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">3-Year Cost</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        $59-$177
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">$720-$3,564</td>
                    <td className="px-6 py-4 text-center text-gray-600">$684-$2,844</td>
                    <td className="px-6 py-4 text-center text-gray-600">$1,044-$3,564</td>
                  </tr>

                  {/* Features */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Video Testimonials</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">Text Testimonials</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Embed Widgets</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">Custom Branding</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-green-700 font-medium">Pro+ Plans</span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">$99/mo plan</td>
                    <td className="px-6 py-4 text-center text-gray-600">$79/mo plan</td>
                    <td className="px-6 py-4 text-center text-gray-600">$99/mo plan</td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Remove Branding</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-green-700 font-medium">$118 (one-time)</span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">$99/mo forever</td>
                    <td className="px-6 py-4 text-center text-gray-600">$79/mo forever</td>
                    <td className="px-6 py-4 text-center text-gray-600">$99/mo forever</td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">Multiple Workspaces</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-green-700 font-medium">Up to 10</span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">Limited</td>
                    <td className="px-6 py-4 text-center text-gray-600">Limited</td>
                    <td className="px-6 py-4 text-center text-gray-600">Single</td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Data Export</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-600">Higher tiers</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-6 h-6 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">Cancel Anytime?</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-green-700 font-medium">Nothing to cancel!</span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">Yes (lose access)</td>
                    <td className="px-6 py-4 text-center text-gray-600">Yes (lose access)</td>
                    <td className="px-6 py-4 text-center text-gray-600">Yes (lose access)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Savings Calculator */}
          <div className="mt-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">The Math is Simple</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600 mb-2">$59</p>
                <p className="text-gray-700">ProofLayer (Lifetime)</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">vs</span>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-600 mb-2">$1,188</p>
                <p className="text-gray-700">Monthly Tools (3 years)</p>
              </div>
            </div>
            <p className="text-center mt-6 text-xl font-semibold text-gray-900">
              You save <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">$1,129</span> over 3 years 🎉
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to make the switch?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of users who chose the smarter option.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-600/30"
            >
              Get Started from $59 →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
