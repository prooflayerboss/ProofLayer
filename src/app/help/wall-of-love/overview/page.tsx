import HelpArticle, { Section, Step, Tip, CodeBlock } from '@/components/HelpArticle';
import Link from 'next/link';

export default function WallOfLoveOverview() {
  return (
    <HelpArticle
      title="Wall of Love: Your Public Testimonials Page"
      description="Everything you need to know about ProofLayer's Wall of Love feature"
      category="Wall of Love"
      lastUpdated="January 2026"
    >
      <p className="text-lg text-gray-700 mb-6">
        Your Wall of Love is a beautiful, shareable public page that showcases all your approved testimonials in one place.
        It's automatically generated for every workspace and provides a powerful way to display social proof to prospects,
        clients, and the world. This guide covers everything from understanding the feature to maximizing its impact.
      </p>

      <Section title="What is a Wall of Love?">
        <p className="text-gray-700 mb-4">
          A Wall of Love is a dedicated public webpage that displays all your workspace's approved testimonials in a visually
          appealing, organized layout. Think of it as a living portfolio of customer feedback that updates automatically
          as you approve new testimonials.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">Key Characteristics:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Automatically Generated:</strong> Created instantly when you create a workspace</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Always Up-to-Date:</strong> Shows approved testimonials in real-time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Fully Responsive:</strong> Perfect on mobile, tablet, and desktop</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>SEO-Optimized:</strong> Indexed by search engines for organic visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Shareable:</strong> Unique URL you can share anywhere</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>No Maintenance:</strong> Updates automatically, zero effort required</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          https://prooflayer.com/w/your-workspace-slug
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Each workspace gets its own unique Wall of Love URL based on your workspace name.
        </p>
      </Section>

      <Section title="How the Wall of Love Works">
        <Step number={1} title="Automatic Creation">
          <p className="mb-3">
            When you create a new workspace in ProofLayer, a Wall of Love page is automatically generated:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Unique URL is created based on your workspace name slug</li>
            <li>Page is immediately accessible (though empty until you approve testimonials)</li>
            <li>Default branding uses your workspace logo and settings</li>
          </ul>
        </Step>

        <Step number={2} title="Automatic Updates">
          <p className="mb-3">
            Your Wall of Love stays current without any manual work:
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">What Updates Automatically:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>New approved testimonials appear instantly</li>
              <li>Rejected or deleted testimonials are removed immediately</li>
              <li>Edited testimonials reflect changes in real-time</li>
              <li>Customer information updates if you modify it</li>
              <li>Branding changes (logo, colors) apply immediately</li>
            </ul>
          </div>
        </Step>

        <Step number={3} title="Content Display">
          <p className="mb-3">
            The Wall of Love shows all your approved testimonials with beautiful formatting:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="border border-gray-200 p-3 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Text Testimonials</h4>
              <p className="text-gray-700">
                Displayed in clean cards with customer name, company, star rating, and full testimonial text.
              </p>
            </div>
            <div className="border border-gray-200 p-3 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Video Testimonials</h4>
              <p className="text-gray-700">
                Embedded video players with thumbnails. Visitors can play videos directly on the page.
              </p>
            </div>
            <div className="border border-gray-200 p-3 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Screenshot Testimonials</h4>
              <p className="text-gray-700">
                High-quality images displayed inline within the testimonial card.
              </p>
            </div>
          </div>
        </Step>

        <Step number={4} title="Visitor Experience">
          <p className="mb-3">
            When someone visits your Wall of Love, they can:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Browse all testimonials</strong> in a beautiful responsive grid layout</li>
            <li><strong>Watch videos</strong> directly on the page with built-in video player</li>
            <li><strong>View screenshots</strong> displayed inline with testimonials</li>
            <li><strong>See star ratings</strong> displayed prominently on each testimonial</li>
            <li><strong>View customer details</strong> including name, role, and company</li>
          </ul>
        </Step>
      </Section>

      <Section title="Customizing Your Wall of Love">
        <Step number={1} title="Access Customization Settings">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Go to your workspace dashboard</li>
            <li>Click <strong>"Wall of Love"</strong> in the sidebar</li>
            <li>Click <strong>"Customize"</strong> button</li>
          </ol>
        </Step>

        <Step number={2} title="Set Page Headline and Description">
          <p className="mb-3">
            Customize the text that appears at the top of your Wall of Love:
          </p>
          <div className="space-y-4">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Headline</h4>
              <p className="text-sm text-gray-700 mb-3">
                Main heading that greets visitors. Make it engaging and contextual.
              </p>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Examples:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>"Loved by Thousands of Happy Customers"</li>
                  <li>"See What Our Customers Are Saying"</li>
                  <li>"Real Stories from Real People"</li>
                  <li>"Join 10,000+ Satisfied Customers"</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-sm text-gray-700 mb-3">
                Brief text below the headline providing context or a call-to-action.
              </p>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Example:</p>
                <p className="text-sm text-gray-700 italic">
                  "Don't just take our word for it. Here's what real customers have to say about their experience with
                  [Your Product]. Browse testimonials, watch video reviews, and see why businesses trust us."
                </p>
              </div>
            </div>
          </div>
        </Step>

        <Step number={3} title="Upload or Update Logo">
          <p className="mb-3">
            Your workspace logo appears at the top of the Wall of Love:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-sm">
            <li>Upload a new logo or change the existing one</li>
            <li>Choose logo shape (rectangle, square, circle)</li>
            <li>Logo links back to your website (optional)</li>
          </ul>
          <Tip>
            Make your logo clickable by adding your website URL in the Wall of Love settings. This turns social proof
            into a conversion opportunity.
          </Tip>
        </Step>

        <Step number={4} title="Customize Colors (Pro/Agency Plans)">
          <p className="mb-3">
            Pro and Agency plans can customize the color scheme:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Available Color Options:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Background color</li>
                <li>Text color</li>
                <li>Accent/link color</li>
                <li>Card background color</li>
                <li>Star rating color</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-semibold text-purple-900 mb-2">Design Tips:</p>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>Match your website's color scheme</li>
                <li>Ensure good contrast for readability</li>
                <li>Use your brand colors consistently</li>
                <li>Test on mobile devices</li>
              </ul>
            </div>
          </div>
        </Step>

        <Step number={5} title="Set Default Layout">
          <p className="mb-3">
            Choose how testimonials are arranged:
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-3">
              <p className="font-semibold text-gray-900">Masonry (Default)</p>
              <p className="text-gray-700">Pinterest-style layout, great for varying lengths</p>
            </div>
            <div className="border-l-4 border-purple-500 bg-purple-50 p-3">
              <p className="font-semibold text-gray-900">Grid</p>
              <p className="text-gray-700">Uniform rows and columns, clean and organized</p>
            </div>
          </div>
        </Step>

        <Step number={6} title="Configure SEO Settings">
          <p className="mb-3">
            Optimize your Wall of Love for search engines:
          </p>
          <div className="border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">SEO Customization:</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <strong className="text-gray-900">Page Title:</strong>
                <p className="text-gray-700">Custom title tag for search results (60 characters max)</p>
                <input type="text" placeholder="Customer Testimonials | Your Company" className="w-full border rounded px-2 py-1 mt-1 text-xs" />
              </li>
              <li>
                <strong className="text-gray-900">Meta Description:</strong>
                <p className="text-gray-700">Brief description for search results (160 characters max)</p>
                <textarea placeholder="See what our customers have to say..." className="w-full border rounded px-2 py-1 mt-1 text-xs" rows={2}></textarea>
              </li>
              <li>
                <strong className="text-gray-900">Custom Slug:</strong>
                <p className="text-gray-700">Change the URL path (use with caution - breaks old links)</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-500 text-xs">prooflayer.com/w/</span>
                  <input type="text" defaultValue="your-company" className="border rounded px-2 py-1 text-xs" />
                </div>
              </li>
            </ul>
          </div>
        </Step>
      </Section>

      <Section title="Sharing Your Wall of Love">
        <p className="text-gray-700 mb-4">
          Your Wall of Love is a powerful marketing asset. Here are effective ways to share it:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
            <h4 className="font-bold text-blue-900 mb-2">Social Media</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li><strong>Twitter/X:</strong> Pin to profile, share in bio</li>
              <li><strong>LinkedIn:</strong> Add to featured section, company page</li>
              <li><strong>Instagram:</strong> Link in bio, story highlights</li>
              <li><strong>Facebook:</strong> Pin post with link</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
            <h4 className="font-bold text-purple-900 mb-2">Website Integration</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Add link to main navigation menu</li>
              <li>Include in footer under "Testimonials"</li>
              <li>Link from homepage CTA</li>
              <li>Add to about/team page</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4">
            <h4 className="font-bold text-green-900 mb-2">Sales & Marketing</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Include in email signatures</li>
              <li>Add to sales presentations</li>
              <li>Link in proposals and quotes</li>
              <li>Feature in email newsletters</li>
            </ul>
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
            <h4 className="font-bold text-orange-900 mb-2">Offline Marketing</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Create QR code for business cards</li>
              <li>Add to printed brochures</li>
              <li>Include on product packaging</li>
              <li>Display at trade show booths</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 rounded-lg mt-4">
          <h4 className="font-bold mb-2">Generate a QR Code</h4>
          <p className="text-blue-100 text-sm mb-3">
            ProofLayer can generate a QR code for your Wall of Love for easy offline sharing:
          </p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-semibold hover:bg-blue-50 transition-colors">
            Generate QR Code
          </button>
        </div>
      </Section>

      <Section title="SEO Benefits of Wall of Love">
        <p className="text-gray-700 mb-4">
          Your Wall of Love isn't just a marketing tool - it's also an SEO asset that can help your business rank higher
          in search results.
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
            <h4 className="font-bold text-blue-900 mb-2">Fresh, Unique Content</h4>
            <p className="text-sm text-gray-700">
              Every new testimonial adds unique content to your Wall of Love, signaling to search engines that your site
              is active and relevant. Google loves fresh content!
            </p>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
            <h4 className="font-bold text-purple-900 mb-2">Long-Tail Keywords</h4>
            <p className="text-sm text-gray-700">
              Customer testimonials naturally include long-tail keywords and phrases that prospects search for. For example,
              "best CRM for small businesses" or "email marketing tool that's easy to use."
            </p>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4">
            <h4 className="font-bold text-green-900 mb-2">Social Proof Signals</h4>
            <p className="text-sm text-gray-700">
              Search engines recognize social proof indicators (ratings, reviews, testimonials) as trust signals,
              potentially improving your rankings for brand-related searches.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
            <h4 className="font-bold text-orange-900 mb-2">Increased Dwell Time</h4>
            <p className="text-sm text-gray-700">
              Visitors spend more time on pages with testimonials, especially video testimonials. Higher dwell time
              is a positive ranking signal for search engines.
            </p>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-4">
            <h4 className="font-bold text-red-900 mb-2">Structured Data (Schema)</h4>
            <p className="text-sm text-gray-700">
              ProofLayer automatically adds schema markup to your Wall of Love, helping search engines understand
              and potentially display your testimonials in rich snippets.
            </p>
          </div>
        </div>

        <Tip>
          <strong>SEO Pro Tip:</strong> Regularly share your Wall of Love URL on social media and in blog posts to build
          backlinks. More links pointing to your Wall of Love = better SEO for your entire domain.
        </Tip>
      </Section>

      <Section title="Common Use Cases">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-5 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">Agency Portfolio</h4>
            <p className="text-sm text-gray-700 mb-3">
              Create separate workspaces for each client, giving each their own Wall of Love. Share client-specific
              walls in proposals to demonstrate results.
            </p>
            <p className="text-xs text-gray-600 italic">
              "Check out what our healthcare clients are saying: [Wall of Love link]"
            </p>
          </div>

          <div className="bg-purple-50 p-5 rounded-lg">
            <h4 className="font-bold text-purple-900 mb-2">SaaS Social Proof Hub</h4>
            <p className="text-sm text-gray-700 mb-3">
              Link to your Wall of Love from your pricing page, homepage, and navigation. Make it a destination
              for prospects researching your product.
            </p>
            <p className="text-xs text-gray-600 italic">
              "See 500+ testimonials from happy customers →"
            </p>
          </div>

          <div className="bg-green-50 p-5 rounded-lg">
            <h4 className="font-bold text-green-900 mb-2">Freelancer Credibility</h4>
            <p className="text-sm text-gray-700 mb-3">
              Use your Wall of Love as your testimonials page. Link to it from LinkedIn, portfolios, and
              proposals. Update automatically as you complete projects.
            </p>
            <p className="text-xs text-gray-600 italic">
              "View my client testimonials: [Wall of Love link]"
            </p>
          </div>

          <div className="bg-orange-50 p-5 rounded-lg">
            <h4 className="font-bold text-orange-900 mb-2">E-commerce Trust Builder</h4>
            <p className="text-sm text-gray-700 mb-3">
              Share your Wall of Love in abandoned cart emails, post-purchase follow-ups, and customer
              service responses to showcase happy customers.
            </p>
            <p className="text-xs text-gray-600 italic">
              "Still deciding? See what 1,000+ customers say →"
            </p>
          </div>

          <div className="bg-pink-50 p-5 rounded-lg">
            <h4 className="font-bold text-pink-900 mb-2">Course Creator Authority</h4>
            <p className="text-sm text-gray-700 mb-3">
              Feature your Wall of Love prominently on your sales page. Video testimonials from successful
              students are incredibly powerful for course sales.
            </p>
            <p className="text-xs text-gray-600 italic">
              "Watch real student success stories →"
            </p>
          </div>

          <div className="bg-indigo-50 p-5 rounded-lg">
            <h4 className="font-bold text-indigo-900 mb-2">Event/Conference Showcase</h4>
            <p className="text-sm text-gray-700 mb-3">
              Collect attendee feedback after your event and display it on your Wall of Love for next year's
              marketing. Perfect for recurring conferences.
            </p>
            <p className="text-xs text-gray-600 italic">
              "What attendees said about ConferenceX 2025 →"
            </p>
          </div>
        </div>
      </Section>

      <Section title="Analytics and Insights">
        <p className="text-gray-700 mb-4">
          Track how your Wall of Love is performing:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h4 className="font-semibold text-gray-900 mb-3">Available Metrics (Pro/Agency Plans):</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-900 mb-1">Traffic Metrics:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Total page views</li>
                <li>Unique visitors</li>
                <li>Traffic sources</li>
                <li>Geographic distribution</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Engagement Metrics:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Average time on page</li>
                <li>Video play rates</li>
                <li>Filter usage</li>
                <li>Social shares</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Conversion Tracking:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Click-through rate (if CTA added)</li>
                <li>Testimonials viewed per session</li>
                <li>Most viewed testimonials</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Advanced Customization">
        <div className="space-y-4">
          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Custom Domain (Agency Plan)</h3>
            <p className="text-gray-700 mb-3">
              Host your Wall of Love on your own domain for seamless branding:
            </p>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <p className="text-gray-600 mb-1">Instead of:</p>
              <p className="font-mono text-gray-900 mb-3">prooflayer.com/w/your-company</p>
              <p className="text-gray-600 mb-1">Use:</p>
              <p className="font-mono text-gray-900">testimonials.yourcompany.com</p>
            </div>
          </div>

          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Add Call-to-Action Button</h3>
            <p className="text-gray-700 mb-3">
              Add a prominent CTA button at the top of your Wall of Love:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>"Start Free Trial"</li>
              <li>"Request a Demo"</li>
              <li>"View Pricing"</li>
              <li>"Contact Sales"</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">
              Track clicks to measure how effectively your testimonials drive conversions.
            </p>
          </div>

          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Custom CSS Styling</h3>
            <p className="text-gray-700 mb-3">
              Advanced users can inject custom CSS to match your exact brand:
            </p>
            <CodeBlock>
{`/* Example custom CSS */
.wall-of-love-container {
  font-family: 'Your Brand Font', sans-serif;
}

.testimonial-card {
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Your Wall of Love is Ready!</h2>
        <p className="text-blue-100 mb-6">
          Every workspace comes with a beautiful Wall of Love automatically. Start collecting testimonials today
          and watch your social proof library grow.
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard/workspaces"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            View Your Wall of Love
          </Link>
          <Link
            href="/help/billing/plan-comparison"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Upgrade for More Features
          </Link>
        </div>
      </div>
    </HelpArticle>
  );
}
