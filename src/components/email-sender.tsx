'use client';

import { useState, useMemo } from 'react';

interface EmailSenderProps {
  formUrl: string;
  formId: string;
  senderName: string;
  senderCompany?: string;
}

type TemplateId = 'friendly' | 'professional' | 'quick';

interface EmailTemplate {
  id: TemplateId;
  name: string;
  description: string;
  subject: string;
  body: string;
}

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'friendly',
    name: 'Friendly Request',
    description: 'Warm, personal tone - great for clients you have a good relationship with',
    subject: 'Quick favor - Would you share your experience?',
    body: `Hi {{recipientName}},

I hope you're doing well! I wanted to reach out because your feedback means a lot to me.

If you've had a positive experience working with {{senderCompany}}, would you mind taking 2 minutes to share your thoughts? Your testimonial would really help others learn about what we do.

Just click the link below to leave your feedback:
{{formUrl}}

No pressure at all - I totally understand if you're busy. But if you do have a moment, I'd really appreciate it!

Thanks so much,
{{senderName}}`,
  },
  {
    id: 'professional',
    name: 'Professional Request',
    description: 'Formal tone - ideal for B2B clients or corporate relationships',
    subject: 'Request for Testimonial - {{senderCompany}}',
    body: `Dear {{recipientName}},

I hope this message finds you well. I am reaching out to request a brief testimonial about your experience working with {{senderCompany}}.

Your feedback is invaluable in helping us improve our services and assisting potential clients in their decision-making process. If you could spare a few minutes, we would greatly appreciate your honest review.

Please use the following link to submit your testimonial:
{{formUrl}}

Thank you for your time and continued partnership.

Best regards,
{{senderName}}
{{senderCompany}}`,
  },
  {
    id: 'quick',
    name: 'Quick & Casual',
    description: 'Short and direct - perfect for busy contacts or follow-ups',
    subject: 'Got 2 minutes? Quick testimonial request',
    body: `Hey {{recipientName}}!

Quick ask - would you mind leaving a short testimonial about working with us?

It takes about 2 minutes: {{formUrl}}

Would mean a lot! Thanks!

{{senderName}}`,
  },
];

export default function EmailSender({ formUrl, formId, senderName, senderCompany }: EmailSenderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('friendly');
  const [email, setEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<'subject' | 'body' | null>(null);
  const [view, setView] = useState<'templates' | 'preview'>('templates');

  const template = EMAIL_TEMPLATES.find(t => t.id === selectedTemplate)!;

  // Replace placeholders with actual values
  const processedEmail = useMemo(() => {
    const replacements: Record<string, string> = {
      '{{recipientName}}': recipientName || '[Recipient Name]',
      '{{senderName}}': senderName || '[Your Name]',
      '{{senderCompany}}': senderCompany || '[Your Company]',
      '{{formUrl}}': formUrl,
    };

    let subject = template.subject;
    let body = template.body;

    Object.entries(replacements).forEach(([placeholder, value]) => {
      subject = subject.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
      body = body.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
    });

    return { subject, body };
  }, [template, recipientName, senderName, senderCompany, formUrl]);

  const handleCopy = async (type: 'subject' | 'body') => {
    try {
      const text = type === 'subject' ? processedEmail.subject : processedEmail.body;
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const fullEmail = `Subject: ${processedEmail.subject}\n\n${processedEmail.body}`;
      await navigator.clipboard.writeText(fullEmail);
      setCopied('body');
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenMailto = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(processedEmail.subject)}&body=${encodeURIComponent(processedEmail.body)}`;
    window.open(mailtoLink, '_blank');
  };

  const handleSend = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/emails/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId,
          recipientEmail: email,
          recipientName: recipientName || undefined,
          templateId: selectedTemplate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setSuccess(true);
      setEmail('');
      setRecipientName('');

      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
        setView('templates');
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send email';
      setError(errorMessage);
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setView('templates');
    setEmail('');
    setRecipientName('');
    setError('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Send Email Request
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Send Testimonial Request</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {view === 'templates' ? 'Choose a template and customize your message' : 'Preview and send your email'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-semibold text-green-800">Email sent successfully!</p>
              <p className="text-sm text-green-700 mt-1">Your testimonial request has been delivered.</p>
            </div>
          ) : view === 'templates' ? (
            <>
              {/* Template Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose a Template
                </label>
                <div className="space-y-3">
                  {EMAIL_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedTemplate === tmpl.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${selectedTemplate === tmpl.id ? 'text-blue-900' : 'text-gray-900'}`}>
                            {tmpl.name}
                          </p>
                          <p className={`text-sm mt-0.5 ${selectedTemplate === tmpl.id ? 'text-blue-700' : 'text-gray-500'}`}>
                            {tmpl.description}
                          </p>
                        </div>
                        {selectedTemplate === tmpl.id && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="customer@example.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Name <span className="text-gray-400">(optional but recommended)</span>
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Adding a name personalizes the email and increases response rates.</p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </>
          ) : (
            /* Preview View */
            <>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Subject Line</label>
                  <button
                    onClick={() => handleCopy('subject')}
                    className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                      copied === 'subject'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {copied === 'subject' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-800">{processedEmail.subject}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Email Body</label>
                  <button
                    onClick={() => handleCopy('body')}
                    className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                      copied === 'body'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {copied === 'body' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">{processedEmail.body}</pre>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Sending to:</strong> {email || '[No email entered]'}
                  {recipientName && <span className="text-blue-600"> ({recipientName})</span>}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            {view === 'templates' ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!email || !email.includes('@')) {
                      setError('Please enter a valid email address');
                      return;
                    }
                    setError('');
                    setView('preview');
                  }}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Preview Email
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setView('templates')}
                    className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCopyAll}
                    className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy All
                  </button>
                  <button
                    onClick={handleOpenMailto}
                    className="flex-1 px-4 py-2.5 border border-blue-200 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in Email App
                  </button>
                </div>
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send via ProofLayer
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-gray-500">
                  Sending via ProofLayer tracks delivery and helps you follow up.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
