import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      question: 'Can I collect video testimonials?',
      answer: 'Yes! Your customers can record videos directly in their browser or upload video files. Videos are automatically hosted and played inline. No external services like YouTube or Vimeo are required.',
    },
    {
      question: 'Is this really a one-time payment?',
      answer: 'Yes. You pay once, you own the account forever. No hidden fees, no monthly charges. This is a lifetime deal - pay $49 once and use ProofLayer forever.',
    },
    {
      question: 'Will it work on my website builder?',
      answer: 'Yes! ProofLayer works with Webflow, WordPress, Wix, Squarespace, and any site that accepts HTML/JavaScript embeds. Simply copy-paste the embed code into your site.',
    },
    {
      question: 'How many testimonials can I collect?',
      answer: 'With the lifetime deal, you get unlimited testimonials. There are no monthly limits - collect as many testimonials as you need for your business.',
    },
    {
      question: 'Can I customize the widget appearance?',
      answer: 'Yes! You can customize colors, layouts (grid or carousel), and styling to match your brand. The widgets are fully responsive and mobile-optimized.',
    },
    {
      question: 'Do my customers need to create an account?',
      answer: 'No! Your customers simply click the link you send them and can submit their testimonial immediately. No login or account creation required.',
    },
    {
      question: 'How does the approval process work?',
      answer: 'All submissions go to a pending state first. You can review, approve, or reject them with one click. Only approved testimonials appear in your public widgets.',
    },
    {
      question: 'Can I import existing testimonials?',
      answer: 'Yes! You can manually add testimonials from LinkedIn, email, Slack, Twitter, or any other source. We also support bulk import via CSV.',
    },
    {
      question: 'Is there spam protection?',
      answer: 'Yes! ProofLayer includes automatic spam detection, rate limiting to prevent abuse, and manual review before publishing. You have full control over what gets published.',
    },
    {
      question: 'What video formats are supported?',
      answer: 'We support MP4, MOV, and WebM formats. Videos are automatically transcoded and optimized for web playback with thumbnails generated automatically.',
    },
    {
      question: 'How many workspaces do I get?',
      answer: 'The lifetime deal includes 5 workspaces - perfect for agencies managing multiple clients or businesses with multiple brands.',
    },
    {
      question: 'Can I add star ratings?',
      answer: 'Yes! You can enable an optional 5-star rating system. Ratings are displayed in your widgets and you can filter testimonials by rating.',
    },
    {
      question: 'What happens after I reach the spot limit?',
      answer: 'Once all 25 founding member spots are claimed, the price will increase. Lock in your lifetime deal now at $49 before prices go up.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes! We offer a 30-day money-back guarantee. If ProofLayer isn\'t right for you, just let us know within 30 days for a full refund.',
    },
    {
      question: 'How is this different from Testimonial.to?',
      answer: 'ProofLayer offers the same core features but with a one-time payment instead of monthly subscriptions. Stop renting your reputation - own it forever for a single $49 payment.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProofLayer
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Everything you need to know about ProofLayer
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to stop renting your reputation? Get lifetime access today.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Lifetime Access for $49 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ProofLayer
            </span>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ProofLayer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
