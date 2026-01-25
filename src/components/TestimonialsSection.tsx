import Image from 'next/image';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder',
      company: 'DesignFlow Studio',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      text: 'ProofLayer made it ridiculously easy to collect testimonials from our clients. The lifetime deal is a no-brainer compared to paying $50/month forever.',
      rating: 5,
    },
    {
      name: 'Marcus Chen',
      role: 'Freelance Developer',
      company: 'Independent',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      text: 'I was using Testimonial.to and paying $29/month. Switched to ProofLayer and saved hundreds. The video testimonials look amazing on my portfolio.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'GrowthStack',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      text: 'The widget customization is incredible. Matches our brand perfectly. Plus, knowing we own it forever gives us peace of mind for the long term.',
      rating: 5,
    },
    {
      name: 'James Parker',
      role: 'Agency Owner',
      company: 'Pixel Perfect Agency',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      text: 'We manage testimonials for 8 clients. The workspace feature keeps everything organized. Best $118 we\'ve spent on agency tools.',
      rating: 5,
    },
    {
      name: 'Lisa Thompson',
      role: 'Course Creator',
      company: 'LearnWithLisa',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      text: 'My students love the video testimonial feature. It\'s so easy for them to record and for me to showcase. Conversions are up 40% since adding these to my sales page.',
      rating: 5,
    },
    {
      name: 'David Kumar',
      role: 'SaaS Founder',
      company: 'CloudMetrics',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      text: 'Tried 3 different testimonial tools before finding ProofLayer. The lifetime pricing sold me, but the features kept me. Worth every penny.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Example testimonials - Real customer feedback coming post-launch!
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Will Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These are example testimonials showing what ProofLayer can do. Real customer testimonials will replace these after launch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} {testimonial.company !== 'Independent' && `at ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value Props (replacing stats during pre-launch) */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$59</p>
            <p className="text-gray-600 mt-2">Lifetime Access</p>
          </div>
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">4 Layouts</p>
            <p className="text-gray-600 mt-2">Widget Styles</p>
          </div>
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">&lt;5min</p>
            <p className="text-gray-600 mt-2">Setup Time</p>
          </div>
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$1,129</p>
            <p className="text-gray-600 mt-2">Saved vs Monthly Tools</p>
          </div>
        </div>
      </div>
    </section>
  );
}
