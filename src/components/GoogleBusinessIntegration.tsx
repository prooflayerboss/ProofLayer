'use client';

import { useState, useEffect } from 'react';

interface GoogleBusinessIntegrationProps {
  workspaceId: string;
  formId?: string; // Optional - for importing to specific form
}

export default function GoogleBusinessIntegration({ workspaceId, formId }: GoogleBusinessIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [integration, setIntegration] = useState<any>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Check if Google is connected on mount
  useEffect(() => {
    checkConnection();
  }, [workspaceId]);

  const checkConnection = async () => {
    try {
      const response = await fetch(`/api/integrations/google/status?workspaceId=${workspaceId}`);
      if (response.ok) {
        const data = await response.json();
        setIsConnected(data.connected);
        setIntegration(data.integration);
      }
    } catch (error) {
      console.error('Error checking Google connection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    // Redirect to Google OAuth
    window.location.href = `/api/integrations/google/connect?workspaceId=${workspaceId}`;
  };

  const handleImport = async () => {
    if (!formId) {
      setMessage({ type: 'error', text: 'Please select a form first' });
      return;
    }

    setIsImporting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/integrations/google/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspaceId, formId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful import
        if (data.imported === 0) {
          setMessage({
            type: 'success',
            text: `No new reviews to import. ${data.message || 'Your Google Business Profile may not have any reviews yet.'}`,
          });
        } else {
          setMessage({
            type: 'success',
            text: `Successfully imported ${data.imported} reviews from ${data.location || 'Google'}!`,
          });
          // Refresh the page after successful import to show new reviews
          setTimeout(() => window.location.reload(), 2000);
        }
      } else {
        // Show detailed error message
        let errorText = data.error || 'Failed to import reviews';
        if (data.details) {
          errorText += ` (${data.details})`;
        }
        if (data.hint) {
          errorText += ` ${data.hint}`;
        }
        setMessage({ type: 'error', text: errorText });

        // Log full error details for debugging
        console.error('Google import error:', data);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while importing reviews' });
    } finally {
      setIsImporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Google Icon */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Google Business Profile</h3>
            <p className="text-sm text-gray-500">
              {isConnected ? `Connected as ${integration?.accountName}` : 'Import reviews from Google'}
            </p>
          </div>
        </div>

        {/* Connection Status Badge */}
        {isConnected && (
          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Connected
          </span>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Actions */}
      {!isConnected ? (
        <button
          onClick={handleConnect}
          className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Connect Google Business
        </button>
      ) : (
        <div className="space-y-3">
          <button
            onClick={handleImport}
            disabled={isImporting || !formId}
            className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isImporting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Importing...
              </span>
            ) : (
              'Import Google Reviews'
            )}
          </button>

          {integration?.lastSyncAt && (
            <p className="text-xs text-gray-500 text-center">
              Last imported: {new Date(integration.lastSyncAt).toLocaleString()}
            </p>
          )}

          {!formId && (
            <p className="text-xs text-orange-600 text-center">
              ⚠️ Please select a form to import reviews
            </p>
          )}
        </div>
      )}

      {/* Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          {isConnected
            ? 'Click "Import Reviews" to sync your latest Google Business reviews.'
            : 'Connect your Google Business Profile to import your existing reviews in one click.'}
        </p>
      </div>
    </div>
  );
}
