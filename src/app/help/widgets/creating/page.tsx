import HelpArticle, { Section, Step, Tip, Warning, CodeBlock } from '@/components/HelpArticle';
import Link from 'next/link';

export default function CreatingWidgets() {
  return (
    <HelpArticle
      title="Creating Display Widgets"
      description="Transform your testimonials into beautiful, conversion-driving website widgets"
      category="Widgets"
      lastUpdated="January 2026"
    >
      <p className="text-lg text-gray-700 mb-6">
        Widgets are the primary way to display your testimonials on your website. They automatically pull approved testimonials
        from your workspace and present them in beautiful, customizable layouts that match your brand. This guide covers everything
        from choosing the right widget type to advanced customization and embedding.
      </p>

      <Section title="Understanding ProofLayer Widgets">
        <p className="text-gray-700 mb-4">
          A widget is a self-contained component that displays testimonials from your workspace. Widgets are:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Dynamic</h4>
            <p className="text-sm text-gray-700">
              Automatically updates when you approve new testimonials. No need to manually update your website.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Customizable</h4>
            <p className="text-sm text-gray-700">
              Control layout, colors, spacing, borders, shadows, and more to match your site's design perfectly.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Responsive</h4>
            <p className="text-sm text-gray-700">
              Automatically adapts to mobile, tablet, and desktop screens. Looks great on all devices.
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Fast-Loading</h4>
            <p className="text-sm text-gray-700">
              Optimized code and CDN delivery ensure widgets load quickly without slowing down your site.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Widget Types: Choosing the Right Option">
        <p className="text-gray-700 mb-4">
          ProofLayer offers three widget types, each optimized for different use cases and user experiences:
        </p>

        <div className="space-y-6">
          <div className="border-2 border-blue-500 rounded-lg overflow-hidden">
            <div className="bg-blue-500 text-white p-4">
              <h3 className="font-bold text-xl">Embed Widgets</h3>
              <p className="text-blue-100 text-sm">Traditional embedded sections within your page content</p>
            </div>
            <div className="p-5">
              <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4 text-center text-gray-500 text-sm">
                [Your page content above]<br/>
                <div className="bg-blue-100 border-2 border-blue-500 rounded p-2 my-2">
                  TESTIMONIALS WIDGET EMBEDDED HERE
                </div>
                [Your page content below]
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Homepage testimonial sections</li>
                    <li>Dedicated testimonials pages</li>
                    <li>Landing page social proof</li>
                    <li>About or case study pages</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Advantages:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Seamlessly integrated into page flow</li>
                    <li>Always visible (not hidden behind click)</li>
                    <li>Best for SEO (content in page)</li>
                    <li>Full customization control</li>
                  </ul>
                </div>
              </div>

              <Tip>
                <strong>Conversion Tip:</strong> Place embed widgets near pricing tables or CTAs. Studies show testimonials
                positioned above the fold can increase conversions by 15-25%.
              </Tip>
            </div>
          </div>

          <div className="border-2 border-purple-500 rounded-lg overflow-hidden">
            <div className="bg-purple-500 text-white p-4">
              <h3 className="font-bold text-xl">Popup Widgets</h3>
              <p className="text-purple-100 text-sm">Click-triggered overlays that showcase testimonials</p>
            </div>
            <div className="p-5">
              <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4 text-center text-gray-500 text-sm relative">
                <button className="bg-purple-500 text-white px-4 py-2 rounded text-sm">
                  See What Our Customers Say
                </button>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
                  <div className="bg-white p-4 rounded shadow-lg">POPUP CONTENT</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Long-form content pages</li>
                    <li>Blog posts and articles</li>
                    <li>Product pages with limited space</li>
                    <li>Checkout process social proof</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Advantages:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Doesn't interrupt page layout</li>
                    <li>Shows more testimonials at once</li>
                    <li>Creates focused viewing experience</li>
                    <li>Great for mobile optimization</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-3">
                <p className="text-sm text-gray-700">
                  <strong>Customization Options:</strong> Button text, button style, popup size, animation type, close behavior
                </p>
              </div>
            </div>
          </div>

          <div className="border-2 border-pink-500 rounded-lg overflow-hidden">
            <div className="bg-pink-500 text-white p-4">
              <h3 className="font-bold text-xl">Floating Widgets</h3>
              <p className="text-pink-100 text-sm">Persistent buttons that stay visible as users scroll</p>
            </div>
            <div className="p-5">
              <div className="bg-gray-50 border border-gray-200 rounded p-8 mb-4 text-center text-gray-500 text-sm relative">
                [Your page content - user can scroll]
                <div className="absolute bottom-2 right-2 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg text-xs">
                  ⭐ Testimonials
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>SaaS product pages</li>
                    <li>Long sales pages</li>
                    <li>Documentation sites</li>
                    <li>Multi-page funnels</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Advantages:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Always accessible while scrolling</li>
                    <li>Non-intrusive presence</li>
                    <li>High visibility without space cost</li>
                    <li>Can follow user through journey</li>
                  </ul>
                </div>
              </div>

              <div className="bg-pink-50 border-l-4 border-pink-500 p-3">
                <p className="text-sm text-gray-700">
                  <strong>Position Options:</strong> Bottom right, bottom left, top right, top left, custom offset
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Layout Options: Displaying Your Testimonials">
        <p className="text-gray-700 mb-4">
          Choose how testimonials are arranged within your widget. Each layout creates a different visual impact:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-blue-500 rounded-lg p-4">
            <h3 className="font-bold text-blue-900 mb-3">Grid Layout</h3>
            <div className="grid grid-cols-2 gap-2 mb-3 bg-gray-50 p-3 rounded">
              <div className="bg-white border border-gray-300 rounded p-2 text-xs text-center">Card 1</div>
              <div className="bg-white border border-gray-300 rounded p-2 text-xs text-center">Card 2</div>
              <div className="bg-white border border-gray-300 rounded p-2 text-xs text-center">Card 3</div>
              <div className="bg-white border border-gray-300 rounded p-2 text-xs text-center">Card 4</div>
            </div>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><strong>Style:</strong> Clean rows and columns</li>
              <li><strong>Best For:</strong> Equal-importance testimonials</li>
              <li><strong>Columns:</strong> 1-4 columns (responsive)</li>
              <li><strong>Good For:</strong> Traditional layouts, easy scanning</li>
            </ul>
          </div>

          <div className="border border-purple-500 rounded-lg p-4">
            <h3 className="font-bold text-purple-900 mb-3">Marquee Layout</h3>
            <div className="bg-gray-50 p-3 rounded mb-3 overflow-hidden">
              <div className="flex gap-2 animate-pulse">
                <div className="bg-white border border-gray-300 rounded p-2 text-xs flex-shrink-0 w-24">Card 1</div>
                <div className="bg-white border border-gray-300 rounded p-2 text-xs flex-shrink-0 w-24">Card 2</div>
                <div className="bg-white border border-gray-300 rounded p-2 text-xs flex-shrink-0 w-24">Card 3</div>
              </div>
            </div>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><strong>Style:</strong> Smooth horizontal scroll</li>
              <li><strong>Best For:</strong> Showcasing many testimonials</li>
              <li><strong>Options:</strong> Speed, direction, pause on hover</li>
              <li><strong>Good For:</strong> Modern sites, lots of content</li>
            </ul>
          </div>

          <div className="border border-green-500 rounded-lg p-4">
            <h3 className="font-bold text-green-900 mb-3">Masonry Layout</h3>
            <div className="bg-gray-50 p-3 rounded mb-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white border border-gray-300 rounded p-2 text-xs h-16">Short</div>
                <div className="bg-white border border-gray-300 rounded p-2 text-xs h-24">Longer card</div>
                <div className="bg-white border border-gray-300 rounded p-2 text-xs h-20">Medium</div>
                <div className="bg-white border border-gray-300 rounded p-2 text-xs h-16">Short</div>
              </div>
            </div>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><strong>Style:</strong> Pinterest-style staggered cards</li>
              <li><strong>Best For:</strong> Varying testimonial lengths</li>
              <li><strong>Advantage:</strong> No empty space, organic feel</li>
              <li><strong>Good For:</strong> Text testimonials of different sizes</li>
            </ul>
          </div>

          <div className="border border-orange-500 rounded-lg p-4">
            <h3 className="font-bold text-orange-900 mb-3">Spotlight Layout</h3>
            <div className="bg-gray-50 p-3 rounded mb-3 text-center">
              <div className="bg-white border border-gray-300 rounded p-4 text-xs max-w-xs mx-auto">
                Featured Testimonial
              </div>
              <div className="flex gap-1 justify-center mt-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><strong>Style:</strong> Single testimonial with navigation</li>
              <li><strong>Best For:</strong> Highlighting top testimonials</li>
              <li><strong>Controls:</strong> Arrows, dots, auto-advance</li>
              <li><strong>Good For:</strong> Limited space, video testimonials</li>
            </ul>
          </div>
        </div>

        <Tip>
          <strong>Layout Selection Guide:</strong> Grid for professional/corporate sites, Marquee for modern/tech brands,
          Masonry for creative/agency sites, Spotlight for premium/focused conversions.
        </Tip>
      </Section>

      <Section title="Step-by-Step: Creating Your Widget">
        <Step number={1} title="Navigate to Widget Creator">
          <p className="mb-3">
            From your ProofLayer dashboard:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Click <strong>"Widgets"</strong> in the main navigation</li>
            <li>Click <strong>"Create New Widget"</strong> button</li>
            <li>Select the workspace you want to pull testimonials from</li>
          </ul>
          <p className="mt-3 text-gray-700">
            You'll enter the interactive widget configurator with live preview.
          </p>
        </Step>

        <Step number={2} title="Name Your Widget">
          <p className="mb-3">
            Give your widget a descriptive name for internal organization:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-sm">
            <li>"Homepage Hero Section Widget"</li>
            <li>"Pricing Page Social Proof"</li>
            <li>"Product A Landing Page Testimonials"</li>
            <li>"Blog Sidebar Widget"</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600">
            This name is only visible to you in the dashboard, not to site visitors.
          </p>
        </Step>

        <Step number={3} title="Select Widget Type and Layout">
          <p className="mb-3">
            Choose your widget type (Embed, Popup, or Floating) and layout (Grid, Marquee, Masonry, or Spotlight).
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">Popular Combinations:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Embed + Grid:</strong> Classic, professional testimonials section</li>
              <li><strong>Embed + Marquee:</strong> Dynamic, eye-catching social proof strip</li>
              <li><strong>Popup + Masonry:</strong> Show many testimonials without cluttering page</li>
              <li><strong>Floating + Spotlight:</strong> Persistent highlight of best testimonials</li>
            </ul>
          </div>
        </Step>

        <Step number={4} title="Filter and Select Testimonials">
          <p className="mb-3">
            Control which testimonials appear in this widget:
          </p>

          <div className="space-y-3">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">By Status:</h4>
              <div className="flex gap-3 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span>Approved Only (Recommended)</span>
                </label>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Only approved testimonials will be shown. Pending and rejected are excluded.
              </p>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">By Type:</h4>
              <div className="flex flex-wrap gap-3 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span>Text</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span>Video</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span>Screenshot</span>
                </label>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Mix types for variety or focus on one type (e.g., video-only widget for maximum impact).
              </p>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">By Rating:</h4>
              <div className="flex gap-2 text-sm">
                <select className="border rounded px-2 py-1">
                  <option>All Ratings</option>
                  <option>5 Stars Only</option>
                  <option>4+ Stars</option>
                  <option>3+ Stars</option>
                </select>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Show only high-rated testimonials for maximum social proof impact.
              </p>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">By Form:</h4>
              <p className="text-sm text-gray-700 mb-2">
                Pull testimonials from specific forms only (useful if you have product-specific forms).
              </p>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Manual Selection:</h4>
              <p className="text-sm text-gray-700 mb-2">
                Hand-pick specific testimonials to feature (overrides automatic filters).
              </p>
              <p className="text-xs text-gray-600">
                Great for curating your absolute best testimonials on critical pages.
              </p>
            </div>
          </div>
        </Step>

        <Step number={5} title="Customize Appearance">
          <p className="mb-3">
            Make the widget match your website's design. All changes preview in real-time.
          </p>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-3">Color Customization (Pro/Agency Plans):</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Background Color</label>
                  <input type="color" defaultValue="#ffffff" className="w-full h-10 rounded" />
                  <p className="text-xs text-gray-600 mt-1">Widget background</p>
                </div>
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Text Color</label>
                  <input type="color" defaultValue="#111827" className="w-full h-10 rounded" />
                  <p className="text-xs text-gray-600 mt-1">Testimonial text</p>
                </div>
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Accent Color</label>
                  <input type="color" defaultValue="#3b82f6" className="w-full h-10 rounded" />
                  <p className="text-xs text-gray-600 mt-1">Stars, borders, buttons</p>
                </div>
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Card Background</label>
                  <input type="color" defaultValue="#f9fafb" className="w-full h-10 rounded" />
                  <p className="text-xs text-gray-600 mt-1">Individual card backgrounds</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Spacing & Sizing:</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Card Spacing</label>
                  <input type="range" min="0" max="48" defaultValue="16" className="w-full" />
                  <p className="text-xs text-gray-600">Gap between testimonial cards (0-48px)</p>
                </div>
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Card Padding</label>
                  <input type="range" min="8" max="48" defaultValue="24" className="w-full" />
                  <p className="text-xs text-gray-600">Internal card padding (8-48px)</p>
                </div>
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Max Width</label>
                  <input type="number" defaultValue="1200" className="border rounded px-2 py-1" />
                  <p className="text-xs text-gray-600">Maximum widget width in pixels</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Border & Shadow:</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Border Radius</label>
                  <select className="border rounded px-2 py-1 w-full">
                    <option>None (0px)</option>
                    <option>Small (4px)</option>
                    <option>Medium (8px)</option>
                    <option>Large (12px)</option>
                    <option>Extra Large (16px)</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Shadow</label>
                  <select className="border rounded px-2 py-1 w-full">
                    <option>None</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Typography:</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Font Family</label>
                  <select className="border rounded px-2 py-1 w-full">
                    <option>Inherit from website</option>
                    <option>System Font</option>
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium text-gray-900 block mb-1">Font Size</label>
                  <select className="border rounded px-2 py-1 w-full">
                    <option>Small (14px)</option>
                    <option>Medium (16px)</option>
                    <option>Large (18px)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <Warning>
            Ensure text color has sufficient contrast against background for accessibility. Aim for at least 4.5:1 ratio.
          </Warning>
        </Step>

        <Step number={6} title="Configure Display Options">
          <p className="mb-3">
            Fine-tune how testimonials are displayed:
          </p>

          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
              <label className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                <input type="checkbox" checked readOnly />
                Show Star Ratings
              </label>
              <p className="text-sm text-gray-700">Display 1-5 star ratings on testimonial cards</p>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
              <label className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                <input type="checkbox" checked readOnly />
                Show Customer Photos
              </label>
              <p className="text-sm text-gray-700">Display profile images if uploaded by customers</p>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-4">
              <label className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                <input type="checkbox" checked readOnly />
                Show Company Names
              </label>
              <p className="text-sm text-gray-700">Include company/organization with customer name</p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
              <label className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                <input type="checkbox" />
                Show Submission Date
              </label>
              <p className="text-sm text-gray-700">Display when testimonial was submitted (e.g., "2 months ago")</p>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <label className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                <input type="checkbox" checked readOnly />
                Show ProofLayer Badge
              </label>
              <p className="text-sm text-gray-700">
                "Powered by ProofLayer" badge (required on Trial/Solo, removable on Pro/Agency)
              </p>
            </div>
          </div>
        </Step>

        <Step number={7} title="Set Behavior Options">
          <p className="mb-3">
            Control interactive behavior based on layout:
          </p>

          <div className="space-y-3 text-sm">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">For Marquee Layout:</h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-gray-700 mb-1">Scroll Speed</label>
                  <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Slow</span>
                    <span>Fast</span>
                  </div>
                </div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span>Pause on Hover</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Reverse Direction (Right to Left)</span>
                </label>
              </div>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">For Spotlight Layout:</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span>Auto-Advance Slides</span>
                </label>
                <div>
                  <label className="block text-gray-700 mb-1">Slide Duration</label>
                  <select className="border rounded px-2 py-1 w-full">
                    <option>3 seconds</option>
                    <option>5 seconds</option>
                    <option>7 seconds</option>
                    <option>10 seconds</option>
                  </select>
                </div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span>Show Navigation Arrows</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span>Show Dot Indicators</span>
                </label>
              </div>
            </div>
          </div>
        </Step>

        <Step number={8} title="Preview and Generate Embed Code">
          <p className="mb-3">
            Use the live preview to see exactly how your widget will look. Once satisfied:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Click <strong>"Generate Embed Code"</strong></li>
            <li>Copy the provided HTML/JavaScript snippet</li>
            <li>Save your widget configuration</li>
          </ol>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs mt-3 overflow-x-auto">
{`<div id="prooflayer-widget-abc123"></div>
<script src="https://cdn.prooflayer.com/widget.js"></script>
<script>
  ProofLayer.init({
    widgetId: 'abc123',
    container: '#prooflayer-widget-abc123'
  });
</script>`}
          </div>

          <p className="mt-3 text-sm text-gray-600">
            For detailed embedding instructions across different platforms, see our <Link href="/help/widgets/embedding" className="text-blue-600 hover:underline">Widget Embedding Guide</Link>.
          </p>
        </Step>
      </Section>

      <Section title="Widget Best Practices">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-5 rounded-lg">
            <h4 className="font-bold text-green-900 mb-3">Do's:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Test widgets on mobile devices before going live</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Keep 5-10 testimonials minimum for best display</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Match widget colors to your site's design system</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Feature 5-star testimonials on critical pages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Update testimonials regularly to keep content fresh</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 p-5 rounded-lg">
            <h4 className="font-bold text-red-900 mb-3">Don'ts:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Don't show only 1-2 testimonials (looks sparse)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Don't use clashing colors that hurt readability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Don't auto-play video testimonials (annoying)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Don't slow marquee speed too much (boring)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Don't embed too many widgets on one page</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Ready to Add Social Proof to Your Site?</h2>
        <p className="text-blue-100 mb-6">
          Create beautiful, conversion-optimized testimonial widgets in minutes. No coding skills required!
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard/widgets"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Create Your Widget
          </Link>
          <Link
            href="/help/widgets/embedding"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Learn How to Embed
          </Link>
        </div>
      </div>
    </HelpArticle>
  );
}
