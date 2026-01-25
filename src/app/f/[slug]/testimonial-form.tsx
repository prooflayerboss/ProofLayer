'use client';

import { useState } from 'react';
import VideoUploader from './video-uploader';
import ScreenshotUploader from './screenshot-uploader';

export default function TestimonialForm({
  formId,
  workspaceId,
  allowText,
  allowVideo,
  allowScreenshot,
  primaryColor,
  textColor,
  secondaryTextColor,
  language,
  collectEmail,
  collectCompany,
  collectRole,
  collectSocialLink,
  collectRating,
}: {
  formId: string;
  workspaceId: string;
  allowText: boolean;
  allowVideo: boolean;
  allowScreenshot: boolean;
  primaryColor: string;
  textColor: string;
  secondaryTextColor: string;
  language: string;
  collectEmail: boolean;
  collectCompany: boolean;
  collectRole: boolean;
  collectSocialLink: boolean;
  collectRating: boolean;
}) {
  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [rating, setRating] = useState(5);

  // Text testimonial fields
  const [testimonial, setTestimonial] = useState('');

  // Video testimonial fields
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // Screenshot testimonial fields
  const [screenshotUrl, setScreenshotUrl] = useState<string>('');
  const [socialPlatform, setSocialPlatform] = useState<string>('');
  const [socialAuthorUrl, setSocialAuthorUrl] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadComplete = (url: string) => {
    setVideoUrl(url);
    setVideoPreview(url);
    setError('');
    setUploadProgress(100);
  };

  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
    setUploadProgress(0);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleScreenshotUploadComplete = (url: string) => {
    setScreenshotUrl(url);
    setError('');
    setUploadProgress(100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setUploadProgress(0);

    try {
      // Determine submission type based on what the user provided
      const hasVideo = !!videoUrl;
      const hasText = !!testimonial.trim();
      const hasScreenshot = !!screenshotUrl;

      // Validation: user must provide at least one type of testimonial
      if (!hasVideo && !hasText && !hasScreenshot) {
        const options = [];
        if (allowText) options.push('text testimonial');
        if (allowVideo) options.push('video');
        if (allowScreenshot) options.push('screenshot');
        setError(`Please provide ${options.join(' or ')}`);
        setLoading(false);
        return;
      }

      // Priority: screenshot > video > text
      if (hasScreenshot) {
        const response = await fetch('/api/submissions/screenshot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formId,
            workspaceId,
            name,
            email,
            company,
            role,
            socialLink,
            rating,
            photoUrl: screenshotUrl,
            socialPlatform,
            socialAuthorUrl,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to submit screenshot');
          setLoading(false);
          return;
        }
      } else if (hasVideo) {
        const response = await fetch('/api/submissions/video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formId,
            workspaceId,
            name,
            email,
            company,
            role,
            socialLink,
            rating,
            videoUrl,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to submit video');
          setLoading(false);
          return;
        }
      } else {
        // Otherwise submit as text testimonial
        const response = await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formId,
            workspaceId,
            name,
            email,
            company,
            role,
            socialLink,
            testimonial,
            rating,
            submissionType: 'TEXT',
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Something went wrong');
          setLoading(false);
          return;
        }
      }

      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit. Please try again.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h2>
        <p className="text-gray-600">
          Your testimonial has been submitted for review.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Show helpful message if multiple types are enabled */}
      {(allowText && allowVideo) || (allowText && allowScreenshot) || (allowVideo && allowScreenshot) ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            You can submit a {[
              allowText && 'written testimonial',
              allowVideo && 'video',
              allowScreenshot && 'screenshot'
            ].filter(Boolean).join(', or ')}!
          </p>
        </div>
      ) : null}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: textColor }}>
          Your Name *
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="John Smith"
          style={{ '::placeholder': { color: secondaryTextColor } } as any}
        />
      </div>

      {collectEmail && (
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: textColor }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
            style={{ '::placeholder': { color: secondaryTextColor } } as any}
          />
        </div>
      )}

      {(collectCompany || collectRole) && (
        <div className={collectCompany && collectRole ? "grid grid-cols-2 gap-4" : ""}>
          {collectCompany && (
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                Company
              </label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Acme Inc"
                style={{ '::placeholder': { color: secondaryTextColor } } as any}
              />
            </div>
          )}
          {collectRole && (
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                Role
              </label>
              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="CEO"
                style={{ '::placeholder': { color: secondaryTextColor } } as any}
              />
            </div>
          )}
        </div>
      )}

      {collectSocialLink && (
        <div>
          <label htmlFor="socialLink" className="block text-sm font-medium mb-1" style={{ color: textColor }}>
            Social Link
          </label>
          <input
            id="socialLink"
            type="url"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://twitter.com/yourhandle"
            style={{ '::placeholder': { color: secondaryTextColor } } as any}
          />
        </div>
      )}

      {/* Text testimonial field */}
      {allowText && (
        <div>
          <label htmlFor="testimonial" className="block text-sm font-medium mb-1" style={{ color: textColor }}>
            Written Testimonial {!allowVideo && '*'}
          </label>
          <textarea
            id="testimonial"
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            required={allowText && !allowVideo}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Share your experience..."
            style={{ '::placeholder': { color: secondaryTextColor } } as any}
          />
        </div>
      )}

      {/* Video testimonial field */}
      {allowVideo && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
            Video Testimonial {!allowText && '*'}
          </label>

          {!videoPreview ? (
            <VideoUploader
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              onUploadProgress={handleUploadProgress}
            />
          ) : (
            <div className="space-y-3">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  src={videoPreview}
                  controls
                  className="w-full"
                  style={{ maxHeight: '300px' }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setVideoUrl('');
                  setVideoPreview(null);
                  setUploadProgress(0);
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Remove video
              </button>
            </div>
          )}

          <p className="text-xs mt-2" style={{ color: secondaryTextColor }}>
            Tip: Keep your video under 2 minutes for best engagement
          </p>
        </div>
      )}

      {/* Screenshot testimonial field */}
      {allowScreenshot && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
            Screenshot {!allowText && !allowVideo && '*'}
          </label>

          {!screenshotUrl ? (
            <ScreenshotUploader
              onUploadComplete={handleScreenshotUploadComplete}
              onUploadError={handleUploadError}
              onUploadProgress={handleUploadProgress}
            />
          ) : (
            <div className="space-y-3">
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={screenshotUrl}
                  alt="Screenshot preview"
                  className="w-full h-auto"
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setScreenshotUrl('');
                  setUploadProgress(0);
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Remove screenshot
              </button>
            </div>
          )}

          {screenshotUrl && (
            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor="socialPlatform" className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                  Social Platform (Optional)
                </label>
                <select
                  id="socialPlatform"
                  value={socialPlatform}
                  onChange={(e) => setSocialPlatform(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select platform</option>
                  <option value="twitter">Twitter / X</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="socialAuthorUrl" className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                  Link to Original Post (Optional)
                </label>
                <input
                  id="socialAuthorUrl"
                  type="url"
                  value={socialAuthorUrl}
                  onChange={(e) => setSocialAuthorUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://twitter.com/..."
                  style={{ '::placeholder': { color: secondaryTextColor } } as any}
                />
              </div>
            </div>
          )}

          <p className="text-xs mt-2" style={{ color: secondaryTextColor }}>
            Upload a screenshot of a testimonial from social media (Twitter, LinkedIn, etc.)
          </p>
        </div>
      )}

      {collectRating && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <svg
                  className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">Uploading video...</span>
            <span className="text-sm text-blue-700">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {uploadProgress === 100 && videoPreview && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium text-green-800">Video uploaded successfully! You can now submit your testimonial.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || (uploadProgress > 0 && uploadProgress < 100)}
        className="w-full text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        style={{
          backgroundColor: primaryColor,
          borderColor: primaryColor
        }}
      >
        {loading ? 'Submitting...' : (uploadProgress > 0 && uploadProgress < 100) ? 'Uploading video...' : 'Submit Testimonial'}
      </button>
    </form>
  );
}
