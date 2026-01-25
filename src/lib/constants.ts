export const PLAN_LIMITS = {
  // =====================
  // New First100 Plans
  // =====================
  // Free Listing - basic access
  FREE: {
    maxWorkspaces: 1,
    maxForms: 1,
    maxSubmissions: 10, // 10 submissions/month
    maxWidgetStyles: 1,
    allowedWidgetTypes: ['EMBED'] as const,
    allowedLayouts: ['GRID'] as const,
    allowEmailCampaigns: false,
    showBadge: true,
    price: 0,
    interval: null,
  },
  // Starter - $49
  STARTER: {
    maxWorkspaces: 1,
    maxForms: 999, // Unlimited
    maxSubmissions: 999999, // Unlimited testimonials
    maxWidgetStyles: 999, // All widget layouts
    allowedWidgetTypes: ['EMBED', 'POPUP', 'FLOATING'] as const,
    allowedLayouts: ['GRID', 'CAROUSEL', 'MARQUEE', 'MASONRY', 'SPOTLIGHT'] as const,
    allowEmailCampaigns: false,
    showBadge: true,
    price: 49,
    interval: 'lifetime' as const,
  },
  // Growth - $149 (Most Popular)
  GROWTH: {
    maxWorkspaces: 3,
    maxForms: 999,
    maxSubmissions: 999999,
    maxWidgetStyles: 999,
    allowedWidgetTypes: ['EMBED', 'POPUP', 'FLOATING'] as const,
    allowedLayouts: ['GRID', 'CAROUSEL', 'MARQUEE', 'MASONRY', 'SPOTLIGHT'] as const,
    allowEmailCampaigns: true,
    showBadge: false, // Branding removal
    price: 149,
    interval: 'lifetime' as const,
  },
  // Launch - $299
  LAUNCH: {
    maxWorkspaces: 10,
    maxForms: 999,
    maxSubmissions: 999999,
    maxWidgetStyles: 999,
    allowedWidgetTypes: ['EMBED', 'POPUP', 'FLOATING'] as const,
    allowedLayouts: ['GRID', 'CAROUSEL', 'MARQUEE', 'MASONRY', 'SPOTLIGHT'] as const,
    allowEmailCampaigns: true,
    showBadge: false,
    price: 299,
    interval: 'lifetime' as const,
  },
  // Concierge - Custom done-for-you
  CONCIERGE: {
    maxWorkspaces: 999,
    maxForms: 999,
    maxSubmissions: 999999,
    maxWidgetStyles: 999,
    allowedWidgetTypes: ['EMBED', 'POPUP', 'FLOATING'] as const,
    allowedLayouts: ['GRID', 'CAROUSEL', 'MARQUEE', 'MASONRY', 'SPOTLIGHT'] as const,
    allowEmailCampaigns: true,
    showBadge: false,
    price: 0, // Custom pricing
    interval: 'lifetime' as const,
  },
  // =====================
  // Legacy Plans
  // =====================
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
  // Tier 1 - Solo / Starter (legacy)
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
  // Tier 2 - Professional (legacy)
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
  // Tier 3 - Agency (legacy)
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
