'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ImportTestimonialsProps {
  formId: string;
}

type ImportSource = 'linkedin' | 'google' | 'manual';

interface ImportedTestimonial {
  name: string;
  company?: string;
  role?: string;
  testimonial: string;
  rating?: number;
  source: ImportSource;
}

export default function ImportTestimonials({ formId }: ImportTestimonialsProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [source, setSource] = useState<ImportSource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [rating, setRating] = useState<number>(5);

  const resetForm = () => {
    setStep(1);
    setSource(null);
    setName('');
    setCompany('');
    setRole('');
    setTestimonial('');
    setRating(5);
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleSourceSelect = (selectedSource: ImportSource) => {
    setSource(selectedSource);
    setStep(2);
  };

  const handleImport = async () => {
    if (!name.trim() || !testimonial.trim()) {
      setError('Name and testimonial text are required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/submissions/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId,
          name: name.trim(),
          company: company.trim() || undefined,
          role: role.trim() || undefined,
          testimonial: testimonial.trim(),
          rating: source === 'google' ? rating : undefined,
          importSource: source,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to import testimonial');
      }

      setSuccess(true);
      router.refresh();

      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const sourceOptions = [
    {
      id: 'linkedin' as ImportSource,
      name: 'LinkedIn Recommendation',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      description: 'Copy a recommendation from your LinkedIn profile',
      color: 'blue',
    },
    {
      id: 'google' as ImportSource,
      name: 'Google Review',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      description: 'Import a review from Google Business Profile',
      color: 'green',
    },
    {
      id: 'manual' as ImportSource,
      name: 'Manual Entry',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      description: 'Manually enter testimonial from any source',
      color: 'gray',
    },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Import Existing
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">
              {step === 1 ? '📥' : source === 'linkedin' ? '💼' : source === 'google' ? '⭐' : '✏️'}
            </span>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2 className="text-2xl font-bold">
            {step === 1 ? 'Import Existing Testimonial' : `Import from ${sourceOptions.find(s => s.id === source)?.name}`}
          </h2>
          <p className="text-blue-100 mt-1 text-sm">
            {step === 1
              ? 'Bring in testimonials you already have from other platforms'
              : 'Fill in the details from your existing testimonial'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success State */}
          {success && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Testimonial Imported!</h3>
              <p className="text-gray-600">It's been added to your pending submissions for review.</p>
            </div>
          )}

          {/* Step 1: Choose Source */}
          {step === 1 && !success && (
            <div className="space-y-3">
              {sourceOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSourceSelect(option.id)}
                  className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left group"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    option.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    option.color === 'green' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {option.name}
                    </p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Enter Details */}
          {step === 2 && !success && (
            <div className="space-y-4">
              {/* Helper text based on source */}
              <div className={`p-3 rounded-lg text-sm ${
                source === 'linkedin' ? 'bg-blue-50 text-blue-800' :
                source === 'google' ? 'bg-green-50 text-green-800' :
                'bg-gray-50 text-gray-800'
              }`}>
                {source === 'linkedin' && (
                  <p>Go to your LinkedIn profile → Recommendations → Copy the text and paste below.</p>
                )}
                {source === 'google' && (
                  <p>Copy the review text from your Google Business Profile and paste below.</p>
                )}
                {source === 'manual' && (
                  <p>Enter the testimonial details from any source (email, message, etc.)</p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., John Smith"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Company & Role */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g., Acme Inc"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role/Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., CEO"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Rating (for Google reviews) */}
              {source === 'google' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Star Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Paste or type the testimonial here..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step === 2 && (
              <button
                onClick={handleImport}
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Importing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Import Testimonial
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
