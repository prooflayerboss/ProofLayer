import { FileCode, Download, Code, Palette, Zap, FolderOpen, ChevronRight, Check, Settings } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'HTML/CSS Export - ProofLayer Docs',
  description: 'Export your testimonials as static HTML and CSS files for complete control and offline compatibility.',
};

export default function ExportDocsPage() {
  return (
    <div className="max-w-4xl">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <FileCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-violet-400">Integration Guide</p>
            <h1 className="text-3xl font-bold text-white">HTML/CSS Export</h1>
          </div>
        </div>
        <p className="text-lg text-slate-400 leading-relaxed">
          Export your testimonials as standalone HTML and CSS files. Perfect for static sites, offline use, or when you need complete control over the markup.
        </p>
      </div>

      {/* Why Export */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Why Export?
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: Code,
              title: 'Full Control',
              desc: 'Modify every line of HTML and CSS to match your exact needs.',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: Zap,
              title: 'Zero Dependencies',
              desc: 'No JavaScript required. Pure HTML and CSS that works everywhere.',
              color: 'from-amber-500 to-orange-500',
            },
            {
              icon: Check,
              title: 'SEO Friendly',
              desc: 'Static content is fully indexable by search engines.',
              color: 'from-emerald-500 to-teal-500',
            },
            {
              icon: Download,
              title: 'Offline Compatible',
              desc: 'Works without an internet connection once embedded.',
              color: 'from-violet-500 to-purple-500',
            },
          ].map((item) => (
            <div key={item.title} className="bg-[#0d1320] rounded-xl border border-white/10 p-5">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Export */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Download className="w-5 h-5 text-emerald-400" />
          How to Export
        </h2>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-sm">
              1
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Open your widget</h3>
              <p className="text-slate-400">
                Navigate to the widget you want to export from your dashboard.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-sm">
              2
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Click Export</h3>
              <p className="text-slate-400 mb-4">
                In the widget settings, click the <span className="text-violet-400 font-medium">"Export as HTML/CSS"</span> button.
              </p>
              <div className="bg-[#0d1320] rounded-lg border border-white/10 p-4 inline-flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-violet-500/20 flex items-center justify-center">
                  <Download className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-sm text-slate-300">Export as HTML/CSS</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-sm">
              3
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Configure options</h3>
              <p className="text-slate-400 mb-4">
                Choose your export preferences before downloading.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-sm">
              4
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Download & integrate</h3>
              <p className="text-slate-400">
                Download the ZIP file containing all HTML, CSS, and assets. Unzip and add to your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Export Options */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-400" />
          Export Options
        </h2>

        <div className="bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Option</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-4 py-3 text-violet-400 font-medium">Include images</td>
                  <td className="px-4 py-3 text-slate-300">Download avatar images locally or use CDN links</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-violet-400 font-medium">Minify CSS</td>
                  <td className="px-4 py-3 text-slate-300">Compress CSS for smaller file size</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-violet-400 font-medium">Inline styles</td>
                  <td className="px-4 py-3 text-slate-300">Embed CSS directly in HTML (single file)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-violet-400 font-medium">Custom class prefix</td>
                  <td className="px-4 py-3 text-slate-300">Add prefix to avoid CSS conflicts (e.g., pl-card)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-violet-400 font-medium">Responsive breakpoints</td>
                  <td className="px-4 py-3 text-slate-300">Include media queries for mobile/tablet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-amber-400" />
          File Structure
        </h2>

        <div className="bg-[#0d1320] rounded-xl border border-white/10 p-6">
          <p className="text-slate-400 mb-4">The exported ZIP contains:</p>

          <div className="font-mono text-sm space-y-1">
            <div className="flex items-center gap-2 text-slate-300">
              <FolderOpen className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400">prooflayer-export/</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 ml-6">
              <FileCode className="w-4 h-4 text-blue-400" />
              <span>index.html</span>
              <span className="text-slate-500 text-xs">- Main testimonial markup</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 ml-6">
              <Palette className="w-4 h-4 text-pink-400" />
              <span>styles.css</span>
              <span className="text-slate-500 text-xs">- Widget styles</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 ml-6">
              <FolderOpen className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">images/</span>
              <span className="text-slate-500 text-xs">- Avatar images (if included)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 ml-12">
              <span className="text-slate-500">avatar-1.jpg</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 ml-12">
              <span className="text-slate-500">avatar-2.jpg</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 ml-12">
              <span className="text-slate-500">...</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Output */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Code className="w-5 h-5 text-emerald-400" />
          Sample Output
        </h2>

        <div className="space-y-4">
          {/* HTML */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-xs font-medium text-slate-500">index.html</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-slate-300">
{`<div class="pl-testimonials">
  <div class="pl-card">
    <div class="pl-rating">
      <span class="pl-star">★</span>
      <span class="pl-star">★</span>
      <span class="pl-star">★</span>
      <span class="pl-star">★</span>
      <span class="pl-star">★</span>
    </div>
    <p class="pl-quote">
      "This product completely transformed our workflow.
      Highly recommend to any team looking to scale."
    </p>
    <div class="pl-author">
      <img src="images/avatar-1.jpg" class="pl-avatar" alt="">
      <div class="pl-info">
        <span class="pl-name">Sarah Johnson</span>
        <span class="pl-title">CEO at TechCorp</span>
      </div>
    </div>
  </div>
  <!-- More testimonials... -->
</div>`}
                </code>
              </pre>
            </div>
          </div>

          {/* CSS */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-xs font-medium text-slate-500">styles.css</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-slate-300">
{`.pl-testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.pl-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.pl-rating {
  color: #f59e0b;
  margin-bottom: 0.75rem;
}

.pl-quote {
  color: #374151;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* ... more styles */`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Tips */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-pink-400" />
          Customization Tips
        </h2>

        <div className="space-y-4">
          {[
            {
              title: 'CSS Variables',
              desc: 'The exported CSS uses CSS custom properties for colors. Change --pl-primary to update the accent color throughout.',
            },
            {
              title: 'BEM Naming',
              desc: 'Classes follow BEM methodology (Block__Element--Modifier) making them easy to override without specificity wars.',
            },
            {
              title: 'Responsive by Default',
              desc: 'The grid layout automatically adjusts columns based on container width. Customize breakpoints in the media queries.',
            },
            {
              title: 'Dark Mode Ready',
              desc: 'Add a .dark class to the parent container to enable dark mode styles (included in export).',
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
            className="group bg-[#0d1320] rounded-xl border border-white/10 p-5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">JavaScript Embed</h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-slate-400">Auto-updating dynamic widgets</p>
          </Link>
          <Link
            href="/docs/webhooks"
            className="group bg-[#0d1320] rounded-xl border border-white/10 p-5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">Webhooks</h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-slate-400">Re-export when new testimonials arrive</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
