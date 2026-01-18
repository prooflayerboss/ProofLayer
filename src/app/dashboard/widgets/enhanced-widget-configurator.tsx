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

  const [copied, setCopied] = useState(false);

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
                    className="absolute top-2 right-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-medium mb-2">Installation Instructions:</p>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Copy the embed code above</li>
                  <li>Paste it into your website's HTML</li>
                  <li>The widget will appear automatically!</li>
                </ol>
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

            <div className={`p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="text-center">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Preview for {widgetType === 'WALL_OF_LOVE' ? 'Wall of Love' : widgetType === 'SINGLE' ? 'Single Testimonial' : widgetType === 'BADGE' ? 'Badge' : 'Collection Form'}
                </p>
                <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  {widgetType === 'WALL_OF_LOVE' && `Layout: ${layout}`}
                  {widgetType === 'WALL_OF_LOVE' && ` • Animation: ${animationStyle}`}
                  {widgetType === 'BADGE' && `Position: ${badgePosition}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
