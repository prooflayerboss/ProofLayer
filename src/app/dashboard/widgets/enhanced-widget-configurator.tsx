'use client';

import { useState } from 'react';
import { Plan } from '@prisma/client';

type Workspace = {
  id: string;
  name: string;
};

type WidgetType = 'WALL_OF_LOVE' | 'SINGLE' | 'BADGE' | 'COLLECTION_FORM';
type WidgetLayout = 'GRID' | 'CAROUSEL' | 'MARQUEE' | 'MASONRY' | 'SPOTLIGHT' | 'LIST';
type AnimationStyle = 'fade' | 'slide' | 'hearts' | 'none';
type Platform = 'html' | 'shopify' | 'wordpress' | 'webflow' | 'wix';

interface PlatformInfo {
  id: Platform;
  name: string;
  icon: string;
  instructions: string[];
  note?: string;
}

export default function EnhancedWidgetConfigurator({
  workspaces,
  appUrl,
  userPlan,
}: {
  workspaces: Workspace[];
  appUrl: string;
  userPlan: Plan;
}) {
  // Multi-step wizard
  const [step, setStep] = useState(1);

  // Step 1: Widget Type
  const [widgetType, setWidgetType] = useState<WidgetType>('WALL_OF_LOVE');
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]?.id || '');

  // Step 2: Layout
  const [layout, setLayout] = useState<WidgetLayout>('GRID');

  // Step 3: Appearance
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [animationStyle, setAnimationStyle] = useState<AnimationStyle>('fade');
  const [hoverEffect, setHoverEffect] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'vertical' | 'horizontal'>('vertical');

  // Badge specific settings
  const [badgePosition, setBadgePosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const [badgeText, setBadgeText] = useState('See what our customers say');
  const [badgeIcon, setBadgeIcon] = useState<'star' | 'chat' | 'heart'>('star');

  // Step 4: Platform selection
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('html');
  const [copied, setCopied] = useState(false);

  const platforms: PlatformInfo[] = [
    {
      id: 'html',
      name: 'HTML',
      icon: '🌐',
      instructions: [
        'Copy the embed code above',
        'Open your website\'s HTML file in a code editor',
        'Paste the code where you want the widget to appear',
        'Save and publish your changes',
      ],
      note: 'Works with any website that allows custom HTML.',
    },
    {
      id: 'shopify',
      name: 'Shopify',
      icon: '🛍️',
      instructions: [
        'Go to your Shopify admin panel',
        'Navigate to Online Store → Themes → Customize',
        'Click "Add section" where you want the widget',
        'Select "Custom Liquid" or "Custom HTML"',
        'Paste the embed code and save',
      ],
      note: 'For product pages, edit the product template. For homepage, edit the home template.',
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      icon: '📝',
      instructions: [
        'Edit the page/post where you want the widget',
        'Add a "Custom HTML" block (click + → search "HTML")',
        'Paste the embed code into the block',
        'Click "Preview" to verify, then "Update" or "Publish"',
      ],
      note: 'If using Elementor: Add an HTML widget. If using Divi: Add a Code module.',
    },
    {
      id: 'webflow',
      name: 'Webflow',
      icon: '🎨',
      instructions: [
        'Open your Webflow project in the Designer',
        'Add an "Embed" element where you want the widget',
        'Paste the embed code in the embed settings',
        'Publish your site to see the widget live',
      ],
      note: 'The widget will appear as a placeholder in the Designer but will work on your published site.',
    },
    {
      id: 'wix',
      name: 'Wix',
      icon: '✨',
      instructions: [
        'Open the Wix Editor for your site',
        'Click "Add" (+) → "Embed Code" → "Embed HTML"',
        'Click "Enter Code" and paste the embed code',
        'Position and resize the element as needed',
        'Publish your site',
      ],
      note: 'You may need to adjust the iframe height in the embed settings for best display.',
    },
  ];

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Choose Widget Type';
      case 2: return 'Select Layout';
      case 3: return 'Customize Appearance';
      case 4: return 'Get Embed Code';
      default: return '';
    }
  };

  const getEmbedCode = () => {
    if (widgetType === 'COLLECTION_FORM') {
      return `<div id="prooflayer-form"></div>
<script src="${appUrl}/widget-form.js" data-workspace="${selectedWorkspace}" data-theme="${theme}"></script>`;
    }

    if (widgetType === 'BADGE') {
      return `<script src="${appUrl}/widget-badge.js" data-workspace="${selectedWorkspace}" data-position="${badgePosition}" data-text="${badgeText}" data-icon="${badgeIcon}" data-theme="${theme}"></script>`;
    }

    if (widgetType === 'SINGLE') {
      return `<div id="prooflayer-widget"></div>
<script src="${appUrl}/widget.js" data-workspace="${selectedWorkspace}" data-layout="SPOTLIGHT" data-theme="${theme}" data-animation="${animationStyle}" data-auto-rotate="5000"></script>`;
    }

    // WALL_OF_LOVE
    return `<div id="prooflayer-widget"></div>
<script src="${appUrl}/widget.js" data-workspace="${selectedWorkspace}" data-layout="${layout}" data-theme="${theme}" data-animation="${animationStyle}" data-hover="${hoverEffect}" data-scroll="${scrollDirection}"></script>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getEmbedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                    step >= s
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                <p className="text-xs mt-2 font-medium text-gray-600">
                  {s === 1 && 'Type'}
                  {s === 2 && 'Layout'}
                  {s === 3 && 'Style'}
                  {s === 4 && 'Code'}
                </p>
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-colors ${
                    step > s ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{getStepTitle()}</h2>

          {/* Step 1: Widget Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Workspace
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Widget Type
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      type: 'WALL_OF_LOVE' as WidgetType,
                      icon: '🏆',
                      title: 'Wall of Love',
                      desc: 'Grid or list of multiple testimonials with animations'
                    },
                    {
                      type: 'SINGLE' as WidgetType,
                      icon: '⭐',
                      title: 'Single Testimonial',
                      desc: 'One rotating testimonial spotlight'
                    },
                    {
                      type: 'BADGE' as WidgetType,
                      icon: '💬',
                      title: 'Badge',
                      desc: 'Floating badge that opens testimonials panel'
                    },
                    {
                      type: 'COLLECTION_FORM' as WidgetType,
                      icon: '📝',
                      title: 'Collection Form',
                      desc: 'Embed your testimonial form directly on your site'
                    },
                  ].map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setWidgetType(option.type)}
                      className={`text-left p-4 rounded-lg border-2 transition-all ${
                        widgetType === option.type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{option.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{option.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Layout */}
          {step === 2 && widgetType === 'WALL_OF_LOVE' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'GRID' as WidgetLayout, label: 'Grid', icon: '▦' },
                  { value: 'CAROUSEL' as WidgetLayout, label: 'Carousel', icon: '↔' },
                  { value: 'MASONRY' as WidgetLayout, label: 'Masonry', icon: '⊞' },
                  { value: 'MARQUEE' as WidgetLayout, label: 'Marquee', icon: '∞' },
                  { value: 'LIST' as WidgetLayout, label: 'List', icon: '☰' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setLayout(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      layout === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && widgetType === 'BADGE' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Badge Position
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'bottom-right' as const, label: 'Bottom Right' },
                    { value: 'bottom-left' as const, label: 'Bottom Left' },
                    { value: 'top-right' as const, label: 'Top Right' },
                    { value: 'top-left' as const, label: 'Top Left' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setBadgePosition(option.value)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm ${
                        badgePosition === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Badge Icon
                </label>
                <div className="flex gap-3">
                  {[
                    { value: 'star' as const, icon: '⭐' },
                    { value: 'chat' as const, icon: '💬' },
                    { value: 'heart' as const, icon: '❤️' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setBadgeIcon(option.value)}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        badgeIcon === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl">{option.icon}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (widgetType === 'SINGLE' || widgetType === 'COLLECTION_FORM') && (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {widgetType === 'SINGLE'
                  ? 'Single testimonial widget uses the Spotlight layout automatically.'
                  : 'Collection form uses a fixed layout optimized for form submission.'}
              </p>
            </div>
          )}

          {/* Step 3: Appearance */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === 'light'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">☀️</div>
                    <div className="font-medium">Light</div>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">🌙</div>
                    <div className="font-medium">Dark</div>
                  </button>
                </div>
              </div>

              {widgetType === 'WALL_OF_LOVE' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Animation Style
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'fade' as AnimationStyle, label: 'Fade In', emoji: '✨' },
                        { value: 'slide' as AnimationStyle, label: 'Slide Up', emoji: '⬆️' },
                        { value: 'hearts' as AnimationStyle, label: 'Rain Hearts', emoji: '❤️' },
                        { value: 'none' as AnimationStyle, label: 'None', emoji: '🚫' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setAnimationStyle(option.value)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            animationStyle === option.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xl mb-1">{option.emoji}</div>
                          <div className="text-sm font-medium">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hoverEffect}
                        onChange={(e) => setHoverEffect(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Enable hover lift effect on cards
                      </span>
                    </label>
                  </div>

                  {(layout === 'CAROUSEL' || layout === 'LIST') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Scroll Direction
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setScrollDirection('vertical')}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            scrollDirection === 'vertical'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          ↕️ Vertical
                        </button>
                        <button
                          onClick={() => setScrollDirection('horizontal')}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            scrollDirection === 'horizontal'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          ↔️ Horizontal
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Step 4: Embed Code */}
          {step === 4 && (
            <div className="space-y-4">
              {/* Platform Tabs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Your Platform
                </label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedPlatform === platform.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{platform.icon}</span>
                      <span>{platform.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Embed Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Embed Code
                </label>
                <div className="relative">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {getEmbedCode()}
                  </pre>
                  <button
                    onClick={handleCopy}
                    className={`absolute top-2 right-2 px-3 py-1.5 text-white text-xs rounded transition-colors ${
                      copied ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {copied ? '✓ Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>

              {/* Platform-Specific Instructions */}
              {platforms.map((platform) => (
                platform.id === selectedPlatform && (
                  <div key={platform.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{platform.icon}</span>
                      <p className="text-sm text-blue-900 font-semibold">
                        {platform.name} Installation
                      </p>
                    </div>
                    <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                      {platform.instructions.map((instruction, index) => (
                        <li key={index} className="leading-relaxed">{instruction}</li>
                      ))}
                    </ol>
                    {platform.note && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <p className="text-xs text-blue-700">
                          <strong>Tip:</strong> {platform.note}
                        </p>
                      </div>
                    )}
                  </div>
                )
              ))}

              {/* Help Links */}
              <div className="flex items-center gap-4 text-sm">
                <a
                  href="/help/widgets/embedding"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Full Documentation
                </a>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Need Help?
                </a>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
            )}
            {step < 4 && (
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Live Preview</p>
            </div>

            <div className={`p-6 min-h-[400px] ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {/* Wall of Love Preview */}
              {widgetType === 'WALL_OF_LOVE' && (
                <div
                  key={`wall-${animationStyle}-${layout}`}
                  className={`
                  ${layout === 'GRID' ? 'grid grid-cols-2 gap-3' : ''}
                  ${layout === 'MASONRY' ? 'columns-2 gap-3 space-y-3' : ''}
                  ${layout === 'LIST' ? 'space-y-3' : ''}
                  ${layout === 'CAROUSEL' ? 'flex gap-3 overflow-hidden' : ''}
                  ${layout === 'MARQUEE' ? 'flex gap-3 animate-pulse' : ''}
                `}>
                  {[
                    { name: 'Sarah J.', text: 'Absolutely love this product! It has transformed how we collect testimonials.', rating: 5 },
                    { name: 'Mike R.', text: 'Simple, effective, and beautiful. Exactly what we needed.', rating: 5 },
                    { name: 'Emily C.', text: 'The best testimonial tool I have ever used. Highly recommend!', rating: 4 },
                    { name: 'James W.', text: 'Great value for money. The lifetime deal was a no-brainer.', rating: 5 },
                  ].slice(0, layout === 'LIST' ? 3 : 4).map((testimonial, index) => (
                    <div
                      key={`${animationStyle}-${index}`}
                      className={`
                        relative
                        ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                        border rounded-lg p-4
                        ${hoverEffect ? 'transition-transform hover:-translate-y-1 hover:shadow-lg' : ''}
                        ${animationStyle === 'fade' ? 'animate-fadeIn' : ''}
                        ${animationStyle === 'slide' ? 'animate-slideUp' : ''}
                        ${animationStyle === 'hearts' ? 'animate-fadeIn' : ''}
                        ${layout === 'CAROUSEL' ? 'min-w-[200px] flex-shrink-0' : ''}
                        ${layout === 'MASONRY' && index % 2 === 1 ? 'break-inside-avoid' : ''}
                      `}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Floating hearts for hearts animation */}
                      {animationStyle === 'hearts' && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          {[0, 1, 2].map((heartIndex) => (
                            <span
                              key={heartIndex}
                              className="absolute text-red-500 animate-floatHeart"
                              style={{
                                left: `${20 + heartIndex * 30}%`,
                                bottom: '10%',
                                animationDelay: `${heartIndex * 0.3 + index * 0.2}s`,
                                fontSize: '12px',
                              }}
                            >
                              ❤️
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {testimonial.name}
                        </span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={`text-xs ${star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                      <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        "{testimonial.text}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Single Testimonial Preview */}
              {widgetType === 'SINGLE' && (
                <div className={`
                  ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                  border rounded-xl p-6 text-center
                  ${hoverEffect ? 'transition-transform hover:-translate-y-1 hover:shadow-lg' : ''}
                `}>
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-semibold ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
                    SJ
                  </div>
                  <div className="flex justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    "Absolutely love this product! It has completely transformed how we collect and display testimonials. Highly recommend to any business."
                  </p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sarah Johnson</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Marketing Director at TechCorp</p>
                </div>
              )}

              {/* Badge Preview */}
              {widgetType === 'BADGE' && (
                <div className="relative h-[300px] border border-dashed border-gray-300 rounded-lg">
                  <p className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Your website content
                  </p>
                  <div
                    className={`
                      absolute flex items-center gap-2 px-4 py-3 rounded-full shadow-lg cursor-pointer
                      ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
                      ${badgePosition === 'bottom-right' ? 'bottom-4 right-4' : ''}
                      ${badgePosition === 'bottom-left' ? 'bottom-4 left-4' : ''}
                      ${badgePosition === 'top-right' ? 'top-4 right-4' : ''}
                      ${badgePosition === 'top-left' ? 'top-4 left-4' : ''}
                    `}
                  >
                    <span className="text-lg">
                      {badgeIcon === 'star' && '⭐'}
                      {badgeIcon === 'chat' && '💬'}
                      {badgeIcon === 'heart' && '❤️'}
                    </span>
                    <span className="text-sm font-medium max-w-[150px] truncate">{badgeText}</span>
                  </div>
                </div>
              )}

              {/* Collection Form Preview */}
              {widgetType === 'COLLECTION_FORM' && (
                <div className={`
                  ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                  border rounded-xl p-6
                `}>
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Share Your Experience
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Your Name</label>
                      <div className={`w-full h-9 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Your Testimonial</label>
                      <div className={`w-full h-20 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-xl text-gray-300 hover:text-yellow-400 cursor-pointer">★</span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
                      Submit Testimonial
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
