'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const features = [
    { name: 'Video Testimonials', href: '/features#video', description: 'Collect authentic video testimonials' },
    { name: 'Text Testimonials', href: '/features#text', description: 'Gather written feedback easily' },
    { name: 'Embed Widgets', href: '/features#widgets', description: 'Showcase testimonials on your site' },
    { name: 'Custom Forms', href: '/features#forms', description: 'Branded collection forms' },
    { name: 'Wall of Love', href: '/features#wall', description: 'Beautiful testimonial displays' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-xl px-3 py-1.5 rounded-lg shadow-md">
                PL
              </div>
              <span className="text-xl font-bold text-gray-900">ProofLayer</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Features Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setFeaturesOpen(true)}
                onMouseLeave={() => setFeaturesOpen(false)}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Features
                <ChevronDown className={`h-4 w-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>

              {featuresOpen && (
                <div
                  onMouseEnter={() => setFeaturesOpen(true)}
                  onMouseLeave={() => setFeaturesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                >
                  {features.map((feature) => (
                    <Link
                      key={feature.name}
                      href={feature.href}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{feature.name}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{feature.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Pricing
            </Link>

            <Link href="/integrations" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Integrations
            </Link>

            <Link href="/faq" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              FAQ
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {/* Features Section */}
            <div className="border-b border-gray-100 pb-3">
              <div className="font-semibold text-gray-900 mb-2">Features</div>
              <div className="space-y-2 pl-3">
                {features.map((feature) => (
                  <Link
                    key={feature.name}
                    href={feature.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-600 hover:text-blue-600 text-sm"
                  >
                    {feature.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Pricing
            </Link>

            <Link
              href="/integrations"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Integrations
            </Link>

            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              FAQ
            </Link>

            <div className="border-t border-gray-200 pt-3 space-y-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact Us
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-center hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
