import { PLAN_LIMITS, type PlanType } from './constants';
import { Plan } from '@prisma/client';

/**
 * Get limits for a specific plan
 */
export function getPlanLimits(plan: Plan) {
  return PLAN_LIMITS[plan as PlanType];
}

/**
 * Check if user can create another workspace
 */
export function canCreateWorkspace(currentCount: number, plan: Plan): {
  allowed: boolean;
  limit: number;
  remaining: number;
} {
  const limits = getPlanLimits(plan);
  const remaining = Math.max(0, limits.maxWorkspaces - currentCount);

  return {
    allowed: currentCount < limits.maxWorkspaces,
    limit: limits.maxWorkspaces,
    remaining,
  };
}

/**
 * Check if user can create another form
 */
export function canCreateForm(currentCount: number, plan: Plan): {
  allowed: boolean;
  limit: number;
  remaining: number;
} {
  const limits = getPlanLimits(plan);
  const remaining = Math.max(0, limits.maxForms - currentCount);

  return {
    allowed: currentCount < limits.maxForms,
    limit: limits.maxForms,
    remaining,
  };
}

/**
 * Check if user can accept another submission
 */
export function canAcceptSubmission(currentCount: number, plan: Plan): {
  allowed: boolean;
  limit: number;
  remaining: number;
} {
  const limits = getPlanLimits(plan);
  const remaining = Math.max(0, limits.maxSubmissions - currentCount);

  return {
    allowed: currentCount < limits.maxSubmissions,
    limit: limits.maxSubmissions,
    remaining,
  };
}

/**
 * Check if a widget layout is allowed for a plan
 */
export function isLayoutAllowed(layout: string, plan: Plan): boolean {
  const limits = getPlanLimits(plan);
  return limits.allowedLayouts.includes(layout as any);
}

/**
 * Check if a widget type is allowed for a plan
 */
export function isWidgetTypeAllowed(widgetType: string, plan: Plan): boolean {
  const limits = getPlanLimits(plan);
  return limits.allowedWidgetTypes.includes(widgetType as any);
}

/**
 * Get upgrade message based on limit type
 */
export function getUpgradeMessage(limitType: 'workspace' | 'form' | 'submission' | 'widget', currentPlan: Plan): string {
  const messages: Record<string, Record<string, string>> = {
    workspace: {
      // New plans
      FREE: 'Upgrade to Starter for more features',
      STARTER: 'Upgrade to Growth for more workspaces',
      GROWTH: 'Upgrade to Launch for more workspaces',
      LAUNCH: 'You\'ve reached the maximum workspaces for your plan',
      CONCIERGE: 'Contact us for custom limits',
      // Legacy plans
      TRIAL: 'Upgrade to create more workspaces',
      SOLO: 'Upgrade to PRO or AGENCY tier for more workspaces',
      PRO: 'Upgrade to AGENCY tier for more workspaces',
      AGENCY: 'You\'ve reached the maximum workspaces for your plan',
      MONTHLY: 'You\'ve reached the maximum workspaces',
      LIFETIME: 'You\'ve reached the maximum workspaces for your plan',
    },
    form: {
      // New plans
      FREE: 'Upgrade to Starter for unlimited forms',
      STARTER: 'All forms are unlocked',
      GROWTH: 'All forms are unlocked',
      LAUNCH: 'All forms are unlocked',
      CONCIERGE: 'All forms are unlocked',
      // Legacy plans
      TRIAL: 'Upgrade to create more forms',
      SOLO: 'Upgrade to PRO or AGENCY tier for more forms',
      PRO: 'Upgrade to AGENCY tier for more forms',
      AGENCY: 'You\'ve reached the maximum forms for your plan',
      MONTHLY: 'You\'ve reached the maximum forms',
      LIFETIME: 'You\'ve reached the maximum forms for your plan',
    },
    submission: {
      // New plans
      FREE: 'Upgrade to Starter for unlimited testimonials',
      STARTER: 'Unlimited testimonials available',
      GROWTH: 'Unlimited testimonials available',
      LAUNCH: 'Unlimited testimonials available',
      CONCIERGE: 'Unlimited testimonials available',
      // Legacy plans
      TRIAL: 'Upgrade to accept more testimonials',
      SOLO: 'Upgrade to PRO or AGENCY tier for more testimonials',
      PRO: 'Upgrade to AGENCY tier for more testimonials',
      AGENCY: 'You\'ve reached the maximum testimonials for your plan',
      MONTHLY: 'You\'ve reached the maximum testimonials',
      LIFETIME: 'You\'ve reached the maximum testimonials for your plan',
    },
    widget: {
      // New plans
      FREE: 'Upgrade to Starter for all widget styles',
      STARTER: 'All widget styles are unlocked',
      GROWTH: 'All widget styles are unlocked',
      LAUNCH: 'All widget styles are unlocked',
      CONCIERGE: 'All widget styles are unlocked',
      // Legacy plans
      TRIAL: 'Upgrade to unlock more widget styles',
      SOLO: 'Upgrade to PRO or AGENCY tier to unlock more widget styles',
      PRO: 'Upgrade to AGENCY tier to unlock all widget styles',
      AGENCY: 'All widget styles are unlocked',
      MONTHLY: 'All widget styles are unlocked',
      LIFETIME: 'All widget styles are unlocked',
    },
  };

  return messages[limitType][currentPlan] || 'Upgrade for more features';
}

/**
 * Format limit display (e.g., "3/10" or "Unlimited")
 */
export function formatLimitDisplay(current: number, max: number): string {
  if (max >= 999) {
    return 'Unlimited';
  }
  return `${current}/${max}`;
}
