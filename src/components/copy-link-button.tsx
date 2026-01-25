'use client';

import { useState } from 'react';

interface CopyLinkButtonProps {
  text: string;
  label?: string;
}

export default function CopyLinkButton({ text, label = 'Copy' }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Mark link as shared in localStorage for checklist tracking
      localStorage.setItem('prooflayer_link_shared', 'true');

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
    >
      {copied ? 'Copied!' : label}
    </button>
  );
}
