import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PLAN_LIMITS } from '@/lib/constants';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const workspace = await prisma.workspace.findUnique({
    where: { slug: params.slug },
  });

  if (!workspace) {
    return {
      title: 'Testimonials Not Found',
    };
  }

  const title = workspace.headline || `${workspace.name} - Testimonials`;
  const description = workspace.description || `Read what customers are saying about ${workspace.name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: workspace.logoUrl ? [workspace.logoUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: workspace.logoUrl ? [workspace.logoUrl] : [],
    },
  };
}

export default async function WallOfLovePage({ params }: { params: { slug: string } }) {
  const workspace = await prisma.workspace.findUnique({
    where: { slug: params.slug },
    include: {
      user: {
        include: {
          entitlement: true,
        },
      },
      forms: {
        include: {
          submissions: {
            where: { status: 'APPROVED' },
            orderBy: { createdAt: 'desc' },
          },
        },
      },
    },
  });

  if (!workspace) {
    notFound();
  }

  // Gather all approved submissions
  const testimonials = workspace.forms.flatMap((form) =>
    form.submissions.map((sub) => ({
      id: sub.id,
      name: sub.name,
      company: sub.company,
      role: sub.role,
      testimonial: sub.testimonial,
      rating: sub.rating,
      photoUrl: sub.photoUrl,
      videoUrl: sub.videoUrl,
      videoThumbnail: sub.videoThumbnail,
      submissionType: sub.submissionType,
      createdAt: sub.createdAt,
    }))
  );

  // Check if we should show badge
  const plan = workspace.user.entitlement?.plan || 'TRIAL';
  const showBadge = PLAN_LIMITS[plan].showBadge;

  // Use custom branding or fallback to defaults
  const headline = workspace.headline || workspace.name;
  const description = workspace.description || 'Client testimonials and reviews';
  const logoUrl = workspace.logoUrl;
  const primaryColor = '#3B82F6'; // Default blue color for Wall of Love

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Logo */}
          {logoUrl && (
            <div className="flex justify-center mb-4">
              <img
                src={logoUrl}
                alt={workspace.name}
                className="h-12 w-auto object-contain"
              />
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-900 text-center">
            {headline}
          </h1>
          <p className="text-gray-600 text-center mt-2">
            {description}
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {testimonials.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No testimonials yet</h2>
            <p className="text-gray-600">Check back soon for customer reviews!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => {
              const initials = testimonial.name
                .split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();

              const roleText = [testimonial.role, testimonial.company]
                .filter(Boolean)
                .join(' at ');

              return (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                      style={{
                        backgroundColor: testimonial.photoUrl ? 'transparent' : `${primaryColor}20`,
                      }}
                    >
                      {testimonial.photoUrl ? (
                        <img
                          src={testimonial.photoUrl}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span
                          className="font-semibold"
                          style={{ color: primaryColor }}
                        >
                          {initials}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      {roleText && (
                        <div className="text-sm text-gray-500">{roleText}</div>
                      )}
                    </div>
                  </div>

                  {testimonial.rating && (
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= testimonial.rating!
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                  )}

                  {testimonial.submissionType === 'VIDEO' && testimonial.videoUrl ? (
                    <div className="mb-3">
                      <video
                        src={testimonial.videoUrl}
                        controls
                        className="w-full rounded-lg"
                        poster={testimonial.videoThumbnail || undefined}
                        preload="metadata"
                      />
                    </div>
                  ) : testimonial.submissionType === 'SCREENSHOT' && testimonial.photoUrl ? (
                    <div className="mb-3">
                      <img
                        src={testimonial.photoUrl}
                        alt="Screenshot testimonial"
                        className="w-full rounded-lg"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {testimonial.testimonial}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Powered by badge */}
        {showBadge && (
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500">
              Powered by{' '}
              <a
                href="https://prooflayer.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:opacity-80 transition-opacity"
                style={{ color: primaryColor }}
              >
                Prooflayer
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
