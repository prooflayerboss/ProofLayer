import { First100Container } from '../ui';

export function First100SocialProof() {
  return (
    <section className="py-20 border-t border-gray-200">
      <First100Container size="md">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
            Trusted by founders building in public
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Placeholder testimonials - to be filled after manual pilots */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-500 italic">&ldquo;Your testimonial here after we help you get users.&rdquo;</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 text-sm">Founder Name</p>
                  <p className="text-xs text-gray-500">@handle</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-500 italic">&ldquo;Your testimonial here after we help you get users.&rdquo;</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 text-sm">Founder Name</p>
                  <p className="text-xs text-gray-500">@handle</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-500 italic">&ldquo;Your testimonial here after we help you get users.&rdquo;</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 text-sm">Founder Name</p>
                  <p className="text-xs text-gray-500">@handle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </First100Container>
    </section>
  );
}
