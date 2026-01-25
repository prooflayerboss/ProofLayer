import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import TestimonialForm from './testimonial-form';
import { PLAN_LIMITS } from '@/lib/constants';

export default async function PublicFormPage({
  params,
}: {
  params: { slug: string };
}) {
  const form = await prisma.form.findUnique({
    where: { slug: params.slug },
    include: {
      workspace: {
        include: {
          user: {
            include: {
              entitlement: true,
            },
          },
        },
      },
    },
  });

  if (!form || !form.isActive) {
    notFound();
  }

  // Get customization from form
  const backgroundColor = form.backgroundColor || '#FFFFFF';
  const textColor = form.textColor || '#111827';
  const secondaryTextColor = form.secondaryTextColor || '#6B7280';
  const headerTitle = form.headerTitle || 'Share your feedback';
  const customMessage = form.customMessage;
  const logoUrl = form.workspace.logoUrl;
  const logoShape = (form.workspace as any).logoShape || 'rectangle';
  const workspaceName = form.workspace.name;

  // Check if we should show badge
  const plan = form.workspace.user.entitlement?.plan || 'TRIAL';
  const showBadge = PLAN_LIMITS[plan].showBadge;

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="max-w-lg mx-auto">
        <div
          className="rounded-2xl shadow-sm border border-gray-200 p-8"
          style={{ backgroundColor }}
        >
          {/* Header with Logo */}
          <div className="text-center mb-8">
            {logoUrl && (
              <div className="flex justify-center mb-4">
                <div
                  className={`relative overflow-hidden ${
                    logoShape === 'circle' ? 'rounded-full' : logoShape === 'square' ? 'rounded-lg' : ''
                  }`}
                  style={{
                    width: logoShape === 'rectangle' ? 'auto' : '80px',
                    height: '80px',
                    maxWidth: logoShape === 'rectangle' ? '200px' : '80px',
                  }}
                >
                  <Image
                    src={logoUrl}
                    alt={workspaceName}
                    width={200}
                    height={80}
                    className={`${
                      logoShape === 'rectangle'
                        ? 'h-full w-auto object-contain'
                        : 'w-full h-full object-cover'
                    }`}
                  />
                </div>
              </div>
            )}

            <h1 className="text-2xl font-bold mb-2" style={{ color: textColor }}>
              {headerTitle}
            </h1>

            {customMessage ? (
              <p className="text-sm" style={{ color: secondaryTextColor }}>
                {customMessage}
              </p>
            ) : (
              <p className="text-sm" style={{ color: secondaryTextColor }}>
                We&apos;d love to hear about your experience with {workspaceName}
              </p>
            )}
          </div>

          <TestimonialForm
            formId={form.id}
            workspaceId={form.workspaceId}
            allowText={form.allowText}
            allowVideo={form.allowVideo}
            allowScreenshot={form.allowScreenshot}
            primaryColor={form.primaryColor || '#3B82F6'}
            textColor={textColor}
            secondaryTextColor={secondaryTextColor}
            language={form.language || 'en'}
            collectEmail={form.collectEmail || false}
            collectCompany={form.collectCompany !== false}
            collectRole={form.collectRole !== false}
            collectSocialLink={form.collectSocialLink || false}
            collectRating={form.collectRating !== false}
          />
        </div>

        {showBadge && (
          <p className="text-center text-sm text-gray-400 mt-6">
            Powered by <a href="https://prooflayer.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">Prooflayer</a>
          </p>
        )}
      </div>
    </div>
  );
}