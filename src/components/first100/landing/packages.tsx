import Link from 'next/link';
import { First100Container, First100Card, First100CardHeader, First100CardTitle, First100CardContent, First100Button } from '../ui';

const packages = [
  {
    name: 'Free Listing',
    price: '$0',
    description: 'Get started at no cost',
    features: ['Basic product listing', 'Early adopter matching', 'Public profile page'],
    highlighted: false,
    cta: 'List for free',
  },
  {
    name: 'Starter',
    price: '$49',
    description: 'Get noticed',
    features: ['Everything in Free', 'Featured listing (1 week)', 'Included in weekly digest'],
    highlighted: false,
    cta: 'Get started',
  },
  {
    name: 'Growth',
    price: '$149',
    description: 'Reach more users',
    features: ['Everything in Starter', '50 targeted outreach messages', 'Priority support'],
    highlighted: true,
    cta: 'Choose Growth',
  },
  {
    name: 'Launch',
    price: '$299',
    description: 'Full launch support',
    features: ['Everything in Growth', '100 targeted outreach messages', 'Social media promotion'],
    highlighted: false,
    cta: 'Choose Launch',
  },
  {
    name: 'Done-For-You',
    price: '$499+',
    description: 'We handle everything',
    features: ['Full launch campaign', 'Custom outreach strategy', 'Dedicated support', 'We do the work, you get the users'],
    highlighted: false,
    cta: "Let's talk",
  },
];

export function First100Packages() {
  return (
    <section className="py-20 bg-gray-50">
      <First100Container size="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Choose your path to 100 users</h2>
          <p className="mt-4 text-lg text-gray-500">Start free, upgrade when you&apos;re ready</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {packages.map((pkg) => (
            <First100Card key={pkg.name} variant={pkg.highlighted ? 'highlighted' : 'default'} className="flex flex-col">
              <First100CardHeader>
                <First100CardTitle>{pkg.name}</First100CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{pkg.description}</p>
              </First100CardHeader>
              <First100CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/first100/founders/signup" className="mt-6 block">
                  <First100Button variant={pkg.highlighted ? 'primary' : 'secondary'} className="w-full">
                    {pkg.cta}
                  </First100Button>
                </Link>
              </First100CardContent>
            </First100Card>
          ))}
        </div>
      </First100Container>
    </section>
  );
}
