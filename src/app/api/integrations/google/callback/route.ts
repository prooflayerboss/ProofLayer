import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Handles the OAuth callback from Google
 * Google redirects here with code → Exchange for tokens → Store in database
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const workspaceId = searchParams.get('state'); // Workspace ID from state param
    const error = searchParams.get('error');

    // Handle OAuth errors (user declined, etc.)
    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=google_auth_denied`
      );
    }

    if (!code || !workspaceId) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=invalid_callback`
      );
    }

    // Initialize OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/integrations/google/callback'
    );

    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.access_token) {
      throw new Error('No access token received from Google');
    }

    // Set credentials for API calls
    oauth2Client.setCredentials(tokens);

    // Get user info to verify account
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    // Calculate token expiration
    const expiresAt = new Date();
    if (tokens.expiry_date) {
      expiresAt.setTime(tokens.expiry_date);
    } else {
      // Default to 1 hour if not provided
      expiresAt.setHours(expiresAt.getHours() + 1);
    }

    // Store or update Google integration in database
    await prisma.googleIntegration.upsert({
      where: { workspaceId },
      create: {
        workspaceId,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || null,
        tokenExpiresAt: expiresAt,
        accountName: userInfo.data.email || null,
        autoSync: true,
        syncInterval: 24,
      },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || null,
        tokenExpiresAt: expiresAt,
        accountName: userInfo.data.email || null,
      },
    });

    // Redirect back to dashboard with success
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=google_connected`
    );
  } catch (error) {
    console.error('Error handling Google OAuth callback:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=google_auth_failed`
    );
  }
}
