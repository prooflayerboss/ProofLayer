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

  // Pricing tiers for AppSumo launch
  const pricingTiers = {
    SOLO: { price: 59, workspaces: 1, forms: 3, testimonials: 150 },
    PRO: { price: 118, workspaces: 3, forms: 30, testimonials: 1000 },
    AGENCY: { price: 177, workspaces: 10, forms: 50, testimonials: 5000 },
  };

  // Plan display configuration
  const planConfig: Record<string, { name: string; description: string; badge?: string; badgeColor?: string; features: string[] }> = {
    TRIAL: {
      name: 'Starter',
      description: 'Free forever with essential features',
      features: ['1 Workspace', '1 Form', '25 Testimonials', 'Grid layout', 'Email support']
    },
    SOLO: {
      name: 'Solo',
      description: 'Perfect for solopreneurs and freelancers',
      badge: 'Lifetime Access',
      badgeColor: 'bg-blue-500',
      features: ['1 Workspace', '3 Forms', '150 Testimonials', 'Grid layout', 'Video testimonials', 'Email support']
    },
    PRO: {
      name: 'Professional',
      description: 'Built for growing businesses',
      badge: 'Lifetime Access',
      badgeColor: 'bg-purple-500',
      features: ['3 Workspaces', '30 Forms', '1,000 Testimonials', 'All layouts (Grid, Carousel, Marquee)', 'Video testimonials', 'Remove branding', 'Priority support']
    },
    AGENCY: {
      name: 'Agency',
      description: 'For teams managing multiple clients',
      badge: 'Lifetime Access',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      features: ['10 Workspaces', '50 Forms', '5,000 Testimonials', 'All layouts + Popup & Floating widgets', 'Video testimonials', 'Remove branding', 'Priority support', 'White-label options']
    },
    MONTHLY: {
      name: 'Monthly Subscription',
      description: '$19/month, cancel anytime',
      badge: 'Active',
      badgeColor: 'bg-green-500',
      features: ['Unlimited Workspaces', 'Unlimited Forms', 'Unlimited Testimonials', 'All layouts & widgets', 'Video testimonials', 'Remove branding', 'Priority support']
    },
    LIFETIME: {
      name: 'Lifetime',
      description: 'One-time payment, unlimited forever',
      badge: 'Lifetime Access',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      features: ['Unlimited Workspaces', 'Unlimited Forms', 'Unlimited Testimonials', 'All layouts & widgets', 'Video testimonials', 'Remove branding', 'Priority support']
    }
  };

  const currentPlanConfig = planConfig[plan] || planConfig.TRIAL;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Billing</h1>

      {searchParams.success && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-800 px-6 py-4 rounded-lg mb-6 shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-lg">Payment Successful!</p>
              <p className="text-green-700">Welcome to {currentPlanConfig.name}! Your account has been upgraded with lifetime access.</p>
            </div>
          </div>
        </div>
      )}

      {searchParams.canceled && (
        <div className="bg-yellow-50 text-yellow-700 px-4 py-3 rounded-lg mb-6">
          Payment was canceled. No charges were made.
        </div>
      )}

      {/* Current Plan - Modern Design */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8 mb-6 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>

        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {currentPlanConfig.name}
                </h2>
                {currentPlanConfig.badge && (
                  <span className={`${currentPlanConfig.badgeColor} text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md animate-pulse`}>
                    {currentPlanConfig.badge}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-lg">
                {currentPlanConfig.description}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-3 mt-6">
            {currentPlanConfig.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
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

      {/* Upgrade Section */}
      {plan !== 'LIFETIME' && plan !== 'MONTHLY' && (
        <>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {plan === 'TRIAL' ? 'Upgrade Your Plan' : 'Upgrade to a Higher Tier'}
          </h2>
          <p className="text-gray-600 mb-6">
            {plan === 'TRIAL'
              ? 'Choose the plan that best fits your needs. Pay once, own forever.'
              : 'Unlock more features with a higher tier. One-time payment for lifetime access.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Solo Tier */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Solo</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">${pricingTiers.SOLO.price}</span>
                </div>
                <p className="text-sm text-gray-500">One-time payment</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">{pricingTiers.SOLO.workspaces} Workspace</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {pricingTiers.SOLO.forms} Forms
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {pricingTiers.SOLO.testimonials} Testimonials
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Grid layout
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Embed widget
                </li>
              </ul>

              <CheckoutButton plan="SOLO" />

              <p className="text-xs text-gray-500 text-center mt-4">
                14-Day Money Back Guarantee
              </p>
            </div>

            {/* Pro Tier - Popular */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl border-4 border-blue-400 p-6 text-white relative transform md:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-sm font-bold px-6 py-2 rounded-full whitespace-nowrap shadow-lg">
                MOST POPULAR
              </div>
              <div className="mt-2 mb-4">
                <h3 className="text-xl font-bold mb-2">Professional</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">${pricingTiers.PRO.price}</span>
                </div>
                <p className="text-sm text-blue-100">One-time payment</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">{pricingTiers.PRO.workspaces} Workspaces</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {pricingTiers.PRO.forms} Forms
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">{pricingTiers.PRO.testimonials.toLocaleString()} Testimonials</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Grid, Carousel, Marquee
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Branding removal</span>
                </li>
              </ul>

              <CheckoutButton plan="PRO" />

              <p className="text-xs text-blue-100 text-center mt-4">
                14-Day Money Back Guarantee
              </p>
            </div>

            {/* Agency Tier */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Agency</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">${pricingTiers.AGENCY.price}</span>
                </div>
                <p className="text-sm text-gray-500">One-time payment</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">{pricingTiers.AGENCY.workspaces} Workspaces</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {pricingTiers.AGENCY.forms} Forms
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">{pricingTiers.AGENCY.testimonials.toLocaleString()} Testimonials</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All layouts & styles
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Popup & Floating widgets
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">Priority support</span>
                </li>
              </ul>

              <CheckoutButton plan="AGENCY" />

              <p className="text-xs text-gray-500 text-center mt-4">
                14-Day Money Back Guarantee
              </p>
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
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Solo</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-blue-600 uppercase">Professional</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Price</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Free</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">${pricingTiers.SOLO.price}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">${pricingTiers.PRO.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">${pricingTiers.AGENCY.price}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Workspaces</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">1</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">{pricingTiers.SOLO.workspaces}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">{pricingTiers.PRO.workspaces}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">{pricingTiers.AGENCY.workspaces}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Forms</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">1</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">{pricingTiers.SOLO.forms}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">{pricingTiers.PRO.forms}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">{pricingTiers.AGENCY.forms}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Testimonials</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">25</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">{pricingTiers.SOLO.testimonials}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">{pricingTiers.PRO.testimonials.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">{pricingTiers.AGENCY.testimonials.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Layouts</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Grid only</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Grid only</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">Grid, Carousel, Marquee</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">All layouts</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Widget Badge</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Shown</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Shown</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">Hidden</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">Hidden</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Priority Support</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">-</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">-</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">-</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
