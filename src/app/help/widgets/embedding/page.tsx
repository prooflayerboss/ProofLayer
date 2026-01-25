import HelpArticle, { Section, Step, Tip, Warning, CodeBlock } from '@/components/HelpArticle';
import Link from 'next/link';

export default function EmbeddingWidgets() {
  return (
    <HelpArticle
      title="Embedding Widgets on Your Website"
      description="Complete technical guide to integrating ProofLayer widgets across any platform"
      category="Widgets"
      lastUpdated="January 2026"
    >
      <p className="text-lg text-gray-700 mb-6">
        Once you've created your perfect widget, it's time to embed it on your website. This comprehensive guide covers everything
        from basic HTML embedding to platform-specific integrations including WordPress, Webflow, React, and more. Whether you're
        a developer or non-technical user, we've got you covered.
      </p>

      <Section title="Understanding the Embed Code">
        <p className="text-gray-700 mb-4">
          ProofLayer widgets use a simple two-part embed system that works on any website:
        </p>

        <div className="bg-gray-900 text-gray-100 p-5 rounded-lg font-mono text-sm mb-4">
          <div className="mb-3 text-green-400">
            {`<!-- 1. Container div where widget will appear -->`}
          </div>
          <div className="mb-4">
            {`<div id="prooflayer-widget-abc123"></div>`}
          </div>
          <div className="mb-3 text-green-400">
            {`<!-- 2. Script to load and initialize widget -->`}
          </div>
          <div className="mb-2">
            {`<script src="https://cdn.prooflayer.com/widget.js"></script>`}
          </div>
          <div>
{`<script>
  ProofLayer.init({
    widgetId: 'abc123',
    container: '#prooflayer-widget-abc123'
  });
</script>`}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Container DIV</h4>
            <p className="text-sm text-gray-700">
              A placeholder element where the widget will be inserted. The ID must be unique on your page.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Initialization Script</h4>
            <p className="text-sm text-gray-700">
              Loads the widget library and tells it which widget to display and where to put it.
            </p>
          </div>
        </div>

        <Tip>
          <strong>Performance Note:</strong> The widget script is lightweight (~15KB) and loads asynchronously, so it won't
          block your page load or affect Core Web Vitals scores.
        </Tip>
      </Section>

      <Section title="Method 1: Basic HTML/JavaScript Embedding">
        <p className="text-gray-700 mb-4">
          This method works for any website where you can add custom HTML/JavaScript code.
        </p>

        <Step number={1} title="Copy Your Embed Code">
          <p className="mb-3">
            From your ProofLayer dashboard:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Go to <strong>Widgets</strong></li>
            <li>Find the widget you want to embed</li>
            <li>Click <strong>"Get Embed Code"</strong></li>
            <li>Click <strong>"Copy to Clipboard"</strong></li>
          </ol>
        </Step>

        <Step number={2} title="Paste Into Your HTML">
          <p className="mb-3">
            Open your website's HTML file or page editor and paste the code where you want the widget to appear:
          </p>

          <CodeBlock>
{`<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <header>
    <!-- Your header content -->
  </header>

  <main>
    <h1>What Our Customers Say</h1>

    <!-- PASTE PROOFLAYER WIDGET CODE HERE -->
    <div id="prooflayer-widget-abc123"></div>
    <script src="https://cdn.prooflayer.com/widget.js"></script>
    <script>
      ProofLayer.init({
        widgetId: 'abc123',
        container: '#prooflayer-widget-abc123'
      });
    </script>
    <!-- END WIDGET CODE -->

  </main>

  <footer>
    <!-- Your footer content -->
  </footer>
</body>
</html>`}
          </CodeBlock>
        </Step>

        <Step number={3} title="Save and Test">
          <p className="mb-3">
            Save your HTML file and load it in a browser. The widget should appear immediately with your testimonials.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="font-semibold text-yellow-900 mb-2">Troubleshooting:</p>
            <ul className="list-disc list-inside space-y-1 text-yellow-800 text-sm">
              <li>Widget not appearing? Check browser console for JavaScript errors</li>
              <li>Layout broken? Ensure the container div has enough space</li>
              <li>Testimonials not loading? Verify you have approved testimonials in that workspace</li>
            </ul>
          </div>
        </Step>
      </Section>

      <Section title="Method 2: WordPress Integration">
        <p className="text-gray-700 mb-4">
          WordPress users have multiple ways to embed ProofLayer widgets, from simple copy-paste to shortcode integration.
        </p>

        <Step number={1} title="Using the Custom HTML Block (Easiest)">
          <p className="mb-3">
            WordPress's block editor makes embedding widgets incredibly simple:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
            <li>
              <strong>Edit your page or post</strong> in WordPress
            </li>
            <li>
              <strong>Click the "+" button</strong> to add a new block where you want the widget
            </li>
            <li>
              <strong>Search for "Custom HTML"</strong> and select it
            </li>
            <li>
              <strong>Paste your ProofLayer embed code</strong> into the HTML block
            </li>
            <li>
              <strong>Click "Preview"</strong> to see the widget in action
            </li>
            <li>
              <strong>Publish or Update</strong> your page
            </li>
          </ol>

          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <p className="text-sm text-gray-700">
              <strong>Screenshot description:</strong> The WordPress block editor showing a Custom HTML block with ProofLayer
              embed code pasted inside, followed by a preview of the rendered testimonial widget.
            </p>
          </div>
        </Step>

        <Step number={2} title="Using Theme Customizer (Site-Wide Widget)">
          <p className="mb-3">
            To add a widget to your footer, sidebar, or other site-wide location:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Go to <strong>Appearance → Customize</strong></li>
            <li>Navigate to <strong>Widgets</strong></li>
            <li>Select the widget area (e.g., "Footer," "Sidebar")</li>
            <li>Add a <strong>Custom HTML</strong> widget</li>
            <li>Paste your ProofLayer embed code</li>
            <li>Click <strong>Publish</strong></li>
          </ol>
        </Step>

        <Step number={3} title="Using Theme Header/Footer Hooks">
          <p className="mb-3">
            For developers or advanced users using themes with hook support:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Go to <strong>Appearance → Theme File Editor</strong> (or use FTP)</li>
            <li>Open <strong>functions.php</strong></li>
            <li>Add the following code:</li>
          </ol>

          <CodeBlock>
{`<?php
// Add ProofLayer widget to footer
function prooflayer_add_widget_to_footer() {
  ?>
  <div id="prooflayer-widget-abc123"></div>
  <script src="https://cdn.prooflayer.com/widget.js"></script>
  <script>
    ProofLayer.init({
      widgetId: 'abc123',
      container: '#prooflayer-widget-abc123'
    });
  </script>
  <?php
}
add_action('wp_footer', 'prooflayer_add_widget_to_footer');
?>`}
          </CodeBlock>
        </Step>

        <Step number={4} title="Page Builders (Elementor, Divi, Beaver Builder)">
          <p className="mb-3">
            Most page builders have HTML or code modules:
          </p>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-3">
              <p className="font-semibold text-gray-900 mb-1">Elementor:</p>
              <p className="text-sm text-gray-700">
                Add an <strong>HTML</strong> widget, paste your ProofLayer code, and style the container with Elementor's visual editor.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 bg-purple-50 p-3">
              <p className="font-semibold text-gray-900 mb-1">Divi Builder:</p>
              <p className="text-sm text-gray-700">
                Use the <strong>Code</strong> module, paste your embed code, and customize the section background/padding.
              </p>
            </div>
            <div className="border-l-4 border-green-500 bg-green-50 p-3">
              <p className="font-semibold text-gray-900 mb-1">Beaver Builder:</p>
              <p className="text-sm text-gray-700">
                Add an <strong>HTML</strong> module to your layout and paste the ProofLayer widget code.
              </p>
            </div>
          </div>
        </Step>

        <Warning>
          Avoid pasting the embed code directly into the WordPress visual editor (WYSIWYG). Always use the "Custom HTML" block
          or "Text" mode to preserve the code structure.
        </Warning>
      </Section>

      <Section title="Method 3: Webflow Integration">
        <p className="text-gray-700 mb-4">
          Webflow's visual builder makes widget embedding straightforward with its Embed element.
        </p>

        <Step number={1} title="Add an Embed Element">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Open your Webflow project and navigate to the page</li>
            <li>From the <strong>Add Panel</strong>, drag an <strong>Embed</strong> element onto your page</li>
            <li>Place it where you want the testimonials to appear</li>
          </ol>
        </Step>

        <Step number={2} title="Paste Your Widget Code">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Double-click the Embed element to open the code editor</li>
            <li>Paste your complete ProofLayer embed code</li>
            <li>Click <strong>"Save & Close"</strong></li>
          </ol>
        </Step>

        <Step number={3} title="Style the Container (Optional)">
          <p className="mb-3">
            You can add custom styling to the Embed wrapper:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-sm">
            <li>Add padding or margin around the widget</li>
            <li>Set a maximum width for the widget container</li>
            <li>Add background colors or borders to the section</li>
          </ul>
          <Tip>
            Name your Embed element "ProofLayer Testimonials" for easy identification in your Webflow Navigator panel.
          </Tip>
        </Step>

        <Step number={4} title="Publish Your Site">
          <p className="mb-2">
            Click <strong>Publish</strong> in the top right. The widget will be live on your published site immediately.
          </p>
          <p className="text-sm text-gray-600">
            Note: The widget preview may not work perfectly in Webflow Designer mode, but it will function correctly on the
            published site.
          </p>
        </Step>
      </Section>

      <Section title="Method 4: React Integration">
        <p className="text-gray-700 mb-4">
          For React applications, you'll need to load the widget script and initialize it after component mount.
        </p>

        <Step number={1} title="Create a ProofLayer Component">
          <p className="mb-3">
            Create a reusable React component for your testimonials widget:
          </p>

          <CodeBlock>
{`// components/ProofLayerWidget.jsx
import { useEffect } from 'react';

export default function ProofLayerWidget({ widgetId }) {
  useEffect(() => {
    // Load ProofLayer script
    const script = document.createElement('script');
    script.src = 'https://cdn.prooflayer.com/widget.js';
    script.async = true;

    script.onload = () => {
      // Initialize widget after script loads
      if (window.ProofLayer) {
        window.ProofLayer.init({
          widgetId: widgetId,
          container: \`#prooflayer-widget-\${widgetId}\`
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, [widgetId]);

  return (
    <div
      id={\`prooflayer-widget-\${widgetId}\`}
      className="prooflayer-container"
    />
  );
}`}
          </CodeBlock>
        </Step>

        <Step number={2} title="Use the Component in Your App">
          <p className="mb-3">
            Import and use the ProofLayer component anywhere in your React app:
          </p>

          <CodeBlock>
{`// pages/Home.jsx
import ProofLayerWidget from '../components/ProofLayerWidget';

export default function Home() {
  return (
    <div>
      <header>
        <h1>Welcome to Our Product</h1>
      </header>

      <main>
        <section className="testimonials-section">
          <h2>What Our Customers Say</h2>
          <ProofLayerWidget widgetId="abc123" />
        </section>
      </main>

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}`}
          </CodeBlock>
        </Step>

        <Step number={3} title="Advanced: Multiple Widgets">
          <p className="mb-3">
            If you need multiple widgets on the same page, load the script once and initialize multiple instances:
          </p>

          <CodeBlock>
{`// components/ProofLayerWidget.jsx (optimized version)
import { useEffect, useRef } from 'react';

// Track if script is already loaded
let scriptLoaded = false;
const loadingPromise = null;

function loadScript() {
  if (scriptLoaded) return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.prooflayer.com/widget.js';
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    document.body.appendChild(script);
  });

  return loadingPromise;
}

export default function ProofLayerWidget({ widgetId, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    loadScript().then(() => {
      if (window.ProofLayer && containerRef.current) {
        window.ProofLayer.init({
          widgetId: widgetId,
          container: \`#prooflayer-widget-\${widgetId}\`
        });
      }
    });
  }, [widgetId]);

  return (
    <div
      ref={containerRef}
      id={\`prooflayer-widget-\${widgetId}\`}
      className={\`prooflayer-container \${className}\`}
    />
  );
}`}
          </CodeBlock>
        </Step>

        <Tip>
          <strong>Next.js Users:</strong> This component works perfectly in Next.js. Just ensure you're importing it only on
          the client side if using server-side rendering (SSR).
        </Tip>
      </Section>

      <Section title="Method 5: Shopify Integration">
        <p className="text-gray-700 mb-4">
          Add testimonials to your Shopify store to build trust and increase conversions.
        </p>

        <Step number={1} title="Edit Your Theme">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>From your Shopify admin, go to <strong>Online Store → Themes</strong></li>
            <li>Click <strong>Customize</strong> on your active theme</li>
            <li>Navigate to the page where you want to add testimonials</li>
          </ol>
        </Step>

        <Step number={2} title="Add Custom HTML Section">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Click <strong>"Add section"</strong></li>
            <li>Select <strong>"Custom HTML"</strong> or <strong>"Custom Liquid"</strong></li>
            <li>Paste your ProofLayer embed code</li>
            <li>Click <strong>Save</strong></li>
          </ol>
        </Step>

        <Step number={3} title="Alternative: Theme Code Editor">
          <p className="mb-3">
            For more control, edit your theme files directly:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Go to <strong>Online Store → Themes → Actions → Edit Code</strong></li>
            <li>Find the template file (e.g., <code>sections/footer.liquid</code>)</li>
            <li>Add your ProofLayer embed code</li>
            <li>Click <strong>Save</strong></li>
          </ol>

          <CodeBlock>
{`<!-- sections/testimonials.liquid -->
<div class="testimonials-section">
  <h2>{{ section.settings.heading }}</h2>

  <div id="prooflayer-widget-abc123"></div>
  <script src="https://cdn.prooflayer.com/widget.js"></script>
  <script>
    ProofLayer.init({
      widgetId: 'abc123',
      container: '#prooflayer-widget-abc123'
    });
  </script>
</div>

{% schema %}
{
  "name": "Customer Testimonials",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "What Our Customers Say"
    }
  ]
}
{% endschema %}`}
          </CodeBlock>
        </Step>
      </Section>

      <Section title="Method 6: Squarespace Integration">
        <Step number={1} title="Add Code Block">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Edit the page where you want testimonials</li>
            <li>Click an <strong>insert point</strong> and choose <strong>Code</strong> from the block menu</li>
            <li>Paste your ProofLayer embed code</li>
            <li>Click <strong>Apply</strong></li>
          </ol>
        </Step>

        <Step number={2} title="Adjust Block Settings">
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-sm">
            <li>Click the code block to access settings</li>
            <li>Ensure <strong>"Display Source"</strong> is OFF</li>
            <li>Adjust spacing/padding as needed</li>
          </ul>
        </Step>
      </Section>

      <Section title="Method 7: Wix Integration">
        <Step number={1} title="Add HTML Embed Element">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>In Wix Editor, click <strong>Add (+)</strong></li>
            <li>Navigate to <strong>Embed → HTML iframe</strong></li>
            <li>Drag the HTML element to your page</li>
            <li>Click <strong>"Enter Code"</strong></li>
            <li>Paste your ProofLayer embed code</li>
            <li>Click <strong>Update</strong></li>
          </ol>
        </Step>

        <Warning>
          Wix's iframe embedding may have height limitations. If your widget appears cut off, increase the iframe height in
          the Wix element settings.
        </Warning>
      </Section>

      <Section title="Troubleshooting Common Issues">
        <div className="space-y-3">
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Widget doesn't appear at all</summary>
            <div className="text-gray-700 text-sm mt-3 space-y-2">
              <p><strong>Possible causes:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>JavaScript blocked by browser or ad blocker - check console for errors</li>
                <li>Incorrect widget ID - verify the ID matches your widget in ProofLayer dashboard</li>
                <li>Container ID mismatch - ensure container div ID matches initialization script</li>
                <li>No approved testimonials - check that you have testimonials approved in your workspace</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Widget appears but testimonials don't load</summary>
            <div className="text-gray-700 text-sm mt-3 space-y-2">
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Verify you have approved testimonials in your workspace</li>
                <li>Check widget filter settings (you may have filtered out all testimonials)</li>
                <li>Ensure your widget status is "Active" in the dashboard</li>
                <li>Try hard refreshing your browser (Ctrl+Shift+R or Cmd+Shift+R)</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Widget layout is broken or overlapping</summary>
            <div className="text-gray-700 text-sm mt-3 space-y-2">
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Ensure the container div has enough width (at least 300px recommended)</li>
                <li>Check for CSS conflicts from your site's styles</li>
                <li>Add <code>clear: both;</code> to the widget container to fix float issues</li>
                <li>Inspect the element in browser dev tools to identify conflicting styles</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Multiple widgets on one page conflict</summary>
            <div className="text-gray-700 text-sm mt-3 space-y-2">
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Ensure each widget has a unique container ID</li>
                <li>Only include the ProofLayer script once per page (not once per widget)</li>
                <li>Initialize each widget separately with unique container selectors</li>
              </ul>
              <CodeBlock>
{`<!-- Load script once -->
<script src="https://cdn.prooflayer.com/widget.js"></script>

<!-- Initialize multiple widgets -->
<div id="widget-1"></div>
<div id="widget-2"></div>

<script>
  ProofLayer.init({ widgetId: 'abc123', container: '#widget-1' });
  ProofLayer.init({ widgetId: 'def456', container: '#widget-2' });
</script>`}
              </CodeBlock>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Widget slows down my page</summary>
            <div className="text-gray-700 text-sm mt-3 space-y-2">
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>ProofLayer widgets are designed to be lightweight (~15KB)</li>
                <li>Scripts load asynchronously and shouldn't block rendering</li>
                <li>If issues persist, use lazy loading: only load widget when scrolled into view</li>
                <li>Contact support if you suspect a performance issue</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">Widget doesn't update with new testimonials</summary>
            <div className="text-gray-700 text-sm mt-3 space-y-2">
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Widgets update automatically - no code changes needed</li>
                <li>Clear your browser cache or hard refresh (Ctrl+Shift+R)</li>
                <li>Check that new testimonials are "Approved" status</li>
                <li>Ensure testimonials match your widget's filter criteria</li>
              </ul>
            </div>
          </details>
        </div>
      </Section>

      <Section title="Advanced Embedding Techniques">
        <div className="space-y-4">
          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Lazy Loading for Performance</h3>
            <p className="text-gray-700 text-sm mb-3">
              Load widgets only when they're scrolled into view to improve initial page load:
            </p>
            <CodeBlock>
{`<div id="prooflayer-widget-abc123" class="lazy-widget"></div>

<script>
  // Intersection Observer for lazy loading
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Load ProofLayer when widget comes into view
        const script = document.createElement('script');
        script.src = 'https://cdn.prooflayer.com/widget.js';
        script.onload = () => {
          ProofLayer.init({
            widgetId: 'abc123',
            container: '#prooflayer-widget-abc123'
          });
        };
        document.body.appendChild(script);
        observer.disconnect();
      }
    });
  });

  observer.observe(document.getElementById('prooflayer-widget-abc123'));
</script>`}
            </CodeBlock>
          </div>

          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Dynamic Widget Switching</h3>
            <p className="text-gray-700 text-sm mb-3">
              Switch between different widgets based on user actions or page state:
            </p>
            <CodeBlock>
{`<div id="prooflayer-widget-container"></div>

<button onclick="showWidget('abc123')">Product A Testimonials</button>
<button onclick="showWidget('def456')">Product B Testimonials</button>

<script src="https://cdn.prooflayer.com/widget.js"></script>
<script>
  function showWidget(widgetId) {
    // Clear existing widget
    document.getElementById('prooflayer-widget-container').innerHTML = '';

    // Initialize new widget
    ProofLayer.init({
      widgetId: widgetId,
      container: '#prooflayer-widget-container'
    });
  }

  // Load default widget
  showWidget('abc123');
</script>`}
            </CodeBlock>
          </div>

          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Custom Styling with CSS</h3>
            <p className="text-gray-700 text-sm mb-3">
              Add custom CSS to further style the widget container:
            </p>
            <CodeBlock>
{`<style>
  #prooflayer-widget-abc123 {
    max-width: 1200px;
    margin: 60px auto;
    padding: 0 20px;
  }

  /* Add section background */
  .testimonials-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 80px 0;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    #prooflayer-widget-abc123 {
      margin: 30px auto;
      padding: 0 15px;
    }
  }
</style>

<section class="testimonials-section">
  <h2 style="text-align: center; color: white; margin-bottom: 40px;">
    What Our Customers Say
  </h2>
  <div id="prooflayer-widget-abc123"></div>
</section>

<script src="https://cdn.prooflayer.com/widget.js"></script>
<script>
  ProofLayer.init({
    widgetId: 'abc123',
    container: '#prooflayer-widget-abc123'
  });
</script>`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Need Help With Embedding?</h2>
        <p className="text-blue-100 mb-6">
          Our support team can help you integrate ProofLayer widgets on any platform, or even custom-code a solution for your
          specific needs.
        </p>
        <div className="flex gap-4">
          <a
            href="mailto:support@prooflayer.com"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Contact Support
          </a>
          <Link
            href="/help/widgets/creating"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Back to Widget Creation
          </Link>
        </div>
      </div>
    </HelpArticle>
  );
}
