import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { apiLogger } from '@/lib/logger';

/**
 * Initiates the Google OAuth flow
 * User clicks "Connect Google Business" → This route generates OAuth URL → User authorizes
 */
export async function GET(request: NextRequest) {
  try {
    // Get workspace ID from query params
    const searchParams = request.nextUrl.searchParams;
    const workspaceId = searchParams.get('workspaceId');

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'Workspace ID is required' },
        { status: 400 }
      );
    }

    // Initialize OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/integrations/google/callback'
    );

    // Generate the OAuth URL with required scopes
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline', // Get refresh token
      prompt: 'consent', // Force consent screen to get refresh token
      scope: [
        'https://www.googleapis.com/auth/business.manage', // Manage Google Business Profile
        'https://www.googleapis.com/auth/userinfo.email', // Get user email for verification
      ],
      state: workspaceId, // Pass workspace ID through OAuth flow
    });

    // Redirect to Google OAuth consent screen
    return NextResponse.redirect(authUrl);
  } catch (error) {
    apiLogger.error('Error initializing Google OAuth', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to initialize Google OAuth' },
      { status: 500 }
    );
  }
}
