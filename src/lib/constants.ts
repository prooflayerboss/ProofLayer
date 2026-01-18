export const PLAN_LIMITS = {
  TRIAL: {
    maxWorkspaces: 1,
    maxForms: 1,
    maxSubmissions: 25,
    maxWidgetStyles: 1, // Grid only
    allowedWidgetTypes: ['EMBED'] as const,
    allowedLayouts: ['GRID'] as const,
    allowEmailCampaigns: false, // Simple email sender only
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
    allowEmailCampaigns: true, // CSV campaigns allowed
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
    allowEmailCampaigns: true, // CSV campaigns allowed
    showBadge: false,
    price: 49, // Legacy lifetime plan
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
    allowEmailCampaigns: false, // Simple email sender only
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
    allowEmailCampaigns: true, // CSV campaigns allowed
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
    allowEmailCampaigns: true, // CSV campaigns allowed
    showBadge: false,
    price: 177,
    interval: 'lifetime' as const,
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;

// Legacy pricing tiers (no longer used - replaced by SOLO/PRO/AGENCY)
export const LTD_PRICING = {
  BETA: {
    price: 49,
    limit: 25,
    label: 'Beta Price',
    description: 'Legacy beta pricing',
  },
  LAUNCH: {
    price: 69,
    limit: 50,
    label: 'Launch Price',
    description: 'Legacy launch pricing',
  },
  STANDARD: {
    price: 199,
    limit: null,
    label: 'Standard Price',
    description: 'Legacy standard pricing',
  },
} as const;
