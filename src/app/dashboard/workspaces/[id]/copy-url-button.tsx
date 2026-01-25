'use client';

import { useState } from 'react';

export default function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    // Mark link as shared in localStorage for checklist tracking
    localStorage.setItem('prooflayer_link_shared', 'true');

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 transition-colors flex-shrink-0"
    >
      {copied ? 'Copied!' : 'Copy URL'}
    </button>
  );
}
