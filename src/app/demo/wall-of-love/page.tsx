// Demo page with fake testimonials for product videos/screenshots
// Accessible at /demo/wall-of-love but not linked anywhere

const DEMO_TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'Digital Marketing Co',
    role: 'Marketing Director',
    testimonial: "Prooflayer made collecting client testimonials so simple! We went from messy screenshots to a beautiful, professional display in minutes. The lifetime deal was a no-brainer for our agency.",
    rating: 5,
    photoUrl: null,
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'Tech Startup Inc',
    role: 'Founder & CEO',
    testimonial: "Best investment we've made for social proof. Our conversion rate increased by 23% after adding testimonials to our landing page. The widget looks amazing!",
    rating: 5,
    photoUrl: null,
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    company: 'Design Studio',
    role: 'Creative Director',
    testimonial: "Finally, a testimonial tool that doesn't require a monthly subscription! The customization options are perfect, and our clients love how easy it is to submit reviews.",
    rating: 5,
    photoUrl: null,
  },
  {
    id: '4',
    name: 'James Wilson',
    company: 'E-commerce Plus',
    role: 'Store Owner',
    testimonial: "I'm not technical at all, but setting this up was incredibly easy. The shareable page feature is genius - I just send the link to my customers and they're done!",
    rating: 5,
    photoUrl: null,
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    company: 'Consulting Group',
    role: 'Senior Consultant',
    testimonial: "Prooflayer has streamlined our entire testimonial collection process. The approval workflow ensures we only show our best reviews. Highly recommend!",
    rating: 5,
    photoUrl: null,
  },
  {
    id: '6',
    name: 'David Kim',
    company: 'SaaS Solutions',
    role: 'Product Manager',
    testimonial: "We switched from a $29/month tool to Prooflayer's lifetime deal. Same features, better UI, and we'll save thousands over the years. Smart move for any business!",
    rating: 5,
    photoUrl: null,
  },
];

export default function DemoWallOfLovePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Our Happy Clients
          </h1>
          <p className="text-gray-600 text-center mt-2">
            See what our customers are saying
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_TESTIMONIALS.map((testimonial) => {
            const initials = testimonial.name
              .split(' ')
              .map(n => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();

            const roleText = [testimonial.role, testimonial.company]
              .filter(Boolean)
              .join(' at ');

            return (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <span className="text-blue-600 font-semibold">
                      {initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    {roleText && (
                      <div className="text-sm text-gray-500">{roleText}</div>
                    )}
                  </div>
                </div>

                {testimonial.rating && (
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= testimonial.rating!
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                )}

                <p className="text-gray-700 leading-relaxed">
                  {testimonial.testimonial}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
