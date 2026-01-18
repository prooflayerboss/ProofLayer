import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Products Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="hover:text-white transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/features#widgets" className="hover:text-white transition-colors">
                  Embed Widgets
                </Link>
              </li>
              <li>
                <Link href="/features#wall" className="hover:text-white transition-colors">
                  Wall of Love
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Customers Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">For</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/customers/agencies" className="hover:text-white transition-colors">
                  Agencies
                </Link>
              </li>
              <li>
                <Link href="/customers/freelancers" className="hover:text-white transition-colors">
                  Freelancers
                </Link>
              </li>
              <li>
                <Link href="/customers/saas" className="hover:text-white transition-colors">
                  SaaS Companies
                </Link>
              </li>
              <li>
                <Link href="/customers/ecommerce" className="hover:text-white transition-colors">
                  eCommerce
                </Link>
              </li>
              <li>
                <Link href="/customers/creators" className="hover:text-white transition-colors">
                  Course Creators
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 transition-transform group-hover:scale-105">
                <Image
                  src="/logos/prooflayer-icon-only.svg"
                  alt="ProofLayer"
                  width={36}
                  height={36}
                  className="w-full h-full"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProofLayer
              </span>
            </Link>

            <div className="text-sm text-gray-400 text-center">
              © {currentYear} ProofLayer. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              {/* Social Links */}
              <a
                href="https://x.com/prooflayer56838"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Links */}
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-sm hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
