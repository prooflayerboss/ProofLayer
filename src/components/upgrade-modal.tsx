'use client';

import { useState } from 'react';
import { Plan } from '@prisma/client';
import { PLAN_LIMITS } from '@/lib/constants';

type LimitType = 'workspace' | 'form' | 'submission' | 'widget';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: Plan;
  limitType: LimitType;
  currentUsage?: number;
  maxLimit?: number;
}

const LIMIT_MESSAGES = {
  workspace: {
    title: 'Workspace Limit Reached',
    description: 'You\'ve reached the maximum number of workspaces for your plan.',
  },
  form: {
    title: 'Form Limit Reached',
    description: 'You\'ve reached the maximum number of forms for your plan.',
  },
  submission: {
    title: 'Submission Limit Reached',
    description: 'You\'ve reached the maximum number of testimonials for your plan.',
  },
  widget: {
    title: 'Widget Style Locked',
    description: 'This widget style is not available on your current plan.',
  },
};

const TIER_BENEFITS = {
  SOLO: {
    name: 'Solo',
    price: '$59',
    features: [
      '1 Workspace',
      '3 Forms',
      '150 Testimonials',
      'Grid layout only',
      'Embed widget only',
    ],
  },
  PRO: {
    name: 'Professional',
    price: '$118',
    popular: true,
    features: [
      '3 Workspaces',
      '30 Forms (10 per workspace)',
      '1,000 Testimonials',
      'Grid, Carousel, Marquee layouts',
      'Branding removal',
    ],
  },
  AGENCY: {
    name: 'Agency',
    price: '$177',
    features: [
      '10 Workspaces',
      '50 Forms',
      '5,000 Testimonials',
      'All widget styles & layouts',
      'Popup & Floating widgets',
      'Priority support',
    ],
  },
};

export default function UpgradeModal({
  isOpen,
  onClose,
  currentPlan,
  limitType,
  currentUsage,
  maxLimit,
}: UpgradeModalProps) {
  if (!isOpen) return null;

  const message = LIMIT_MESSAGES[limitType];

  // Determine which tier to recommend
  const getRecommendedTier = () => {
    if (currentPlan === 'TRIAL' || currentPlan === 'SOLO') return 'PRO';
    if (currentPlan === 'PRO') return 'AGENCY';
    return 'AGENCY';
  };

  const recommendedTier = getRecommendedTier();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{message.title}</h2>
              <p className="mt-1 text-gray-600">{message.description}</p>
              {currentUsage !== undefined && maxLimit !== undefined && (
                <p className="mt-2 text-sm text-gray-500">
                  Current usage: <span className="font-semibold text-gray-900">{currentUsage}/{maxLimit}</span>
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Current Plan */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your current plan</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentPlan === 'TRIAL' ? 'Trial' : TIER_BENEFITS[currentPlan as keyof typeof TIER_BENEFITS]?.name || currentPlan}
              </p>
            </div>
            {maxLimit && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Limit</p>
                <p className="text-lg font-semibold text-gray-900">
                  {maxLimit >= 999 ? 'Unlimited' : maxLimit}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upgrade to unlock more</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(TIER_BENEFITS).map(([tier, details]) => {
              const isCurrentTier = tier === currentPlan;
              const isRecommended = tier === recommendedTier;
              const isUpgrade = ['SOLO', 'PRO', 'AGENCY'].indexOf(tier) > ['TRIAL', 'SOLO', 'PRO', 'AGENCY'].indexOf(currentPlan);

              return (
                <div
                  key={tier}
                  className={`relative p-6 border rounded-xl transition-all ${
                    isCurrentTier
                      ? 'border-gray-300 bg-gray-50'
                      : isRecommended
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}
                  {isCurrentTier && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Current Plan
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-gray-900">{details.name}</h4>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900">{details.price}</span>
                      <span className="text-gray-600 text-sm ml-1">lifetime</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {details.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrentTier ? (
                    <div className="text-center text-sm text-gray-500 font-medium">
                      Your current plan
                    </div>
                  ) : isUpgrade ? (
                    <div className="text-center">
                      <span className="text-sm text-gray-600 font-medium">
                        Upgrade available
                      </span>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-400">
                      Lower tier
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Ready to unlock more features? Upgrade to a higher tier to get access.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Close
              </button>
              <a
                href="/dashboard/billing"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                View Billing
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
