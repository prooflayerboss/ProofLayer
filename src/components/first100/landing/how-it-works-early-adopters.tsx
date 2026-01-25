import { First100Container } from '../ui';

const steps = [
  {
    number: '1',
    title: 'Sign up and tell us your interests',
    description: 'What kind of tools do you use? What problems are you trying to solve?',
  },
  {
    number: '2',
    title: 'Get matched with new products',
    description: "We'll send you products that match your interests before they launch publicly.",
  },
  {
    number: '3',
    title: 'Get lifetime deals and early pricing',
    description: 'Founders offer exclusive deals to their first users. You get in first.',
  },
  {
    number: '4',
    title: 'Build your early supporter reputation',
    description: 'Be known as someone who helps founders launch. Get recognized for your feedback.',
  },
];

export function First100HowItWorksEarlyAdopters() {
  return (
    <section className="py-20">
      <First100Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How it works for early adopters</h2>
          <p className="mt-4 text-lg text-gray-500">Be first to discover the next big thing</p>
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
