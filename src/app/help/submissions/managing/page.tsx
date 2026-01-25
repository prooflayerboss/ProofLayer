import HelpArticle, { Section, Step, Tip, Warning, CodeBlock } from '@/components/HelpArticle';
import Link from 'next/link';

export default function ManagingSubmissions() {
  return (
    <HelpArticle
      title="Managing Testimonial Submissions"
      description="Complete guide to reviewing, approving, and organizing customer testimonials"
      category="Submissions"
      lastUpdated="January 2026"
    >
      <p className="text-lg text-gray-700 mb-6">
        Effective submission management is crucial for maintaining quality and authenticity in your testimonials. This comprehensive
        guide covers everything from your first submission review to advanced filtering, bulk actions, and data export. Learn how to
        build a curated library of powerful social proof.
      </p>

      <Section title="Understanding the Submission Workflow">
        <p className="text-gray-700 mb-4">
          ProofLayer uses a three-stage workflow to ensure you maintain full control over what testimonials appear publicly:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="border-2 border-yellow-500 bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <h3 className="font-bold text-yellow-900">Pending</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              New submissions start here. They're visible only to you in the dashboard.
            </p>
            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
              <li>Not displayed publicly</li>
              <li>Not in widgets or Wall of Love</li>
              <li>Awaiting your review</li>
            </ul>
          </div>

          <div className="border-2 border-green-500 bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="font-bold text-green-900">Approved</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Quality testimonials you've approved for public display.
            </p>
            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
              <li>Visible on Wall of Love</li>
              <li>Shown in all widgets</li>
              <li>Can be featured/promoted</li>
            </ul>
          </div>

          <div className="border-2 border-red-500 bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h3 className="font-bold text-red-900">Rejected</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Testimonials that didn't meet your quality standards.
            </p>
            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
              <li>Never displayed publicly</li>
              <li>Archived for your records</li>
              <li>Can be re-approved later</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="font-semibold text-blue-900 mb-2">Why This Workflow Matters:</p>
          <p className="text-sm text-gray-700">
            Manual approval prevents spam, inappropriate content, or low-quality testimonials from appearing on your site.
            It also gives you time to verify testimonials are genuine and format them consistently.
          </p>
        </div>
      </Section>

      <Section title="Accessing Your Submissions Dashboard">
        <Step number={1} title="Navigate to Submissions">
          <p className="mb-3">
            From your ProofLayer dashboard:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Select the <strong>workspace</strong> containing your forms</li>
            <li>Click <strong>"Submissions"</strong> in the sidebar navigation</li>
            <li>You'll see all submissions across all forms in this workspace</li>
          </ol>
          <p className="mt-3 text-gray-700">
            Alternatively, navigate to a specific form and click <strong>"View Submissions"</strong> to see only that form's responses.
          </p>
        </Step>

        <Step number={2} title="Understanding the Submissions List">
          <p className="mb-3">
            The submissions dashboard shows a card-based view of all testimonials:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
            <h4 className="font-semibold text-gray-900 mb-3">Each Submission Card Displays:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span><strong>Customer Name & Details:</strong> Name, company, role, email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span><strong>Testimonial Content:</strong> Text, video thumbnail, or screenshot preview</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span><strong>Star Rating:</strong> If collected (1-5 stars)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span><strong>Submission Type:</strong> Badge indicating Text, Video, or Screenshot</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span><strong>Status:</strong> Color-coded pending/approved/rejected indicator</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span><strong>Form Name:</strong> Which form this came from</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span><strong>Submission Date:</strong> When it was submitted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span><strong>Action Buttons:</strong> Approve, Reject, Delete, Edit options</span>
              </li>
            </ul>
          </div>
        </Step>

        <Step number={3} title="Dashboard Layout Customization">
          <p className="mb-3">
            Customize how submissions are displayed:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border border-gray-200 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">View Options:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Grid view (default) - cards in rows</li>
                <li>List view - compact table format</li>
                <li>Detailed view - expanded cards</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Sort Options:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Newest first (default)</li>
                <li>Oldest first</li>
                <li>Highest rated</li>
                <li>By customer name (A-Z)</li>
              </ul>
            </div>
          </div>
        </Step>
      </Section>

      <Section title="Reviewing and Approving Testimonials">
        <Step number={1} title="Review a Pending Submission">
          <p className="mb-3">
            Click on any pending submission to open the detailed review modal:
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">What to Check During Review:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900 mb-2">Content Quality:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Is the testimonial specific and detailed?</li>
                  <li>Does it provide real value to prospects?</li>
                  <li>Is it free from spelling/grammar issues?</li>
                  <li>Does it mention concrete results or benefits?</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">Authenticity:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Does the customer name/email look legitimate?</li>
                  <li>Is the company verifiable (if B2B)?</li>
                  <li>Does the video show a real person (not AI)?</li>
                  <li>Is the screenshot genuine and unedited?</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">Appropriateness:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>No offensive language or content</li>
                  <li>No competitor mentions</li>
                  <li>No personally identifiable info (if sensitive)</li>
                  <li>Aligns with brand values</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">Relevance:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Relevant to current product/service</li>
                  <li>Not outdated (old features/pricing)</li>
                  <li>Matches target audience</li>
                  <li>Valuable for prospective customers</li>
                </ul>
              </div>
            </div>
          </div>
        </Step>

        <Step number={2} title="Approve High-Quality Testimonials">
          <p className="mb-3">
            When a testimonial meets your standards:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Click the green <strong>"Approve"</strong> button</li>
            <li>Optionally add internal notes for your team</li>
            <li>Choose whether to feature this testimonial (highlighted in widgets)</li>
            <li>Confirm the approval</li>
          </ol>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-3">
            <p className="text-sm text-gray-700">
              <strong>What happens after approval:</strong> The testimonial immediately becomes visible on your Wall of Love
              and in all active widgets. Widgets update automatically - no code changes needed!
            </p>
          </div>
        </Step>

        <Step number={3} title="Edit Before Approving (Optional)">
          <p className="mb-3">
            You can make minor edits to testimonials before approval:
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">What You Can Edit:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li><strong>Text content:</strong> Fix typos, improve grammar, or shorten for clarity</li>
                <li><strong>Customer name:</strong> Format consistently (e.g., "John Smith" vs "john smith")</li>
                <li><strong>Company name:</strong> Correct capitalization or official naming</li>
                <li><strong>Star rating:</strong> Adjust if clearly misclicked</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">What You Should NOT Change:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>The core message or sentiment</li>
                <li>Specific claims or results mentioned</li>
                <li>Video or screenshot content (can't be edited)</li>
              </ul>
            </div>
          </div>

          <Warning>
            Always maintain testimonial authenticity. Only make minor edits for clarity or formatting. Changing the meaning
            or sentiment is unethical and potentially illegal in some jurisdictions.
          </Warning>
        </Step>

        <Step number={4} title="Reject Low-Quality Submissions">
          <p className="mb-3">
            When a testimonial doesn't meet your standards:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Click the red <strong>"Reject"</strong> button</li>
            <li>Select a rejection reason (helps you track common issues):</li>
          </ol>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-3 mb-3">
            <h4 className="font-semibold text-gray-900 mb-3">Common Rejection Reasons:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-medium text-gray-900 mb-1">Quality Issues:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Too short / not detailed enough</li>
                  <li>Poor grammar or unclear writing</li>
                  <li>Generic (could apply to any product)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Authenticity Concerns:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Suspected spam or fake review</li>
                  <li>Email/company can't be verified</li>
                  <li>Duplicate submission</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Content Issues:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Inappropriate language or tone</li>
                  <li>Contains competitor mentions</li>
                  <li>Violates terms of service</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Other:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Outdated (references old features)</li>
                  <li>Not relevant to current offering</li>
                  <li>Customer requested removal</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700">
            Rejected testimonials are archived and not deleted. You can review them later or change status if needed.
          </p>
        </Step>

        <Step number={5} title="Bulk Actions for Efficiency">
          <p className="mb-3">
            When you have many submissions to review, use bulk actions:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Check the boxes next to multiple submissions</li>
            <li>Click the <strong>"Bulk Actions"</strong> dropdown</li>
            <li>Select an action:</li>
          </ol>
          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <h4 className="font-semibold text-gray-900 mb-2">Available Bulk Actions:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li><strong>Approve Selected:</strong> Approve multiple testimonials at once</li>
              <li><strong>Reject Selected:</strong> Reject multiple submissions</li>
              <li><strong>Delete Selected:</strong> Permanently remove submissions</li>
              <li><strong>Export Selected:</strong> Download data for selected items</li>
              <li><strong>Change Form:</strong> Move to a different form</li>
            </ul>
          </div>

          <Tip>
            Use filters first to narrow down submissions (e.g., all 5-star text testimonials), then bulk approve if they
            all meet your standards. This can save hours when processing many submissions.
          </Tip>
        </Step>
      </Section>

      <Section title="Filtering and Searching Submissions">
        <Step number={1} title="Filter by Status">
          <p className="mb-3">
            Use the status filter tabs at the top of the submissions page:
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium">All (247)</span>
            <span className="px-4 py-2 bg-yellow-50 border border-yellow-300 rounded-lg text-sm font-medium">Pending (18)</span>
            <span className="px-4 py-2 bg-green-50 border border-green-300 rounded-lg text-sm font-medium">Approved (206)</span>
            <span className="px-4 py-2 bg-red-50 border border-red-300 rounded-lg text-sm font-medium">Rejected (23)</span>
          </div>
          <p className="text-sm text-gray-600">
            Numbers in parentheses show count for each status. Click a tab to filter instantly.
          </p>
        </Step>

        <Step number={2} title="Filter by Submission Type">
          <p className="mb-3">
            Toggle to show only specific types of testimonials:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked readOnly />
                <span className="px-2 py-1 bg-blue-100 text-blue-900 rounded">Text</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked readOnly />
                <span className="px-2 py-1 bg-purple-100 text-purple-900 rounded">Video</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked readOnly />
                <span className="px-2 py-1 bg-green-100 text-green-900 rounded">Screenshot</span>
              </label>
            </div>
          </div>
        </Step>

        <Step number={3} title="Filter by Star Rating">
          <p className="mb-3">
            Show only testimonials with specific ratings:
          </p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              <span className="text-yellow-500">★★★★★</span>
              <span>5 Stars Only</span>
              <span className="text-gray-500">(189)</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              <span className="text-yellow-500">★★★★</span>
              <span>4 Stars & Up</span>
              <span className="text-gray-500">(231)</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              <span className="text-yellow-500">★★★</span>
              <span>3 Stars & Up</span>
              <span className="text-gray-500">(247)</span>
            </label>
          </div>
        </Step>

        <Step number={4} title="Filter by Form">
          <p className="mb-3">
            If you have multiple forms, filter submissions by which form they came from:
          </p>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full md:w-64">
            <option>All Forms</option>
            <option>General Customer Feedback</option>
            <option>Product A Reviews</option>
            <option>Post-Purchase Survey</option>
            <option>Beta User Testimonials</option>
          </select>
        </Step>

        <Step number={5} title="Search by Keyword">
          <p className="mb-3">
            Use the search bar to find specific testimonials:
          </p>
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search by name, company, or testimonial text..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10"
            />
            <svg className="absolute right-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <p className="font-semibold text-blue-900 mb-1">Search Tips:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Search by customer name: "John Smith"</li>
              <li>Search by company: "Acme Corp"</li>
              <li>Search testimonial content: "improved sales"</li>
              <li>Search by email domain: "@gmail.com"</li>
            </ul>
          </div>
        </Step>

        <Step number={6} title="Date Range Filtering">
          <p className="mb-3">
            Filter submissions by when they were received:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date:</label>
              <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date:</label>
              <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Useful for monthly reviews, campaign analysis, or finding recent submissions.
          </p>
        </Step>

        <Step number={7} title="Save Custom Filter Presets">
          <p className="mb-3">
            Save frequently used filter combinations for quick access:
          </p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">Example Saved Filters:</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between bg-white p-2 rounded">
                <span>"5-Star Video Testimonials"</span>
                <button className="text-blue-600 text-xs">Apply</button>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded">
                <span>"This Month's Pending"</span>
                <button className="text-blue-600 text-xs">Apply</button>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded">
                <span>"B2B Customer Testimonials"</span>
                <button className="text-blue-600 text-xs">Apply</button>
              </div>
            </div>
          </div>
        </Step>
      </Section>

      <Section title="Exporting Submission Data">
        <p className="text-gray-700 mb-4">
          Export testimonials for backup, analysis, or use in other marketing materials.
        </p>

        <Step number={1} title="Choose What to Export">
          <p className="mb-3">
            You can export:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>All submissions</strong> in the current workspace</li>
            <li><strong>Filtered results</strong> based on your current filters</li>
            <li><strong>Selected items</strong> (using checkboxes and bulk export)</li>
            <li><strong>Single form's submissions</strong> from the form detail page</li>
          </ul>
        </Step>

        <Step number={2} title="Select Export Format">
          <p className="mb-3">
            ProofLayer supports multiple export formats:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">CSV</h4>
              <p className="text-sm text-gray-700 mb-2">
                Spreadsheet format compatible with Excel, Google Sheets, and most tools.
              </p>
              <p className="text-xs text-gray-600">
                Best for: Analysis, reporting, data manipulation
              </p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">JSON</h4>
              <p className="text-sm text-gray-700 mb-2">
                Structured data format for developers and integrations.
              </p>
              <p className="text-xs text-gray-600">
                Best for: API integrations, custom development
              </p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">PDF</h4>
              <p className="text-sm text-gray-700 mb-2">
                Formatted document with testimonials beautifully laid out.
              </p>
              <p className="text-xs text-gray-600">
                Best for: Presentations, proposals, printing
              </p>
            </div>
          </div>
        </Step>

        <Step number={3} title="Configure Export Settings">
          <p className="mb-3">
            Customize what data is included:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Export Options:</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked readOnly />
                <span>Include customer contact info (name, email, company)</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked readOnly />
                <span>Include testimonial content</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked readOnly />
                <span>Include ratings and submission date</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                <span>Include video/screenshot URLs</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                <span>Include internal notes and tags</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                <span>Include approval/rejection reasons</span>
              </label>
            </div>
          </div>
        </Step>

        <Step number={4} title="Download and Use Your Export">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Click <strong>"Export"</strong> button</li>
            <li>Choose your format (CSV, JSON, or PDF)</li>
            <li>Configure export options</li>
            <li>Click <strong>"Generate Export"</strong></li>
            <li>Download the file when ready (usually instant, may take a minute for large exports)</li>
          </ol>

          <Tip>
            <strong>Regular Backups:</strong> Export your testimonials monthly as a backup. While ProofLayer stores your data
            securely, having your own copies provides peace of mind.
          </Tip>
        </Step>
      </Section>

      <Section title="Advanced Submission Management">
        <div className="space-y-4">
          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Featuring Top Testimonials</h3>
            <p className="text-gray-700 mb-3">
              Mark exceptional testimonials as "Featured" to highlight them in widgets:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Featured testimonials appear first in all widgets</li>
              <li>Can be configured to always show in Spotlight widgets</li>
              <li>Useful for promoting testimonials from well-known customers or detailed case studies</li>
            </ul>
          </div>

          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Adding Tags and Categories</h3>
            <p className="text-gray-700 mb-3">
              Organize testimonials with custom tags:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li><strong>Product tags:</strong> "CRM", "Email Tool", "Analytics"</li>
              <li><strong>Feature tags:</strong> "Ease of Use", "Customer Support", "ROI"</li>
              <li><strong>Industry tags:</strong> "SaaS", "E-commerce", "Healthcare"</li>
              <li><strong>Campaign tags:</strong> "Q1 2026", "Product Launch", "Black Friday"</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">
              Use tags to create filtered widgets showing only testimonials about specific features or from certain industries.
            </p>
          </div>

          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Internal Notes and Collaboration</h3>
            <p className="text-gray-700 mb-3">
              Add private notes to submissions for team coordination:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Notes are only visible to your team, never to customers</li>
              <li>Use for verification status, follow-up reminders, or context</li>
              <li>Great for agencies managing client testimonials</li>
            </ul>
          </div>

          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Automated Approval Rules (Pro/Agency)</h3>
            <p className="text-gray-700 mb-3">
              Set up rules to automatically approve testimonials meeting certain criteria:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Auto-approve all 5-star text testimonials from verified emails</li>
              <li>Auto-approve testimonials from whitelisted email domains (e.g., @fortune500company.com)</li>
              <li>Auto-reject submissions with spam keywords or banned domains</li>
            </ul>
            <Warning>
              Use automated approval cautiously. Always spot-check auto-approved testimonials to ensure quality is maintained.
            </Warning>
          </div>
        </div>
      </Section>

      <Section title="Best Practices for Submission Management">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-5 rounded-lg">
            <h4 className="font-bold text-green-900 mb-3">Do's:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Review submissions within 24-48 hours of receipt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Maintain consistent quality standards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Verify authenticity before approving</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Thank customers who submit testimonials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Regularly refresh displayed testimonials</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 p-5 rounded-lg">
            <h4 className="font-bold text-red-900 mb-3">Don'ts:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Don't approve obviously fake testimonials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Don't heavily edit testimonials (maintains authenticity)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Don't approve testimonials with competitor mentions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Don't let pending submissions pile up for weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Don't approve testimonials without verifying legitimacy</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Master Your Testimonial Library</h2>
        <p className="text-blue-100 mb-6">
          Effective submission management ensures you showcase only the best, most authentic testimonials that drive conversions
          and build trust with prospects.
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/help/wall-of-love/overview"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Next: Wall of Love
          </Link>
        </div>
      </div>
    </HelpArticle>
  );
}
