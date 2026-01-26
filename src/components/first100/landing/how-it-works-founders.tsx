import { First100Container } from '../ui';

const steps = [
  {
    number: '1',
    title: 'List your product',
    description: "Submit your product for free. Tell us what you're building and what kind of users you need.",
  },
  {
    number: '2',
    title: 'Choose your package',
    description: 'Start free or upgrade for featured placement and done-for-you outreach.',
  },
  {
    number: '3',
    title: 'Get matched with early adopters',
    description: 'We connect you with people actively looking to try new products in your category.',
  },
  {
    number: '4',
    title: 'Track real signups',
    description: "See who's signing up, get feedback, and watch your user count grow.",
  },
];

export function First100HowItWorksFounders() {
  return (
    <section className="py-20 bg-gray-50">
      <First100Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How it works for founders</h2>
          <p className="mt-4 text-lg text-gray-500">From zero to your first users in four steps</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-white font-bold text-xl mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </First100Container>
    </section>
  );
}
