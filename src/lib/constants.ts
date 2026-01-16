export const PLAN_LIMITS = {
  TRIAL: {
    maxWorkspaces: 1,
    maxSubmissions: 25,
    showBadge: true,
    price: 0,
    interval: null,
  },
  MONTHLY: {
    maxWorkspaces: 3,
    maxSubmissions: 1500,
    showBadge: false,
    price: 19,
    interval: 'month' as const,
  },
  LIFETIME: {
    maxWorkspaces: 3,
    maxSubmissions: 1500,
    showBadge: false,
    price: 199,
    interval: 'lifetime' as const,
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;
