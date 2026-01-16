# ProofLayer

**ProofLayer** is a fully operational SaaS platform that helps freelancers, agencies, and businesses collect, manage, and display testimonials on their websites.

## Features

- 🔐 **User Authentication** - Secure sign up and login with Supabase Auth
- 📦 **Workspace Management** - Organize testimonials by client or project
- 📝 **Testimonial Forms** - Beautiful public forms to collect client feedback
- ✅ **Approval System** - Review, approve, or reject testimonials with one click
- ⭐ **Star Ratings** - Collect and display 5-star ratings
- 🎨 **Customizable Widgets** - Grid and carousel layouts with light/dark themes
- 💳 **Stripe Integration** - One-time $199 Lifetime upgrade
- 📊 **Usage Tracking** - Monitor workspaces and submission limits
- 🚀 **Easy Embedding** - One-line code snippet to embed anywhere

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- A Stripe account (for payment processing)
- Your domain purchased (optional for local dev)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**

   Your `.env.local` file is already configured with:
   - Supabase credentials
   - Database connection strings

   You need to add Stripe keys:
   ```env
   # Get these from https://dashboard.stripe.com/apikeys
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...

   # Get this from Stripe CLI or webhook settings
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Create a product and price in Stripe dashboard
   STRIPE_PRICE_ID=price_...
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stripe Integration Setup

### 1. Create Stripe Product

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Products** → **Add Product**
3. Create a product named "ProofLayer Lifetime"
4. Set price to **$199.00** (one-time payment)
5. Copy the Price ID (starts with `price_`)

### 2. Set Environment Variables

Add to your `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PRICE_ID=price_your_price_id
```

### 3. Set Up Webhook

For local development:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Listen for webhooks (in a separate terminal)
npm run stripe:listen
```

This will give you a webhook secret starting with `whsec_`. Add it to `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "ProofLayer SaaS application"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**

   In Vercel dashboard, add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_ID`
   - `NEXT_PUBLIC_APP_URL` (set to your domain)

4. **Deploy**

   Click **Deploy** and wait for build to complete.

5. **Set Up Custom Domain**
   - Go to Settings → Domains
   - Add your purchased domain
   - Update DNS records as instructed

6. **Update Stripe Webhook**

   In Stripe Dashboard, create a webhook endpoint:
   ```
   https://yourdomain.com/api/webhooks/stripe
   ```

   Events to listen for:
   - `checkout.session.completed`

## Usage Guide

### 1. Create a Workspace
1. Sign up and log in
2. Go to **Workspaces** → **New Workspace**
3. Enter a name (e.g., "Acme Corp")

### 2. Create a Form
1. Open your workspace
2. Click **Create Form**
3. Give it a name (e.g., "Project Feedback")
4. Copy the public form URL

### 3. Collect Testimonials
1. Share the form URL with clients
2. They submit their testimonials
3. Review submissions in your dashboard
4. Approve the ones you want to display

### 4. Embed Widget
1. Go to **Widgets**
2. Select workspace
3. Customize layout and theme
4. Copy the embed code
5. Paste it into your website's HTML

## Plans & Limits

### Trial Plan (Free)
- 1 workspace
- 25 submissions
- Shows "Powered by ProofLayer" badge

### Lifetime Plan ($199)
- 3 workspaces
- 1,500 submissions
- Badge-free widgets
- One-time payment, lifetime access

---

**Built with ❤️ using Next.js, Supabase, and Stripe**