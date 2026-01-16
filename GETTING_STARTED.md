# Getting Started with ProofLayer

Welcome! Your ProofLayer SaaS application is ready to go. Follow these steps to get it running.

## Quick Start (5 minutes)

### 1. Open the project in VS Code
The project is already in VS Code at `/Users/curtisewalt/Desktop/ProofLayer`

### 2. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see the landing page!

### 3. Sign up for an account
1. Click **Start Free** or **Sign Up**
2. Enter email and password
3. You'll be redirected to the dashboard

### 4. Create your first workspace
1. Click **Create Workspace**
2. Name it (e.g., "My Agency")
3. You now have a workspace!

### 5. Create a testimonial form
1. Open your workspace
2. Click **Create Form**
3. Name it (e.g., "Client Feedback")
4. Copy the public form URL

### 6. Test the form
1. Open the form URL in a new tab
2. Fill out a test testimonial
3. Go back to dashboard
4. Click **Manage** on your form
5. You'll see the pending submission
6. Click **Approve**

### 7. Get the widget code
1. Go to **Widgets** in dashboard
2. Select your workspace
3. Choose layout (Grid or Carousel)
4. Choose theme (Light or Dark)
5. Click **Copy** to copy the embed code

## What's Already Set Up

✅ **Database** - Connected to Supabase PostgreSQL
✅ **Authentication** - Supabase Auth with email/password
✅ **UI** - Beautiful Tailwind CSS styling
✅ **Forms** - Public testimonial collection forms
✅ **Dashboard** - Full admin dashboard
✅ **Widgets** - Embeddable testimonial widgets
✅ **Plan System** - Trial (free) and Lifetime ($199) plans

## What You Need to Configure

### Before Going Live

1. **Stripe Integration** - For accepting payments
   - See [STRIPE_SETUP.md](./STRIPE_SETUP.md)
   - Required to enable Lifetime plan purchases

2. **Domain Setup** - For production
   - You already have the domain purchased
   - See [DEPLOYMENT.md](./DEPLOYMENT.md)

3. **Environment Variables** - For production
   - Already set for local development
   - Need to add to Vercel for production

## File Structure Overview

```
ProofLayer/
├── src/
│   ├── app/              # Pages and routes
│   │   ├── page.tsx      # Landing page ← Start here!
│   │   ├── login/        # Login page
│   │   ├── signup/       # Signup page
│   │   ├── dashboard/    # Protected dashboard
│   │   ├── f/[slug]/     # Public testimonial forms
│   │   └── api/          # API routes
│   ├── actions/          # Server actions (database operations)
│   ├── components/       # Reusable UI components
│   └── lib/              # Utilities
├── prisma/
│   └── schema.prisma     # Database schema
├── public/
│   └── widget.js         # Embeddable widget script
├── .env.local            # Environment variables
└── README.md             # Full documentation
```

## Key Features to Try

### 1. Workspace Management
- Create multiple workspaces (trial allows 1, lifetime allows 3)
- Each workspace can have multiple forms
- Delete workspaces when done

### 2. Form Management
- Create forms for different projects
- Each form has a unique URL
- Toggle forms active/inactive
- Delete forms when not needed

### 3. Submission Review
- View all submissions in one place
- Filter by status (Pending, Approved, Rejected)
- Approve/reject with one click
- Delete spam submissions

### 4. Widget Customization
- Grid layout (testimonials in columns)
- Carousel layout (horizontal scrolling)
- Light theme (white background)
- Dark theme (dark background)

### 5. Billing & Plans
- View current plan and usage
- See workspace and submission limits
- Upgrade to Lifetime plan (requires Stripe setup)

## Testing the Full Flow

Here's a complete test scenario:

1. **Sign up** → Create account
2. **Dashboard** → See overview
3. **Create workspace** → "Test Company"
4. **Create form** → "Project Feedback"
5. **Visit form URL** → Submit testimonial
6. **Approve submission** → In dashboard
7. **Get widget code** → From Widgets page
8. **Test widget** → Create test HTML file

### Test HTML for Widget

Create a file `test-widget.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ProofLayer Widget Test</title>
</head>
<body>
    <h1>My Testimonials</h1>

    <!-- ProofLayer Widget -->
    <div id="prooflayer-widget"></div>
    <script
        src="http://localhost:3000/widget.js"
        data-workspace="YOUR_WORKSPACE_ID"
        data-layout="grid"
        data-theme="light">
    </script>
</body>
</html>
```

Replace `YOUR_WORKSPACE_ID` with your actual workspace ID from the dashboard.

## Next Steps

### Immediate (Today)
1. ✅ Run `npm run dev` and test the app
2. ✅ Create a test workspace and form
3. ✅ Submit a test testimonial
4. ✅ Test the widget on a local HTML file

### Short-term (This Week)
1. 📚 Read [STRIPE_SETUP.md](./STRIPE_SETUP.md)
2. 💳 Set up Stripe account
3. 🧪 Test Stripe checkout in test mode
4. 📖 Review all pages in the dashboard

### Medium-term (Next Week)
1. 🚀 Read [DEPLOYMENT.md](./DEPLOYMENT.md)
2. 🌐 Deploy to Vercel
3. 🔗 Connect your domain
4. ✅ Test production site end-to-end
5. 💰 Switch Stripe to live mode

### Launch (When Ready)
1. 📢 Announce on social media
2. 👥 Invite beta users
3. 💪 Collect real testimonials
4. 📊 Monitor analytics and usage

## Common Questions

**Q: Can I change the plan limits?**
A: Yes! Edit `src/lib/constants.ts` to change workspace/submission limits.

**Q: Can I add more fields to the testimonial form?**
A: Yes! Update the Prisma schema, run `npm run db:push`, and update the form component.

**Q: How do I customize the landing page?**
A: Edit `src/app/page.tsx` - all content is there.

**Q: Can I add more plans (e.g., monthly)?**
A: Yes! Add to the Prisma enum, create Stripe products, and update the billing logic.

**Q: How do I change the pricing?**
A: Update the landing page, billing page, and create a new Stripe product with your price.

## Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Database errors
```bash
# Regenerate Prisma client
npx prisma generate

# Push schema again
npm run db:push
```

### Can't log in
- Check Supabase is running
- Verify .env.local has correct keys
- Try incognito mode (clear cookies)

### Widget not showing
- Ensure submissions are APPROVED
- Check workspace ID is correct
- Open browser console for errors

## Documentation Files

- **[README.md](./README.md)** - Full project documentation
- **[STRIPE_SETUP.md](./STRIPE_SETUP.md)** - Stripe integration guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Vercel deployment guide
- **This file** - Quick start guide

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Stripe Docs**: https://stripe.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Ready to build your testimonial empire? Let's go! 🚀**

Run `npm run dev` and visit http://localhost:3000
