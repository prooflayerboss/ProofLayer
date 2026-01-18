'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PRESET_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
];

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
];

interface WorkspaceCreatorProps {
  canUseCustomColors: boolean;
}

export default function WorkspaceCreator({ canUseCustomColors }: WorkspaceCreatorProps) {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/dashboard/workspaces');
  };

  // Form state
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoShape, setLogoShape] = useState<'square' | 'circle'>('square');
  const [headerTitle, setHeaderTitle] = useState('Share your feedback');
  const [customMessage, setCustomMessage] = useState('Your testimonial helps us improve and helps others make informed decisions!');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [language, setLanguage] = useState('en');

  // Collection preferences
  const [collectEmail, setCollectEmail] = useState(false);
  const [collectCompany, setCollectCompany] = useState(true);
  const [collectRole, setCollectRole] = useState(true);
  const [collectSocialLink, setCollectSocialLink] = useState(false);
  const [collectRating, setCollectRating] = useState(true);

  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter a workspace name');
      return;
    }

    setCreating(true);
    setError('');

    try {
      const response = await fetch('/api/workspaces/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          logoUrl: logoUrl.trim() || undefined,
          logoShape,
          headerTitle: headerTitle.trim(),
          customMessage: customMessage.trim(),
          primaryColor,
          language,
          collectEmail,
          collectCompany,
          collectRole,
          collectSocialLink,
          collectRating,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create workspace');
      }

      // Redirect to the new workspace
      router.push(`/dashboard/workspaces/${data.workspace.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create workspace');
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            ← Back
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Space</h1>
          <p className="text-gray-600 mt-2">
            After your space is created, it will generate a dedicated page for collecting testimonials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Workspace Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Space Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Acme Corp, My Product"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={50}
                />
              </div>

              {/* Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL (optional)
                </label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setLogoShape('square')}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                      logoShape === 'square'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-300 rounded mx-auto mb-1"></div>
                    <span className="text-sm font-medium">Square</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoShape('circle')}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                      logoShape === 'circle'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-1"></div>
                    <span className="text-sm font-medium">Circle</span>
                  </button>
                </div>
              </div>

              {/* Header Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Header Title
                </label>
                <input
                  type="text"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={100}
                />
              </div>

              {/* Custom Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Message
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  maxLength={500}
                />
              </div>

              {/* Collection Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Collect Extra Information
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={collectEmail}
                      onChange={(e) => setCollectEmail(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Email address</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={collectCompany}
                      onChange={(e) => setCollectCompany(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Company name</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={collectRole}
                      onChange={(e) => setCollectRole(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Job title / Role</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={collectSocialLink}
                      onChange={(e) => setCollectSocialLink(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Social media link (Twitter, LinkedIn, etc.)</span>
                  </label>
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={collectRating}
                    onChange={(e) => setCollectRating(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Collect star rating (1-5 stars)</span>
                </label>
              </div>

              {/* Theme Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme Color
                </label>
                {canUseCustomColors ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="#3B82F6"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-3 gap-2">
                      {PRESET_COLORS.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setPrimaryColor(color.value)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            primaryColor === color.value
                              ? 'border-gray-900'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color.value + '20' }}
                        >
                          <div
                            className="w-8 h-8 rounded mx-auto mb-1"
                            style={{ backgroundColor: color.value }}
                          ></div>
                          <span className="text-xs font-medium">{color.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Upgrade to Professional or Agency for custom colors
                    </p>
                  </div>
                )}
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? 'Creating...' : 'Create Space'}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Live Preview</p>
              </div>

              <div className="p-8">
                {/* Logo */}
                {logoUrl && (
                  <div className="flex justify-center mb-6">
                    <div
                      className={`w-20 h-20 bg-gray-100 flex items-center justify-center overflow-hidden ${
                        logoShape === 'circle' ? 'rounded-full' : 'rounded-lg'
                      }`}
                    >
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                  {headerTitle || 'Share your feedback'}
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  {customMessage || 'Your testimonial helps us improve!'}
                </p>

                {/* Form Fields Preview */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-400">
                      John Doe
                    </div>
                  </div>

                  {collectEmail && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-400">
                        john@example.com
                      </div>
                    </div>
                  )}

                  {collectCompany && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-400">
                        Acme Corp
                      </div>
                    </div>
                  )}

                  {collectRole && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title
                      </label>
                      <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-400">
                        Marketing Manager
                      </div>
                    </div>
                  )}

                  {collectSocialLink && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Social Media Link
                      </label>
                      <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-400">
                        https://twitter.com/johndoe
                      </div>
                    </div>
                  )}

                  {collectRating && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-8 h-8"
                            fill={star <= 5 ? primaryColor : '#E5E7EB'}
                            viewBox="0 0 24 24"
                          >
                            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Testimonial <span className="text-red-500">*</span>
                    </label>
                    <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-400 h-24">
                      This product has been amazing...
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full px-4 py-3 rounded-lg font-medium text-white transition-colors"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Submit Testimonial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
