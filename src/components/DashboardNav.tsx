'use client';

import Link from 'next/link';
import Image from 'next/image';
import HelpMenu from './HelpMenu';

export default function DashboardNav() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 transition-transform group-hover:scale-105">
                <Image
                  src="/logos/prooflayer-icon-only.svg"
                  alt="ProofLayer"
                  width={36}
                  height={36}
                  className="w-full h-full"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProofLayer
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/workspaces"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Workspaces
              </Link>
              <Link
                href="/dashboard/widgets"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Widgets
              </Link>
              <Link
                href="/dashboard/billing"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Billing
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <HelpMenu />
            <Link
              href="/dashboard/account"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden sm:inline">My Account</span>
            </Link>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
