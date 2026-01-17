export const PLAN_LIMITS = {
  TRIAL: {
    maxWorkspaces: 1,
    maxForms: 1,
    maxSubmissions: 25,
    maxWidgetStyles: 1, // Grid only
    allowedWidgetTypes: ['EMBED'] as const,
    allowedLayouts: ['GRID'] as const,
    showBadge: true,
    price: 0,
    interval: null,
  },
  MONTHLY: {
    maxWorkspaces: 999, // Unlimited
    maxForms: 999,
    maxSubmissions: 999999, // Unlimited
    maxWidgetStyles: 999, // All styles
    allowedWidgetTypes: ['EMBED', 'POPUP', 'FLOATING'] as const,
    allowedLayouts: ['GRID', 'CAROUSEL', 'MARQUEE', 'MASONRY', 'SPOTLIGHT'] as const,
    showBadge: false,
    price: 19,
    interval: 'month' as const,
  },
  LIFETIME: {
    maxWorkspaces: 5, // Limited to force license stacking for agencies
    maxForms: 999,
    maxSubmissions: 999999, // Unlimited
    maxWidgetStyles: 999, // All styles
    allowedWidgetTypes: ['EMBED', 'POPUP', 'FLOATING'] as const,
    allowedLayouts: ['GRID', 'CAROUSEL', 'MARQUEE', 'MASONRY', 'SPOTLIGHT'] as const,
    showBadge: false,
    price: 49, // Founding members price
    interval: 'lifetime' as const,
  },
  // Tier 1 - Solo / Starter
  SOLO: {
    maxWorkspaces: 1,
    maxForms: 3,
    maxSubmissions: 150,
    maxWidgetStyles: 1, // Grid only
    allowedWidgetTypes: ['EMBED'] as const,
    allowedLayouts: ['GRID'] as const,
    showBadge: true, // Required "Powered by ProofLayer"
    price: 59,
    interval: 'lifetime' as const,
  },
  // Tier 2 - Professional (Most Popular)
  PRO: {
    maxWorkspaces: 3,
    maxForms: 30, // 10 per workspace
    maxSubmissions: 1000,
    maxWidgetStyles: 3, // Grid, Carousel, Marquee
    allowedWidgetTypes: ['EMBED'] as const,
    allowedLayouts: ['GRID', 'CAROUSEL', 'MARQUEE'] as const,
    showBadge: false, // Branding removal
    price: 118,
    interval: 'lifetime' as const,
  },
  // Tier 3 - Agency
  AGENCY: {
    maxWorkspaces: 10,
    maxForms: 50,
    maxSubmissions: 5000,
    maxWidgetStyles: 999, // All styles
    allowedWidgetTypes: ['EMBED', 'POPUP', 'FLOATING'] as const,
    allowedLayouts: ['GRID', 'CAROUSEL', 'MARQUEE', 'MASONRY', 'SPOTLIGHT'] as const,
    showBadge: false,
    price: 177,
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
