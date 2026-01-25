import { Code, Copy, CheckCircle, Zap, Palette, BarChart3, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'JavaScript Embed - ProofLayer Docs',
  description: 'Learn how to embed ProofLayer testimonials on any website with a simple JavaScript snippet.',
};

export default function EmbedDocsPage() {
  return (
    <div className="max-w-4xl">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-400">Integration Guide</p>
            <h1 className="text-3xl font-bold text-white">JavaScript Embed</h1>
          </div>
        </div>
        <p className="text-lg text-slate-400 leading-relaxed">
          Add beautiful testimonial widgets to any website with just a few lines of code. Works with all modern frameworks, CMSs, and static sites.
        </p>
      </div>

      {/* Quick Start */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Quick Start
        </h2>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              1
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Get your Widget ID</h3>
              <p className="text-slate-400 mb-4">
                Navigate to your dashboard, create or select a widget, and copy the Widget ID from the embed settings.
              </p>
              <Link
                href="/dashboard/widgets"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm font-medium"
              >
                Go to Widgets <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              2
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Add the container</h3>
              <p className="text-slate-400 mb-4">
                Place a div element where you want the testimonials to appear.
              </p>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <span className="text-xs font-medium text-slate-500">HTML</span>
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-slate-300">
                      <span className="text-slate-500">&lt;!-- Add this where you want testimonials --&gt;</span>{'\n'}
                      <span className="text-pink-400">&lt;div</span> <span className="text-emerald-400">id</span>=<span className="text-amber-300">"prooflayer-widget"</span><span className="text-pink-400">&gt;&lt;/div&gt;</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              3
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Add the script</h3>
              <p className="text-slate-400 mb-4">
                Include the ProofLayer script and initialize it with your Widget ID. Place this before the closing <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">&lt;/body&gt;</code> tag.
              </p>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <span className="text-xs font-medium text-slate-500">JavaScript</span>
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-slate-300">
                      <span className="text-pink-400">&lt;script</span> <span className="text-emerald-400">src</span>=<span className="text-amber-300">"https://cdn.prooflayer.app/widget.js"</span><span className="text-pink-400">&gt;&lt;/script&gt;</span>{'\n'}
                      <span className="text-pink-400">&lt;script&gt;</span>{'\n'}
                      {'  '}<span className="text-blue-400">ProofLayer</span>.<span className="text-emerald-300">init</span>{'({'}{'\n'}
                      {'    '}<span className="text-slate-400">widgetId</span>: <span className="text-amber-300">'your-widget-id'</span>,{'\n'}
                      {'    '}<span className="text-slate-400">container</span>: <span className="text-amber-300">'#prooflayer-widget'</span>{'\n'}
                      {'  }'});{'\n'}
                      <span className="text-pink-400">&lt;/script&gt;</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Options */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-violet-400" />
          Configuration Options
        </h2>

        <div className="bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Option</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Default</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-4 py-3 text-emerald-400 font-mono">widgetId</td>
                  <td className="px-4 py-3 text-slate-500">string</td>
                  <td className="px-4 py-3 text-slate-500">required</td>
                  <td className="px-4 py-3 text-slate-300">Your unique widget identifier</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-emerald-400 font-mono">container</td>
                  <td className="px-4 py-3 text-slate-500">string</td>
                  <td className="px-4 py-3 text-amber-300 font-mono text-xs">'#prooflayer-widget'</td>
                  <td className="px-4 py-3 text-slate-300">CSS selector for the container element</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-emerald-400 font-mono">theme</td>
                  <td className="px-4 py-3 text-slate-500">string</td>
                  <td className="px-4 py-3 text-amber-300 font-mono text-xs">'light'</td>
                  <td className="px-4 py-3 text-slate-300">'light', 'dark', or 'auto' (system preference)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-emerald-400 font-mono">layout</td>
                  <td className="px-4 py-3 text-slate-500">string</td>
                  <td className="px-4 py-3 text-amber-300 font-mono text-xs">'grid'</td>
                  <td className="px-4 py-3 text-slate-300">'grid', 'carousel', 'masonry', or 'list'</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-emerald-400 font-mono">maxItems</td>
                  <td className="px-4 py-3 text-slate-500">number</td>
                  <td className="px-4 py-3 text-amber-300 font-mono text-xs">12</td>
                  <td className="px-4 py-3 text-slate-300">Maximum number of testimonials to display</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-emerald-400 font-mono">showRatings</td>
                  <td className="px-4 py-3 text-slate-500">boolean</td>
                  <td className="px-4 py-3 text-amber-300 font-mono text-xs">true</td>
                  <td className="px-4 py-3 text-slate-300">Whether to display star ratings</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-emerald-400 font-mono">showAvatars</td>
                  <td className="px-4 py-3 text-slate-500">boolean</td>
                  <td className="px-4 py-3 text-amber-300 font-mono text-xs">true</td>
                  <td className="px-4 py-3 text-slate-300">Whether to display user avatars</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Full Example */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          Full Example
        </h2>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
              <span className="text-xs font-medium text-slate-500">Complete Integration</span>
              <button className="text-slate-500 hover:text-white transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code className="text-slate-300">
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
</head>
<body>
  <!-- Your website content -->

  <section id="testimonials">
    <h2>What Our Customers Say</h2>
    <div id="prooflayer-widget"></div>
  </section>

  <!-- ProofLayer Widget -->
  <script src="https://cdn.prooflayer.app/widget.js"></script>
  <script>
    ProofLayer.init({
      widgetId: 'wgt_abc123xyz',
      container: '#prooflayer-widget',
      theme: 'light',
      layout: 'masonry',
      maxItems: 9,
      showRatings: true,
      showAvatars: true
    });
  </script>
</body>
</html>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Framework Guides */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Framework-Specific Guides</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: 'React / Next.js', desc: 'Use useEffect or dynamic import', color: 'from-cyan-500 to-blue-500' },
            { name: 'Vue.js', desc: 'Mount in onMounted lifecycle', color: 'from-emerald-500 to-green-500' },
            { name: 'WordPress', desc: 'Add to theme footer or use plugin', color: 'from-blue-500 to-indigo-500' },
            { name: 'Webflow', desc: 'Use custom code embed block', color: 'from-violet-500 to-purple-500' },
          ].map((fw) => (
            <div
              key={fw.name}
              className="group relative bg-[#0d1320] rounded-xl border border-white/10 p-5 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${fw.color} rounded-t-xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              <h3 className="font-semibold text-white mb-1">{fw.name}</h3>
              <p className="text-sm text-slate-400">{fw.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security Note */}
      <section className="mb-16">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
          <div className="flex gap-4">
            <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-2">Security Note</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Your Widget ID is safe to use in client-side code. It only allows reading approved testimonials from your widget.
                No sensitive data can be accessed or modified using this ID.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6">Next Steps</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/docs/links"
            className="group bg-[#0d1320] rounded-xl border border-white/10 p-5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">Direct Links</h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-slate-400">Share collection links to gather testimonials</p>
          </Link>
          <Link
            href="/docs/export"
            className="group bg-[#0d1320] rounded-xl border border-white/10 p-5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">HTML/CSS Export</h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-slate-400">Export testimonials as static files</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
