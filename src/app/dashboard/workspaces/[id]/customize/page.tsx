import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ensureUserExists } from '@/actions/user';
import { getWorkspace } from '@/actions/workspaces';
import CustomizeForm from './customize-form';

export default async function CustomizeWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const workspace = await getWorkspace(id);

  if (!workspace) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/dashboard/workspaces/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Workspace
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customize Wall of Love</h1>
        <p className="text-gray-600 mt-1">
          Personalize your public testimonials page with your branding
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <CustomizeForm workspace={workspace} />
      </div>

      {workspace.slug && (
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Preview your changes:</strong>{' '}
            <a
              href={`/w/${workspace.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Open Wall of Love page
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
