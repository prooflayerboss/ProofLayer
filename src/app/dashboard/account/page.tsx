import { redirect } from 'next/navigation';
import { ensureUserExists } from '@/actions/user';
import { prisma } from '@/lib/prisma';
import AccountForm from './account-form';
import RestartOnboardingButton from './restart-onboarding-button';

export default async function AccountPage() {
  const user = await ensureUserExists();

  if (!user) {
    redirect('/login');
  }

  // Fetch full user profile from database
  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      businessName: true,
      businessType: true,
      website: true,
      onboardingCompleted: true,
    },
  });

  if (!profile) {
    redirect('/login');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Account</h1>

      <div className="max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
          <AccountForm profile={profile} />
        </div>

        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Account Information</h3>
              <p className="text-sm text-blue-800">
                Your email is managed through your authentication provider. To change your email, please contact support at support@prooflayer.app
              </p>
            </div>
          </div>
        </div>

        {/* Onboarding Section */}
        {profile.onboardingCompleted && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-sm text-gray-600 mb-4">
              Need help setting up a new workspace and form? Run the setup wizard again.
            </p>
            <RestartOnboardingButton />
          </div>
        )}
      </div>
    </div>
  );
}
