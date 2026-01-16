# Uploadthing Setup Guide

## Step 1: Create Uploadthing Account

1. Go to https://uploadthing.com
2. Sign up with your email or GitHub account
3. Create a new app/project

## Step 2: Get Your API Token

1. In the Uploadthing dashboard, go to **API Keys**
2. Copy your **Token** (this is a long encoded string)

## Step 3: Add Environment Variables

Add this to your `.env.local` file:

```bash
# Uploadthing Configuration
UPLOADTHING_TOKEN='your_token_here'
```

**Important:** Replace `your_token_here` with your actual token from step 2.

**✅ ALREADY DONE:** Your token has been added to `.env.local`

## Step 4: Update Your `.env.local` File

Your `.env.local` should look something like this:

```bash
# Supabase
DATABASE_URL="your_supabase_connection_string"
DIRECT_URL="your_supabase_direct_url"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Uploadthing (ADD THESE)
UPLOADTHING_SECRET=sk_live_xxxxxxxxxxxxx
UPLOADTHING_APP_ID=xxxxxxxxxxxxx
```

## Step 5: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Create a new form that allows video testimonials
3. Try uploading a test video
4. The video should upload to Uploadthing and appear in your Uploadthing dashboard

## Step 6: Verify Upload

After uploading a video:
1. Check your Uploadthing dashboard at https://uploadthing.com/dashboard
2. You should see your uploaded video files
3. The video URL will be something like: `https://utfs.io/f/abc123.mp4`

## Troubleshooting

### Error: "UPLOADTHING_SECRET is not set"
- Make sure you added the environment variables to `.env.local`
- Restart your dev server after adding env vars

### Error: "Failed to upload"
- Check that your API keys are correct
- Verify your Uploadthing account is active
- Check the browser console for detailed error messages

### Videos not appearing in Wall of Love
- Make sure you approved the submission in your dashboard
- Check that the video URL was saved correctly in the database

## Pricing

Uploadthing pricing (as of 2024):
- **Free Tier**: 2GB storage, 2GB bandwidth/month
- **Pro Plan**: $20/month - 5GB storage, 50GB bandwidth
- **Growth Plan**: $80/month - 100GB storage, 500GB bandwidth

For your MVP, start with the Free tier. You can upgrade as you get more customers.

## Migration Note

If you later want to switch to Cloudflare R2 or AWS S3 for cost savings at scale:
1. The video URLs in your database will need to be updated
2. You'll need to migrate existing videos to the new storage
3. This is straightforward but requires a migration script

Keep the Uploadthing integration working until you have enough traffic to justify the migration effort.
