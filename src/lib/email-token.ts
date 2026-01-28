import crypto from 'crypto';
import { authLogger } from '@/lib/logger';

const SECRET = process.env.EMAIL_ACTION_SECRET || 'change-me-in-production';

interface EmailActionPayload {
  submissionId: string;
  action: 'approve' | 'reject';
  exp: number; // expiration timestamp
}

export function generateEmailActionToken(submissionId: string, action: 'approve' | 'reject'): string {
  // Token expires in 30 days
  const payload: EmailActionPayload = {
    submissionId,
    action,
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };

  const payloadStr = JSON.stringify(payload);
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(payloadStr)
    .digest('base64url');

  return Buffer.from(payloadStr).toString('base64url') + '.' + signature;
}

export function verifyEmailActionToken(token: string): EmailActionPayload | null {
  try {
    const [payloadB64, signature] = token.split('.');
    const payloadStr = Buffer.from(payloadB64, 'base64url').toString('utf-8');

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', SECRET)
      .update(payloadStr)
      .digest('base64url');

    if (signature !== expectedSignature) {
      authLogger.warn('Invalid token signature');
      return null;
    }

    const payload: EmailActionPayload = JSON.parse(payloadStr);

    // Check expiration
    if (Date.now() > payload.exp) {
      authLogger.warn('Token expired');
      return null;
    }

    return payload;
  } catch (error) {
    authLogger.error('Token verification failed', { error: String(error) });
    return null;
  }
}
