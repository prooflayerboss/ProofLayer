# ProofLayer AppSumo Launch Checklist

**Goal**: Launch on AppSumo to generate immediate revenue and get user feedback.

---

## 🎯 AppSumo Tier Structure

### Tier 1 — Solo / Starter ($59 - 1 code)
- ✅ 1 Workspace
- ✅ 3 Forms
- ✅ 150 Testimonials total
- ✅ 1 Widget style (grid only)
- ✅ "Powered by ProofLayer" badge (required)
- ✅ All submission types (text, video, screenshot)
- ✅ Approval/moderation
- ✅ Email notifications

### Tier 2 — Professional ($118 - 2 codes) ⭐ MAIN SELLER
- ✅ 3 Workspaces
- ✅ 10 Forms per workspace
- ✅ 1,000 Testimonials total
- ✅ 3 Widget styles (grid, carousel, marquee)
- ✅ Branding removal (no badge)
- ✅ Basic customization (colors, layout)

### Tier 3 — Agency ($177 - 3 codes)
- ✅ 10 Workspaces
- ✅ 50 Forms total
- ✅ 5,000 Testimonials
- ✅ All widget styles (grid, carousel, marquee, masonry, spotlight)
- ✅ All widget types (embed, popup, floating)
- ✅ Priority support tag
- ✅ Early access to new features

---

## ✅ Critical Implementation Tasks (MUST HAVE)

### 1. Tier Limits Enforcement ⚡ IN PROGRESS
**Priority**: CRITICAL
**Status**: 🔴 Not Started

**Tasks**:
- [ ] Update PLAN_LIMITS in `/src/lib/constants.ts` with AppSumo tiers
  - [ ] Add APPSUMO_SOLO, APPSUMO_PRO, APPSUMO_AGENCY plans
  - [ ] Define maxWorkspaces, maxForms, maxSubmissions, maxWidgetStyles
- [ ] Update Prisma schema `Plan` enum with new AppSumo plans
- [ ] Run `prisma db push` to sync schema
- [ ] Enforce workspace creation limit
  - [ ] Check limit in `/src/app/dashboard/workspaces/new/page.tsx`
  - [ ] Show upgrade modal when limit reached
- [ ] Enforce form creation limit
  - [ ] Check limit in form creation action
  - [ ] Show upgrade modal when limit reached
- [ ] Enforce submission limit
  - [ ] Check in `/src/app/api/submissions/route.ts`
  - [ ] Check in `/src/app/api/submissions/video/route.ts`
  - [ ] Check in `/src/app/api/submissions/screenshot/route.ts`
  - [ ] Graceful error message for submitters
- [ ] Enforce widget style limits
  - [ ] Hide unavailable layouts in widget configurator
  - [ ] Show "Upgrade to unlock" badges

**Files to Modify**:
- `src/lib/constants.ts`
- `prisma/schema.prisma`
- `src/app/dashboard/workspaces/new/page.tsx`
- `src/app/dashboard/workspaces/[id]/forms/new/page.tsx`
- `src/app/api/submissions/*.ts`
- `src/app/dashboard/widgets/widget-configurator.tsx`

---

### 2. "Powered by ProofLayer" Badge System
**Priority**: CRITICAL
**Status**: 🔴 Not Started

**Tasks**:
- [ ] Add `showBadge` field to WidgetConfig model (boolean, default true)
- [ ] Update widget API to return `showBadge` based on plan
  - [ ] Check user's plan tier
  - [ ] Return false only for APPSUMO_PRO and APPSUMO_AGENCY
- [ ] Update all 3 widget scripts to conditionally show badge
  - [ ] `/public/widget.js`
  - [ ] `/public/widget-popup.js`
  - [ ] `/public/widget-floating.js`
- [ ] Add badge removal toggle in widget configurator
  - [ ] Only show for eligible plans
  - [ ] Show "Upgrade to remove" for lower tiers
- [ ] Test badge display in all widget types and layouts

**Files to Modify**:
- `prisma/schema.prisma`
- `src/app/api/widget/[workspaceId]/route.ts`
- `public/widget.js`
- `public/widget-popup.js`
- `public/widget-floating.js`
- `src/app/dashboard/widgets/widget-configurator.tsx`

---

### 3. Public Testimonial Page (Wall of Love)
**Priority**: CRITICAL
**Status**: 🟡 Partially Complete (demo page exists)

**Tasks**:
- [ ] Review existing `/w/[slug]` route implementation
- [ ] Ensure workspace slug is required and unique
- [ ] Create shareable public URL: `prooflayer.app/w/workspace-slug`
- [ ] Add "Share Your Wall" section in dashboard
  - [ ] Display public URL
  - [ ] Copy link button
  - [ ] QR code generator (optional but nice)
- [ ] Style public page for maximum impact
  - [ ] Hero section with workspace logo/name
  - [ ] Grid layout of approved testimonials
  - [ ] Responsive mobile design
- [ ] Add SEO meta tags to public page
- [ ] Test with no testimonials (empty state)

**Files to Check/Modify**:
- `src/app/w/[slug]/page.tsx` (already exists)
- `src/app/dashboard/workspaces/[id]/page.tsx` (add share section)

---

### 4. Upgrade Modals & Messaging
**Priority**: HIGH
**Status**: 🔴 Not Started

**Tasks**:
- [ ] Create reusable UpgradeModal component
  - [ ] Show current plan
  - [ ] Show what's needed to unlock
  - [ ] Clear CTA (even if upgrade isn't live yet)
  - [ ] "Coming Soon" message for now
- [ ] Add upgrade prompts throughout app
  - [ ] Workspace creation limit reached
  - [ ] Form creation limit reached
  - [ ] Widget style locked
  - [ ] Badge removal locked
- [ ] Add plan indicator to dashboard header
  - [ ] Current plan name
  - [ ] Usage stats (X/Y workspaces, etc.)
- [ ] Ensure friendly error messages on public forms
  - [ ] "This form has reached its limit"
  - [ ] Don't expose technical details

**Files to Create/Modify**:
- `src/components/upgrade-modal.tsx` (new)
- `src/app/dashboard/layout.tsx` (add plan indicator)
- All limit enforcement points

---

### 5. Demo Workspace with Sample Testimonials
**Priority**: HIGH
**Status**: 🔴 Not Started

**Tasks**:
- [ ] Create seed script to generate demo workspace
  - [ ] 8-10 realistic testimonials
  - [ ] Mix of text, video (YouTube embeds), screenshots
  - [ ] Variety of ratings (mostly 5 stars, some 4)
  - [ ] Different companies/roles
- [ ] Auto-create demo workspace for new users
  - [ ] Trigger on first login
  - [ ] Include helpful onboarding notes
- [ ] Make demo workspace read-only or clearly labeled
- [ ] Add "Try It" button on dashboard to view demo

**Files to Create**:
- `prisma/seed-demo.ts` (new)
- `src/lib/create-demo-workspace.ts` (new)

---

### 6. Widget Mobile Responsiveness Testing
**Priority**: MEDIUM
**Status**: 🟡 Needs Testing

**Tasks**:
- [ ] Test grid layout on mobile
- [ ] Test carousel layout on mobile
- [ ] Test marquee layout on mobile
- [ ] Test masonry layout on mobile
- [ ] Test spotlight layout on mobile
- [ ] Test popup widget on mobile
- [ ] Test floating badge on mobile
- [ ] Fix any overflow or layout issues
- [ ] Ensure touch interactions work

**Testing Checklist**:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad)
- [ ] Small screens (320px width)

---

### 7. Iframe Fallback Option
**Priority**: MEDIUM (Nice to Have)
**Status**: 🔴 Not Started

**Tasks**:
- [ ] Create iframe version of widget
  - [ ] `/widget-iframe/[workspaceId]` route
  - [ ] Renders testimonials in iframe-friendly page
  - [ ] No external dependencies
- [ ] Add "Iframe Option" tab in widget configurator
  - [ ] Generate iframe embed code
  - [ ] Set width/height
- [ ] Test in Notion, Carrd, Facebook pages
- [ ] Add to installation instructions

**Files to Create**:
- `src/app/widget-iframe/[workspaceId]/page.tsx` (new)

---

## 📋 AppSumo Submission Requirements

### Before Submission
- [ ] All Tier 1 critical tasks complete
- [ ] End-to-end flow works perfectly
- [ ] At least one premium widget looks amazing
- [ ] Mobile responsive confirmed
- [ ] Limits enforced with friendly messages
- [ ] Public testimonial page live
- [ ] Demo workspace created

### AppSumo Listing Content
- [ ] Product name: "ProofLayer"
- [ ] Tagline: "Collect and display customer testimonials with beautiful widgets"
- [ ] Logo (high-res)
- [ ] Screenshots:
  - [ ] Dashboard overview
  - [ ] Widget configurator
  - [ ] Form builder
  - [ ] Live widget examples (grid, carousel, popup)
  - [ ] Mobile view
- [ ] Product description (emphasize lifetime deal value)
- [ ] Feature list (be honest about what's live vs. coming soon)
- [ ] Tier comparison table
- [ ] Demo video (2-3 minutes):
  - [ ] Create workspace
  - [ ] Create form
  - [ ] Submit testimonial
  - [ ] Approve testimonial
  - [ ] Embed widget
  - [ ] Show live widget

### Legal & Support
- [ ] Terms of Service page
- [ ] Privacy Policy page
- [ ] Support email working (support@prooflayer.app)
- [ ] Refund policy (AppSumo standard 60 days)
- [ ] GDPR compliance statement

---

## 🚫 What NOT to Include (Future Upsells)

These are intentionally NOT offered on AppSumo:
- ❌ Unlimited workspaces
- ❌ Unlimited testimonials
- ❌ Native video hosting
- ❌ White-label custom domains
- ❌ Advanced analytics
- ❌ Zapier integration
- ❌ API access
- ❌ Team collaboration features

These become your subscription upsells after AppSumo.

---

## 📊 Success Metrics

**Week 1 Goals**:
- 50+ sales
- 4.5+ star rating
- <5% refund rate
- Responsive founder (reply within 24 hours)

**Red Flags to Avoid**:
- Login issues
- Embed not working
- Limits not enforcing
- Mobile broken
- Slow support responses

---

## 🎯 Implementation Order (This Week)

### Day 1-2: Tier Limits (CRITICAL)
- Implement all limit enforcement
- Test upgrade modals
- Verify graceful error messages

### Day 3: Badge System
- Add badge to widgets
- Make it removable for higher tiers
- Test all widget types

### Day 4: Public Pages & Polish
- Finalize public testimonial page
- Add share functionality
- Create demo workspace

### Day 5: Testing & Documentation
- Mobile testing
- Create AppSumo screenshots
- Write product description
- Record demo video

### Day 6: Final QA
- End-to-end testing
- Bug fixes
- Performance check

### Day 7: Submit to AppSumo
- Upload assets
- Submit listing
- Prepare for launch

---

## ✅ Current Status Summary

**Completed**:
- ✅ Core testimonial collection flow
- ✅ 5 widget layouts (grid, carousel, marquee, masonry, spotlight)
- ✅ 3 widget types (embed, popup, floating)
- ✅ 3 submission types (text, video, screenshot)
- ✅ Platform installation instructions
- ✅ Approval/moderation system
- ✅ Auth working

**In Progress**:
- 🔴 Tier limits enforcement (STARTING NOW)

**Not Started**:
- 🔴 Badge system
- 🔴 Upgrade modals
- 🔴 Demo workspace
- 🔴 Iframe fallback
- 🔴 Mobile testing
- 🔴 AppSumo submission materials

---

## 🎬 Next Steps

**RIGHT NOW**: Start implementing tier limits enforcement (#1)

**Questions to Answer**:
1. Should we use existing TRIAL/MONTHLY/LIFETIME plans or add separate APPSUMO_* plans?
2. How do we handle users who already have TRIAL accounts?
3. Do we want automatic plan upgrades from stacking codes, or manual?

**Let's build this! 🚀**
