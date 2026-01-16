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

  const embedCode = `<div id="prooflayer-widget"></div>
<script src="${appUrl}/widget.js" data-workspace="${selectedWorkspace}" data-layout="${layout}" data-theme="${theme}"></script>`;

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

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">How to use:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Copy the embed code above</li>
            <li>Paste it into your website&apos;s HTML</li>
            <li>The widget will automatically display your approved testimonials</li>
          </ol>
        </div>
      </div>
    </div>
  );
}