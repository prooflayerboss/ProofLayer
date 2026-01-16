import { redirect } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { PLAN_LIMITS } from '@/lib/constants';
import CheckoutButton from './checkout-button';
import CancelSubscriptionButton from './cancel-subscription-button';

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
              {plan === 'TRIAL' ? 'Trial' : plan === 'MONTHLY' ? 'Monthly' : 'Lifetime'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {plan === 'TRIAL'
                ? 'Free forever with limits'
                : plan === 'MONTHLY'
                ? '$19/month - Cancel anytime'
                : 'One-time purchase, unlimited access'}
            </p>
          </div>
          {(plan === 'LIFETIME' || (plan === 'MONTHLY' && user.entitlement?.subscriptionStatus === 'active')) && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </span>
          )}
          {plan === 'MONTHLY' && user.entitlement?.subscriptionStatus === 'canceling' && (
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              Canceling
            </span>
          )}
        </div>
        {plan === 'MONTHLY' && user.entitlement?.subscriptionStatus === 'active' && (
          <div className="border-t border-gray-200 pt-4">
            <CancelSubscriptionButton />
          </div>
        )}
        {plan === 'MONTHLY' && user.entitlement?.subscriptionStatus === 'canceling' && user.entitlement?.subscriptionPeriodEnd && (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">
              Your subscription will end on {new Date(user.entitlement.subscriptionPeriodEnd).toLocaleDateString()}. You&apos;ll be downgraded to the Trial plan after that.
            </p>
          </div>
        )}
      </div>

      {/* Usage */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Workspaces</span>
              <span className="text-gray-900 font-medium">
                {user.entitlement?.workspacesUsed || 0} / {limits.maxWorkspaces}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min(100, ((user.entitlement?.workspacesUsed || 0) / limits.maxWorkspaces) * 100)}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Submissions</span>
              <span className="text-gray-900 font-medium">
                {user.entitlement?.submissionsUsed || 0} / {limits.maxSubmissions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min(100, ((user.entitlement?.submissionsUsed || 0) / limits.maxSubmissions) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Section (Trial only) */}
      {plan === 'TRIAL' && (
        <>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upgrade Your Plan</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Monthly Plan */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Monthly</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$19</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  3 workspaces
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1,500 submissions/month
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No badge - white label
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cancel anytime
                </li>
              </ul>
              <CheckoutButton plan="MONTHLY" />
            </div>

            {/* Lifetime Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg border-2 border-blue-600 p-6 text-white relative">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                BEST VALUE
              </div>
              <h3 className="text-xl font-bold mb-2">Lifetime</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-blue-100">/once</span>
              </div>
              <p className="text-sm text-blue-100 mb-4">
                Pay once, use forever. Save $29 after just 11 months!
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  3 workspaces
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1,500 submissions/month
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No badge - white label
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime access - pay once
                </li>
              </ul>
              <CheckoutButton plan="LIFETIME" />
            </div>
          </div>
        </>
      )}

      {plan === 'MONTHLY' && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white mb-6">
          <h2 className="text-lg font-semibold mb-2">Upgrade to Lifetime & Save</h2>
          <p className="text-blue-100 mb-4">
            Pay $199 once instead of $19/month. Save money with lifetime access and never worry about monthly bills again!
          </p>
          <CheckoutButton plan="LIFETIME" />
        </div>
      )}

      {/* Plan Comparison */}
      <div className={plan === 'TRIAL' ? '' : 'mt-8'}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Plan Comparison</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feature</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trial</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Monthly ($19/mo)</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Lifetime ($199)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Workspaces</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">1</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">3</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">3</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Total Submissions</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">25</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">1,500</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">1,500</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Widget Badge</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">Shown</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">Hidden</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">Hidden</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Billing</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">Free</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">Monthly</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">One-time</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}