# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Next.js dev server on :3000
npm run build            # prisma generate && next build (Vercel uses this)
npm run lint             # next lint (ESLint via eslint-config-next)
npm run db:push          # Push schema.prisma to database (preferred over migrate for this project)
npm run db:migrate       # prisma migrate dev (rarely used; see Migrations below)
npm run db:studio        # Prisma Studio GUI
npm run db:generate      # Regenerate Prisma client (also runs on postinstall)
npm run stripe:listen    # Forward Stripe webhooks to localhost:3000/api/webhooks/stripe
```

There is no test runner configured. The repo has no Jest/Vitest/Playwright setup — verifying changes is done through `npm run build` (catches type errors) and manual browser testing via `npm run dev`.

The `test-*.html` files at the repo root (`test-widget.html`, `test-widgets.html`, `test-all-layouts.html`, `test-widget-production.html`) are static demo pages for exercising the embeddable widget against a running dev server — open them in a browser, not via a test runner.

## Architecture

### Hybrid App Router + Pages Router
This is a Next.js 14 App Router project with one intentional exception: `pages/api/stripe-webhook.ts` uses the legacy Pages API specifically because it needs `bodyParser: false` to verify Stripe's raw-body signatures. The App Router-style webhook lives at `src/app/api/webhooks/stripe`, but the source of truth for Stripe events is the pages route. Middleware (`src/middleware.ts`) skips `/api/stripe-webhook` and `/api/webhooks/` so neither path runs the Supabase session refresh.

### Two parallel auth systems
1. **Main app (Supabase Auth)** — `User.id` is the Supabase Auth UUID, **NOT** a Prisma-generated UUID. Server-side: `src/lib/supabase/server.ts` (`createClient` from cookies); browser: `src/lib/supabase/client.ts`. Always call `ensureUserExists()` from `src/actions/user.ts` after login — it upserts the `User` row and creates a default `Entitlement`. Middleware refreshes sessions on every non-API request and gates `/dashboard/*`.
2. **First100 founder portal (custom JWT)** — `src/app/api/first100/auth/*` uses `bcryptjs` + `jose` (HS256) with `JWT_SECRET`. Founders authenticate against `First100Waitlist.passwordHash`, completely bypassing Supabase. Routes under `/first100/*` and `/api/first100/*` use this system.

When adding auth checks, identify which system the route belongs to before importing the wrong helper.

### Domain model has legacy/new pairs
The schema (`prisma/schema.prisma`) contains overlapping models from a redesign:
- **Plans**: New (`FREE`, `STARTER`, `GROWTH`, `LAUNCH`, `CONCIERGE`) and legacy (`TRIAL`, `MONTHLY`, `LIFETIME`, `SOLO`, `PRO`, `AGENCY`) both live in the `Plan` enum. `src/lib/constants.ts:PLAN_LIMITS` defines limits for every value, and `src/lib/plan-limits.ts` provides gating helpers (`canCreateWorkspace`, `isLayoutAllowed`, etc.). New code should write `FREE`/`STARTER`/`GROWTH`/`LAUNCH` but must keep reading legacy values.
- **Products & votes**: Legacy `First100Waitlist` + `FounderProduct` + `ProductVote` (keyed by waitlist email) coexist with new `Product` + `Vote` (keyed by Supabase `User.id`). The First100 flow is being migrated into the unified model — check which model a feature targets before touching it.
- **Widgets**: `WidgetType.EMBED` was renamed to `WALL_OF_LOVE`; older code paths still reference `EMBED`.

When touching this area, search both names and prefer extending the new model rather than back-porting features to legacy.

### Plan-based feature gating
Every feature limit (workspace count, form count, allowed widget layouts, branding badge) flows through `PLAN_LIMITS` in `src/lib/constants.ts`. Add a new gating rule by extending each plan's entry and adding a helper in `src/lib/plan-limits.ts` — never hardcode plan checks (`if (plan === 'PRO')`) at call sites.

### Server actions vs API routes
- `src/actions/*.ts` (`'use server'`) — used for dashboard mutations called from client components. Call `ensureUserExists()` first to attach the DB user.
- `src/app/api/*` route handlers — used when a request needs CORS (e.g. `/api/widget/[workspaceId]`), webhook semantics, or third-party callbacks (Stripe, Google OAuth, UploadThing).
- Public widget endpoints set `Access-Control-Allow-Origin: *` and must remain unauthenticated — they're called from arbitrary customer sites.

### Embeddable widget
`public/widget.js`, `widget-popup.js`, `widget-floating.js`, `widget-form.js`, `widget-badge.js` are framework-free vanilla JS bundles served as static assets. They read `data-*` attributes from their own `<script>` tag, fetch testimonials from `/api/widget/[workspaceId]`, and inject styles via a `<style>` element. The `data-workspace` value is the workspace's UUID (not the slug). They normalize `prooflayer.app` → `www.prooflayer.app` to match the canonical domain redirect in middleware. When changing widget rendering, update both the JS file *and* `/api/widget/[workspaceId]` response shape — they're versioned together.

A separate `wordpress-plugin/prooflayer/` directory contains the PHP WordPress plugin that wraps these scripts; treat it as a sibling deliverable.

### Email flow
React Email templates live in `/emails` (top-level, **not** under `src/`). The auth callback (`src/app/auth/callback/route.ts`) renders them with `@react-email/render` and sends through Resend. Email approve/reject links carry HMAC-signed tokens generated by `src/lib/email-token.ts` (`EMAIL_ACTION_SECRET` env var, 30-day expiration); never expose moderation endpoints without a valid token.

### File uploads
UploadThing is configured in `src/app/api/uploadthing/core.ts` (the active config) — there is also a stale `src/lib/uploadthing.ts` that is not wired up. Four file routes exist: `videoUploader` (128MB), `screenshotUploader` (4MB), `logoUploader` (8MB), `productImageUploader` (4MB × 5). Public testimonial uploads have **no auth**; logo/product-image uploads should be gated when wired into UI.

### Domain & cookies (production)
Middleware 301-redirects `prooflayer.app` → `www.prooflayer.app` because Supabase PKCE cookies were breaking on apex/www mismatches. The auth callback has a retry loop with progressive backoff specifically for PKCE/code-verifier timing errors. If you change the canonical domain, update both `src/middleware.ts` and the origin normalization in `public/widget.js`.

### Migrations
The project mostly uses `prisma db push` (no migration history committed except a few legacy SQL files in `prisma/migrations/`). Ad-hoc data migrations are written as raw SQL in `migration.sql` at the repo root and applied with `npx tsx run-migration.ts`. Prefer `db:push` for schema changes; reach for `migration.sql` only when you need data backfills that Prisma can't express.

## Conventions

- `@/*` resolves to `src/*` (see `tsconfig.json`).
- Prisma client is a singleton in `src/lib/prisma.ts` — always import `prisma` from there, never instantiate `new PrismaClient()` (except in standalone scripts like `run-migration.ts`).
- Body size for server actions is bumped to 100MB (`next.config.js`) for video upload flows.
- Images from UploadThing (`utfs.io`) are pre-allowed in `next.config.js:images.remotePatterns`.
- `cn()` in `src/lib/utils.ts` is the standard `clsx + tailwind-merge` helper for conditional class names.
- `.env.local` is gitignored; `.env.example` lists every required variable. The Stripe webhook needs both `STRIPE_WEBHOOK_SECRET` and matching `STRIPE_PRICE_*` IDs for each plan.
