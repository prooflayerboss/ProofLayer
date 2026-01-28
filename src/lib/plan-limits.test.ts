import { describe, it, expect } from 'vitest';
import {
  getPlanLimits,
  canCreateWorkspace,
  canCreateForm,
  canAcceptSubmission,
  isLayoutAllowed,
  isWidgetTypeAllowed,
  formatLimitDisplay,
} from './plan-limits';
import { Plan } from '@prisma/client';

describe('plan-limits', () => {
  describe('getPlanLimits', () => {
    it('should return limits for FREE plan', () => {
      const limits = getPlanLimits('FREE' as Plan);
      expect(limits.maxWorkspaces).toBe(1);
      expect(limits.maxForms).toBe(1);
      expect(limits.maxSubmissions).toBe(10);
    });

    it('should return limits for STARTER plan', () => {
      const limits = getPlanLimits('STARTER' as Plan);
      expect(limits.maxWorkspaces).toBe(1);
      expect(limits.maxForms).toBe(999);
      expect(limits.maxSubmissions).toBe(999999);
      expect(limits.price).toBe(49);
    });

    it('should return limits for GROWTH plan', () => {
      const limits = getPlanLimits('GROWTH' as Plan);
      expect(limits.maxWorkspaces).toBe(3);
      expect(limits.allowEmailCampaigns).toBe(true);
      expect(limits.showBadge).toBe(false);
    });

    it('should return limits for LAUNCH plan', () => {
      const limits = getPlanLimits('LAUNCH' as Plan);
      expect(limits.maxWorkspaces).toBe(10);
      expect(limits.price).toBe(299);
    });
  });

  describe('canCreateWorkspace', () => {
    it('should allow workspace creation within limits', () => {
      const result = canCreateWorkspace(0, 'STARTER' as Plan);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(1);
    });

    it('should block workspace creation at limit', () => {
      const result = canCreateWorkspace(1, 'STARTER' as Plan);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('should allow more workspaces on higher plans', () => {
      const result = canCreateWorkspace(2, 'GROWTH' as Plan);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(1);
    });
  });

  describe('canCreateForm', () => {
    it('should allow form creation within limits', () => {
      const result = canCreateForm(0, 'FREE' as Plan);
      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(1);
    });

    it('should block form creation at limit for FREE plan', () => {
      const result = canCreateForm(1, 'FREE' as Plan);
      expect(result.allowed).toBe(false);
    });

    it('should allow many forms on paid plans', () => {
      const result = canCreateForm(100, 'STARTER' as Plan);
      expect(result.allowed).toBe(true);
    });
  });

  describe('canAcceptSubmission', () => {
    it('should allow submissions within limits', () => {
      const result = canAcceptSubmission(5, 'FREE' as Plan);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(5);
    });

    it('should block submissions at limit for FREE plan', () => {
      const result = canAcceptSubmission(10, 'FREE' as Plan);
      expect(result.allowed).toBe(false);
    });

    it('should allow many submissions on paid plans', () => {
      const result = canAcceptSubmission(10000, 'STARTER' as Plan);
      expect(result.allowed).toBe(true);
    });
  });

  describe('isLayoutAllowed', () => {
    it('should allow GRID for FREE plan', () => {
      expect(isLayoutAllowed('GRID', 'FREE' as Plan)).toBe(true);
    });

    it('should block CAROUSEL for FREE plan', () => {
      expect(isLayoutAllowed('CAROUSEL', 'FREE' as Plan)).toBe(false);
    });

    it('should allow all layouts for paid plans', () => {
      expect(isLayoutAllowed('CAROUSEL', 'STARTER' as Plan)).toBe(true);
      expect(isLayoutAllowed('MARQUEE', 'STARTER' as Plan)).toBe(true);
      expect(isLayoutAllowed('MASONRY', 'STARTER' as Plan)).toBe(true);
      expect(isLayoutAllowed('SPOTLIGHT', 'STARTER' as Plan)).toBe(true);
    });
  });

  describe('isWidgetTypeAllowed', () => {
    it('should allow EMBED for FREE plan', () => {
      expect(isWidgetTypeAllowed('EMBED', 'FREE' as Plan)).toBe(true);
    });

    it('should block POPUP for FREE plan', () => {
      expect(isWidgetTypeAllowed('POPUP', 'FREE' as Plan)).toBe(false);
    });

    it('should allow all widget types for paid plans', () => {
      expect(isWidgetTypeAllowed('POPUP', 'STARTER' as Plan)).toBe(true);
      expect(isWidgetTypeAllowed('FLOATING', 'STARTER' as Plan)).toBe(true);
    });
  });

  describe('formatLimitDisplay', () => {
    it('should format normal limits', () => {
      expect(formatLimitDisplay(3, 10)).toBe('3/10');
    });

    it('should show Unlimited for high limits', () => {
      expect(formatLimitDisplay(5, 999)).toBe('Unlimited');
      expect(formatLimitDisplay(100, 999999)).toBe('Unlimited');
    });
  });
});
