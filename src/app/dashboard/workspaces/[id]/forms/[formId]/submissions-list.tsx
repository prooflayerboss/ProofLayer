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
};

export default function SubmissionsList({
  submissions: initialSubmissions,
}: {
  submissions: Submission[];
}) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [loading, setLoading] = useState<string | null>(null);

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
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
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

      {/* Submissions list */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-gray-900">{submission.name}</p>
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

            <p className="text-gray-700 mt-3 mb-4">{submission.testimonial}</p>

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