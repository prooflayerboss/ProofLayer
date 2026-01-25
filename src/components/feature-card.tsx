'use client';

import { useState } from 'react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  details: string[];
  highlighted?: boolean;
};

export default function FeatureCard({
  icon,
  title,
  description,
  badge,
  details,
  highlighted = false,
}: FeatureCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
        highlighted ? 'border-2 border-purple-200' : 'border border-gray-100'
      }`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {badge && (
          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-600">{description}</p>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-0 right-0 bottom-full mb-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 rounded-xl shadow-2xl border border-gray-700">
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-gray-900 transform rotate-45 border-r border-b border-gray-700"></div>
            <ul className="space-y-2">
              {details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-100">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
