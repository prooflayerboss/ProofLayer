import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createLogger } from './logger';

describe('logger', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.restoreAllMocks();
  });

  describe('in development mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('should log debug messages', () => {
      const logger = createLogger('Test');
      logger.debug('Debug message');

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('[DEBUG] [Test] Debug message')
      );
    });

    it('should log info messages', () => {
      const logger = createLogger('Test');
      logger.info('Info message');

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('[INFO] [Test] Info message')
      );
    });

    it('should log warning messages', () => {
      const logger = createLogger('Test');
      logger.warn('Warning message');

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[WARN] [Test] Warning message')
      );
    });

    it('should log error messages', () => {
      const logger = createLogger('Test');
      logger.error('Error message');

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR] [Test] Error message')
      );
    });

    it('should include context in log messages', () => {
      const logger = createLogger('Test');
      logger.info('Message with context', { userId: '123', action: 'test' });

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('{"userId":"123","action":"test"}')
      );
    });
  });

  describe('in production mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    it('should not log debug messages', () => {
      const logger = createLogger('Test');
      logger.debug('Debug message');

      expect(console.log).not.toHaveBeenCalled();
    });

    it('should not log info messages', () => {
      const logger = createLogger('Test');
      logger.info('Info message');

      expect(console.log).not.toHaveBeenCalled();
    });

    it('should log warning messages', () => {
      const logger = createLogger('Test');
      logger.warn('Warning message');

      expect(console.warn).toHaveBeenCalled();
    });

    it('should log error messages', () => {
      const logger = createLogger('Test');
      logger.error('Error message');

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('createLogger', () => {
    it('should create logger with custom prefix', () => {
      const logger = createLogger('CustomPrefix');
      logger.warn('Test');

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[CustomPrefix]')
      );
    });
  });
});
