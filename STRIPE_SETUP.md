# Stripe Integration Setup Guide

This guide will walk you through setting up Stripe for ProofLayer's payment processing.

## Overview

ProofLayer uses Stripe for:
- One-time $199 Lifetime plan purchase
- Webhook notifications for successful payments
- Automatic plan upgrades

## Step 1: Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Sign up for a free account
3. Complete account verification (if required for live mode)

## Step 2: Get API Keys

### Test Mode Keys (For Development)

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Developers** in the left sidebar
3. Click **API keys**
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Click **Reveal test key** and copy **Secret key** (starts with `sk_test_`)

Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
```

### Live Mode Keys (For Production)

Toggle to **Live mode** in the dashboard and repeat the above steps.

## Step 3: Create Product and Price

1. Go to **Products** in Stripe Dashboard
2. Click **Add Product**
3. Fill in:
   - **Name**: ProofLayer Lifetime
   - **Description**: Lifetime access to ProofLayer with 3 workspaces and 1,500 submissions
   - **Pricing**: One time
   - **Price**: $199.00 USD
4. Click **Save product**
5. Copy the **Price ID** (starts with `price_`)

Add to `.env.local`:
```env
STRIPE_PRICE_ID=price_1...
```

## Step 4: Configure Webhooks

### For Local Development

Install Stripe CLI:
```bash
# Mac
brew install stripe/stripe-cli/stripe

# Windows (using Scoop)
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe

# Linux
# Download from https://github.com/stripe/stripe-cli/releases
```

Login and listen for webhooks:
```bash
# Login to your Stripe account
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret (starts with `whsec_`) and add to `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

Keep this terminal running while developing!

### For Production (Vercel)

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your endpoint URL:
   ```
   https://yourdomain.com/api/webhooks/stripe
   ```
4. Select events to listen for:
   - `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Step 5: Test the Integration

### Test Card Numbers

Stripe provides test cards for development:

**Successful payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Declined payment:**
- Card: `4000 0000 0000 0002`

### Testing Checkout Flow

1. Start your dev server: `npm run dev`
2. Start webhook listener: `npm run stripe:listen`
3. Sign up for an account
4. Go to `/dashboard/billing`
5. Click "Upgrade Now - $199"
6. Use test card `4242 4242 4242 4242`
7. Complete checkout
8. Verify:
   - Redirected to `/dashboard/billing?success=true`
   - Plan upgraded to LIFETIME in database
   - Workspace/submission limits increased

### Check Webhook Logs

In the terminal running `stripe listen`, you should see:
```
  --> checkout.session.completed [evt_1...]
  <-- [200] POST http://localhost:3000/api/webhooks/stripe
```

## Step 6: Go Live

### Before Going Live

1. Switch Stripe dashboard to **Live mode**
2. Update `.env.local` with live keys:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PRICE_ID=price_... (from live product)
   ```
3. Set up production webhook endpoint
4. Update `STRIPE_WEBHOOK_SECRET` with live webhook secret
5. Deploy to Vercel with live environment variables

### Checklist

- [ ] Live API keys configured
- [ ] Product created in live mode
- [ ] Price set to $199
- [ ] Webhook endpoint created
- [ ] Webhook secret added to Vercel
- [ ] Test with real card
- [ ] Verify webhook delivery
- [ ] Check Stripe Dashboard for payment

## Troubleshooting

### Checkout Session Not Creating

**Error**: Failed to create checkout session

**Solution**:
- Check STRIPE_SECRET_KEY is correct
- Verify STRIPE_PRICE_ID exists in your Stripe account
- Check Stripe API version compatibility
- View server logs for detailed error

### Webhook Not Receiving Events

**Error**: Webhook endpoint returned an error

**Solution**:
- Verify STRIPE_WEBHOOK_SECRET is correct
- Check webhook endpoint is accessible (for production)
- Ensure `stripe listen` is running (for local dev)
- Check webhook signature validation
- View webhook logs in Stripe Dashboard → Developers → Webhooks

### Plan Not Upgrading After Payment

**Error**: Payment successful but user still on Trial

**Solution**:
- Check webhook handler in `/api/webhooks/stripe/route.ts`
- Verify database connection
- Check Prisma client is generated
- View webhook event details in Stripe Dashboard
- Ensure `checkout.session.completed` event is being listened to

### Test Mode vs Live Mode Confusion

**Symptom**: Can't see products or payments

**Solution**:
- Check toggle in top-right of Stripe Dashboard
- Ensure API keys match mode (test or live)
- Create products in the correct mode
- Don't mix test and live keys

## Security Best Practices

1. **Never commit API keys to Git**
   - Keys are in `.env.local` (already in .gitignore)
   - Use environment variables in production

2. **Always verify webhook signatures**
   - Code already implements this
   - Don't remove webhook verification

3. **Use test mode for development**
   - Never test with live keys locally
   - Switch to live mode only in production

4. **Monitor Stripe Dashboard**
   - Check for failed payments
   - Review webhook delivery
   - Monitor for suspicious activity

## Support

If you encounter issues:
1. Check Stripe Dashboard → Developers → Logs
2. View webhook event details
3. Check server logs for errors
4. Review Stripe API documentation: https://stripe.com/docs

---

**Next Steps**: Once Stripe is configured, see [DEPLOYMENT.md](./DEPLOYMENT.md) for deploying to Vercel.
