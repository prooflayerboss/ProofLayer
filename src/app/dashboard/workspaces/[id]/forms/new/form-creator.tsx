'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductTour from '@/components/ProductTour';
import { Step } from 'react-joyride';

const TRANSLATIONS = {
  en: {
    name: 'Your Name',
    email: 'Email Address',
    company: 'Company Name',
    role: 'Your Role',
    socialLink: 'LinkedIn/Twitter Profile',
    rating: 'How would you rate your experience?',
    testimonial: 'Share your experience...',
    submit: 'Submit Testimonial',
  },
  es: {
    name: 'Tu Nombre',
    email: 'Correo Electrónico',
    company: 'Nombre de la Empresa',
    role: 'Tu Rol',
    socialLink: 'Perfil de LinkedIn/Twitter',
    rating: '¿Cómo calificarías tu experiencia?',
    testimonial: 'Comparte tu experiencia...',
    submit: 'Enviar Testimonio',
  },
  fr: {
    name: 'Votre Nom',
    email: 'Adresse Email',
    company: 'Nom de l\'Entreprise',
    role: 'Votre Rôle',
    socialLink: 'Profil LinkedIn/Twitter',
    rating: 'Comment évalueriez-vous votre expérience?',
    testimonial: 'Partagez votre expérience...',
    submit: 'Soumettre le Témoignage',
  },
  de: {
    name: 'Ihr Name',
    email: 'E-Mail-Adresse',
    company: 'Firmenname',
    role: 'Ihre Rolle',
    socialLink: 'LinkedIn/Twitter-Profil',
    rating: 'Wie würden Sie Ihre Erfahrung bewerten?',
    testimonial: 'Teilen Sie Ihre Erfahrung...',
    submit: 'Zeugnis Einreichen',
  },
};

interface FormCreatorProps {
  workspaceId: string;
  workspaceName: string;
  workspaceLogoUrl?: string | null;
  workspaceLogoShape?: string | null;
  onSubmit: (formData: FormData) => void;
  error?: string;
  canUseCustomColors?: boolean;
}

export default function FormCreator({
  workspaceId,
  workspaceName,
  workspaceLogoUrl,
  workspaceLogoShape,
  onSubmit,
  error,
  canUseCustomColors = false,
}: FormCreatorProps) {
  // Form settings
  const [name, setName] = useState('');
  const [headerTitle, setHeaderTitle] = useState('Share your feedback');
  const [customMessage, setCustomMessage] = useState('');

  // Tour state
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Start tour after component mounts (small delay for DOM to be ready)
    const timer = setTimeout(() => {
      setRunTour(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Colors
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#111827');
  const [secondaryTextColor, setSecondaryTextColor] = useState('#6B7280');

  // Language
  const [language, setLanguage] = useState<'en' | 'es' | 'fr' | 'de'>('en');

  // Collection preferences
  const [collectEmail, setCollectEmail] = useState(false);
  const [collectCompany, setCollectCompany] = useState(true);
  const [collectRole, setCollectRole] = useState(true);
  const [collectSocialLink, setCollectSocialLink] = useState(false);
  const [collectRating, setCollectRating] = useState(true);

  // Form types
  const [allowText, setAllowText] = useState(true);
  const [allowVideo, setAllowVideo] = useState(false);
  const [allowScreenshot, setAllowScreenshot] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('workspaceId', workspaceId);
    onSubmit(formData);
  };

  const t = TRANSLATIONS[language];

  // Tour steps
  const tourSteps: Step[] = [
    {
      target: 'body',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">Welcome to Form Creation! 🎉</h3>
          <p className="text-sm text-gray-600">
            You&apos;ve created your workspace <strong>{workspaceName}</strong>. Now let&apos;s create your first form to start collecting testimonials!
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="logo-preview"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Your Workspace Logo</h3>
          <p className="text-sm text-gray-600">
            This is your workspace logo. It will appear on all forms you create in this workspace.
          </p>
        </div>
      ),
      placement: 'left',
    },
    {
      target: '[data-tour="form-colors"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Customize Your Colors</h3>
          <p className="text-sm text-gray-600">
            {canUseCustomColors
              ? 'Personalize your form with custom colors to match your brand! Each form can have different colors.'
              : 'Custom colors are available on Pro and Agency plans. Upgrade to unlock this feature!'}
          </p>
        </div>
      ),
      placement: 'left',
    },
    {
      target: '[data-tour="collection-preferences"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Choose What to Collect</h3>
          <p className="text-sm text-gray-600">
            Select which information you want to collect from customers. You can customize this for each form!
          </p>
        </div>
      ),
      placement: 'left',
    },
    {
      target: '[data-tour="submission-types"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Submission Types</h3>
          <p className="text-sm text-gray-600">
            Choose which types of testimonials you want to accept: text, video, or screenshots from social media.
          </p>
        </div>
      ),
      placement: 'left',
    },
    {
      target: '[data-tour="live-preview"]',
      content: (
        <div>
          <h3 className="text-base font-semibold mb-2">Live Preview ✨</h3>
          <p className="text-sm text-gray-600">
            See exactly how your form will look to customers in real-time as you make changes!
          </p>
        </div>
      ),
      placement: 'left',
    },
    {
      target: 'body',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">You&apos;re All Set! 🚀</h3>
          <p className="text-sm text-gray-600 mb-3">
            Once you create your form, you&apos;ll get a unique link to share with customers. They can submit testimonials, and you&apos;ll be able to approve and display them on your website!
          </p>
          <p className="text-xs text-gray-500">
            You can skip this tour anytime or retake it from the help menu.
          </p>
        </div>
      ),
      placement: 'center',
    },
  ];

  return (
    <>
      <ProductTour
        tourId="form-creator"
        steps={tourSteps}
        run={runTour}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Form Configuration */}
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form Name */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Details</h2>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Form Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Client Feedback, Project Review"
              />
              <p className="mt-1 text-sm text-gray-500">
                For your reference only. Clients won&apos;t see this.
              </p>
            </div>
          </div>

          {/* Form Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Header</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="headerTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Header Title
                </label>
                <input
                  id="headerTitle"
                  name="headerTitle"
                  type="text"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your feedback"
                />
              </div>

              <div>
                <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Message (Optional)
                </label>
                <textarea
                  id="customMessage"
                  name="customMessage"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Add a personalized message to your customers..."
                />
              </div>
            </div>
          </div>

          {/* Colors */}
          <div data-tour="form-colors" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Colors</h2>

            {!canUseCustomColors && (
              <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  Custom colors are available on Pro and Agency plans. Using default blue theme.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="primaryColor"
                    name="primaryColor"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    disabled={!canUseCustomColors}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    disabled={!canUseCustomColors}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Background
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="backgroundColor"
                    name="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    disabled={!canUseCustomColors}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    disabled={!canUseCustomColors}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="textColor"
                    name="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    disabled={!canUseCustomColors}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    disabled={!canUseCustomColors}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="secondaryTextColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Text
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="secondaryTextColor"
                    name="secondaryTextColor"
                    type="color"
                    value={secondaryTextColor}
                    onChange={(e) => setSecondaryTextColor(e.target.value)}
                    disabled={!canUseCustomColors}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={secondaryTextColor}
                    onChange={(e) => setSecondaryTextColor(e.target.value)}
                    disabled={!canUseCustomColors}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Language</h2>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Form Language
              </label>
              <select
                id="language"
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'fr' | 'de')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>

          {/* Collection Preferences */}
          <div data-tour="collection-preferences" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Information to Collect
            </h2>

            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="collectEmail"
                  checked={collectEmail}
                  onChange={(e) => setCollectEmail(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    Email Address
                  </div>
                  <div className="text-sm text-gray-500">
                    Collect customer email for follow-ups
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="collectCompany"
                  checked={collectCompany}
                  onChange={(e) => setCollectCompany(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    Company Name
                  </div>
                  <div className="text-sm text-gray-500">
                    Show which company they work for
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="collectRole"
                  checked={collectRole}
                  onChange={(e) => setCollectRole(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    Job Title/Role
                  </div>
                  <div className="text-sm text-gray-500">
                    Collect their position or role
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="collectSocialLink"
                  checked={collectSocialLink}
                  onChange={(e) => setCollectSocialLink(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    Social Media Profile
                  </div>
                  <div className="text-sm text-gray-500">
                    LinkedIn or Twitter profile link
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="collectRating"
                  checked={collectRating}
                  onChange={(e) => setCollectRating(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    Star Rating
                  </div>
                  <div className="text-sm text-gray-500">
                    Ask for a 1-5 star rating
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Form Types */}
          <div data-tour="submission-types" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Submission Types
            </h2>

            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="allowText"
                  checked={allowText}
                  onChange={(e) => setAllowText(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    Text Testimonials
                  </div>
                  <div className="text-sm text-gray-500">
                    Allow written testimonials
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="allowVideo"
                  checked={allowVideo}
                  onChange={(e) => setAllowVideo(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    Video Testimonials
                  </div>
                  <div className="text-sm text-gray-500">
                    Allow video uploads or recordings
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="allowScreenshot"
                  checked={allowScreenshot}
                  onChange={(e) => setAllowScreenshot(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    Screenshot Upload
                  </div>
                  <div className="text-sm text-gray-500">
                    Import from social media (Twitter, LinkedIn, etc.)
                  </div>
                </div>
              </label>
            </div>

            {!allowText && !allowVideo && !allowScreenshot && (
              <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  You must enable at least one submission type.
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={!allowText && !allowVideo && !allowScreenshot}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Form
            </button>
            <a
              href={`/dashboard/workspaces/${workspaceId}`}
              className="text-gray-600 hover:text-gray-700 text-sm font-medium"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>

      {/* Right: Live Preview */}
      <div data-tour="live-preview" className="lg:sticky lg:top-6 h-fit">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Live Preview</h3>

          <div
            className="rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundColor }}
          >
            {/* Header with Logo */}
            <div className="p-8 text-center border-b" style={{ borderColor: secondaryTextColor + '20' }}>
              {workspaceLogoUrl && (
                <div className="flex justify-center mb-4">
                  <div data-tour="logo-preview"
                    className={`relative overflow-hidden ${
                      workspaceLogoShape === 'circle' ? 'rounded-full' : workspaceLogoShape === 'square' ? 'rounded-lg' : ''
                    }`}
                    style={{
                      width: workspaceLogoShape === 'rectangle' ? 'auto' : '80px',
                      height: '80px',
                      maxWidth: workspaceLogoShape === 'rectangle' ? '200px' : '80px',
                    }}
                  >
                    <Image
                      src={workspaceLogoUrl}
                      alt={workspaceName}
                      width={200}
                      height={80}
                      className={`${
                        workspaceLogoShape === 'rectangle'
                          ? 'h-full w-auto object-contain'
                          : 'w-full h-full object-cover'
                      }`}
                    />
                  </div>
                </div>
              )}

              <h1 className="text-2xl font-bold mb-2" style={{ color: textColor }}>
                {headerTitle || 'Share your feedback'}
              </h1>

              {customMessage && (
                <p className="text-sm" style={{ color: secondaryTextColor }}>
                  {customMessage}
                </p>
              )}
            </div>

            {/* Form Fields */}
            <div className="p-8 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                  {t.name} <span style={{ color: primaryColor }}>*</span>
                </label>
                <div className="w-full h-10 border rounded-lg" style={{ borderColor: secondaryTextColor + '40' }}></div>
              </div>

              {collectEmail && (
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                    {t.email}
                  </label>
                  <div className="w-full h-10 border rounded-lg" style={{ borderColor: secondaryTextColor + '40' }}></div>
                </div>
              )}

              {collectCompany && (
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                    {t.company}
                  </label>
                  <div className="w-full h-10 border rounded-lg" style={{ borderColor: secondaryTextColor + '40' }}></div>
                </div>
              )}

              {collectRole && (
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                    {t.role}
                  </label>
                  <div className="w-full h-10 border rounded-lg" style={{ borderColor: secondaryTextColor + '40' }}></div>
                </div>
              )}

              {collectSocialLink && (
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                    {t.socialLink}
                  </label>
                  <div className="w-full h-10 border rounded-lg" style={{ borderColor: secondaryTextColor + '40' }}></div>
                </div>
              )}

              {collectRating && (
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                    {t.rating}
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-8 h-8 rounded" style={{ backgroundColor: secondaryTextColor + '20' }}></div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: textColor }}>
                  {t.testimonial} <span style={{ color: primaryColor }}>*</span>
                </label>
                <div className="w-full h-24 border rounded-lg" style={{ borderColor: secondaryTextColor + '40' }}></div>
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: primaryColor }}
              >
                {t.submit}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
