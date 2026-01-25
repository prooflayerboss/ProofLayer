'use client';

import { useState } from 'react';
import { updateSubmissionStatus, deleteSubmission } from '@/actions/submissions';

type Submission = {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  testimonial: string;
  rating: number | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  submissionType: 'TEXT' | 'VIDEO' | 'SCREENSHOT';
  videoUrl: string | null;
  videoThumbnail: string | null;
  videoDuration: number | null;
  photoUrl: string | null;
  socialPlatform: string | null;
  socialAuthorUrl: string | null;
};

export default function SubmissionsList({
  submissions: initialSubmissions,
  formId,
}: {
  submissions: Submission[];
  formId: string;
}) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [loading, setLoading] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  // Debug: log submissions to see what data we're receiving
  console.log('Submissions data:', initialSubmissions);
  if (initialSubmissions.length > 0) {
    console.log('First submission details:', {
      name: initialSubmissions[0].name,
      submissionType: initialSubmissions[0].submissionType,
      videoUrl: initialSubmissions[0].videoUrl,
      hasVideoUrl: !!initialSubmissions[0].videoUrl,
    });
  }

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === 'ALL') return true;
    return s.status === filter;
  });

  const handleStatusChange = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    setLoading(id);
    const result = await updateSubmissionStatus(id, status);
    if (result.success) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
    }
    setLoading(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    setLoading(id);
    const result = await deleteSubmission(id);
    if (result.success) {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    }
    setLoading(null);
  };

  const handleExport = async (format: 'csv' | 'json') => {
    setExporting(true);
    try {
      const statusParam = filter !== 'ALL' ? `&status=${filter}` : '';
      const response = await fetch(`/api/forms/${formId}/export?format=${format}${statusParam}`);

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Get the blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : `testimonials.${format}`;

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export testimonials. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
    );
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No submissions yet. Share your form link to start collecting testimonials!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter tabs and Export buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filter === status
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'ALL' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Export buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('csv')}
            disabled={exporting || submissions.length === 0}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export testimonials as CSV"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {exporting ? 'Exporting...' : 'CSV'}
          </button>
          <button
            onClick={() => handleExport('json')}
            disabled={exporting || submissions.length === 0}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export testimonials as JSON"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {exporting ? 'Exporting...' : 'JSON'}
          </button>
        </div>
      </div>

      {/* Submissions list */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{submission.name}</p>
                  {submission.submissionType === 'VIDEO' && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Video
                    </span>
                  )}
                  {submission.submissionType === 'SCREENSHOT' && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Screenshot
                    </span>
                  )}
                </div>
                {(submission.company || submission.role) && (
                  <p className="text-sm text-gray-500">
                    {submission.role}{submission.role && submission.company && ' at '}{submission.company}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {submission.status === 'PENDING' && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                    Pending
                  </span>
                )}
                {submission.status === 'APPROVED' && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Approved
                  </span>
                )}
                {submission.status === 'REJECTED' && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    Rejected
                  </span>
                )}
              </div>
            </div>

            {renderStars(submission.rating)}

            {/* Video testimonial with text */}
            {submission.submissionType === 'VIDEO' && submission.videoUrl ? (
              <div className="mt-3 mb-4">
                <div className="mb-3 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3 flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-purple-900">Premium Video Testimonial</p>
                    <p className="text-xs text-purple-700">{submission.name} took the time to record a personal video review!</p>
                  </div>
                </div>

                {/* Video player */}
                <div className="mb-4">
                  <video
                    src={submission.videoUrl}
                    controls
                    className="w-full rounded-lg shadow-md border border-gray-200"
                    style={{ maxHeight: '400px' }}
                    preload="metadata"
                  />
                </div>

                {/* Text testimonial - shown prominently below video */}
                {submission.testimonial && submission.testimonial.trim() && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Written testimonial:</p>
                    <p className="text-gray-900 leading-relaxed">{submission.testimonial}</p>
                  </div>
                )}
              </div>
            ) : submission.submissionType === 'SCREENSHOT' && submission.photoUrl ? (
              /* Screenshot testimonial */
              <div className="mt-3 mb-4">
                <div className="mb-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Social Media Screenshot</p>
                    <p className="text-xs text-blue-700">
                      {submission.socialPlatform && `From ${submission.socialPlatform}`}
                      {submission.socialAuthorUrl && (
                        <a href={submission.socialAuthorUrl} target="_blank" rel="noopener noreferrer" className="ml-1 underline">
                          View original
                        </a>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0" style={{ width: '100%', maxWidth: '400px' }}>
                    <img
                      src={submission.photoUrl}
                      alt="Screenshot"
                      className="w-full rounded-lg shadow-md border border-gray-200"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Text testimonial only */
              <p className="text-gray-700 mt-3 mb-4">{submission.testimonial}</p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                {new Date(submission.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                {submission.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleStatusChange(submission.id, 'APPROVED')}
                    disabled={loading === submission.id}
                    className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                  >
                    Approve
                  </button>
                )}
                {submission.status !== 'REJECTED' && (
                  <button
                    onClick={() => handleStatusChange(submission.id, 'REJECTED')}
                    disabled={loading === submission.id}
                    className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                )}
                <button
                  onClick={() => handleDelete(submission.id)}
                  disabled={loading === submission.id}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No {filter.toLowerCase()} submissions.
        </p>
      )}
    </div>
  );
}