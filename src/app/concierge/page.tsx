'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

const BUDGET_OPTIONS = [
  { value: '', label: 'Select a budget range' },
  { value: '$1,000 - $2,500', label: '$1,000 - $2,500' },
  { value: '$2,500 - $5,000', label: '$2,500 - $5,000' },
  { value: '$5,000+', label: '$5,000+' },
  { value: 'Not sure yet', label: 'Not sure yet' },
];

export default function ConciergePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    description: '',
    budget: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/concierge/thank-you');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation />

      <main className="pt-20 pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#0a0a0b] mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to pricing
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="line-accent" />
              <span className="text-sm font-semibold tracking-wide uppercase text-[#00d084]">Concierge</span>
            </div>

            <h1 className="display-text text-4xl sm:text-5xl font-bold text-[#0a0a0b] mb-4">
              Let's build your launch together
            </h1>
            <p className="text-xl text-[#737373]">
              Tell us about your product and we'll create a custom launch strategy. We handle everything from copy to campaign execution.
            </p>
          </div>

          {/* What's Included */}
          <div className="bg-white rounded-2xl p-6 border border-black/5 mb-8">
            <h3 className="font-semibold text-[#0a0a0b] mb-4">What's included</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Full launch strategy',
                'We write your copy',
                'ProofLayer setup done for you',
                '4-week launch campaign',
                'Early adopter outreach',
                'Dedicated support',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#737373]">
                  <svg className="w-4 h-4 text-[#00d084] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 border border-black/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#0a0a0b] mb-2">
                    Your name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-[#0a0a0b] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-[#00d084]"
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#0a0a0b] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-[#0a0a0b] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-[#00d084]"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#0a0a0b] mb-2">
                    Company name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-[#0a0a0b] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-[#00d084]"
                    placeholder="Acme Inc"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-[#0a0a0b] mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-[#0a0a0b] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-[#00d084]"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-[#0a0a0b] mb-2">
                  Budget range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-[#0a0a0b] focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-[#00d084]"
                >
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#0a0a0b] mb-2">
                  Tell us about your product *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-[#0a0a0b] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#00d084]/50 focus:border-[#00d084] resize-none"
                  placeholder="What are you building? Who is it for? What's your launch timeline?"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full bg-[#0a0a0b] text-white px-6 py-4 rounded-xl font-semibold hover:bg-[#0a0a0b]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send inquiry'
                )}
              </button>

              <p className="text-sm text-[#737373] text-center">
                We'll get back to you within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
