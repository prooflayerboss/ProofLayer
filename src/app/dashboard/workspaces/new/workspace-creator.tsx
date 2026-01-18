'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/lib/uploadthing-utils';
import WorkspaceTour from './workspace-tour';

interface WorkspaceCreatorProps {
  canUseCustomColors: boolean;
}

export default function WorkspaceCreator({ canUseCustomColors }: WorkspaceCreatorProps) {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/dashboard/workspaces');
  };

  // Form state - simplified to just branding
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoShape, setLogoShape] = useState<'square' | 'circle' | 'rectangle'>('rectangle');
  const [uploading, setUploading] = useState(false);

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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create workspace');
      }

      // Redirect to create first form
      router.push(`/dashboard/workspaces/${data.workspace.id}/forms/new`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create workspace');
      setCreating(false);
    }
  };

  return (
    <div>
      <WorkspaceTour />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            ← Back
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Workspace</h1>
          <p className="text-gray-600 mt-2">
            A workspace is your brand or organization. You'll create forms within it to collect testimonials.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Workspace Name */}
            <div data-tour="workspace-name">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace Name <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Name your workspace after your brand, product, or company.
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Acme Corp"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={50}
              />
            </div>

            {/* Logo */}
            <div data-tour="workspace-logo">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo (optional)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Upload your brand logo. This will appear on all forms in this workspace.
              </p>

              {logoUrl ? (
                <div className="mb-3">
                  <div className="relative inline-block">
                    <img
                      src={logoUrl}
                      alt="Logo preview"
                      className={`object-contain border-2 border-gray-200 ${
                        logoShape === 'circle'
                          ? 'w-24 h-24 rounded-full object-cover'
                          : logoShape === 'rectangle'
                          ? 'h-16 max-w-xs rounded-lg'
                          : 'w-24 h-24 rounded-lg'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setLogoUrl('')}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-xs text-green-600 mt-2">✓ Logo uploaded successfully!</p>
                </div>
              ) : (
                <div className="mb-3">
                  {uploading ? (
                    <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg p-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-blue-600 font-medium">Uploading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <UploadButton
                        endpoint="logoUploader"
                        onClientUploadComplete={(res) => {
                          if (res?.[0]?.url) {
                            setLogoUrl(res[0].url);
                            setUploading(false);
                          }
                        }}
                        onUploadError={(error: Error) => {
                          console.error('Upload error:', error);
                          setError(`Upload failed: ${error.message}`);
                          setUploading(false);
                        }}
                        onUploadBegin={() => {
                          setUploading(true);
                          setError('');
                        }}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        <span className="font-medium">Accepted:</span> PNG, JPG, JPEG, WebP
                        <span className="mx-2">•</span>
                        <span className="font-medium">Max size:</span> 8MB
                      </p>
                    </>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setLogoShape('rectangle')}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                    logoShape === 'rectangle'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-16 h-8 bg-gray-300 rounded mx-auto mb-1"></div>
                  <span className="text-sm font-medium">Rectangle</span>
                </button>
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

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating || !name.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : 'Create Workspace'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>After creating your workspace, you'll set up your first form to collect testimonials.</p>
        </div>
      </div>
    </div>
    </div>
  );
}
