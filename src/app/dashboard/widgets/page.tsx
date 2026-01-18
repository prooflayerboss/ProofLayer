import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ensureUserExists } from '@/actions/user';
import { getWorkspaces } from '@/actions/workspaces';
import EnhancedWidgetConfigurator from './enhanced-widget-configurator';

export default async function WidgetsPage() {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  const workspaces = await getWorkspaces();

  if (workspaces.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Widgets</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No workspaces yet</h2>
          <p className="text-gray-600 mb-6">Create a workspace first to embed testimonial widgets.</p>
          <Link
            href="/dashboard/workspaces/new"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Create Workspace
          </Link>
        </div>
      </div>
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const userPlan = user.entitlement?.plan || 'TRIAL';

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Widgets</h1>
      <EnhancedWidgetConfigurator workspaces={workspaces} appUrl={appUrl} userPlan={userPlan} />
    </div>
  );
}