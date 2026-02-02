import Link from 'next/link';
import { First100Button, First100Container } from '../ui';

export function First100Hero() {
  return (
    <section className="py-20 md:py-32">
      <First100Container size="md">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Nobody is actively helping pre-traction founders get real users.{' '}
            <span className="text-emerald-500">We do.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            We help you get your first real users—not vanity metrics, not backlinks, real signups from people who want your product.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/first100/founders/signup">
              <First100Button size="lg">I&apos;m a founder - get users</First100Button>
            </Link>
            <Link href="/first100/early-adopters/signup">
              <First100Button variant="secondary" size="lg">
                I&apos;m an early adopter - find new tools
              </First100Button>
            </Link>
          </div>
        </div>
      </First100Container>
    </section>
  );
}
