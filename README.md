# ProofLayer

The launch toolkit for founders. Get your first 100 users, collect testimonials, and display social proof—all in one platform.

## What is ProofLayer?

ProofLayer solves the chicken-and-egg problem every founder faces: you need testimonials to convert visitors, but you need users before you can collect testimonials.

**Three steps:**
1. **Get Users** — Get matched with early adopters who want to try new products
2. **Collect Testimonials** — Beautiful forms for video and text reviews
3. **Display Social Proof** — Embed widgets that convert visitors

One platform. One-time payment. No monthly fees.

## Features

- **Early Adopter Matching** — Connect with users who love discovering new products
- **Video Testimonials** — Record directly in browser, no apps needed
- **Text Reviews** — Clean forms with custom questions
- **Approval Workflow** — Review and approve before publishing
- **Embeddable Widgets** — Grid, carousel, wall of love layouts
- **Custom Branding** — Match your brand colors and style
- **One-Line Embed** — Works on any website

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Email**: Resend
- **File Uploads**: UploadThing
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Stripe account

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.example` for all required variables:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `DATABASE_URL` — PostgreSQL connection string
- `STRIPE_SECRET_KEY` — Stripe secret key
- `RESEND_API_KEY` — Resend API key for emails
- `UPLOADTHING_TOKEN` — UploadThing token for video uploads

## Deployment

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## License

Proprietary. All rights reserved.
