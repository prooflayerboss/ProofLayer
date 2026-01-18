# Resend Email Setup

ProofLayer uses [Resend](https://resend.com) to send testimonial request emails to your customers.

## Why Resend?

- **Generous Free Tier**: 3,000 emails/month for free, then $0.40 per 1,000 emails
- **Simple API**: Clean, developer-friendly API
- **Excellent Deliverability**: High inbox placement rates
- **Email Verification**: Built-in email authentication (SPF, DKIM)

## Setup Instructions

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the left sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "ProofLayer Production")
5. Copy the API key (it starts with `re_`)

### 3. Add to Environment Variables

Add the API key to your `.env.local` file:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

### 4. Configure Sending Domain (Optional but Recommended)

For better deliverability and branding, add your own domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `prooflayer.app`)
4. Add the DNS records to your domain provider:
   - TXT record for SPF
   - CNAME records for DKIM
5. Wait for verification (usually a few minutes)

Once verified, update the `from` address in `/src/app/api/emails/send-request/route.ts`:

```typescript
from: 'Your Name <noreply@yourdomain.com>',
```

### 5. Test Email Sending

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to a form in your dashboard
3. Click "Send Email Request"
4. Enter a test email address
5. Check your inbox!

## Features

### Simple Email Sender (All Plans)

- Send individual testimonial requests
- Personalized recipient names
- Custom messages
- Beautiful, professional template

### Email Campaigns (PRO + AGENCY Plans)

- CSV import for bulk sending
- Campaign tracking
- Open/click analytics
- Scheduled sends

## Pricing

- **Free**: 3,000 emails/month
- **Pay-as-you-go**: $0.40 per 1,000 emails after free tier
- No monthly commitments

For most users, the free tier is more than sufficient!

## Troubleshooting

### "Failed to send email" error

1. **Check API Key**: Make sure `RESEND_API_KEY` is set correctly in `.env.local`
2. **Restart Server**: Restart your Next.js dev server after adding the key
3. **Check Logs**: Look at the console for detailed error messages
4. **Verify Domain**: If using a custom domain, ensure DNS records are properly configured

### Emails going to spam

1. **Add your domain**: Don't use the default `onboarding@resend.dev`
2. **Verify DNS records**: Ensure SPF and DKIM are properly configured
3. **Warm up your domain**: Start with small batches and gradually increase volume

### Rate limits

- Resend has a rate limit of 10 emails/second for paid accounts
- Free tier: 2 emails/second
- Our bulk sender automatically throttles to respect these limits

## Support

- **Resend Docs**: https://resend.com/docs
- **ProofLayer Issues**: https://github.com/prooflayerboss/ProofLayer/issues
