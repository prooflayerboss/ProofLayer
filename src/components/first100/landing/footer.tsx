import Link from 'next/link';
import { First100Container } from '../ui';

export function First100Footer() {
  return (
    <footer className="py-12 border-t border-gray-200">
      <First100Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">First100</span>
            <span className="text-gray-400">by</span>
            <Link href="/" className="text-blue-600 font-medium hover:underline">
              ProofLayer
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ProofLayer
            </Link>
            <a
              href="https://twitter.com/prooflayer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Twitter/X
            </a>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">Get users, then prove it. The complete founder toolkit.</p>
        </div>
      </First100Container>
    </footer>
  );
}
