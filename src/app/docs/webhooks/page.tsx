import { Webhook, Zap, Lock, RefreshCw, CheckCircle, AlertCircle, Code, Send, ChevronRight, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Webhooks - ProofLayer Docs',
  description: 'Set up real-time webhooks to get notified when new testimonials are submitted. Integrate with your workflow automation.',
};

export default function WebhooksDocsPage() {
  return (
    <div className="max-w-4xl">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Webhook className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-orange-400">Integration Guide</p>
            <h1 className="text-3xl font-bold text-white">Webhooks</h1>
          </div>
        </div>
        <p className="text-lg text-slate-400 leading-relaxed">
          Receive real-time HTTP notifications when new testimonials are submitted. Perfect for triggering automation, sending alerts, or syncing with your CRM.
        </p>
      </div>

      {/* What are Webhooks */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          What are Webhooks?
        </h2>

        <div className="bg-[#0d1320] rounded-xl border border-white/10 p-6 mb-6">
          <p className="text-slate-300 leading-relaxed mb-4">
            Webhooks are automated HTTP POST requests sent to your server when specific events occur. When someone submits a testimonial, ProofLayer can instantly notify your application with the testimonial data.
          </p>
          <p className="text-slate-400 text-sm">
            Think of webhooks as "reverse APIs" - instead of your application polling our API for updates, we push updates to you in real-time.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              title: 'Real-time',
              desc: 'Instant notifications within seconds of submission',
            },
            {
              icon: Lock,
              title: 'Secure',
              desc: 'Signed with HMAC for authenticity verification',
            },
            {
              icon: RefreshCw,
              title: 'Reliable',
              desc: 'Automatic retries with exponential backoff',
            },
          ].map((feature) => (
            <div key={feature.title} className="bg-[#0d1320] rounded-xl border border-white/10 p-5">
              <feature.icon className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Setup Guide */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-400" />
          Setup Guide
        </h2>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
              1
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Create an endpoint</h3>
              <p className="text-slate-400 mb-4">
                Set up an HTTPS endpoint on your server to receive webhook POST requests.
              </p>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <span className="text-xs font-medium text-slate-500">Example: Node.js / Express</span>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-slate-300">
{`app.post('/webhooks/prooflayer', async (req, res) => {
  const payload = req.body;

  // Process the webhook
  console.log('New testimonial:', payload);

  // Respond quickly (200 OK)
  res.status(200).send('Received');

  // Handle async tasks after responding
  await processTestimonial(payload);
});`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
              2
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Add webhook URL to dashboard</h3>
              <p className="text-slate-400 mb-4">
                In your workspace settings, navigate to <span className="text-orange-400 font-medium">Webhooks</span> and add your endpoint URL.
              </p>
              <div className="bg-[#0d1320] rounded-lg border border-white/10 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <label className="text-sm text-slate-400">Webhook URL:</label>
                </div>
                <div className="bg-slate-900/50 rounded px-3 py-2 font-mono text-sm text-slate-300">
                  https://yourdomain.com/webhooks/prooflayer
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
              3
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Save your signing secret</h3>
              <p className="text-slate-400 mb-4">
                Copy the webhook signing secret from the dashboard. You'll use this to verify webhook authenticity.
              </p>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-300 font-medium mb-1">Keep your signing secret secure</p>
                  <p className="text-xs text-slate-400">Store it as an environment variable - never commit it to version control.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
              4
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold text-white mb-2">Test your webhook</h3>
              <p className="text-slate-400">
                Click <span className="text-orange-400 font-medium">"Send test webhook"</span> to verify your endpoint is working correctly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payload Structure */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-400" />
          Payload Structure
        </h2>

        <p className="text-slate-400 mb-4">Each webhook delivers a JSON payload with the following structure:</p>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
              <span className="text-xs font-medium text-slate-500">Webhook Payload (JSON)</span>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code className="text-slate-300">
{`{
  "event": "testimonial.submitted",
  "timestamp": "2026-01-22T14:30:00Z",
  "workspace_id": "ws_abc123",
  "form_id": "frm_xyz789",
  "testimonial": {
    "id": "test_def456",
    "type": "text",
    "content": "Amazing product! Highly recommend.",
    "rating": 5,
    "author": {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "company": "Acme Corp",
      "title": "Product Manager"
    },
    "metadata": {
      "ip_address": "192.0.2.1",
      "user_agent": "Mozilla/5.0...",
      "referrer": "https://google.com"
    },
    "submitted_at": "2026-01-22T14:30:00Z"
  }
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="mt-6 bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Field</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-4 py-3 text-orange-400 font-mono text-xs">event</td>
                  <td className="px-4 py-3 text-slate-500">string</td>
                  <td className="px-4 py-3 text-slate-300">Event type (currently only "testimonial.submitted")</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-orange-400 font-mono text-xs">timestamp</td>
                  <td className="px-4 py-3 text-slate-500">ISO 8601</td>
                  <td className="px-4 py-3 text-slate-300">When the webhook was sent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-orange-400 font-mono text-xs">testimonial.type</td>
                  <td className="px-4 py-3 text-slate-500">string</td>
                  <td className="px-4 py-3 text-slate-300">"text", "video", or "screenshot"</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-orange-400 font-mono text-xs">testimonial.rating</td>
                  <td className="px-4 py-3 text-slate-500">number</td>
                  <td className="px-4 py-3 text-slate-300">Star rating (1-5, null if not provided)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Signature Verification */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          Signature Verification
        </h2>

        <p className="text-slate-400 mb-6">
          All webhooks include a signature in the <code className="text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">X-ProofLayer-Signature</code> header. Verify this to ensure the request came from ProofLayer.
        </p>

        <div className="relative group mb-6">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
              <span className="text-xs font-medium text-slate-500">Verification Example (Node.js)</span>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code className="text-slate-300">
{`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(JSON.stringify(payload)).digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

// In your endpoint
app.post('/webhooks/prooflayer', (req, res) => {
  const signature = req.headers['x-prooflayer-signature'];
  const secret = process.env.PROOFLAYER_WEBHOOK_SECRET;

  if (!verifyWebhook(req.body, signature, secret)) {
    return res.status(401).send('Invalid signature');
  }

  // Process webhook...
  res.status(200).send('OK');
});`}
              </code>
            </pre>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
          <div className="flex gap-3">
            <Lock className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">Always verify signatures</h3>
              <p className="text-sm text-slate-300">
                Without verification, malicious actors could send fake webhook requests to your endpoint. Always validate the signature before processing the payload.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Retry Logic */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-blue-400" />
          Retry Logic
        </h2>

        <div className="bg-[#0d1320] rounded-xl border border-white/10 p-6 mb-6">
          <p className="text-slate-300 mb-4">
            If your endpoint doesn't respond with a 2xx status code, ProofLayer will automatically retry the webhook using exponential backoff:
          </p>
          <ul className="space-y-2">
            {[
              { time: 'Immediately', desc: 'First retry after 1 second' },
              { time: '2nd retry', desc: 'After 5 seconds' },
              { time: '3rd retry', desc: 'After 30 seconds' },
              { time: '4th retry', desc: 'After 2 minutes' },
              { time: '5th retry', desc: 'After 10 minutes' },
              { time: 'Final retry', desc: 'After 1 hour' },
            ].map((retry) => (
              <li key={retry.time} className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300"><span className="font-medium">{retry.time}:</span> {retry.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-blue-400">Best practice:</span> Respond with 200 OK as quickly as possible, then process the webhook asynchronously. This prevents timeouts and ensures reliable delivery.
          </p>
        </div>
      </section>

      {/* Event Types */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Event Types</h2>

        <div className="bg-[#0d1320] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Event</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-4 py-3">
                    <code className="text-orange-400 bg-orange-500/10 px-2 py-1 rounded text-xs font-mono">testimonial.submitted</code>
                  </td>
                  <td className="px-4 py-3 text-slate-300">When a new testimonial is submitted (before moderation)</td>
                </tr>
                <tr className="opacity-50">
                  <td className="px-4 py-3">
                    <code className="text-slate-500 bg-slate-500/10 px-2 py-1 rounded text-xs font-mono">testimonial.approved</code>
                    <span className="ml-2 text-xs text-slate-500">(Coming soon)</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">When you approve a testimonial</td>
                </tr>
                <tr className="opacity-50">
                  <td className="px-4 py-3">
                    <code className="text-slate-500 bg-slate-500/10 px-2 py-1 rounded text-xs font-mono">testimonial.rejected</code>
                    <span className="ml-2 text-xs text-slate-500">(Coming soon)</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">When you reject a testimonial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Common Use Cases</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Slack notifications',
              desc: 'Post to Slack when new testimonials arrive for instant team visibility.',
            },
            {
              title: 'CRM sync',
              desc: 'Automatically add testimonials to customer records in your CRM.',
            },
            {
              title: 'Email alerts',
              desc: 'Send email notifications to your team or specific stakeholders.',
            },
            {
              title: 'Analytics tracking',
              desc: 'Track testimonial submissions in your analytics platform.',
            },
            {
              title: 'Auto-approval workflow',
              desc: 'Build custom moderation logic based on keywords or sender.',
            },
            {
              title: 'Content distribution',
              desc: 'Automatically share approved testimonials on social media.',
            },
          ].map((useCase) => (
            <div key={useCase.title} className="bg-[#0d1320] rounded-xl border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{useCase.title}</h3>
                  <p className="text-sm text-slate-400">{useCase.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6">Next Steps</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/docs/links"
            className="group bg-[#0d1320] rounded-xl border border-white/10 p-5 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">Direct Links</h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-slate-400">Start collecting testimonials via shared links</p>
          </Link>
          <Link
            href="/dashboard"
            className="group bg-[#0d1320] rounded-xl border border-white/10 p-5 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">Configure Webhooks</h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-slate-400">Set up webhooks in your dashboard</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
