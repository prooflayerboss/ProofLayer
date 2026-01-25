import HelpArticle, { Section, Step, Tip, Warning } from '@/components/HelpArticle';
import Link from 'next/link';

export default function CreatingWorkspace() {
  return (
    <HelpArticle
      title="Creating Your First Workspace"
      description="A comprehensive guide to setting up and managing workspaces in ProofLayer"
      category="Workspaces"
      lastUpdated="January 2026"
    >
      <p className="text-lg text-gray-700 mb-6">
        Workspaces are the foundation of your ProofLayer organization. They help you keep testimonials organized by brand, product,
        client, or project. This guide will walk you through everything you need to know about creating and managing workspaces effectively.
      </p>

      <Section title="Understanding Workspaces">
        <p className="text-gray-700 mb-4">
          Think of a workspace as a container for all testimonial-related activities for a specific brand or project. Each workspace includes:
        </p>

        <div className="bg-blue-50 p-6 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">What's Inside a Workspace:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <strong>Collection Forms:</strong> Unlimited customizable forms for gathering testimonials
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <div>
                <strong>Submissions:</strong> All testimonials submitted through your workspace forms
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <div>
                <strong>Display Widgets:</strong> Embeddable widgets that pull from your workspace testimonials
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <div>
                <strong>Wall of Love:</strong> A public page showcasing all approved testimonials from the workspace
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <div>
                <strong>Branding:</strong> Logo, colors, and customization settings unique to this workspace
              </div>
            </li>
          </ul>
        </div>

        <Tip>
          <strong>Workspace Isolation:</strong> Forms, submissions, and widgets in one workspace are completely separate from others.
          This makes it easy to manage multiple brands or clients without mixing testimonials.
        </Tip>
      </Section>

      <Section title="Step-by-Step: Creating a Workspace">
        <Step number={1} title="Navigate to Workspace Creation">
          <p className="mb-3">
            From your ProofLayer dashboard, click the <strong>"Create Workspace"</strong> button. This is typically located:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>On the main dashboard if you have no workspaces yet</li>
            <li>In the sidebar navigation under "Workspaces"</li>
            <li>As a dropdown option from the workspace switcher in the top navigation</li>
          </ul>
          <p className="mt-3 text-gray-700">
            You'll be taken to a clean, intuitive workspace creation form designed to get you up and running quickly.
          </p>
        </Step>

        <Step number={2} title="Choose Your Workspace Name">
          <p className="mb-3">
            The workspace name is how you'll identify this workspace in your dashboard. It's also used in your Wall of Love page title
            and can appear in forms if you choose.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-900 mb-3">Naming Best Practices:</h4>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900 mb-1">For Personal Brands:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-sm">
                  <li>Use your company or product name (e.g., "Acme Software")</li>
                  <li>Keep it professional and recognizable to customers</li>
                  <li>Avoid abbreviations that customers might not understand</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-1">For Agencies Managing Multiple Clients:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-sm">
                  <li>Use the client's brand name (e.g., "Client: Tesla Motors")</li>
                  <li>Consider adding project identifiers (e.g., "Nike - Summer Campaign 2026")</li>
                  <li>Use consistent naming conventions across all client workspaces</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-1">For Multi-Product Companies:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-sm">
                  <li>Separate by product line (e.g., "Acme CRM" vs. "Acme Email")</li>
                  <li>Create workspace hierarchies in your naming (e.g., "Acme - Product A")</li>
                  <li>Consider creating separate workspaces for B2B vs. B2C products</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Examples of Good Workspace Names:</h4>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>"ProofLayer" - Clear, professional brand name</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>"Client: Blue Sky Marketing" - Agency workspace with client identifier</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>"Acme CRM Platform" - Product-specific workspace</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✗</span>
                <span>"Test123" - Not professional, hard to identify</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✗</span>
                <span>"ws_001" - Too technical, no context</span>
              </li>
            </ul>
          </div>

          <Warning>
            While you can change your workspace name later, it's best to choose carefully from the start. The workspace name affects
            your Wall of Love URL slug, which you might share publicly.
          </Warning>
        </Step>

        <Step number={3} title="Upload Your Logo (Optional but Recommended)">
          <p className="mb-3">
            Adding a logo makes your collection forms and Wall of Love page instantly recognizable and professional. Your logo:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Appears at the top of all testimonial collection forms in this workspace</li>
            <li>Displays on your Wall of Love page</li>
            <li>Shows in email notifications sent from this workspace</li>
            <li>Helps maintain brand consistency across all customer touchpoints</li>
          </ul>

          <div className="bg-blue-50 p-5 rounded-lg my-4">
            <h4 className="font-semibold text-gray-900 mb-3">Logo Requirements & Best Practices:</h4>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-medium mb-1">Accepted Formats:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>PNG (recommended for logos with transparency)</li>
                  <li>JPG/JPEG</li>
                  <li>SVG (recommended for perfect scaling)</li>
                  <li>WebP</li>
                </ul>
              </div>

              <div>
                <p className="font-medium mb-1">Size Recommendations:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>Minimum: 200 x 200 pixels</li>
                  <li>Recommended: 500 x 500 pixels or larger</li>
                  <li>Maximum file size: 5 MB</li>
                  <li>For best results, use a square aspect ratio</li>
                </ul>
              </div>

              <div>
                <p className="font-medium mb-1">Design Tips:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>Use transparent backgrounds (PNG) for non-rectangular logos</li>
                  <li>Ensure good contrast - logo should be visible on light backgrounds</li>
                  <li>Test readability at small sizes (will be displayed around 80-120px)</li>
                  <li>Avoid logos with fine text or intricate details that might blur</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-3">
            To upload your logo, click the <strong>"Upload Logo"</strong> area or drag and drop your image file. You'll see a preview
            immediately to confirm it looks good.
          </p>

          <Tip>
            <strong>No logo yet?</strong> You can skip this step and add a logo later from your workspace settings. However, adding
            a logo from the start creates a more professional first impression when you share your form.
          </Tip>
        </Step>

        <Step number={4} title="Select Your Logo Shape">
          <p className="mb-3">
            ProofLayer lets you choose how your logo is displayed to match your brand aesthetic. You have three options:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="border-2 border-blue-500 bg-blue-50 p-4 rounded-lg">
              <div className="w-24 h-24 bg-white rounded-none mx-auto mb-3 flex items-center justify-center border border-gray-200">
                <span className="text-xs text-gray-500">LOGO</span>
              </div>
              <h4 className="font-bold text-gray-900 text-center mb-2">Rectangle</h4>
              <p className="text-sm text-gray-700">
                Best for horizontal or wide logos. Displays the full width of your logo without cropping. Ideal for wordmarks or
                logos with text beside icons.
              </p>
            </div>

            <div className="border-2 border-purple-500 bg-purple-50 p-4 rounded-lg">
              <div className="w-24 h-24 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center border border-gray-200">
                <span className="text-xs text-gray-500">LOGO</span>
              </div>
              <h4 className="font-bold text-gray-900 text-center mb-2">Square</h4>
              <p className="text-sm text-gray-700">
                Balanced option with slightly rounded corners. Works well for most logo types. Creates a modern, clean appearance
                that fits most design styles.
              </p>
            </div>

            <div className="border-2 border-pink-500 bg-pink-50 p-4 rounded-lg">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-3 flex items-center justify-center border border-gray-200">
                <span className="text-xs text-gray-500">LOGO</span>
              </div>
              <h4 className="font-bold text-gray-900 text-center mb-2">Circle</h4>
              <p className="text-sm text-gray-700">
                Perfect for icon-based logos, profile images, or brand marks. Creates a friendly, approachable feel. Note: logos
                will be center-cropped if not square.
              </p>
            </div>
          </div>

          <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 my-4">
            <p className="font-semibold text-yellow-900 mb-2">Choosing the Right Shape:</p>
            <ul className="space-y-1 text-yellow-900 text-sm">
              <li><strong>Rectangle:</strong> Company names, horizontal logos, wordmarks</li>
              <li><strong>Square:</strong> Most versatile, works with nearly any logo design</li>
              <li><strong>Circle:</strong> Single letters, icons, avatars, minimalist marks</li>
            </ul>
          </div>

          <p className="text-gray-700">
            Don't worry - you can change this setting anytime from your workspace settings if you want to experiment with different looks.
          </p>
        </Step>

        <Step number={5} title="Configure Advanced Settings (Optional)">
          <p className="mb-3">
            Depending on your plan, you may have access to additional workspace customization options:
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Brand Colors (Pro/Agency Plans)</h4>
              <p className="text-gray-700 text-sm mb-2">
                Customize the color scheme for forms and widgets in this workspace:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                <li><strong>Primary Color:</strong> Used for buttons, links, and accents</li>
                <li><strong>Background Color:</strong> Main background for forms and widgets</li>
                <li><strong>Text Color:</strong> Primary text color throughout</li>
              </ul>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Default Form Settings</h4>
              <p className="text-gray-700 text-sm mb-2">
                Set defaults that apply to all new forms in this workspace:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                <li>Enable/disable star ratings by default</li>
                <li>Choose which customer fields to collect</li>
                <li>Set default submission types (text, video, screenshot)</li>
              </ul>
            </div>
          </div>
        </Step>

        <Step number={6} title="Create Your Workspace">
          <p className="mb-3">
            Once you've configured everything, click the <strong>"Create Workspace"</strong> button at the bottom of the form.
            ProofLayer will:
          </p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-lg">
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Create your workspace with all your settings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Generate a unique workspace slug for your Wall of Love URL</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>Initialize your Wall of Love page (accessible immediately)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <span>Redirect you to your workspace dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <span>Prompt you to create your first collection form</span>
              </li>
            </ol>
          </div>

          <p className="mt-3 text-gray-700">
            The entire process takes less than 2 minutes! You'll immediately see your new workspace in the workspace switcher.
          </p>
        </Step>

        <Step number={7} title="Access Your Wall of Love URL">
          <p className="mb-3">
            After creating your workspace, you'll receive a unique Wall of Love URL that looks like:
          </p>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-3">
            https://prooflayer.com/w/your-workspace-slug
          </div>

          <p className="mb-3 text-gray-700">
            This URL is public and shareable immediately, though it will be empty until you collect and approve testimonials.
            You can find it anytime by:
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Going to your workspace dashboard and clicking "View Wall of Love"</li>
            <li>Clicking the share icon next to your workspace name</li>
            <li>From the workspace settings page</li>
          </ul>
        </Step>

        <Step number={8} title="Create Your First Form">
          <p className="mb-3">
            After workspace creation, you'll be guided to create your first testimonial collection form. This is where you'll start
            gathering customer feedback. The form creation wizard makes this process simple and intuitive.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-900 mb-2">What happens next:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm ml-4">
              <li>You'll be taken to the form creation page</li>
              <li>Your workspace logo and branding will be pre-populated</li>
              <li>You can customize the form message and questions</li>
              <li>Once created, you'll get a shareable form link to send to customers</li>
            </ul>
          </div>

          <p className="mt-3">
            For detailed form creation instructions, see our <Link href="/help/forms/creating-form" className="text-blue-600 hover:underline">Creating Forms Guide</Link>.
          </p>
        </Step>
      </Section>

      <Section title="Managing Multiple Workspaces">
        <p className="text-gray-700 mb-4">
          As your needs grow, you might create multiple workspaces. Here's how to manage them effectively:
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">Switching Between Workspaces</h4>
            <p className="text-gray-700 mb-2">
              Use the workspace switcher in the top navigation bar of your dashboard. It shows:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
              <li>All your workspaces with their logos</li>
              <li>Number of pending submissions in each workspace</li>
              <li>Quick access to create a new workspace</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">Workspace Limits by Plan</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700"><strong>Trial:</strong></span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-900">1 workspace</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700"><strong>Solo Plan ($59 one-time):</strong></span>
                <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-900">1 workspace</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700"><strong>Pro Plan ($118 one-time):</strong></span>
                <span className="bg-purple-100 px-3 py-1 rounded-full text-purple-900">3 workspaces</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700"><strong>Agency Plan ($177 one-time):</strong></span>
                <span className="bg-green-100 px-3 py-1 rounded-full text-green-900">10 workspaces</span>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">Organizing Workspaces</h4>
            <p className="text-gray-700 mb-2">
              Best practices for keeping multiple workspaces organized:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
              <li>Use consistent naming conventions (e.g., "Client: [Name]" for agencies)</li>
              <li>Upload distinct logos to make workspaces visually identifiable</li>
              <li>Archive or delete old workspaces you no longer use</li>
              <li>Set default workspaces for frequently accessed projects</li>
            </ul>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">Editing Workspace Settings</h4>
            <p className="text-gray-700 mb-2">
              You can modify workspace settings anytime:
            </p>
            <ol className="space-y-1 text-gray-700 text-sm ml-4">
              <li>1. Navigate to the workspace you want to edit</li>
              <li>2. Click "Settings" in the workspace dashboard</li>
              <li>3. Update name, logo, colors, or other settings</li>
              <li>4. Click "Save Changes"</li>
            </ol>
            <p className="text-sm text-gray-600 mt-2">
              Changes apply immediately to all forms and widgets in that workspace.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Common Workspace Use Cases">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-5 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">Single Brand, Multiple Products</h4>
            <p className="text-sm text-gray-700 mb-2">
              Create one workspace for your company, then use multiple forms within it to collect product-specific feedback.
            </p>
            <p className="text-xs text-gray-600">
              Example: "Acme Corp" workspace with forms for "CRM Product", "Email Tool", and "Analytics Platform"
            </p>
          </div>

          <div className="bg-purple-50 p-5 rounded-lg">
            <h4 className="font-bold text-purple-900 mb-2">Agency with Multiple Clients</h4>
            <p className="text-sm text-gray-700 mb-2">
              Create separate workspaces for each client to keep testimonials isolated and branded appropriately.
            </p>
            <p className="text-xs text-gray-600">
              Example: "Client: Tesla", "Client: Apple", "Client: Nike" - each with their own branding
            </p>
          </div>

          <div className="bg-green-50 p-5 rounded-lg">
            <h4 className="font-bold text-green-900 mb-2">Personal Brand + Side Projects</h4>
            <p className="text-sm text-gray-700 mb-2">
              Separate your consulting testimonials from your course or product testimonials for targeted social proof.
            </p>
            <p className="text-xs text-gray-600">
              Example: "John Doe Consulting" and "John's Design Course" as separate workspaces
            </p>
          </div>

          <div className="bg-orange-50 p-5 rounded-lg">
            <h4 className="font-bold text-orange-900 mb-2">Regional or Language-Based</h4>
            <p className="text-sm text-gray-700 mb-2">
              Create workspaces for different markets or languages to tailor messaging and display localized testimonials.
            </p>
            <p className="text-xs text-gray-600">
              Example: "Acme Corp USA", "Acme Corp Europe", "Acme Corp Asia" with region-specific testimonials
            </p>
          </div>
        </div>
      </Section>

      <Section title="Troubleshooting">
        <div className="space-y-3">
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">My logo looks blurry or pixelated</summary>
            <p className="text-gray-700 text-sm mt-2">
              Upload a higher resolution version of your logo (at least 500x500 pixels). PNG or SVG formats work best.
              Avoid uploading small images that need to be scaled up.
            </p>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">I can't create a new workspace</summary>
            <p className="text-gray-700 text-sm mt-2">
              Check if you've reached your plan's workspace limit. Trial and Solo plans include 1 workspace, Pro includes 3,
              and Agency includes 5. Upgrade your plan or delete unused workspaces to create new ones.
            </p>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Can I transfer testimonials between workspaces?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Currently, testimonials cannot be moved between workspaces as each workspace represents a distinct brand or project.
              If you need this feature, contact support to discuss your use case.
            </p>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">How do I delete a workspace?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Go to workspace Settings and scroll to the bottom. Click "Delete Workspace" and confirm. Warning: This permanently
              deletes all forms, submissions, and widgets in that workspace. This action cannot be undone.
            </p>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Can I change my Wall of Love URL?</summary>
            <p className="text-gray-700 text-sm mt-2">
              The workspace slug (used in your Wall of Love URL) is automatically generated from your workspace name. You can
              change it in workspace settings, but be aware that any old links you've shared will break.
            </p>
          </details>
        </div>
      </Section>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Ready to Create Your Workspace?</h2>
        <p className="text-blue-100 mb-6">
          Setting up your workspace is the first step to collecting powerful testimonials. Once created, you'll be ready to
          build forms and start gathering social proof immediately.
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard/workspaces/new"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Create Workspace
          </Link>
          <Link
            href="/help/forms/creating-form"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Next: Create a Form
          </Link>
        </div>
      </div>
    </HelpArticle>
  );
}
