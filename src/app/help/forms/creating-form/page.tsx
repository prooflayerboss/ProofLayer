import HelpArticle, { Section, Step, Tip, Warning, CodeBlock } from '@/components/HelpArticle';
import Link from 'next/link';

export default function CreatingForm() {
  return (
    <HelpArticle
      title="Creating Testimonial Collection Forms"
      description="Master the art of building effective testimonial collection forms that drive submissions"
      category="Forms"
      lastUpdated="January 2026"
    >
      <p className="text-lg text-gray-700 mb-6">
        Forms are your primary tool for collecting testimonials in ProofLayer. A well-designed form makes it easy for customers
        to share their feedback while giving you control over what information you collect. This comprehensive guide covers everything
        from basic setup to advanced customization techniques.
      </p>

      <Section title="Understanding Testimonial Forms">
        <p className="text-gray-700 mb-4">
          A ProofLayer form is a customizable web page where customers can submit testimonials. Each form lives within a workspace
          and has a unique URL you can share via email, social media, or embed on your website.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">What Makes a Great Testimonial Form:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Clear Purpose:</strong> Customer knows exactly what you're asking for</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Branded:</strong> Matches your company's look and feel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Simple:</strong> Doesn't ask for unnecessary information</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Flexible:</strong> Offers multiple submission types</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Mobile-Friendly:</strong> Works perfectly on all devices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Fast:</strong> Can be completed in under 2 minutes</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Step-by-Step: Creating Your Form">
        <Step number={1} title="Navigate to Form Creation">
          <p className="mb-3">
            From your workspace dashboard, you have several ways to create a new form:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Click the <strong>"Create Form"</strong> button on the workspace dashboard</li>
            <li>Select "Forms" from the sidebar, then click "New Form"</li>
            <li>Use the quick action menu (+ icon) in the top navigation</li>
          </ul>
          <p className="mt-3 text-gray-700">
            You'll be taken to the form creation wizard, which guides you through all customization options step by step.
          </p>
        </Step>

        <Step number={2} title="Name Your Form">
          <p className="mb-3">
            The form name is for internal organization and helps you identify the form in your dashboard. It's not shown to customers
            submitting testimonials.
          </p>

          <div className="bg-blue-50 p-5 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-900 mb-3">Form Naming Strategies:</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900 mb-1">By Purpose:</p>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>"General Customer Feedback"</li>
                  <li>"Post-Purchase Testimonials"</li>
                  <li>"Beta User Feedback"</li>
                  <li>"Case Study Requests"</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">By Product/Feature:</p>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>"CRM Platform Reviews"</li>
                  <li>"Email Marketing Tool Feedback"</li>
                  <li>"Mobile App Testimonials"</li>
                  <li>"Integration Feature Reviews"</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">By Campaign:</p>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>"Q1 2026 Testimonial Drive"</li>
                  <li>"Product Launch Campaign"</li>
                  <li>"Conference Attendee Feedback"</li>
                  <li>"Webinar Participant Reviews"</li>
                </ul>
              </div>
            </div>
          </div>

          <Tip>
            <strong>Pro tip:</strong> Use descriptive names that will make sense 6 months from now. "Form 1" won't be helpful
            when you have 20 forms. Instead use "Homepage Widget Testimonials" or "Product A User Reviews".
          </Tip>
        </Step>

        <Step number={3} title="Customize the Form Header">
          <p className="mb-3">
            The form header is the first thing customers see. Make it welcoming and clear about what you're requesting.
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Header Title</h4>
              <p className="text-gray-700 text-sm mb-3">
                This is the main headline on your form page. Make it inviting and action-oriented.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-medium text-green-700 mb-1">Great Examples:</p>
                  <ul className="list-disc list-inside text-gray-700 ml-2 space-y-1">
                    <li>"Share Your Experience"</li>
                    <li>"Tell Us Your Story"</li>
                    <li>"We'd Love Your Feedback"</li>
                    <li>"How Are We Doing?"</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-700 mb-1">Avoid:</p>
                  <ul className="list-disc list-inside text-gray-700 ml-2 space-y-1">
                    <li>"Testimonial Form" (too corporate)</li>
                    <li>"Submit Review" (sounds like work)</li>
                    <li>"Feedback Request" (formal and cold)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Welcome Message</h4>
              <p className="text-gray-700 text-sm mb-3">
                A brief description that explains why you're collecting testimonials and what will happen with them.
              </p>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-700 mb-2"><strong>Example Welcome Message:</strong></p>
                <p className="text-sm text-gray-600 italic">
                  "Thank you for being a valued customer! We'd love to hear about your experience with [Product Name].
                  Your feedback helps us improve and helps other customers make informed decisions. This will only take 2 minutes."
                </p>
              </div>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Custom Questions (Optional)</h4>
              <p className="text-gray-700 text-sm mb-2">
                Guide customers with specific questions rather than a blank text box:
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm ml-4 space-y-1">
                <li>"What problem were you trying to solve?"</li>
                <li>"How has our product helped you achieve your goals?"</li>
                <li>"What would you tell someone considering our service?"</li>
                <li>"What's your favorite feature and why?"</li>
              </ul>
            </div>
          </div>
        </Step>

        <Step number={4} title="Configure Collection Preferences">
          <p className="mb-3">
            Choose what information to collect from customers. Balance getting useful data with keeping the form quick to complete.
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Required Fields (Always Collected):</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                  <strong>Name:</strong> Customer's full name for attribution
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                  <strong>Testimonial Content:</strong> Text, video, or screenshot submission
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900">Optional Fields (Toggle On/Off):</h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" checked readOnly />
                  <div>
                    <p className="font-medium text-gray-900">Email Address</p>
                    <p className="text-sm text-gray-600">
                      Useful for follow-ups or requesting permission to use testimonials. Consider making this optional
                      to reduce friction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" checked readOnly />
                  <div>
                    <p className="font-medium text-gray-900">Company Name</p>
                    <p className="text-sm text-gray-600">
                      Important for B2B testimonials. Shows credibility when displayed (e.g., "John Doe, CEO at Acme Corp").
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Job Title/Role</p>
                    <p className="text-sm text-gray-600">
                      Adds authority to testimonials (e.g., "Sarah Chen, Product Manager"). Great for B2B and professional services.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Website URL</p>
                    <p className="text-sm text-gray-600">
                      Link to customer's company or personal site. Can be displayed alongside testimonial for added credibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Social Media Links</p>
                    <p className="text-sm text-gray-600">
                      Twitter, LinkedIn, or other profiles. Useful for reaching out or giving credit when sharing testimonials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" checked readOnly />
                  <div>
                    <p className="font-medium text-gray-900">Star Rating</p>
                    <p className="text-sm text-gray-600">
                      1-5 star rating system. Great for quick sentiment analysis and filtering. Shows average ratings in widgets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Warning>
            The more fields you require, the lower your completion rate will be. Only collect information you'll actually use.
            A form with 3-4 fields typically performs 30-40% better than one with 8+ fields.
          </Warning>
        </Step>

        <Step number={5} title="Choose Submission Types">
          <p className="mb-3">
            ProofLayer supports three types of testimonials. You can enable one, two, or all three based on your needs.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <div className="flex items-center gap-3 mb-2">
                <input type="checkbox" checked readOnly />
                <h4 className="font-bold text-gray-900">Text Testimonials</h4>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Traditional written reviews. Quick and easy for customers, easy to moderate and display.
              </p>
              <div className="bg-white p-3 rounded border border-blue-200">
                <p className="font-medium text-gray-900 text-sm mb-1">Best For:</p>
                <ul className="list-disc list-inside text-gray-700 text-xs ml-2 space-y-1">
                  <li>Quick feedback collection</li>
                  <li>SEO-friendly content</li>
                  <li>Easy moderation and editing</li>
                  <li>Low barrier to entry for customers</li>
                </ul>
              </div>
              <div className="mt-3 text-sm">
                <p className="font-medium text-gray-900 mb-1">Configuration Options:</p>
                <ul className="list-disc list-inside text-gray-700 ml-2 space-y-1">
                  <li>Minimum character count (prevents "Great!" type responses)</li>
                  <li>Maximum character count (keeps testimonials concise)</li>
                  <li>Placeholder text to guide responses</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
              <div className="flex items-center gap-3 mb-2">
                <input type="checkbox" checked readOnly />
                <h4 className="font-bold text-gray-900">Video Testimonials</h4>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Authentic video recordings that capture emotion and personality. Studies show video testimonials convert 2-3x better than text.
              </p>
              <div className="bg-white p-3 rounded border border-purple-200">
                <p className="font-medium text-gray-900 text-sm mb-1">Best For:</p>
                <ul className="list-disc list-inside text-gray-700 text-xs ml-2 space-y-1">
                  <li>High-impact social proof on landing pages</li>
                  <li>Building emotional connection with prospects</li>
                  <li>Case studies and success stories</li>
                  <li>Premium products/services ($500+)</li>
                </ul>
              </div>
              <div className="mt-3 text-sm">
                <p className="font-medium text-gray-900 mb-1">How It Works:</p>
                <ol className="list-decimal list-inside text-gray-700 ml-2 space-y-1">
                  <li>Customer clicks "Record Video" button</li>
                  <li>Browser requests camera/microphone permission</li>
                  <li>Customer records video (or uploads existing file)</li>
                  <li>Video is automatically uploaded and processed</li>
                  <li>You receive notification to review in dashboard</li>
                </ol>
              </div>
              <Tip>
                Provide video recording tips in your form welcome message: "Find a quiet space, look at the camera, and speak
                naturally. Keep it under 2 minutes."
              </Tip>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
              <div className="flex items-center gap-3 mb-2">
                <input type="checkbox" checked readOnly />
                <h4 className="font-bold text-gray-900">Screenshot Testimonials</h4>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Upload screenshots of social media posts, reviews, or messages. Perfect for capturing organic social proof.
              </p>
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="font-medium text-gray-900 text-sm mb-1">Best For:</p>
                <ul className="list-disc list-inside text-gray-700 text-xs ml-2 space-y-1">
                  <li>Twitter/LinkedIn testimonials</li>
                  <li>Product Hunt reviews and comments</li>
                  <li>App store reviews</li>
                  <li>Email testimonials or Slack messages</li>
                  <li>Reddit or forum posts</li>
                </ul>
              </div>
              <div className="mt-3 text-sm">
                <p className="font-medium text-gray-900 mb-1">Supported Formats:</p>
                <ul className="list-disc list-inside text-gray-700 ml-2">
                  <li>PNG, JPG, JPEG, WebP</li>
                  <li>Maximum file size: 10 MB</li>
                  <li>Recommended: High resolution screenshots for clarity</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
            <p className="font-semibold text-yellow-900 mb-2">Recommended Approach:</p>
            <p className="text-yellow-800 text-sm">
              Enable all three submission types and let customers choose their preferred method. This maximizes submission rates
              while giving you diverse testimonial content to work with.
            </p>
          </div>
        </Step>

        <Step number={6} title="Customize Brand Colors (Pro/Agency Plans)">
          <p className="mb-3">
            Pro and Agency plan users can customize form colors to match their brand identity. This creates a cohesive experience
            from your website to the testimonial form.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 p-4 rounded-lg">
              <div className="w-full h-20 bg-blue-600 rounded mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-1">Primary Color</h4>
              <p className="text-sm text-gray-600 mb-2">Used for buttons, links, and accents</p>
              <input type="text" value="#3B82F6" readOnly className="w-full px-2 py-1 border rounded text-sm font-mono" />
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <div className="w-full h-20 bg-gray-50 rounded mb-3 border border-gray-200"></div>
              <h4 className="font-semibold text-gray-900 mb-1">Background Color</h4>
              <p className="text-sm text-gray-600 mb-2">Main form background</p>
              <input type="text" value="#F9FAFB" readOnly className="w-full px-2 py-1 border rounded text-sm font-mono" />
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
              <div className="w-full h-20 bg-gray-900 rounded mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-1">Text Color</h4>
              <p className="text-sm text-gray-600 mb-2">Primary text throughout form</p>
              <input type="text" value="#111827" readOnly className="w-full px-2 py-1 border rounded text-sm font-mono" />
            </div>
          </div>

          <Tip>
            <strong>Color Accessibility:</strong> Ensure sufficient contrast between text and background colors. Use tools like
            WebAIM's Contrast Checker to verify your colors meet WCAG AA standards (4.5:1 ratio minimum).
          </Tip>
        </Step>

        <Step number={7} title="Set Language and Localization">
          <p className="mb-3">
            ProofLayer supports multiple languages for form interface elements like buttons, labels, and validation messages.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Supported Languages:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700">
              <div>• English (US)</div>
              <div>• Spanish (ES)</div>
              <div>• French (FR)</div>
              <div>• German (DE)</div>
              <div>• Italian (IT)</div>
              <div>• Portuguese (PT)</div>
              <div>• Japanese (JA)</div>
              <div>• Chinese (ZH)</div>
            </div>
          </div>

          <p className="text-gray-700 mt-3 text-sm">
            Note: Language setting only affects form UI elements. You'll still write your custom header, welcome message, and
            questions in your preferred language.
          </p>
        </Step>

        <Step number={8} title="Configure Form Status and Visibility">
          <p className="mb-3">
            Control whether your form is live and accepting submissions or in draft mode for testing.
          </p>

          <div className="space-y-3">
            <div className="border-l-4 border-green-500 bg-green-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <h4 className="font-bold text-gray-900">Active Status</h4>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Form is live and accepting submissions. Share the link with customers.
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm ml-4">
                <li>Form URL is publicly accessible</li>
                <li>Submissions are received and appear in dashboard</li>
                <li>Form can be embedded via widgets</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-400 bg-gray-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <h4 className="font-bold text-gray-900">Draft Status</h4>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Form is saved but not accepting submissions. Use for testing and preview.
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm ml-4">
                <li>Form URL shows "This form is not currently accepting submissions"</li>
                <li>No submissions will be recorded</li>
                <li>You can preview the form layout and test functionality</li>
              </ul>
            </div>
          </div>

          <Tip>
            <strong>Testing Workflow:</strong> Create forms in draft mode first. Submit test testimonials yourself to verify
            everything works correctly, then activate the form when you're ready to share it.
          </Tip>
        </Step>

        <Step number={9} title="Save and Get Your Form Link">
          <p className="mb-3">
            Click <strong>"Create Form"</strong> to save your configuration. ProofLayer will:
          </p>

          <ol className="space-y-2 text-gray-700 mb-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Generate a unique URL slug for your form</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Create the form page with your custom branding</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Show you the shareable form link</span>
            </li>
          </ol>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-3">
            https://prooflayer.com/f/your-form-slug
          </div>

          <p className="text-gray-700">
            Copy this link and share it with customers via email, social media, or embed it on your website.
          </p>
        </Step>
      </Section>

      <Section title="Advanced Form Customization">
        <div className="space-y-4">
          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Thank You Page Customization</h3>
            <p className="text-gray-700 mb-3">
              Customize what customers see after submitting a testimonial:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm ml-4">
              <li><strong>Custom Thank You Message:</strong> Personalize the confirmation message</li>
              <li><strong>Redirect URL:</strong> Send customers to a specific page after submission (e.g., special offer)</li>
              <li><strong>Social Sharing Prompts:</strong> Encourage customers to share their testimonial</li>
            </ul>
          </div>

          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Email Notifications</h3>
            <p className="text-gray-700 mb-3">
              Get notified when new testimonials are submitted:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm ml-4">
              <li><strong>Instant Notifications:</strong> Email alert for every submission</li>
              <li><strong>Daily Digest:</strong> Summary of all submissions in the last 24 hours</li>
              <li><strong>No Notifications:</strong> Check dashboard manually</li>
            </ul>
          </div>

          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Form Limits and Restrictions</h3>
            <p className="text-gray-700 mb-3">
              Control submission behavior:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm ml-4">
              <li><strong>Submission Cap:</strong> Automatically deactivate form after N submissions</li>
              <li><strong>Time Window:</strong> Only accept submissions between specific dates</li>
              <li><strong>Duplicate Prevention:</strong> Block multiple submissions from same email</li>
            </ul>
          </div>

          <div className="border border-gray-200 p-5 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Conditional Logic (Coming Soon)</h3>
            <p className="text-gray-700 mb-2">
              Show/hide fields based on previous answers:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
              <li>Ask for company name only if role is "Business Owner"</li>
              <li>Show different questions based on star rating</li>
              <li>Request video testimonial from 5-star reviews</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Best Practices for High Conversion Forms">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-5 rounded-lg">
            <h4 className="font-bold text-green-900 mb-3">Do's:</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">✓</span>
                <span><strong>Ask at the right time:</strong> Send form when customers are happiest (after success, great support, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">✓</span>
                <span><strong>Make it personal:</strong> Use customer's name in email invitation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">✓</span>
                <span><strong>Provide examples:</strong> Show sample testimonials to guide responses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">✓</span>
                <span><strong>Keep it short:</strong> Aim for 2-minute completion time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">✓</span>
                <span><strong>Mobile optimize:</strong> 60%+ of testimonials come from mobile</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 p-5 rounded-lg">
            <h4 className="font-bold text-red-900 mb-3">Don'ts:</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-1">✗</span>
                <span><strong>Don't overwhelm:</strong> Avoid asking for 10+ pieces of information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-1">✗</span>
                <span><strong>Don't be vague:</strong> "Tell us what you think" is too broad</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-1">✗</span>
                <span><strong>Don't spam:</strong> One follow-up is OK, three is annoying</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-1">✗</span>
                <span><strong>Don't hide purpose:</strong> Be upfront about using testimonials publicly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-1">✗</span>
                <span><strong>Don't forget incentives:</strong> Consider offering something for detailed testimonials</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
          <h4 className="font-bold text-xl mb-2">The 10/50/100 Rule</h4>
          <p className="text-blue-100 mb-3">
            For every 100 form views, expect approximately:
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">50</div>
              <div className="text-sm text-blue-100">Will start the form</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">25</div>
              <div className="text-sm text-blue-100">Will complete it</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">10</div>
              <div className="text-sm text-blue-100">High-quality submissions</div>
            </div>
          </div>
          <p className="text-sm text-blue-100 mt-3">
            Optimize your form to beat these averages!
          </p>
        </div>
      </Section>

      <Section title="Sharing Your Form">
        <p className="text-gray-700 mb-4">
          Once your form is created, here are effective ways to collect testimonials:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
            <h4 className="font-bold text-blue-900 mb-2">Email Campaigns</h4>
            <p className="text-sm text-gray-700 mb-2">Send personalized requests to happy customers:</p>
            <CodeBlock>{`Subject: Would you share your experience with us?

Hi [Name],

We noticed you've been using [Product] for [Time Period] and wanted to reach out personally.

Would you be willing to share a quick testimonial about your experience? It only takes 2 minutes and helps other businesses discover us.

[Form Link]

Thanks so much!
[Your Name]`}</CodeBlock>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
            <h4 className="font-bold text-purple-900 mb-2">Post-Purchase Automation</h4>
            <p className="text-sm text-gray-700 mb-2">Trigger automatically after successful transaction:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
              <li>E-commerce: 7-14 days after delivery</li>
              <li>SaaS: After onboarding completion</li>
              <li>Services: Immediately after project completion</li>
              <li>Courses: After 50% completion or finish</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4">
            <h4 className="font-bold text-green-900 mb-2">Website Integration</h4>
            <p className="text-sm text-gray-700 mb-2">Strategic placement on your site:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
              <li>Footer link: "Share Your Story"</li>
              <li>Thank you page after checkout</li>
              <li>Customer portal/dashboard</li>
              <li>Support ticket resolution page</li>
            </ul>
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
            <h4 className="font-bold text-orange-900 mb-2">Social Media</h4>
            <p className="text-sm text-gray-700 mb-2">Leverage your social presence:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
              <li>Pin form link in Twitter bio</li>
              <li>Share in LinkedIn post</li>
              <li>Instagram story with link sticker</li>
              <li>Facebook group announcement</li>
            </ul>
          </div>
        </div>
      </Section>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Ready to Create Your Form?</h2>
        <p className="text-blue-100 mb-6">
          You now have everything you need to build a high-converting testimonial collection form. Start gathering social proof today!
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard/workspaces"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Create Your Form
          </Link>
          <Link
            href="/help/widgets/creating"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Next: Display Testimonials
          </Link>
        </div>
      </div>
    </HelpArticle>
  );
}
