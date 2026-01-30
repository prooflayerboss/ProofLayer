import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import { apiLogger } from '@/lib/logger';

const DEMO_TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    company: 'TechStart Inc',
    role: 'CEO',
    testimonial: 'ProofLayer has completely transformed how we collect and display customer testimonials. The widget is beautiful and so easy to embed. Our conversion rate increased by 34% after adding testimonials to our landing page!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    company: 'DesignHub',
    role: 'Product Manager',
    testimonial: 'Finally, a testimonial tool that just works! The approval workflow is seamless, and our clients love how professional the widget looks on our site. Highly recommend for any SaaS product.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    company: 'Marketing Pro',
    role: 'Marketing Director',
    testimonial: 'The different layout options (grid, carousel, marquee) are fantastic. We use the marquee layout on our homepage and it really catches visitors\' attention. Setup took literally 5 minutes.',
    rating: 5,
  },
  {
    name: 'David Kim',
    company: 'StartupXYZ',
    role: 'Founder',
    testimonial: 'Love the video testimonial feature! Our customers can record quick videos, and they display beautifully in the widget. This has added so much credibility to our site.',
    rating: 5,
  },
  {
    name: 'Jessica Martinez',
    company: 'Freelance Designer',
    role: 'Freelancer',
    testimonial: 'As a freelancer, I needed an affordable way to showcase client feedback. ProofLayer is perfect - professional-looking widgets at a great price point. The popup widget is my favorite!',
    rating: 5,
  },
  {
    name: 'Alex Thompson',
    company: 'E-commerce Plus',
    role: 'Store Owner',
    testimonial: 'The screenshot upload feature is brilliant! We can capture great reviews from Twitter and LinkedIn and display them alongside traditional testimonials. Really helps build trust with new customers.',
    rating: 5,
  },
  {
    name: 'Rachel Green',
    company: 'Consulting Firm',
    role: 'Principal Consultant',
    testimonial: 'Clean, modern interface and the approval workflow means we have full control over what gets published. The public testimonial page is a nice bonus - we share it with prospects all the time.',
    rating: 4,
  },
  {
    name: 'James Wilson',
    company: 'SaaS Startup',
    role: 'Co-founder',
    testimonial: 'ProofLayer helped us showcase our early customer wins before we had a ton of reviews. The form is super simple for customers to use, and we\'ve collected 50+ testimonials in just 2 weeks!',
    rating: 5,
  },
];

export async function createDemoWorkspace(userId: string) {
  try {
    // Check if demo workspace already exists for this user
    const existingDemo = await prisma.workspace.findFirst({
      where: {
        userId,
        name: '🎨 Demo Workspace',
      },
    });

    if (existingDemo) {
      apiLogger.info('Demo workspace already exists for user', { userId });
      return existingDemo;
    }

    // Create demo workspace
    const workspace = await prisma.workspace.create({
      data: {
        id: nanoid(),
        name: '🎨 Demo Workspace',
        slug: `demo-${nanoid(8)}`,
        userId,
        headline: 'See ProofLayer in Action',
        description: 'This is a demo workspace with sample testimonials to show you how ProofLayer works',
      },
    });

    // Create a demo form
    const form = await prisma.form.create({
      data: {
        id: nanoid(),
        name: 'Demo Form - Sample Testimonials',
        slug: nanoid(10),
        workspaceId: workspace.id,
        isActive: true,
        allowText: true,
        allowVideo: true,
        allowScreenshot: true,
      },
    });

    // Create demo testimonials (all pre-approved)
    for (const testimonial of DEMO_TESTIMONIALS) {
      await prisma.submission.create({
        data: {
          id: nanoid(),
          formId: form.id,
          name: testimonial.name,
          company: testimonial.company,
          role: testimonial.role,
          testimonial: testimonial.testimonial,
          rating: testimonial.rating,
          submissionType: 'TEXT',
          status: 'APPROVED', // Pre-approved for demo
        },
      });
    }

    apiLogger.info('Demo workspace created successfully', { workspaceId: workspace.id });
    return workspace;
  } catch (error) {
    apiLogger.error('Error creating demo workspace', { error: String(error) });
    throw error;
  }
}

export async function shouldCreateDemoWorkspace(userId: string): Promise<boolean> {
  // Check if user has any workspaces
  const workspaceCount = await prisma.workspace.count({
    where: { userId },
  });

  // Only create demo if user has no workspaces
  return workspaceCount === 0;
}
