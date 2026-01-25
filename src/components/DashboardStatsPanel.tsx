'use client';

interface StatsPanelProps {
  userName: string;
  plan: string;
  submissionsUsed: number;
  maxSubmissions: number;
  workspacesUsed: number;
  maxWorkspaces: number;
  totalWidgetViews: number;
  recentActivity?: { period: string; count: number }[];
}

export default function DashboardStatsPanel({
  userName,
  plan,
  submissionsUsed,
  maxSubmissions,
  workspacesUsed,
  maxWorkspaces,
  totalWidgetViews,
  recentActivity = [],
}: StatsPanelProps) {
  const submissionPercentage = Math.min((submissionsUsed / maxSubmissions) * 100, 100);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-80 flex-shrink-0 space-y-6">
      {/* Usage Stats Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-gray-900">Usage</h3>
          <span className="text-xs text-gray-400">{plan}</span>
        </div>

        {/* Circular Progress */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#f3f4f6"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${submissionPercentage * 3.52} 352`}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{Math.round(submissionPercentage)}%</span>
              <span className="text-xs text-gray-500">used</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-lg font-bold text-gray-900">{submissionsUsed}</p>
            <p className="text-xs text-gray-500">Submissions</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-lg font-bold text-gray-900">{workspacesUsed}</p>
            <p className="text-xs text-gray-500">Workspaces</p>
          </div>
        </div>
      </div>

      {/* Greeting Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
            {getInitials(userName)}
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{getGreeting()} {userName.split(' ')[0]}!</p>
            <p className="text-sm text-gray-500">Let's grow your social proof</p>
          </div>
        </div>
      </div>

      {/* Widget Views Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Widget Views</h3>
          <span className="text-xs text-blue-600 font-medium">All time</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-gray-900">{totalWidgetViews.toLocaleString()}</span>
          <span className="text-sm text-gray-500">views</span>
        </div>

        {/* Mini Chart */}
        {recentActivity.length > 0 ? (
          <div className="flex items-end gap-2 h-16">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-violet-500 rounded-t-md"
                  style={{ height: `${Math.max((item.count / Math.max(...recentActivity.map(a => a.count))) * 100, 10)}%` }}
                ></div>
                <span className="text-[10px] text-gray-400">{item.period}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-end gap-2 h-16">
            {[30, 45, 25, 60, 40, 55, 35].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-blue-200 to-violet-200 rounded-t-md opacity-50"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Tips Card */}
      <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Pro Tip</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Add your widget to high-traffic pages for maximum impact. Product pages and landing pages work best!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
