import { redirect } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { PLAN_LIMITS } from '@/lib/constants';
import CheckoutButton from './checkout-button';

export default async function BillingPage({
  searchParams,
}: {
  searchParams: { success?: string; canceled?: string };
}) {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const plan = user.entitlement?.plan || 'TRIAL';
  const limits = PLAN_LIMITS[plan];

  // Hardcoded for now - in real app, this would come from database
  const currentPrice = 49;
  const spotsLeft = 25;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Billing</h1>

      {searchParams.success && (
        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6">
          🎉 Payment successful! You now have Lifetime access.
        </div>
      )}

      {searchParams.canceled && (
        <div className="bg-yellow-50 text-yellow-700 px-4 py-3 rounded-lg mb-6">
          Payment was canceled. No charges were made.
        </div>
      )}

      {/* Current Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {plan === 'TRIAL' ? 'Trial' : plan === 'MONTHLY' ? 'Monthly Subscription' : 'Lifetime'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {plan === 'TRIAL'
                ? 'Free forever with limits'
                : plan === 'MONTHLY'
                ? '$19/month, unlimited access'
                : 'One-time purchase, unlimited access'}
            </p>
          </div>
          {(plan === 'LIFETIME' || plan === 'MONTHLY') && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </span>
          )}
        </div>
      </div>

      {/* Usage */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Workspaces</span>
              <span className="text-gray-900 font-medium">
                {user.entitlement?.workspacesUsed || 0} / {(plan === 'LIFETIME' || plan === 'MONTHLY') ? '∞' : limits.maxWorkspaces}
              </span>
            </div>
            {plan !== 'LIFETIME' && plan !== 'MONTHLY' && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, ((user.entitlement?.workspacesUsed || 0) / limits.maxWorkspaces) * 100)}%`,
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Submissions</span>
              <span className="text-gray-900 font-medium">
                {user.entitlement?.submissionsUsed || 0} / {(plan === 'LIFETIME' || plan === 'MONTHLY') ? '∞' : limits.maxSubmissions.toLocaleString()}
              </span>
            </div>
            {plan !== 'LIFETIME' && plan !== 'MONTHLY' && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, ((user.entitlement?.submissionsUsed || 0) / limits.maxSubmissions) * 100)}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Section (Trial only) */}
      {plan === 'TRIAL' && (
        <>
          {/* Limited Time Banner */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 text-yellow-900 font-bold">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              LIMITED OFFER: Only {spotsLeft} Founding Member Spots Left at ${currentPrice}!
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-2">Upgrade Your Plan</h2>
          <p className="text-gray-600 mb-6">
            Choose between a lifetime deal (pay once, never again) or monthly subscription.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Lifetime Plan - Featured */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl border-4 border-yellow-400 p-8 text-white relative transform md:scale-105 order-1 md:order-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-sm font-bold px-6 py-2 rounded-full whitespace-nowrap shadow-lg">
                🔥 FOUNDING MEMBER DEAL
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-2">Lifetime Access</h3>
                <p className="text-blue-100 text-sm mb-4">Pay once, use forever</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl text-blue-200 line-through">$199</span>
                  <span className="text-5xl font-bold">${currentPrice}</span>
                </div>
                <p className="text-blue-100 text-sm">One-time payment • Save $2,229 over 10 years!</p>
              </div>

              <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold mb-2">Price increases to:</p>
                <p className="text-xs text-blue-200">• $69 after first 25 members</p>
                <p className="text-xs text-blue-200">• $199 standard price</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><span className="font-semibold">5 workspaces</span> - Perfect for growing agencies</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><span className="font-semibold">Unlimited testimonials</span> - No monthly limits ever</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><span className="font-semibold">White label</span> - No "Powered by" badge</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><span className="font-semibold">All future updates</span> - Free forever</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><span className="font-semibold">Export anytime</span> - Your data, yours to keep</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><span className="font-semibold">Priority support</span> - Founding member perks</span>
                </li>
              </ul>

              <CheckoutButton plan="LIFETIME" />

              <p className="text-xs text-blue-200 text-center mt-4">
                14-Day Money Back Guarantee
              </p>
            </div>

            {/* Monthly Plan */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 order-2 md:order-1">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Monthly Subscription</h3>
                <p className="text-gray-500 text-sm">Pay as you go</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$19</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">= $228/year • $2,280 over 10 years</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited workspaces
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited testimonials
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  White label
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Recurring monthly payment
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  No founding member perks
                </li>
              </ul>

              <CheckoutButton plan="MONTHLY" />

              <p className="text-xs text-gray-500 text-center mt-4">
                Cancel anytime • No long-term commitment
              </p>
            </div>
          </div>

          {/* Value Comparison */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Why Lifetime is the Smart Choice:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-900 mb-1">After 3 months</p>
                <p className="text-gray-600">Monthly: <span className="font-semibold">$57</span></p>
                <p className="text-blue-600">Lifetime: <span className="font-semibold">${currentPrice}</span> ✓</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">After 1 year</p>
                <p className="text-gray-600">Monthly: <span className="font-semibold">$228</span></p>
                <p className="text-blue-600">Lifetime: <span className="font-semibold">${currentPrice}</span> ✓</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">After 10 years</p>
                <p className="text-gray-600">Monthly: <span className="font-semibold">$2,280</span></p>
                <p className="text-blue-600">Lifetime: <span className="font-semibold">${currentPrice}</span> ✓</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Plan Comparison Table */}
      <div className={plan === 'TRIAL' ? '' : 'mt-8'}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Plan Comparison</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feature</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trial</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    <div>Monthly</div>
                    <div className="text-gray-400 normal-case font-normal">(Coming Soon)</div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-blue-600 uppercase">
                    <div>Lifetime</div>
                    <div className="text-blue-500 normal-case font-normal">(${currentPrice} Limited)</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Price</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Free</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">$19/mo</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">
                    <span className="line-through text-gray-400">$199</span> ${currentPrice}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Workspaces</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">1</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Unlimited</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">5</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Testimonials</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">25 total</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Unlimited</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Widget Badge</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Shown</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Hidden</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">Hidden</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Priority Support</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">—</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">—</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Founding Member</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">—</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">—</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
