export const PLAN_LIMITS = {
  TRIAL: {
    maxWorkspaces: 1,
    maxSubmissions: 25,
    showBadge: true,
    price: 0,
    interval: null,
  },
  LIFETIME: {
    maxWorkspaces: 999, // Unlimited
    maxSubmissions: 999999, // Unlimited
    showBadge: false,
    price: 49, // Launch price - will update in Stripe for tiered pricing
    interval: 'lifetime' as const,
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;

// Pricing tiers for LTD launch strategy
export const LTD_PRICING = {
  BETA: {
    price: 49,
    limit: 25,
    label: 'Beta Price',
    description: 'First 25 founding members',
  },
  LAUNCH: {
    price: 69,
    limit: 50,
    label: 'Launch Price',
    description: 'Next 50 early adopters',
  },
  STANDARD: {
    price: 199,
    limit: null,
    label: 'Standard Price',
    description: 'Regular lifetime access',
  },
} as const;
