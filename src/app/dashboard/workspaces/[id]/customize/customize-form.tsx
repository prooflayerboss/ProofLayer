'use client';

import { useState } from 'react';
import { updateWorkspaceCustomization } from '@/actions/workspaces';

interface CustomizeFormProps {
  workspace: {
    id: string;
    name: string;
    headline: string | null;
    description: string | null;
    logoUrl: string | null;
  };
}

export default function CustomizeForm({ workspace }: CustomizeFormProps) {
  const [headline, setHeadline] = useState(workspace.headline || '');
  const [description, setDescription] = useState(workspace.description || '');
  const [logoUrl, setLogoUrl] = useState(workspace.logoUrl || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateWorkspaceCustomization(formData);

      if (!result.success) {
        setError(result.error || 'Failed to update customization');
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="workspaceId" value={workspace.id} />

      {/* Headline */}
      <div>
        <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-2">
          Page Headline
        </label>
        <input
          type="text"
          id="headline"
          name="headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder={workspace.name}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">
          Main heading on your Wall of Love page. Leave blank to use workspace name: "{workspace.name}"
        </p>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Page Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Client testimonials and reviews"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">
          Subtitle that appears below the headline
        </p>
      </div>

      {/* Logo URL */}
      <div>
        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Logo URL (optional)
        </label>
        <input
          type="url"
          id="logoUrl"
          name="logoUrl"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="https://example.com/logo.png"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">
          Display your logo at the top of the page. Use a hosted image URL (e.g., from Imgur, Cloudinary, or your website)
        </p>
        {logoUrl && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 mb-2">Logo Preview:</p>
            <img
              src={logoUrl}
              alt="Logo preview"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                setError('Failed to load logo. Check the URL.');
              }}
            />
          </div>
        )}
      </div>

      {/* Preview Section */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-3">Preview</p>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          {logoUrl && (
            <div className="flex justify-center mb-3">
              <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-900 text-center">
            {headline || workspace.name}
          </h2>
          <p className="text-gray-600 text-center mt-1 text-sm">
            {description || 'Client testimonials and reviews'}
          </p>
          <div className="mt-4 flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="font-semibold text-sm text-blue-600">
                JD
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Sample Testimonial</p>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">Customization saved successfully!</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
