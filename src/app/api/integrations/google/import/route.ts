import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Imports reviews from Google Business Profile
 * Called manually by user or automatically via cron job
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workspaceId, formId } = body;

    if (!workspaceId || !formId) {
      return NextResponse.json(
        { error: 'Workspace ID and Form ID are required' },
        { status: 400 }
      );
    }

    // Get Google integration for this workspace
    const integration = await prisma.googleIntegration.findUnique({
      where: { workspaceId },
    });

    if (!integration) {
      return NextResponse.json(
        { error: 'Google Business Profile not connected' },
        { status: 404 }
      );
    }

    // Initialize OAuth2 client with stored tokens
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: integration.accessToken,
      refresh_token: integration.refreshToken || undefined,
    });

    // Check if token is expired and refresh if needed
    if (integration.tokenExpiresAt < new Date()) {
      try {
        const { credentials } = await oauth2Client.refreshAccessToken();

        // Update stored tokens
        await prisma.googleIntegration.update({
          where: { workspaceId },
          data: {
            accessToken: credentials.access_token!,
            tokenExpiresAt: new Date(credentials.expiry_date!),
          },
        });

        oauth2Client.setCredentials(credentials);
      } catch (error) {
        console.error('Error refreshing Google token:', error);
        return NextResponse.json(
          { error: 'Failed to refresh Google authorization. Please reconnect.' },
          { status: 401 }
        );
      }
    }

    // Initialize Google My Business API
    const mybusinessaccountmanagement = google.mybusinessaccountmanagement({ version: 'v1', auth: oauth2Client });
    const mybusinessbusinessinformation = google.mybusinessbusinessinformation({ version: 'v1', auth: oauth2Client });

    // Fetch accounts
    const accountsResponse = await mybusinessaccountmanagement.accounts.list();
    const accounts = accountsResponse.data.accounts || [];

    if (accounts.length === 0) {
      return NextResponse.json(
        { error: 'No Google Business accounts found' },
        { status: 404 }
      );
    }

    // For simplicity, use the first account
    const account = accounts[0];
    const accountName = account.name!;

    // Fetch locations for this account
    const locationsResponse = await mybusinessbusinessinformation.accounts.locations.list({
      parent: accountName,
      readMask: 'name,title,storefrontAddress',
    });

    const locations = locationsResponse.data.locations || [];

    if (locations.length === 0) {
      return NextResponse.json(
        { error: 'No business locations found' },
        { status: 404 }
      );
    }

    // For MVP, import from the first location
    const location = locations[0];
    const locationName = location.name!;
    const locationTitle = location.title || 'Unknown Location';

    // Update integration with location info
    await prisma.googleIntegration.update({
      where: { workspaceId },
      data: {
        locationName: locationTitle,
        locationId: locationName,
      },
    });

    // Fetch reviews for this location using REST API
    // Note: The Google Business Profile API requires direct REST calls for reviews
    let reviews: any[] = [];
    try {
      // Get access token for direct API call
      const accessToken = oauth2Client.credentials.access_token;

      console.log('[Google Import] Fetching reviews for location:', locationName);

      // Make direct REST API call to Google Business Profile API
      const reviewsResponse = await fetch(
        `https://mybusiness.googleapis.com/v4/${locationName}/reviews?pageSize=50`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('[Google Import] Reviews API response status:', reviewsResponse.status);

      if (!reviewsResponse.ok) {
        const errorText = await reviewsResponse.text();
        console.error('[Google Import] Reviews API error response:', errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: { message: errorText } };
        }

        // Handle specific error cases
        if (reviewsResponse.status === 403) {
          return NextResponse.json(
            {
              error: 'Access to reviews denied. Please ensure the Google My Business API is enabled in your Google Cloud project.',
              details: errorData.error?.message || 'Forbidden',
              helpUrl: 'https://console.cloud.google.com/apis/library/mybusiness.googleapis.com'
            },
            { status: 403 }
          );
        }

        if (reviewsResponse.status === 404) {
          return NextResponse.json(
            {
              error: 'Reviews endpoint not found. This location may not have reviews enabled.',
              details: errorData.error?.message || 'Not found'
            },
            { status: 404 }
          );
        }

        throw new Error(errorData.error?.message || `API request failed with status ${reviewsResponse.status}`);
      }

      const reviewsData = await reviewsResponse.json();
      reviews = reviewsData.reviews || [];

      console.log('[Google Import] Successfully fetched reviews, count:', reviews.length);
    } catch (error: any) {
      // API might not be available or account doesn't have access
      console.error('[Google Import] Error fetching reviews:', error);

      // If we already returned a response in the if block above, this won't execute
      return NextResponse.json(
        {
          error: 'Unable to fetch reviews from Google Business Profile.',
          details: error.message,
          hint: 'Make sure the Google My Business API is enabled in your Google Cloud project.'
        },
        { status: 500 }
      );
    }

    if (reviews.length === 0) {
      return NextResponse.json(
        { success: true, imported: 0, message: 'No reviews found to import' },
        { status: 200 }
      );
    }

    // Transform Google reviews into our Submission format
    let imported = 0;
    for (const review of reviews) {
      try {
        // Check if we already imported this review
        const reviewId = review.reviewId || review.name;

        // Skip if we already have this review
        const existing = await prisma.submission.findFirst({
          where: {
            formId,
            importSource: 'google',
            socialAuthorUrl: reviewId, // Using socialAuthorUrl to store Google review ID
          },
        });

        if (existing) {
          continue; // Skip duplicates
        }

        // Extract review data
        const reviewerName = review.reviewer?.displayName || 'Google User';
        const reviewText = review.comment || '';
        const rating = review.starRating === 'FIVE' ? 5 :
                      review.starRating === 'FOUR' ? 4 :
                      review.starRating === 'THREE' ? 3 :
                      review.starRating === 'TWO' ? 2 :
                      review.starRating === 'ONE' ? 1 : null;

        const profilePhotoUrl = review.reviewer?.profilePhotoUrl;

        // Create submission
        await prisma.submission.create({
          data: {
            formId,
            name: reviewerName,
            testimonial: reviewText,
            rating,
            photoUrl: profilePhotoUrl || null,
            importSource: 'google',
            socialPlatform: 'google',
            socialAuthorUrl: reviewId, // Store Google review ID for deduplication
            submissionType: 'TEXT',
            status: 'APPROVED', // Auto-approve imported Google reviews
          },
        });

        imported++;
      } catch (error) {
        console.error('Error importing individual review:', error);
        // Continue with other reviews
      }
    }

    // Update last sync time
    await prisma.googleIntegration.update({
      where: { workspaceId },
      data: {
        lastSyncAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      imported,
      total: reviews.length,
      location: locationTitle,
    });

  } catch (error: any) {
    console.error('Error importing Google reviews:', error);
    return NextResponse.json(
      { error: 'Failed to import reviews', details: error.message },
      { status: 500 }
    );
  }
}
