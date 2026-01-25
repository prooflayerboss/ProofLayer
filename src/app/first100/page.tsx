import {
  First100Header,
  First100Hero,
  First100HowItWorksFounders,
  First100Packages,
  First100HowItWorksEarlyAdopters,
  First100EarlyAdopterValue,
  First100SocialProof,
  First100Footer,
} from '@/components/first100/landing';

export const metadata = {
  title: 'First100 - Get Your First 100 Users | ProofLayer',
  description:
    'We help pre-traction founders get their first 100 real users. Not vanity metrics, not backlinks—real signups from people who want your product.',
};

export default function First100Landing() {
  return (
    <div className="min-h-screen bg-white">
      <First100Header />
      <main>
        <First100Hero />
        <First100HowItWorksFounders />
        <First100Packages />
        <First100HowItWorksEarlyAdopters />
        <First100EarlyAdopterValue />
        <First100SocialProof />
      </main>
      <First100Footer />
    </div>
  );
}
