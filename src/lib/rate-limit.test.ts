import { describe, it, expect, beforeEach, vi } from 'vitest';
import { checkRateLimit, getClientIp, RATE_LIMITS, rateLimitHeaders } from './rate-limit';

describe('rate-limit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  describe('checkRateLimit', () => {
    it('should allow requests within the limit', () => {
      const result = checkRateLimit('test-user-1', { maxRequests: 5, windowSeconds: 60 });

      expect(result.success).toBe(true);
      expect(result.remaining).toBe(4);
    });

    it('should decrement remaining count on each request', () => {
      const config = { maxRequests: 3, windowSeconds: 60 };

      const result1 = checkRateLimit('test-user-2', config);
      expect(result1.remaining).toBe(2);

      const result2 = checkRateLimit('test-user-2', config);
      expect(result2.remaining).toBe(1);

      const result3 = checkRateLimit('test-user-2', config);
      expect(result3.remaining).toBe(0);
    });

    it('should block requests over the limit', () => {
      const config = { maxRequests: 2, windowSeconds: 60 };

      checkRateLimit('test-user-3', config);
      checkRateLimit('test-user-3', config);
      const result = checkRateLimit('test-user-3', config);

      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0);
      expect(result.retryAfter).toBeDefined();
    });

    it('should reset after the time window expires', () => {
      const config = { maxRequests: 1, windowSeconds: 60 };

      checkRateLimit('test-user-4', config);
      const blockedResult = checkRateLimit('test-user-4', config);
      expect(blockedResult.success).toBe(false);

      // Advance time past the window
      vi.advanceTimersByTime(61 * 1000);

      const allowedResult = checkRateLimit('test-user-4', config);
      expect(allowedResult.success).toBe(true);
    });

    it('should track different identifiers separately', () => {
      const config = { maxRequests: 1, windowSeconds: 60 };

      const user1 = checkRateLimit('user-a', config);
      const user2 = checkRateLimit('user-b', config);

      expect(user1.success).toBe(true);
      expect(user2.success).toBe(true);
    });
  });

  describe('getClientIp', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const headers = new Headers({ 'x-forwarded-for': '192.168.1.1, 10.0.0.1' });
      expect(getClientIp(headers)).toBe('192.168.1.1');
    });

    it('should extract IP from x-real-ip header', () => {
      const headers = new Headers({ 'x-real-ip': '192.168.1.2' });
      expect(getClientIp(headers)).toBe('192.168.1.2');
    });

    it('should extract IP from x-vercel-forwarded-for header', () => {
      const headers = new Headers({ 'x-vercel-forwarded-for': '192.168.1.3' });
      expect(getClientIp(headers)).toBe('192.168.1.3');
    });

    it('should return unknown when no IP headers present', () => {
      const headers = new Headers({});
      expect(getClientIp(headers)).toBe('unknown');
    });

    it('should prefer x-forwarded-for over other headers', () => {
      const headers = new Headers({
        'x-forwarded-for': '192.168.1.1',
        'x-real-ip': '192.168.1.2',
      });
      expect(getClientIp(headers)).toBe('192.168.1.1');
    });
  });

  describe('RATE_LIMITS', () => {
    it('should have predefined limits for common use cases', () => {
      expect(RATE_LIMITS.submissions).toEqual({ maxRequests: 10, windowSeconds: 60 });
      expect(RATE_LIMITS.auth).toEqual({ maxRequests: 5, windowSeconds: 60 });
      expect(RATE_LIMITS.api).toEqual({ maxRequests: 60, windowSeconds: 60 });
      expect(RATE_LIMITS.strict).toEqual({ maxRequests: 3, windowSeconds: 60 });
    });
  });

  describe('rateLimitHeaders', () => {
    it('should return correct headers for allowed request', () => {
      const result = { success: true, remaining: 5, resetTime: 1700000000000 };
      const headers = rateLimitHeaders(result);

      expect(headers['X-RateLimit-Remaining']).toBe('5');
      expect(headers['X-RateLimit-Reset']).toBe('1700000000');
      expect(headers['Retry-After']).toBeUndefined();
    });

    it('should include Retry-After header when rate limited', () => {
      const result = { success: false, remaining: 0, resetTime: 1700000000000, retryAfter: 30 };
      const headers = rateLimitHeaders(result);

      expect(headers['Retry-After']).toBe('30');
    });
  });
});
