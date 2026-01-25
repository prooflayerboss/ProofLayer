import { Globe, Link2, QrCode, Share2, Mail, MessageSquare, ChevronRight, Sparkles, Users, Smartphone } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Direct Links - ProofLayer Docs',
  description: 'Learn how to share collection links and gather testimonials from customers via email, social media, or QR codes.',
};

export default function LinksDocsPage() {
  return (
    <div className="max-w-4xl">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-400">Integration Guide</p>
            <h1 className="text-3xl font-bold text-white">Direct Links</h1>
          </div>
        </div>
        <p className="text-lg text-slate-400 leading-relaxed">
          Share unique collection links to gather testimonials from anywhere. Perfect for email campaigns, social media, or printed materials with QR codes.
        </p>
      </div>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          How It Works
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              icon: Link2,
              title: 'Get your link',
              desc: 'Each form has a unique shareable URL that you can copy from your dashboard.',
            },
            {
              step: 2,
              icon: Share2,
              title: 'Share it',
              desc: 'Send via email, post on social media, or generate a QR code for print.',
            },
            {
              step: 3,
              icon: Users,
              title: 'Collect testimonials',
              desc: 'Customers submit testimonials directly - no account required.',
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {item.step}
              </div>
              <div className="bg-[#0d1320] rounded-xl border border-white/10 p-6 pt-8 h-full">
                <item.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Link Structure */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Link Structure</h2>

        <div className="bg-[#0d1320] rounded-xl border border-white/10 p-6">
          <p className="text-slate-400 mb-4">Your collection link follows this format:</p>

          <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
            <span className="text-slate-500">https://</span>
            <span className="text-emerald-400">prooflayer.app</span>
            <span className="text-slate-500">/</span>
            <span className="text-blue-400">collect</span>
            <span className="text-slate-500">/</span>
            <span className="text-amber-400">[workspace-slug]</span>
            <span className="text-slate-500">/</span>
            <span className="text-pink-400">[form-slug]</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <code className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded text-sm font-mono">[workspace-slug]</code>
              <p className="text-slate-300 text-sm">Your workspace's unique identifier (customizable)</p>
            </div>
            <div className="flex items-start gap-3">
              <code className="text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded text-sm font-mono">[form-slug]</code>
              <p className="text-slate-300 text-sm">The form's URL-friendly name (customizable)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Slugs */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Custom Slugs</h2>

        <p className="text-slate-400 mb-6">
          Make your links memorable and on-brand by customizing both workspace and form slugs.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#0d1320] rounded-xl border border-white/10 p-5">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Default</p>
            <code className="text-slate-300 text-sm">prooflayer.app/collect/ws_abc123/frm_xyz789</code>
          </div>
          <div className="bg-[#0d1320] rounded-xl border border-emerald-500/30 p-5">
            <p className="text-xs text-emerald-400 uppercase tracking-wider mb-2">Custom</p>
            <code className="text-slate-300 text-sm">prooflayer.app/collect/acme-agency/feedback</code>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-blue-400">Tip:</span> Custom slugs help build trust. Customers are more likely to submit when they see a recognizable brand name in the URL.
          </p>
        </div>
      </section>

      {/* Sharing Options */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Sharing Options</h2>

        <div className="space-y-4">
          {/* Email */}
          <div className="bg-[#0d1320] rounded-xl border border-white/10 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">Email Campaigns</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Include your collection link in post-purchase emails, newsletters, or dedicated feedback requests.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-4 text-sm">
                  <p className="text-slate-300 mb-2">Example email snippet:</p>
                  <p className="text-slate-400 italic">
                    "We'd love to hear about your experience! Share your feedback here: <span className="text-blue-400 underline">prooflayer.app/collect/acme/feedback</span>"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-[#0d1320] rounded-xl border border-white/10 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">Social Media</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Share on Twitter/X, LinkedIn, Facebook, or in community forums to collect testimonials from your audience.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Twitter/X', 'LinkedIn', 'Facebook', 'Instagram Bio', 'Discord'].map((platform) => (
                    <span key={platform} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* QR Codes */}
          <div className="bg-[#0d1320] rounded-xl border border-white/10 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">QR Codes</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Generate a QR code for your collection link. Perfect for print materials, packaging, or in-store displays.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-slate-900" />
                  </div>
                  <div className="text-sm text-slate-400">
                    <p className="mb-2">Download QR codes in:</p>
                    <ul className="space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        PNG (for web)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        SVG (for print)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        PDF (with branding)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Experience */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-400" />
          Mobile-Optimized
        </h2>

        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-6">
          <p className="text-slate-300 mb-4">
            All collection pages are fully responsive and optimized for mobile devices. Your customers can easily submit testimonials from their phones - including video recordings.
          </p>
          <ul className="space-y-2">
            {[
              'Touch-friendly interface',
              'Native camera integration for video testimonials',
              'Quick-loading on cellular networks',
              'No app download required',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Best Practices</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Time it right',
              desc: 'Send requests shortly after a positive interaction or successful delivery.',
            },
            {
              title: 'Keep it personal',
              desc: 'Address customers by name and reference their specific purchase or project.',
            },
            {
              title: 'Make it easy',
              desc: 'Keep the link prominent and the request concise. One click should start the process.',
            },
            {
              title: 'Follow up once',
              desc: 'A gentle reminder can boost response rates without being pushy.',
            },
          ].map((tip) => (
            <div key={tip.title} className="bg-[#0d1320] rounded-xl border border-white/10 p-5">
              <h3 className="font-semibold text-white mb-1">{tip.title}</h3>
              <p className="text-sm text-slate-400">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6">Next Steps</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/docs/embed"
            className="group bg-[#0d1320] rounded-xl border border-white/10 p-5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">JavaScript Embed</h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-slate-400">Display testimonials on your website</p>
          </Link>
          <Link
            href="/docs/webhooks"
            className="group bg-[#0d1320] rounded-xl border border-white/10 p-5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">Webhooks</h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-slate-400">Get notified when testimonials arrive</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
