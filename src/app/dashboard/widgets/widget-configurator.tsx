'use client';

import { useState } from 'react';

type Workspace = {
  id: string;
  name: string;
};

export default function WidgetConfigurator({
  workspaces,
  appUrl,
}: {
  workspaces: Workspace[];
  appUrl: string;
}) {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]?.id || '');
  const [layout, setLayout] = useState<'grid' | 'carousel'>('grid');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'shopify' | 'wix' | 'squarespace' | 'wordpress' | 'webflow'>('shopify');

  const embedCode = `<div id="prooflayer-widget"></div>
<script src="${appUrl}/widget.js?v=2" data-workspace="${selectedWorkspace}" data-layout="${layout}" data-theme="${theme}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Configure Widget</h2>

        <div className="space-y-6">
          {/* Workspace selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workspace
            </label>
            <select
              value={selectedWorkspace}
              onChange={(e) => setSelectedWorkspace(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {workspaces.map((ws) => (
                <option key={ws.id} value={ws.id}>
                  {ws.name}
                </option>
              ))}
            </select>
          </div>

          {/* Layout selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Layout
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLayout('grid')}
                className={`p-4 border rounded-lg text-center transition-colors ${
                  layout === 'grid'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
                <span className="text-sm font-medium">Grid</span>
              </button>
              <button
                onClick={() => setLayout('carousel')}
                className={`p-4 border rounded-lg text-center transition-colors ${
                  layout === 'carousel'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4h10M7 8h10M7 12h10M7 16h10M7 20h10" />
                </svg>
                <span className="text-sm font-medium">Carousel</span>
              </button>
            </div>
          </div>

          {/* Theme selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  theme === 'light'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm font-medium">Dark</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embed Code */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Embed Code</h2>
        <p className="text-sm text-gray-600 mb-4">
          Copy and paste this code into your website where you want the testimonials to appear.
        </p>

        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{embedCode}</code>
          </pre>
          <button
            onClick={handleCopy}
            className={`absolute top-2 right-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Platform-Specific Instructions:</h3>

          {/* Platform Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-200 pb-2">
            {[
              { id: 'shopify', label: 'Shopify' },
              { id: 'wix', label: 'Wix' },
              { id: 'squarespace', label: 'Squarespace' },
              { id: 'wordpress', label: 'WordPress' },
              { id: 'webflow', label: 'Webflow' },
            ].map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id as typeof selectedPlatform)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  selectedPlatform === platform.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {platform.label}
              </button>
            ))}
          </div>

          {/* Platform-Specific Instructions */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
            {selectedPlatform === 'shopify' && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.935 4.994c-.028 0-.057.002-.085.006l-1.073.108c-.074-.206-.184-.428-.335-.639-.455-.633-1.123-.975-1.931-.975h-.122c-.182-.24-.406-.345-.637-.345-.014 0-.029 0-.043.002-2.064.083-3.062 2.542-3.381 3.832l-1.724.535c-.537.167-.553.183-.622.686-.052.38-1.434 11.07-1.434 11.07l10.775 2.03 4.682-1.04s-3.72-24.105-3.742-24.125c-.023-.02-.061-.03-.123-.03-.015 0-.03 0-.044.002zm-2.495 1.415c-.39.12-.825.255-1.295.4-.005-.5-.049-1.201-.228-1.795.673.086 1.27.67 1.523 1.395zm-1.856-.486c.166.556.21 1.429.211 2.065l-1.684.524c.323-1.232.936-2.292 1.473-2.589zm-.58-.807c.064 0 .126.017.188.047-.788.427-1.652 1.783-2.02 3.456l-1.328.413c.385-1.464 1.435-3.857 3.16-3.916z"/>
                  </svg>
                  Shopify Setup (5 Steps)
                </h4>
                <ol className="text-sm text-gray-800 space-y-2.5">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>In your Shopify admin, go to <strong>Online Store → Themes</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Click <strong>Actions → Edit code</strong> on your active theme</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Find the page template where you want testimonials (e.g., <code className="bg-white px-1.5 py-0.5 rounded text-xs">page.liquid</code> or <code className="bg-white px-1.5 py-0.5 rounded text-xs">index.liquid</code>)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Paste the embed code above where you want the widget to appear</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span>Click <strong>Save</strong> and preview your store to see the widget live</span>
                  </li>
                </ol>
              </div>
            )}

            {selectedPlatform === 'wix' && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.444 8.256c.4.6.821 1.328 1.197 2.145.375-.811.811-1.544 1.201-2.145.764-1.168 1.699-2.256 2.797-2.256.36 0 .718.097 1.053.291.355.207.65.503.86.865.209.362.323.772.323 1.189 0 .511-.153 1.006-.439 1.428-.286.423-.691.748-1.162.938-.942.378-1.946.234-2.771-.386-.3-.225-.571-.489-.809-.787-.238.298-.509.562-.809.787-.825.62-1.829.764-2.771.386-.471-.19-.876-.515-1.162-.938-.286-.422-.439-.917-.439-1.428 0-.417.114-.827.323-1.189.21-.362.505-.658.86-.865.335-.194.693-.291 1.053-.291 1.098 0 2.033 1.088 2.797 2.256z"/>
                  </svg>
                  Wix Setup (5 Steps)
                </h4>
                <ol className="text-sm text-gray-800 space-y-2.5">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Open your site in the <strong>Wix Editor</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Click the <strong>+</strong> button on the left sidebar, then select <strong>Embed Code</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Choose <strong>Custom Embeds → Embed a Widget</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Paste the embed code above into the code box</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span>Drag the widget to position it, then click <strong>Publish</strong> to make it live</span>
                  </li>
                </ol>
              </div>
            )}

            {selectedPlatform === 'squarespace' && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.902 9.098c-1.037-1.037-2.438-1.609-3.927-1.609-1.488 0-2.889.572-3.926 1.609l-3.927 3.926c-1.037 1.038-1.609 2.439-1.609 3.927s.572 2.889 1.609 3.926c1.037 1.038 2.438 1.609 3.926 1.609 1.489 0 2.89-.571 3.927-1.609l.98-.979-1.388-1.387-.98.979c-.647.646-1.508.999-2.539.999-1.03 0-1.892-.353-2.538-.999-.646-.646-.999-1.508-.999-2.539 0-1.03.353-1.892.999-2.538l3.927-3.927c.646-.646 1.508-.999 2.538-.999 1.031 0 1.893.353 2.539.999.646.646.999 1.508.999 2.539 0 .578-.13 1.122-.364 1.611l1.492 1.118c.439-.733.667-1.579.667-2.48 0-1.489-.571-2.89-1.609-3.927z"/>
                  </svg>
                  Squarespace Setup (5 Steps)
                </h4>
                <ol className="text-sm text-gray-800 space-y-2.5">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>In the Squarespace editor, navigate to the page where you want testimonials</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Click an <strong>insert point</strong> (the + icon between sections)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Select <strong>Code</strong> from the block menu</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Paste the embed code above, then click <strong>Apply</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span>Click <strong>Save</strong> in the top-left corner to publish your changes</span>
                  </li>
                </ol>
              </div>
            )}

            {selectedPlatform === 'wordpress' && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.051-.18 2.986-.51-.024-.037-.046-.078-.065-.123l-2.763-7.572zm-5.023-3.427c0-1.086.78-2.096 1.774-2.096.018 0 .035.003.053.003l.002-.002c.367-.013.667.136.958.367.29.23.563.571.563 1.114 0 .55-.148.906-.407 1.396-.26.49-.606 1.136-.606 2.26 0 .893.35 1.9.936 3.295l.588 1.962-2.133-6.35c-.364-1.076-.728-2.394-.728-3.449zm6.815.642c.505.032.959-.078.959-.078.451-.054.398-.716-.053-.692 0 0-1.357.107-2.234.107-.824 0-2.207-.107-2.207-.107-.451-.024-.504.664-.053.692 0 0 .428.046.879.078l1.305 3.575-1.833 5.5-3.049-9.075c.505-.032.959-.078.959-.078.451-.054.398-.716-.053-.692 0 0-1.357.107-2.234.107-.157 0-.342-.004-.539-.01C6.594 4.127 9.094 2.5 12 2.5c2.17 0 4.145.832 5.624 2.195-.036-.002-.07-.008-.107-.008-.823 0-1.408.717-1.408 1.486 0 .69.398 1.274.824 1.963.319.555.692 1.27.692 2.302 0 .716-.274 1.544-.637 2.698l-.836 2.793-3.03-9.015zm.007 12.788c.792-.231 1.527-.59 2.179-1.053l-.036-.068-2.085-5.714 2.133 5.844c.013.034.028.066.046.097.014-.008.026-.017.04-.025zm7.043-8.789c0 3.76-2.33 6.974-5.633 8.292l3.468-10.003c.648-1.622 1.165-2.934 1.165-3.99 0-.411-.026-.792-.076-1.153 1.028 1.494 1.638 3.305 1.638 5.265zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 19.2c-5.077 0-9.2-4.123-9.2-9.2S6.923 2.8 12 2.8s9.2 4.123 9.2 9.2-4.123 9.2-9.2 9.2z"/>
                  </svg>
                  WordPress Setup (5 Steps)
                </h4>
                <ol className="text-sm text-gray-800 space-y-2.5">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Log in to your WordPress admin panel</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Go to the page/post where you want testimonials, or go to <strong>Appearance → Widgets</strong> for sidebar placement</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Click the <strong>+</strong> button and search for <strong>Custom HTML</strong> block</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Paste the embed code above into the HTML block</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span>Click <strong>Update</strong> or <strong>Publish</strong> to make your widget live</span>
                  </li>
                </ol>
              </div>
            )}

            {selectedPlatform === 'webflow' && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5 11.3c-.3-1.5-1.2-2.7-2.4-3.5 1.2-.9 2.1-2.1 2.4-3.6.6.3 1.2.6 1.8.9 1.8 1.2 3.3 2.7 4.5 4.5.3.6.6 1.2.9 1.8-1.5.3-2.7 1.2-3.6 2.4-.8-1.2-2-2.1-3.5-2.4zm-3 1.4c.3 1.5 1.2 2.7 2.4 3.6-1.2.9-2.1 2.1-2.4 3.6-.6-.3-1.2-.6-1.8-.9-1.8-1.2-3.3-2.7-4.5-4.5-.3-.6-.6-1.2-.9-1.8 1.5-.3 2.7-1.2 3.6-2.4.8 1.2 2 2.1 3.5 2.4z"/>
                  </svg>
                  Webflow Setup (5 Steps)
                </h4>
                <ol className="text-sm text-gray-800 space-y-2.5">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Open your project in the <strong>Webflow Designer</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Navigate to the page where you want the testimonials widget</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Drag an <strong>Embed</strong> element from the Add panel onto your page</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Paste the embed code above into the embed settings</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span>Click <strong>Save & Close</strong>, then <strong>Publish</strong> your site</span>
                  </li>
                </ol>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>The widget will automatically display your approved testimonials. Changes you make to testimonials in your workspace will update instantly on your website.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}