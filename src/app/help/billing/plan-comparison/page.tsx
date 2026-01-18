import HelpArticle, { Section, Step, Tip, Warning } from '@/components/HelpArticle';
import Link from 'next/link';

export default function PlanComparison() {
  return (
    <HelpArticle
      title="Plan Comparison & Pricing Guide"
      description="Detailed breakdown of ProofLayer plans to help you choose the right fit"
      category="Billing"
      lastUpdated="January 2026"
    >
      <p className="text-lg text-gray-700 mb-6">
        ProofLayer offers flexible pricing with both lifetime deals and monthly subscriptions. Our lifetime plans (Solo, Pro, Agency)
        provide one-time payment options, while our Monthly plan offers ongoing flexibility. This comprehensive guide breaks down
        what's included in each plan to help you choose the right fit for your needs.
      </p>

      <Section title="Plans at a Glance">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="border-2 border-gray-300 rounded-lg p-5 bg-white">
            <div className="text-center mb-4">
              <h3 className="font-bold text-gray-900 text-xl mb-1">Trial</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">Free</div>
              <p className="text-sm text-gray-600">Test drive</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>1 workspace</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>1 form</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>25 submissions</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Grid layout only</span>
              </li>
            </ul>
          </div>

          <div className="border-2 border-blue-500 rounded-lg p-5 bg-blue-50">
            <div className="text-center mb-4">
              <h3 className="font-bold text-gray-900 text-xl mb-1">Solo</h3>
              <div className="text-3xl font-bold text-blue-600 mb-1">$59</div>
              <p className="text-sm text-gray-600">one-time</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>1 workspace</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>3 forms</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>150</strong> submissions</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Grid only</span>
              </li>
            </ul>
          </div>

          <div className="border-2 border-purple-500 rounded-lg p-5 bg-purple-50 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
            </div>
            <div className="text-center mb-4">
              <h3 className="font-bold text-gray-900 text-xl mb-1">Pro</h3>
              <div className="text-3xl font-bold text-purple-600 mb-1">$118</div>
              <p className="text-sm text-gray-600">one-time</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>3 workspaces</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>30</strong> forms</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>1,000</strong> submissions</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>3 layouts</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Remove badge</strong></span>
              </li>
            </ul>
          </div>

          <div className="border-2 border-orange-500 rounded-lg p-5 bg-orange-50">
            <div className="text-center mb-4">
              <h3 className="font-bold text-gray-900 text-xl mb-1">Agency</h3>
              <div className="text-3xl font-bold text-orange-600 mb-1">$177</div>
              <p className="text-sm text-gray-600">one-time</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>10 workspaces</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>50 forms</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>5,000</strong> submissions</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>All layouts</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>All widget types</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Detailed Feature Comparison">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Feature</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Trial</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-700">Solo</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-purple-700">Pro</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-orange-700">Agency</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50" colSpan={5}>Core Features</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Workspaces</td>
                <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                <td className="border border-gray-300 px-4 py-2 text-center">3</td>
                <td className="border border-gray-300 px-4 py-2 text-center">10</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Forms per workspace</td>
                <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                <td className="border border-gray-300 px-4 py-2 text-center">3</td>
                <td className="border border-gray-300 px-4 py-2 text-center">30</td>
                <td className="border border-gray-300 px-4 py-2 text-center">50</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Total submissions</td>
                <td className="border border-gray-300 px-4 py-2 text-center">25</td>
                <td className="border border-gray-300 px-4 py-2 text-center">150</td>
                <td className="border border-gray-300 px-4 py-2 text-center">1,000</td>
                <td className="border border-gray-300 px-4 py-2 text-center">5,000</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Display widgets</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Unlimited</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Unlimited</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Unlimited</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Wall of Love</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50" colSpan={5}>Submission Types</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Text testimonials</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Video testimonials</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Screenshot testimonials</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Star ratings</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50" colSpan={5}>Customization</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Workspace logo</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Custom colors</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Custom fonts</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Remove ProofLayer badge</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Custom domain for Wall of Love</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">White-label (no ProofLayer branding)</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50" colSpan={5}>Advanced Features</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Email notifications</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Testimonial moderation</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">CSV export</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Analytics & insights</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Basic</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Basic</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Advanced</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Advanced</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">API access</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Automated approval rules</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50" colSpan={5}>Support</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Email support</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Priority support</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Dedicated account manager</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Setup assistance</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Which Plan is Right for You?">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
            <h3 className="font-bold text-blue-900 text-xl mb-3">Choose Solo If You:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span>Are a <strong>freelancer, consultant, or solo entrepreneur</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span>Have <strong>one main brand or business</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span>Don't mind the <strong>"Powered by ProofLayer" badge</strong> on widgets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span>Are okay with <strong>default ProofLayer styling</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span>Want to <strong>keep costs low</strong> while getting started</span>
              </li>
            </ul>
            <div className="mt-4 bg-white p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Perfect for:</strong> Independent professionals, coaches, small service businesses,
                course creators, local businesses
              </p>
            </div>
          </div>

          <div className="border-2 border-purple-500 rounded-lg p-6 bg-purple-50">
            <h3 className="font-bold text-purple-900 text-xl mb-3">Choose Pro If You:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span>Run a <strong>growing SaaS or e-commerce business</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span>Need <strong>multiple workspaces</strong> (different products/brands)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span>Want <strong>brand-matched colors and styling</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span>Prefer a <strong>professional, white-labeled appearance</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span>Need <strong>advanced analytics and API access</strong></span>
              </li>
            </ul>
            <div className="mt-4 bg-white p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Perfect for:</strong> Growing startups, SaaS companies, established e-commerce brands,
                multi-product businesses
              </p>
            </div>
          </div>

          <div className="border-2 border-orange-500 rounded-lg p-6 bg-orange-50 md:col-span-2">
            <h3 className="font-bold text-orange-900 text-xl mb-3">Choose Agency If You:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-1">✓</span>
                  <span>Are an <strong>agency or consultancy</strong> managing multiple clients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-1">✓</span>
                  <span>Need <strong>5 separate workspaces</strong> for different clients/brands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-1">✓</span>
                  <span>Want <strong>complete white-label branding</strong> (no ProofLayer mentions)</span>
                </li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-1">✓</span>
                  <span>Need <strong>custom domains</strong> for client Wall of Love pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-1">✓</span>
                  <span>Require <strong>priority support and dedicated account manager</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-1">✓</span>
                  <span>Want <strong>hands-on setup assistance</strong> for client accounts</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 bg-white p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Perfect for:</strong> Marketing agencies, web design firms, consultancies managing 3-5 clients,
                businesses with multiple distinct brands
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Frequently Asked Questions">
        <div className="space-y-3">
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Can I upgrade or downgrade my plan anytime?</summary>
            <div className="text-gray-700 text-sm mt-3">
              <p className="mb-2">
                Yes! You can change your plan at any time from your account settings.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Upgrading:</strong> Takes effect immediately. You'll be prorated for the remainder of your billing cycle.</li>
                <li><strong>Downgrading:</strong> Takes effect at the end of your current billing period. You keep all features until then.</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">What happens when I reach my plan limits?</summary>
            <div className="text-gray-700 text-sm mt-3">
              <p className="mb-2">
                If you approach your plan limits, we'll notify you via email. Here's what happens:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Form limit:</strong> You can't create new forms until you upgrade or delete existing ones</li>
                <li><strong>Submission limit (Trial only):</strong> Forms stop accepting new submissions after 100. Upgrade to remove limits.</li>
                <li><strong>Workspace limit:</strong> Can't create additional workspaces until you upgrade</li>
              </ul>
              <p className="mt-2">
                Existing testimonials, widgets, and Wall of Love continue working normally even if you hit limits.
              </p>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Is there a discount for annual billing?</summary>
            <div className="text-gray-700 text-sm mt-3">
              <p className="mb-2">
                Yes! Save <strong>20% by paying annually</strong> instead of monthly:
              </p>
              <ul className="space-y-1 text-gray-700">
                <li><strong>Solo:</strong> $182/year (vs $228/year monthly) - Save $46</li>
                <li><strong>Pro:</strong> $470/year (vs $588/year monthly) - Save $118</li>
                <li><strong>Agency:</strong> $1,430/year (vs $1,788/year monthly) - Save $358</li>
              </ul>
              <p className="mt-2">
                Toggle between monthly and annual billing on the pricing page or in your account settings.
              </p>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">What payment methods do you accept?</summary>
            <div className="text-gray-700 text-sm mt-3">
              <p>
                We accept all major credit cards (Visa, Mastercard, American Express, Discover) via Stripe.
                We do not currently accept PayPal, but this is coming soon. Annual plans can be paid via bank transfer -
                contact sales for details.
              </p>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Can I cancel my subscription?</summary>
            <div className="text-gray-700 text-sm mt-3">
              <p className="mb-2">
                Yes, you can cancel anytime from your account settings. There are no cancellation fees or penalties.
              </p>
              <p className="mb-2"><strong>What happens when you cancel:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your account remains active until the end of your paid period</li>
                <li>After that, forms stop accepting new submissions</li>
                <li>Widgets and Wall of Love remain visible with existing testimonials</li>
                <li>You can still log in to view/export your data for 30 days</li>
                <li>After 30 days, data is archived (can be restored if you resubscribe)</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Is there a free plan after the trial?</summary>
            <div className="text-gray-700 text-sm mt-3">
              <p>
                Currently, we don't offer a permanent free plan beyond the 14-day trial. However, we're considering
                a limited free tier in the future. The Solo plan at $19/month is our most affordable option for
                ongoing use.
              </p>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Do you offer refunds?</summary>
            <div className="text-gray-700 text-sm mt-3">
              <p className="mb-2">
                We offer a <strong>14-day money-back guarantee</strong> on all paid plans. If you're not satisfied
                within the first 14 days, contact support for a full refund, no questions asked.
              </p>
              <p>
                After 14 days, subscriptions are non-refundable, but you can cancel to prevent future charges.
              </p>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Can I get more workspaces on the Pro plan?</summary>
            <div className="text-gray-700 text-sm mt-3">
              <p>
                The Pro plan includes 3 workspaces. If you need more, you have two options:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Upgrade to Agency plan (5 workspaces)</li>
                <li>Purchase additional workspaces: $15/month per extra workspace (available on Pro or Agency)</li>
              </ul>
              <p className="mt-2">
                Contact support to add extra workspaces to your account.
              </p>
            </div>
          </details>
        </div>
      </Section>

      <Section title="How to Upgrade Your Plan">
        <Step number={1} title="Access Billing Settings">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Log in to your ProofLayer dashboard</li>
            <li>Click your profile icon in the top right</li>
            <li>Select <strong>"Billing & Plans"</strong> from the dropdown</li>
          </ol>
        </Step>

        <Step number={2} title="Choose Your New Plan">
          <p className="mb-3">
            You'll see all available plans with their features. Click <strong>"Upgrade to [Plan Name]"</strong> on the
            plan you want.
          </p>
          <Tip>
            Compare the plans side-by-side on this page. Look for features highlighted in green - those are what
            you'll gain by upgrading.
          </Tip>
        </Step>

        <Step number={3} title="Select Billing Frequency">
          <p className="mb-3">
            Choose between monthly or annual billing:
          </p>
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <p className="font-semibold text-green-900 mb-1">Annual Billing Saves 20%</p>
            <p className="text-sm text-gray-700">
              If you're committed to using ProofLayer long-term, annual billing offers significant savings.
            </p>
          </div>
        </Step>

        <Step number={4} title="Enter Payment Information">
          <p className="mb-3">
            If this is your first time subscribing, you'll need to enter:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>Credit card number</li>
            <li>Expiration date and CVV</li>
            <li>Billing address</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            All payments are processed securely through Stripe. ProofLayer never stores your full credit card details.
          </p>
        </Step>

        <Step number={5} title="Confirm and Activate">
          <p className="mb-3">
            Review your plan selection, billing amount, and next billing date. Click <strong>"Confirm Upgrade"</strong>
            to activate immediately.
          </p>
          <p className="text-sm text-gray-700">
            You'll receive a confirmation email with your receipt and updated plan details.
          </p>
        </Step>
      </Section>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Ready to Choose Your Plan?</h2>
        <p className="text-blue-100 mb-6">
          Start with our free 14-day trial to explore all features, then upgrade to the plan that fits your needs.
          No credit card required for the trial!
        </p>
        <div className="flex gap-4">
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Start Free Trial
          </Link>
          <Link
            href="/pricing"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            View Full Pricing
          </Link>
        </div>
      </div>
    </HelpArticle>
  );
}
