import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import TestimonialForm from './testimonial-form';

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Share Your Experience
            </h1>
            <p className="text-gray-600">
              We&apos;d love to hear about your experience working with {form.workspace.name}
            </p>
          </div>

          <TestimonialForm formId={form.id} workspaceId={form.workspaceId} />
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Powered by Prooflayer
        </p>
      </div>
    </div>
  );
}