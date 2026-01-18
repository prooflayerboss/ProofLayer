import HelpArticle, { Section, Step, Tip } from '@/components/HelpArticle';
import Link from 'next/link';

export default function QuickStartGuide() {
  return (
    <HelpArticle
      title="Quick Start Guide"
      description="Get up and running with ProofLayer in 5 minutes"
      category="Getting Started"
      lastUpdated="January 2026"
    >
      <p className="text-lg text-gray-700 mb-6">
        Welcome to ProofLayer! This guide will walk you through collecting your first testimonial in just a few minutes.
      </p>

      <Section title="Step-by-Step Setup">
        <Step number={1} title="Create Your Account">
          <p className="mb-2">
            Sign up at <Link href="/" className="text-blue-600 hover:underline">prooflayer.com</Link> using your email or Google account.
          </p>
          <p>
            You'll automatically start on our <strong>Free Trial</strong> with access to all features for 14 days.
          </p>
        </Step>

        <Step number={2} title="Create Your First Workspace">
          <p className="mb-3">
            A workspace is like a folder for organizing testimonials by brand, product, or client.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Click <strong>"Create Workspace"</strong> from your dashboard</li>
            <li>Enter your workspace name (e.g., "Acme Corp")</li>
            <li><strong>(Optional)</strong> Upload your logo to brand your forms</li>
            <li>Choose your logo shape: Rectangle, Square, or Circle</li>
            <li>Click <strong>"Create Workspace"</strong></li>
          </ul>
          <Tip>
            <strong>Pro tip:</strong> You can create multiple workspaces to manage testimonials for different brands or projects separately.
          </Tip>
        </Step>

        <Step number={3} title="Create Your Testimonial Form">
          <p className="mb-3">
            After creating your workspace, you'll automatically be guided to create your first form.
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Form Basics:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Give your form a name (e.g., "Customer Feedback")</li>
                <li>Customize the header title and welcome message</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Branding & Colors:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Your workspace logo appears automatically</li>
                <li><strong>Pro/Agency plans:</strong> Customize colors to match your brand</li>
                <li>Choose background, text, and accent colors</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Collection Preferences:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Toggle what info to collect: Email, Company, Role, Social Links</li>
                <li>Enable/disable star ratings</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Submission Types:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Text:</strong> Written testimonials</li>
                <li><strong>Video:</strong> Record or upload video testimonials</li>
                <li><strong>Screenshot:</strong> Upload social proof from Twitter, LinkedIn, etc.</li>
              </ul>
            </div>
          </div>
        </Step>

        <Step number={4} title="Share Your Form">
          <p className="mb-3">
            Once your form is created, you'll see your unique form link:
          </p>
          <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mb-3">
            https://prooflayer.com/f/your-form-slug
          </div>
          <p className="mb-3">Share this link with your customers via:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Email:</strong> Send directly to happy customers</li>
            <li><strong>Social Media:</strong> Post on Twitter, LinkedIn, Facebook</li>
            <li><strong>Website:</strong> Add to your thank-you page or footer</li>
            <li><strong>QR Code:</strong> Print on marketing materials</li>
          </ul>
        </Step>

        <Step number={5} title="Manage Submissions">
          <p className="mb-3">
            When customers submit testimonials, you'll see them in your dashboard:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>All submissions start as <strong>"Pending"</strong></li>
            <li>Review each submission for quality and authenticity</li>
            <li>Click <strong>"Approve"</strong> to make it public</li>
            <li>Click <strong>"Reject"</strong> to hide inappropriate content</li>
            <li>Approved testimonials appear on your Wall of Love and widgets</li>
          </ul>
        </Step>

        <Step number={6} title="Display Your Testimonials">
          <p className="mb-3">
            Now showcase your testimonials to the world:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Option 1: Wall of Love (Public Page)</h4>
              <p className="text-gray-700 mb-2">
                Every workspace gets a beautiful public page to showcase all approved testimonials:
              </p>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mb-2">
                https://prooflayer.com/w/your-workspace-slug
              </div>
              <p className="text-gray-700">
                Perfect for sharing on social media or with potential customers!
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Option 2: Embed Widgets</h4>
              <p className="text-gray-700 mb-2">
                Create customizable widgets to embed on your website:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Go to <strong>Widgets</strong> in your dashboard</li>
                <li>Click <strong>"Create Widget"</strong></li>
                <li>Choose your layout: Grid, Marquee, Masonry, or Spotlight</li>
                <li>Customize styling to match your site</li>
                <li>Copy the embed code and paste into your website</li>
              </ul>
            </div>
          </div>
        </Step>
      </Section>

      <Section title="What's Next?">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/help/forms/customization" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <h3 className="font-semibold text-blue-900 mb-1">Customize Your Forms</h3>
            <p className="text-sm text-blue-700">Learn advanced form customization options</p>
          </Link>

          <Link href="/help/widgets/creating" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <h3 className="font-semibold text-purple-900 mb-1">Create Widgets</h3>
            <p className="text-sm text-purple-700">Embed testimonials on your website</p>
          </Link>

          <Link href="/help/submissions/managing" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <h3 className="font-semibold text-green-900 mb-1">Manage Submissions</h3>
            <p className="text-sm text-green-700">Moderate and organize testimonials</p>
          </Link>

          <Link href="/help/billing/plan-comparison" className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <h3 className="font-semibold text-orange-900 mb-1">Choose Your Plan</h3>
            <p className="text-sm text-orange-700">Compare features and upgrade</p>
          </Link>
        </div>
      </Section>

      <Tip>
        <p className="font-semibold mb-1">Need help?</p>
        <p>
          Our support team is here to help! Email us at <a href="mailto:support@prooflayer.com" className="underline">support@prooflayer.com</a> or use the Help menu in your dashboard.
        </p>
      </Tip>
    </HelpArticle>
  );
}
