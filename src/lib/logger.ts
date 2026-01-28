/**
 * Simple structured logger for ProofLayer
 * - In production: only logs warnings and errors
 * - In development: logs all levels
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

const isDev = process.env.NODE_ENV !== 'production';

function formatMessage(level: LogLevel, prefix: string, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] [${prefix}] ${message}${contextStr}`;
}

function shouldLog(level: LogLevel): boolean {
  if (isDev) return true;
  // In production, only log warnings and errors
  return level === 'warn' || level === 'error';
}

export function createLogger(prefix: string) {
  return {
    debug(message: string, context?: LogContext) {
      if (shouldLog('debug')) {
        console.log(formatMessage('debug', prefix, message, context));
      }
    },
    info(message: string, context?: LogContext) {
      if (shouldLog('info')) {
        console.log(formatMessage('info', prefix, message, context));
      }
    },
    warn(message: string, context?: LogContext) {
      if (shouldLog('warn')) {
        console.warn(formatMessage('warn', prefix, message, context));
      }
    },
    error(message: string, context?: LogContext) {
      if (shouldLog('error')) {
        console.error(formatMessage('error', prefix, message, context));
      }
    },
  };
}

// Pre-configured loggers for common modules
export const authLogger = createLogger('Auth');
export const paymentLogger = createLogger('Payment');
export const webhookLogger = createLogger('Webhook');
export const apiLogger = createLogger('API');
export const emailLogger = createLogger('Email');
