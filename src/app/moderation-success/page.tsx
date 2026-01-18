import Link from 'next/link';

export default function ModerationSuccessPage({
  searchParams,
}: {
  searchParams: { action?: string; workspace?: string; already?: string };
}) {
  const action = searchParams.action;
  const workspaceId = searchParams.workspace;
  const alreadyModerated = searchParams.already;

  const isApprove = action === 'approve';
  const actionText = isApprove ? 'approved' : 'rejected';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          {/* Success Icon */}
          <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isApprove ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isApprove ? (
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          {/* Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {alreadyModerated ? 'Already Moderated' : `Testimonial ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`}
          </h1>
          <p className="text-gray-600 mb-6">
            {alreadyModerated
              ? `This testimonial was already ${alreadyModerated}. No changes were made.`
              : `The testimonial has been successfully ${actionText}.`}
          </p>

          {/* Actions */}
          <div className="space-y-3">
            {workspaceId && (
              <Link
                href={`/dashboard/workspaces/${workspaceId}/submissions`}
                className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Submissions
              </Link>
            )}
            <Link
              href="/dashboard"
              className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Info */}
          <p className="mt-6 text-xs text-gray-500">
            You can close this window and return to your email.
          </p>
        </div>
      </div>
    </div>
  );
}
