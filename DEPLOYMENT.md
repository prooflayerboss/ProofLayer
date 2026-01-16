# Deployment Guide for Vercel

This guide covers deploying ProofLayer to Vercel with your custom domain.

## Prerequisites

Before deploying:
- ✅ Database set up in Supabase
- ✅ Stripe account configured ([STRIPE_SETUP.md](./STRIPE_SETUP.md))
- ✅ Domain purchased and ready
- ✅ GitHub account connected to your repository
- ✅ Local development working (`npm run dev`)

## Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ProofLayer SaaS application"
   ```

2. **Create GitHub repository**:
   - Go to [github.com/new](https://github.com/new)
   - Name: `prooflayer`
   - Keep it private (recommended)
   - Don't initialize with README

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/prooflayer.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in (use GitHub account)
3. Click **Add New** → **Project**
4. Click **Import** next to your repository
5. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

## Step 3: Configure Environment Variables

In Vercel project settings, add all these environment variables:

### Database (Supabase)

```
NEXT_PUBLIC_SUPABASE_URL=https://vnfsacxvbpygklfawqsr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres.vnfsacxvbpygklfawqsr:...
DIRECT_URL=postgresql://postgres:...
```

### Stripe (Live Keys)

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... (production webhook)
STRIPE_PRICE_ID=price_...
```

### App Configuration

```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**Important**: Use **live** Stripe keys for production, not test keys!

### How to Add Variables in Vercel

1. Go to your project dashboard
2. Click **Settings** → **Environment Variables**
3. For each variable:
   - Enter **Key** (e.g., `DATABASE_URL`)
   - Enter **Value** (copy from `.env.local`)
   - Select **Production**, **Preview**, and **Development**
   - Click **Save**

## Step 4: Deploy

1. Click **Deploy**
2. Wait for build to complete (2-3 minutes)
3. You'll see: "🎉 Congratulations!"
4. Your site is live at: `your-project.vercel.app`

### If Build Fails

Check build logs for errors:

**Common issues:**
- Missing environment variables
- TypeScript errors
- Prisma client not generated

**Fix:**
```bash
# Run locally to catch errors
npm run build

# If Prisma errors:
npx prisma generate
npm run build
```

## Step 5: Set Up Custom Domain

### Add Domain to Vercel

1. In Vercel project, go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain: `yourdomain.com`
4. Click **Add**

### Configure DNS

Vercel will show DNS records to add. Two options:

**Option A: Nameservers (Recommended)**
1. Copy Vercel's nameservers (e.g., `ns1.vercel-dns.com`)
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Find **DNS Settings** or **Nameservers**
4. Replace existing nameservers with Vercel's
5. Save changes

**Option B: A/CNAME Records**
1. Add **A Record**:
   - Host: `@`
   - Value: `76.76.21.21` (Vercel's IP)
2. Add **CNAME Record**:
   - Host: `www`
   - Value: `cname.vercel-dns.com`

### Wait for Propagation

- DNS changes take 5 minutes to 48 hours
- Usually works within 30 minutes
- Check status in Vercel dashboard

### Configure www Redirect

In Vercel **Settings** → **Domains**:
1. Ensure both `yourdomain.com` and `www.yourdomain.com` are added
2. Set redirect: `www.yourdomain.com` → `yourdomain.com`

## Step 6: Configure Stripe Webhook for Production

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Switch to **Live mode** (toggle in top-right)
3. Navigate to **Developers** → **Webhooks**
4. Click **Add endpoint**
5. Enter endpoint URL:
   ```
   https://yourdomain.com/api/webhooks/stripe
   ```
6. Select **Latest API version**
7. Select events:
   - `checkout.session.completed`
8. Click **Add endpoint**
9. Copy the **Signing secret** (starts with `whsec_`)
10. Update in Vercel:
    - **Settings** → **Environment Variables**
    - Edit `STRIPE_WEBHOOK_SECRET`
    - Paste new secret
    - Click **Save**
11. **Redeploy** project (Vercel → Deployments → click ⋯ → Redeploy)

## Step 7: Update Environment Variable

Update `NEXT_PUBLIC_APP_URL` in Vercel:
1. **Settings** → **Environment Variables**
2. Edit `NEXT_PUBLIC_APP_URL`
3. Change to: `https://yourdomain.com`
4. Click **Save**
5. **Redeploy** the project

## Step 8: Test Production Site

### Test Authentication
1. Visit `https://yourdomain.com`
2. Click **Start Free**
3. Sign up with email
4. Check email for confirmation (if enabled in Supabase)
5. Log in to dashboard

### Test Workspace Creation
1. Create a workspace
2. Create a form
3. Visit the public form URL
4. Submit a test testimonial
5. Check dashboard for submission

### Test Widget
1. Go to **Widgets**
2. Copy embed code
3. Create a test HTML file:
   ```html
   <!DOCTYPE html>
   <html>
   <head><title>Test Widget</title></head>
   <body>
     <h1>Testimonials</h1>
     <div id="prooflayer-widget"></div>
     <script src="https://yourdomain.com/widget.js"
             data-workspace="YOUR_WORKSPACE_ID"
             data-layout="grid"
             data-theme="light"></script>
   </body>
   </html>
   ```
4. Open in browser to verify widget loads

### Test Stripe Checkout
1. Go to `/dashboard/billing`
2. Click **Upgrade Now - $199**
3. Use test card: `4242 4242 4242 4242`
4. Complete payment
5. Verify upgrade successful
6. Check Stripe Dashboard for payment
7. Check webhook delivery in Stripe → Developers → Webhooks

**Warning**: Use test mode first! Switch to live mode only when ready for real payments.

## Step 9: Configure Supabase Auth Redirect

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Add **Redirect URLs**:
   ```
   https://yourdomain.com/auth/callback
   https://yourdomain.com/dashboard
   ```
5. Click **Save**

## Step 10: Enable Production Features

### Update .gitignore

Ensure these are in `.gitignore`:
```
.env.local
.env
.env*.local
```

### Configure Vercel Settings

**Automatic Deployments**:
- Go to **Settings** → **Git**
- Enable **Auto-deploy** for main branch
- Now pushing to `main` triggers deploy

**Preview Deployments**:
- Every pull request gets a preview URL
- Test changes before merging

**Production Branch**:
- Set to `main` (or your preferred branch)

## Troubleshooting

### Domain Not Working

**Check:**
- DNS records configured correctly
- Nameservers updated (if using Vercel DNS)
- Wait 24-48 hours for full propagation
- Clear browser cache
- Try incognito mode

**Verify DNS:**
```bash
# Check A record
dig yourdomain.com

# Check CNAME
dig www.yourdomain.com
```

### SSL Certificate Not Provisioning

**Symptoms**: "Your connection is not private" error

**Fix:**
- Vercel auto-provisions SSL (takes 1-2 minutes)
- If stuck, remove and re-add domain
- Check DNS is pointing correctly
- Contact Vercel support if persists

### Environment Variables Not Working

**Symptoms**: Database connection errors, Stripe not working

**Fix:**
- Verify all variables are set in Vercel
- Check for typos in variable names
- Ensure no trailing spaces in values
- Redeploy after adding variables
- Check build logs for errors

### Stripe Webhook Failing

**Symptoms**: Payment successful but plan not upgraded

**Fix:**
1. Check webhook URL is correct
2. Verify `STRIPE_WEBHOOK_SECRET` in Vercel
3. Check webhook logs in Stripe Dashboard
4. Test webhook with Stripe CLI:
   ```bash
   stripe trigger checkout.session.completed
   ```
5. Check server logs in Vercel

### Database Connection Issues

**Symptoms**: 500 errors, can't query database

**Fix:**
- Verify `DATABASE_URL` and `DIRECT_URL` are correct
- Check Supabase connection pooling
- Ensure IP is whitelisted in Supabase
- Test connection string locally

## Monitoring & Maintenance

### Vercel Analytics

1. Go to project **Analytics** tab
2. View page views, errors, performance
3. Free tier includes basic analytics

### Check Logs

**Runtime Logs**:
- Vercel → **Deployments** → Click deployment → **Logs**
- Real-time function execution logs

**Build Logs**:
- View in deployment details
- Check for build warnings/errors

### Performance Monitoring

- Use Vercel **Speed Insights** (optional paid add-on)
- Monitor Core Web Vitals
- Track page load times

### Database Monitoring

- Supabase Dashboard → **Database** → **Logs**
- Monitor query performance
- Check connection pooling

## Scaling Considerations

### When to Scale

Monitor these metrics:
- Database connections (Supabase has limits)
- Stripe API rate limits (99% won't hit this)
- Vercel bandwidth (generous free tier)

### Supabase Limits

**Free Tier**:
- 500 MB database
- 5 GB bandwidth/month
- 50k edge function invocations

**Pro Tier** ($25/month):
- 8 GB database
- 250 GB bandwidth
- Unlimited edge functions

### Vercel Limits

**Hobby (Free)**:
- 100 GB bandwidth/month
- Unlimited deployments

**Pro** ($20/month):
- 1 TB bandwidth
- Priority support

## Next Steps

After successful deployment:

1. **Test Everything**:
   - [ ] Sign up flow
   - [ ] Workspace creation
   - [ ] Form submission
   - [ ] Widget embedding
   - [ ] Stripe checkout (test mode first!)

2. **Go Live with Stripe**:
   - [ ] Switch to live API keys
   - [ ] Update webhook endpoint
   - [ ] Test with real card (small amount)
   - [ ] Verify webhook delivery

3. **Marketing**:
   - [ ] Share on social media
   - [ ] Create demo video
   - [ ] Reach out to potential customers

4. **Monitor**:
   - [ ] Check analytics daily
   - [ ] Monitor error logs
   - [ ] Track user signups
   - [ ] Review Stripe payments

## Support

**Vercel Help**:
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)

**Next.js Help**:
- [Next.js Docs](https://nextjs.org/docs)
- [Next.js Discord](https://nextjs.org/discord)

---

**Congratulations! 🎉** Your ProofLayer SaaS is now live!

Visit your site: `https://yourdomain.com`
