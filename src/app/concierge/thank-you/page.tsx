import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function ConciergeThankYou() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation />

      <main className="pt-20 pb-32 px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#00d084]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-[#00d084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="display-text text-4xl font-bold text-[#0a0a0b] mb-4">
            Inquiry received!
          </h1>

          <p className="text-lg text-[#737373] mb-8">
            Thanks for reaching out. We'll review your inquiry and get back to you within 24 hours with a custom proposal.
          </p>

          <div className="bg-white rounded-2xl p-8 text-left mb-8 border border-black/5">
            <h3 className="font-semibold text-[#0a0a0b] mb-4">What happens next?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00d084]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#00d084] text-sm font-bold">1</span>
                </span>
                <div>
                  <p className="font-medium text-[#0a0a0b]">We review your inquiry</p>
                  <p className="text-sm text-[#737373]">Understanding your product and goals</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00d084]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#00d084] text-sm font-bold">2</span>
                </span>
                <div>
                  <p className="font-medium text-[#0a0a0b]">We send a custom proposal</p>
                  <p className="text-sm text-[#737373]">Tailored strategy and pricing for your launch</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00d084]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#00d084] text-sm font-bold">3</span>
                </span>
                <div>
                  <p className="font-medium text-[#0a0a0b]">We kick off your campaign</p>
                  <p className="text-sm text-[#737373]">We handle everything from copy to execution</p>
                </div>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#0a0a0b] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0a0a0b]/90 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
