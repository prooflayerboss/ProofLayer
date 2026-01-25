import Link from 'next/link';
import { First100Container, First100Button } from '../ui';

export function First100Header() {
  return (
    <header className="py-4 border-b border-gray-200">
      <First100Container>
        <div className="flex items-center justify-between">
          <Link href="/first100" className="text-xl font-bold text-gray-900">
            First100
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/first100/founders/signup">
              <First100Button size="sm">Get users</First100Button>
            </Link>
          </nav>
        </div>
      </First100Container>
    </header>
  );
}
