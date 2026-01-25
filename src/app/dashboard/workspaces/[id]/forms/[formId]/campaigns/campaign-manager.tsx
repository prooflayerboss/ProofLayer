'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  customMessage: string | null;
  status: string;
  totalRecipients: number;
  sentCount: number;
  createdAt: Date;
  sentAt: Date | null;
  recipients: Array<{
    id: string;
    email: string;
    name: string | null;
    status: string;
  }>;
}

interface CampaignManagerProps {
  formId: string;
  workspaceId: string;
  formName: string;
  campaigns: Campaign[];
  senderName: string;
  senderCompany: string;
}

export default function CampaignManager({
  formId,
  workspaceId,
  formName,
  campaigns: initialCampaigns,
  senderName,
  senderCompany,
}: CampaignManagerProps) {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [subject, setSubject] = useState(`${senderName} would love your feedback`);
  const [customMessage, setCustomMessage] = useState('');
  const [csvText, setCsvText] = useState('');
  const [creating, setCreating] = useState(false);
  const [sending, setSending] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleCreateCampaign = async () => {
    if (!campaignName || !csvText) {
      setError('Please provide a campaign name and recipient list');
      return;
    }

    setCreating(true);
    setError('');

    try {
      // Parse CSV
      const lines = csvText.trim().split('\n');
      const recipients = lines
        .map((line) => {
          const parts = line.split(',').map(p => p.trim());
          if (parts.length === 0 || !parts[0].includes('@')) return null;

          return {
            email: parts[0],
            name: parts[1] || null,
          };
        })
        .filter(Boolean);

      if (recipients.length === 0) {
        setError('No valid email addresses found in CSV');
        setCreating(false);
        return;
      }

      const response = await fetch('/api/emails/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId,
          name: campaignName,
          subject,
          customMessage: customMessage || undefined,
          recipients,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create campaign');
      }

      // Refresh the page to show new campaign
      router.refresh();
      setShowCreateModal(false);
      resetForm();
    } catch (err: any) {
      setError(err.message || 'Failed to create campaign');
    } finally {
      setCreating(false);
    }
  };

  const handleSendCampaign = async (campaignId: string) => {
    if (!confirm('Send this campaign now? This will email all pending recipients.')) {
      return;
    }

    setSending(campaignId);
    setError('');

    try {
      const response = await fetch(`/api/emails/campaigns/${campaignId}/send`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send campaign');
      }

      // Refresh to show updated status
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to send campaign');
    } finally {
      setSending(null);
    }
  };

  const resetForm = () => {
    setCampaignName('');
    setSubject(`${senderName} would love your feedback`);
    setCustomMessage('');
    setCsvText('');
    setError('');
  };

  return (
    <div>
      {/* Header with Create Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Your Campaigns</h2>
          <p className="text-sm text-gray-500">
            Create and manage email campaigns for {formName}
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Campaign
        </button>
      </div>

      {/* Campaigns List */}
      {campaigns.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns yet</h3>
          <p className="text-gray-600 mb-4">
            Create your first email campaign to send testimonial requests to multiple customers
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create Campaign
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <p className="text-sm text-gray-500">Subject: {campaign.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  {campaign.status === 'DRAFT' && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      Draft
                    </span>
                  )}
                  {campaign.status === 'SENDING' && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Sending
                    </span>
                  )}
                  {campaign.status === 'COMPLETED' && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Completed
                    </span>
                  )}
                  {campaign.status === 'FAILED' && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      Failed
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Recipients</p>
                  <p className="text-2xl font-bold text-gray-900">{campaign.totalRecipients}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">Sent</p>
                  <p className="text-2xl font-bold text-blue-600">{campaign.sentCount}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="text-2xl font-bold text-green-600">
                    {campaign.totalRecipients > 0
                      ? Math.round((campaign.sentCount / campaign.totalRecipients) * 100)
                      : 0}%
                  </p>
                </div>
              </div>

              {campaign.status === 'DRAFT' && (
                <button
                  onClick={() => handleSendCampaign(campaign.id)}
                  disabled={sending === campaign.id}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending === campaign.id ? 'Sending...' : 'Send Campaign'}
                </button>
              )}

              <p className="text-xs text-gray-400 mt-4">
                Created {new Date(campaign.createdAt).toLocaleString()}
                {campaign.sentAt && ` • Sent ${new Date(campaign.sentAt).toLocaleString()}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Create Email Campaign</h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Q1 2024 Customer Outreach"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Message (optional)
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add a personal touch to your email..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipients (CSV) <span className="text-red-500">*</span>
                </label>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <p className="text-xs text-blue-900 font-medium mb-1">CSV Format:</p>
                  <p className="text-xs text-blue-800 font-mono mb-2">
                    email@example.com,Full Name
                  </p>
                  <p className="text-xs text-blue-700">
                    One recipient per line. Name is optional. No headers needed.
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <label className="cursor-pointer px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload CSV File
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const text = event.target?.result as string;
                            setCsvText(text);
                          };
                          reader.readAsText(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-gray-500">or paste/type below</span>
                </div>

                <textarea
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder="john@example.com,John Doe&#10;jane@example.com,Jane Smith&#10;bob@example.com"
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {csvText.trim().split('\n').filter(line => line.includes('@')).length} recipients found
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCampaign}
                  disabled={creating}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? 'Creating...' : 'Create Campaign'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
