import HelpArticle, { Section, Step, Tip, Warning, CodeBlock } from '@/components/HelpArticle';
import Link from 'next/link';

export default function WhatIsProofLayer() {
  return (
    <HelpArticle
      title="What is ProofLayer?"
      description="Learn about ProofLayer's powerful testimonial management platform and how it can help grow your business"
      category="Getting Started"
      lastUpdated="January 2026"
    >
      <p className="text-lg text-gray-700 mb-6">
        ProofLayer is a comprehensive testimonial management platform designed to help businesses collect, manage, and display social proof from their customers.
        Whether you're a SaaS company, agency, freelancer, or e-commerce business, ProofLayer makes it easy to gather authentic testimonials and showcase them
        beautifully across your marketing channels.
      </p>

      <Section title="What ProofLayer Does">
        <p className="text-gray-700 mb-4">
          At its core, ProofLayer solves a critical challenge that every business faces: collecting and leveraging customer testimonials effectively.
          Instead of scattered reviews across multiple platforms or testimonials buried in email threads, ProofLayer provides a centralized system
          to gather, curate, and display your best social proof.
        </p>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">The ProofLayer Workflow:</h3>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <strong className="text-gray-900">Collect:</strong> Create customizable forms to gather testimonials via text, video, or screenshots
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <strong className="text-gray-900">Moderate:</strong> Review and approve submissions to ensure quality and authenticity
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <strong className="text-gray-900">Display:</strong> Showcase testimonials on your website with beautiful, customizable widgets or public Wall of Love pages
                </div>
              </li>
            </ol>
          </div>
        </div>
      </Section>

      <Section title="Key Features">
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-gray-900 mb-2">1. Multiple Submission Types</h3>
            <p className="text-gray-700 mb-3">
              ProofLayer supports three powerful ways to collect testimonials, giving your customers flexibility in how they share their feedback:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>Text Testimonials:</strong> Classic written reviews with star ratings, perfect for quick feedback and easy to moderate
              </li>
              <li>
                <strong>Video Testimonials:</strong> Authentic video recordings that capture emotion and personality. Customers can record directly in their browser
                or upload pre-recorded videos. Video testimonials typically convert 2-3x better than text alone
              </li>
              <li>
                <strong>Screenshot Testimonials:</strong> Import social proof from Twitter, LinkedIn, Product Hunt, or any platform. Perfect for capturing
                viral moments, influential endorsements, or spontaneous praise from social media
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-gray-900 mb-2">2. Customizable Collection Forms</h3>
            <p className="text-gray-700 mb-3">
              Create branded testimonial collection forms that match your company's identity:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Add your logo and choose custom colors (Pro/Agency plans)</li>
              <li>Customize welcome messages and call-to-action text</li>
              <li>Control what information to collect: name, email, company, role, website, social links</li>
              <li>Enable or disable star ratings based on your preference</li>
              <li>Multi-language support for international customers</li>
              <li>Set forms to active or draft status for testing</li>
            </ul>
            <Tip>
              <strong>Best Practice:</strong> Create separate forms for different products, use cases, or customer segments. This allows you to
              customize messaging and collect more targeted testimonials.
            </Tip>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-gray-900 mb-2">3. Beautiful Display Widgets</h3>
            <p className="text-gray-700 mb-3">
              Transform your testimonials into conversion-driving website elements with customizable widgets:
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900">Widget Types:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li><strong>Embed Widgets:</strong> Traditional embedded sections that fit seamlessly into your page layout</li>
                  <li><strong>Popup Widgets:</strong> Click-triggered overlays that showcase testimonials without disrupting the user experience</li>
                  <li><strong>Floating Widgets:</strong> Persistent buttons that stay visible as users scroll, maximizing social proof visibility</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Layout Options:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li><strong>Grid:</strong> Clean, organized rows perfect for featuring multiple testimonials equally</li>
                  <li><strong>Marquee:</strong> Smooth scrolling carousel that showcases testimonials dynamically</li>
                  <li><strong>Masonry:</strong> Pinterest-style layout that handles varying testimonial lengths elegantly</li>
                  <li><strong>Spotlight:</strong> Highlight a single testimonial at a time with navigation controls</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-bold text-gray-900 mb-2">4. Wall of Love</h3>
            <p className="text-gray-700 mb-3">
              Every workspace gets a beautiful, shareable public page that displays all your approved testimonials in one place:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Fully responsive design that looks great on all devices</li>
              <li>Customizable headline, description, and logo</li>
              <li>Unique URL you can share on social media, email signatures, or marketing materials</li>
              <li>SEO-optimized to help your testimonials rank in search engines</li>
              <li>No coding required - automatically generated from approved submissions</li>
              <li>Filter testimonials by type (text, video, screenshot) or star rating</li>
            </ul>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-3">
              Example: https://prooflayer.com/w/your-workspace-slug
            </div>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-bold text-gray-900 mb-2">5. Powerful Moderation System</h3>
            <p className="text-gray-700 mb-3">
              Maintain quality control with ProofLayer's built-in moderation features:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>All submissions start in "Pending" status, giving you full control before anything goes public</li>
              <li>Quick approve/reject workflow with one-click actions</li>
              <li>Add rejection reasons for internal tracking and quality improvement</li>
              <li>Filter submissions by status: All, Pending, Approved, or Rejected</li>
              <li>Search through submissions by customer name, company, or content</li>
              <li>Export submission data to CSV for analysis or backup</li>
            </ul>
            <Warning>
              Always review video and screenshot submissions for inappropriate content before approving. While rare, this protects your brand reputation.
            </Warning>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="font-bold text-gray-900 mb-2">6. Workspace Organization</h3>
            <p className="text-gray-700 mb-3">
              Keep testimonials organized with workspace-based management:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Create separate workspaces for different brands, products, or clients</li>
              <li>Each workspace has its own forms, submissions, widgets, and Wall of Love</li>
              <li>Upload unique logos and branding for each workspace</li>
              <li>Agency plan includes 5 workspaces for client management</li>
              <li>Easily switch between workspaces from your dashboard</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Who ProofLayer Is For">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">SaaS Companies</h3>
            <p className="text-gray-700 mb-3">
              Collect testimonials from users at key moments in their journey and display them strategically on landing pages, pricing pages, and feature pages.
            </p>
            <p className="text-sm text-gray-600">
              Use case: Create separate forms for each product feature to gather targeted feedback you can use in specific marketing materials.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Agencies</h3>
            <p className="text-gray-700 mb-3">
              Manage testimonials for multiple clients with separate workspaces. Provide clients with shareable Wall of Love links they can use in proposals.
            </p>
            <p className="text-sm text-gray-600">
              Use case: Create a workspace for each client, gather their customer testimonials, and deliver branded widgets they can embed on their sites.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">Freelancers & Consultants</h3>
            <p className="text-gray-700 mb-3">
              Build credibility with a professional Wall of Love showcasing client feedback. Embed testimonials on your portfolio site to win more projects.
            </p>
            <p className="text-sm text-gray-600">
              Use case: Send your form link after completing projects, then feature approved testimonials prominently on your website and LinkedIn.
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-bold text-orange-900 mb-3">E-commerce Brands</h3>
            <p className="text-gray-700 mb-3">
              Collect video testimonials from happy customers to increase conversion rates. Display rotating testimonials on product pages and checkout.
            </p>
            <p className="text-sm text-gray-600">
              Use case: Include your form link in post-purchase emails, then showcase video testimonials on product pages to boost trust and sales.
            </p>
          </div>

          <div className="bg-pink-50 p-6 rounded-lg">
            <h3 className="font-bold text-pink-900 mb-3">Course Creators</h3>
            <p className="text-gray-700 mb-3">
              Gather student success stories through video and text testimonials. Display them on sales pages to demonstrate the value of your courses.
            </p>
            <p className="text-sm text-gray-600">
              Use case: Request testimonials from students who complete your course, focusing on specific outcomes and transformations they achieved.
            </p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="font-bold text-indigo-900 mb-3">Local Businesses</h3>
            <p className="text-gray-700 mb-3">
              Collect testimonials from customers via QR codes displayed in-store. Build local trust with authentic reviews on your website.
            </p>
            <p className="text-sm text-gray-600">
              Use case: Place QR codes on receipts or at checkout that link to your form, making it easy for satisfied customers to leave feedback.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Why Use ProofLayer?">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-3">The Social Proof Advantage</h3>
            <p className="mb-3">
              Studies show that 92% of consumers read online reviews before making a purchase decision, and displaying testimonials can increase
              conversion rates by up to 34%. ProofLayer makes it effortless to leverage this powerful psychological principle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Without ProofLayer:</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Testimonials scattered across email, spreadsheets, and platforms</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Manual copying and formatting for your website</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>No easy way to collect video testimonials</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Outdated or poorly formatted testimonials on your site</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Time-consuming to update or add new testimonials</span>
                </li>
              </ul>
            </div>

            <div className="border border-green-500 bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">With ProofLayer:</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Centralized testimonial management in one platform</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Automatic formatting and beautiful display widgets</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Easy video recording and upload capabilities</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Always up-to-date testimonials that sync automatically</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Add new testimonials instantly with one-click approval</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Common Use Cases">
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">1. Landing Page Social Proof</h4>
            <p className="text-gray-700">
              Embed a grid or marquee widget on your landing page to immediately build trust with visitors. Studies show that adding testimonials
              to landing pages can increase conversions by 15-25%.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">2. Client Proposal Enhancement</h4>
            <p className="text-gray-700">
              Include your Wall of Love link in proposals and pitch decks. Potential clients can see authentic feedback from your past customers,
              increasing your credibility and win rate.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">3. Email Marketing Campaigns</h4>
            <p className="text-gray-700">
              Feature a rotating testimonial in your email newsletter footer, or create dedicated emails showcasing customer success stories.
              Link to your Wall of Love to provide social proof at scale.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">4. Product Launch Validation</h4>
            <p className="text-gray-700">
              Collect early testimonials from beta users or first customers, then display them prominently during your product launch to
              overcome skepticism and drive early adoption.
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">5. Recruitment & Employer Branding</h4>
            <p className="text-gray-700">
              Create a workspace for employee testimonials. Feature team members sharing why they love working at your company on your careers page
              to attract top talent.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">6. Social Media Content</h4>
            <p className="text-gray-700">
              Export testimonials as screenshots or videos to share on social media. Turn customer praise into shareable content that extends your
              reach and builds brand awareness.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Getting Started">
        <p className="text-gray-700 mb-4">
          Ready to start collecting testimonials? Here's your roadmap:
        </p>

        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <div>
              <Link href="/signup" className="text-blue-600 hover:underline font-semibold">Sign up for a free trial</Link>
              <p className="text-sm text-gray-600">Get 14 days of full access to all features</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <div>
              <Link href="/help/workspaces/creating-workspace" className="text-blue-600 hover:underline font-semibold">Create your first workspace</Link>
              <p className="text-sm text-gray-600">Set up your brand and organization</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <div>
              <Link href="/help/forms/creating-form" className="text-blue-600 hover:underline font-semibold">Build your collection form</Link>
              <p className="text-sm text-gray-600">Customize your testimonial request</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <div>
              <span className="font-semibold">Share your form link</span>
              <p className="text-sm text-gray-600">Start collecting testimonials from happy customers</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
            <div>
              <Link href="/help/widgets/creating" className="text-blue-600 hover:underline font-semibold">Create display widgets</Link>
              <p className="text-sm text-gray-600">Showcase testimonials on your website</p>
            </div>
          </li>
        </ol>

        <Tip>
          <p className="font-semibold mb-1">Quick Start Resources:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><Link href="/help/getting-started/quick-start" className="text-blue-600 hover:underline">Quick Start Guide</Link> - Get up and running in 5 minutes</li>
            <li><Link href="/help/billing/plan-comparison" className="text-blue-600 hover:underline">Plan Comparison</Link> - Choose the right plan for your needs</li>
            <li><Link href="/faq" className="text-blue-600 hover:underline">FAQ</Link> - Common questions answered</li>
          </ul>
        </Tip>
      </Section>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Harness the Power of Social Proof?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of businesses using ProofLayer to collect, manage, and display testimonials that drive growth and build trust.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Start Free Trial
          </Link>
          <Link
            href="/help/getting-started/quick-start"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            View Quick Start Guide
          </Link>
        </div>
      </div>
    </HelpArticle>
  );
}
