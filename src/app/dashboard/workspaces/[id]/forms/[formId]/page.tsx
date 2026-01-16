import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { getForm } from '@/actions/forms';
import SubmissionsList from './submissions-list';

export default async function FormDetailPage({
  params,
}: {
  params: { id: string; formId: string };
}) {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const form = await getForm(params.formId);

  if (!form) {
    notFound();
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const publicUrl = `${appUrl}/f/${form.slug}`;

  const pendingCount = form.submissions.filter(s => s.status === 'PENDING').length;
  const approvedCount = form.submissions.filter(s => s.status === 'APPROVED').length;
  const rejectedCount = form.submissions.filter(s => s.status === 'REJECTED').length;

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/dashboard/workspaces/${params.id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {form.workspace.name}
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{form.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {form.isActive ? (
              <span className="text-green-600">● Active</span>
            ) : (
              <span className="text-gray-400">● Inactive</span>
            )}
          </p>
        </div>
      </div>

      {/* Form Link Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Public Form Link</h2>
        <p className="text-sm text-gray-600 mb-4">Share this link with your clients to collect testimonials:</p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            readOnly
            value={publicUrl}
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700"
          />
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Open
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
        </div>
      </div>

      {/* Submissions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Submissions</h2>
        <SubmissionsList submissions={form.submissions} />
      </div>
    </div>
  );
}