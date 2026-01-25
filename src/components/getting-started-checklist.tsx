'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ChecklistProps {
  hasWorkspace: boolean;
  hasForm: boolean;
  hasApprovedSubmission: boolean;
  firstWorkspaceId?: string;
  firstFormId?: string;
}

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  actionLink: string;
  actionText: string;
}

export default function GettingStartedChecklist({
  hasWorkspace,
  hasForm,
  hasApprovedSubmission,
  firstWorkspaceId,
  firstFormId,
}: ChecklistProps) {
  const [hasSharedLink, setHasSharedLink] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Check localStorage for link sharing status
  useEffect(() => {
    const shared = localStorage.getItem('prooflayer_link_shared');
    if (shared === 'true') {
      setHasSharedLink(true);
    }
  }, []);

  // Track link sharing when user copies or shares
  const markLinkAsShared = () => {
    localStorage.setItem('prooflayer_link_shared', 'true');
    setHasSharedLink(true);
  };

  const checklistItems: ChecklistItem[] = [
    {
      id: 'workspace',
      title: 'Create a workspace for your client or project',
      completed: hasWorkspace,
      actionLink: '/dashboard/workspaces/new',
      actionText: 'Create workspace',
    },
    {
      id: 'form',
      title: 'Create a form to collect testimonials',
      completed: hasForm,
      actionLink: firstWorkspaceId
        ? `/dashboard/workspaces/${firstWorkspaceId}`
        : '/dashboard/workspaces/new',
      actionText: hasWorkspace ? 'Create form' : 'Create workspace first',
    },
    {
      id: 'share',
      title: 'Share the form link with your clients',
      completed: hasSharedLink && hasForm,
      actionLink: firstWorkspaceId && firstFormId
        ? `/dashboard/workspaces/${firstWorkspaceId}/forms/${firstFormId}`
        : '/dashboard/workspaces',
      actionText: hasForm ? 'Get share link' : 'Create form first',
    },
    {
      id: 'approve',
      title: 'Approve submissions and embed the widget',
      completed: hasApprovedSubmission,
      actionLink: firstWorkspaceId
        ? `/dashboard/workspaces/${firstWorkspaceId}`
        : '/dashboard/workspaces',
      actionText: 'View submissions',
    },
  ];

  const completedCount = checklistItems.filter(item => item.completed).length;
  const allComplete = completedCount === checklistItems.length;
  const progressPercentage = (completedCount / checklistItems.length) * 100;

  // Show celebration when all items are complete
  useEffect(() => {
    if (allComplete && !showCelebration) {
      setShowCelebration(true);
      // Auto-hide celebration after 5 seconds
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [allComplete, showCelebration]);

  // If all complete and celebration dismissed, show compact success state
  if (allComplete && !showCelebration) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All set!</h2>
            <p className="text-sm text-gray-600">You've completed all getting started steps.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Celebration State */}
      {showCelebration && (
        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-2xl">🎉</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Congratulations!</h3>
              <p className="text-sm text-green-700">
                You've completed all getting started steps. You're all set to collect amazing testimonials!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header with Progress */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Getting Started</h2>
        <span className="text-sm text-gray-500">{completedCount}/{checklistItems.length} complete</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Checklist Items */}
      <ol className="space-y-3">
        {checklistItems.map((item, index) => (
          <li key={item.id} className="flex items-start gap-3">
            {/* Status Icon */}
            {item.completed ? (
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-medium text-blue-600">{index + 1}</span>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                  {item.title}
                </span>

                {/* Action Link - only show for incomplete items */}
                {!item.completed && (
                  <Link
                    href={item.actionLink}
                    onClick={() => {
                      // Mark link as shared when navigating to share page
                      if (item.id === 'share' && hasForm) {
                        markLinkAsShared();
                      }
                    }}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap flex items-center gap-1"
                  >
                    {item.actionText}
                    <span>→</span>
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
