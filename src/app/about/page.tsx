import Link from 'next/link';
import { Heart, Lightbulb, Target } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'About ProofLayer - Built by a Problem Solver, For Problem Solvers',
  description: 'The story of how ProofLayer was born from a simple realization: you shouldn\'t have to rent your reputation.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              You Shouldn't Have to
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Rent Your Reputation
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              That's the idea that sparked ProofLayer. Here's the story of how a corporate problem-solver turned frustration into a solution.
            </p>
          </div>
        </div>

        {/* Founder Story */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Origin Story</h2>

              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Hi, I'm Curtis. By day, I work what most people would call a "normal" 9-to-5 job in the corporate world—and honestly? I love it. But here's the thing: I've always been that person who can't help but solve problems.
                </p>

                <p className="text-lg leading-relaxed">
                  You know the type. Someone mentions a challenge, and my brain immediately starts mapping out solutions. It's not work for me—it's just how I'm wired. I'm a thinker, a builder, someone who gets genuine satisfaction from turning "this is annoying" into "here's how we fix it."
                </p>

                <p className="text-lg leading-relaxed">
                  ProofLayer was born from one of those moments.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                  <p className="text-lg italic text-gray-800">
                    "At my day job, we had this recurring problem: getting testimonials from customers was like pulling teeth. People were happy with our work, but actually getting them to write something? Nearly impossible."
                  </p>
                </div>

                <p className="text-lg leading-relaxed">
                  Sound familiar? I bet it does. So I started looking for tools to make this easier. That's when I stumbled into the world of testimonial platforms, and honestly, I couldn't believe what I saw.
                </p>

                <p className="text-lg leading-relaxed">
                  Every. Single. One. Was a monthly subscription.
                </p>

                <p className="text-lg leading-relaxed">
                  Think about that for a second. You're collecting <em>your</em> testimonials, from <em>your</em> customers, about <em>your</em> business... and you're <strong>renting</strong> the platform to display them? Stop paying, and poof—your social proof disappears.
                </p>

                <p className="text-lg leading-relaxed">
                  That's not a tool. That's a hostage situation.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Lightbulb Moment</h3>

                <p className="text-lg leading-relaxed">
                  Your reputation is your most valuable asset. It's what you've built through years of hard work, delivered promises, and satisfied customers. Why on earth should you have to pay a monthly fee just to display it?
                </p>

                <p className="text-lg leading-relaxed">
                  You don't rent your website. You don't rent your logo. You don't rent your customer database. So why would you rent your testimonials?
                </p>

                <p className="text-lg leading-relaxed">
                  The more I thought about it, the more frustrated I got. And when I get frustrated, I don't complain—I build.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Building a Better Way</h3>

                <p className="text-lg leading-relaxed">
                  ProofLayer was built in the margins—early mornings, late nights, weekends. Not because I had to, but because I <em>wanted</em> to. Because the idea wouldn't leave me alone: what if there was a testimonial platform you actually owned?
                </p>

                <p className="text-lg leading-relaxed">
                  Pay once. Own it forever. No monthly fees. No "premium tier" to unlock basic features. No watching your testimonials disappear because you missed a payment.
                </p>

                <p className="text-lg leading-relaxed">
                  Just a simple, powerful tool that helps you collect, manage, and display testimonials—then gets out of your way.
                </p>

                <div className="bg-gray-50 rounded-lg p-8 my-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">The ProofLayer Promise</h3>
                  <ul className="space-y-4 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Pay once, own forever.</strong> Your testimonials are yours. Period.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>No feature gates.</strong> Every plan gets the core features. Want more capacity? Just upgrade once.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Built for real businesses.</strong> Not VC-funded growth metrics. Real people with real needs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Simple, not simplistic.</strong> Powerful enough for agencies, easy enough for solo creators.</span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Who This Is For</h3>

                <p className="text-lg leading-relaxed">
                  ProofLayer is for the freelancer tired of paying monthly fees that eat into already-thin margins. For the agency managing multiple clients who needs separate workspaces without separate bills. For the course creator who wants to showcase student wins without worrying about subscription renewals.
                </p>

                <p className="text-lg leading-relaxed">
                  It's for anyone who's ever thought, "I just want something that works and doesn't cost me every month for the rest of time."
                </p>

                <p className="text-lg leading-relaxed">
                  It's for problem-solvers. People like you. People like me.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Still a Work in Progress</h3>

                <p className="text-lg leading-relaxed">
                  I still have my day job. I still love it. ProofLayer isn't a "quit your job and build a startup" story—it's a "solve a real problem and help people" story.
                </p>

                <p className="text-lg leading-relaxed">
                  That means development happens in focused sprints between meetings and weekends. It means I'm building features based on what users actually need, not what sounds impressive in a pitch deck. And it means every dollar you pay goes into making the product better, not into inflated marketing budgets or "growth hacking."
                </p>

                <p className="text-lg leading-relaxed">
                  This is bootstrapped, sustainable, and built to last.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full inline-block mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ownership Over Rental</h3>
                <p className="text-gray-600">
                  Your reputation shouldn't have a monthly fee attached. Pay once, own forever.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full inline-block mb-4">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Simplicity Over Complexity</h3>
                <p className="text-gray-600">
                  Powerful tools don't have to be complicated. We keep it simple so you can focus on your business.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full inline-block mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Value Over Hype</h3>
                <p className="text-gray-600">
                  No inflated promises. No misleading marketing. Just honest tools that solve real problems.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Join the Movement
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Stop renting your reputation. Own your social proof with ProofLayer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
              >
                Get Started Today
              </Link>
              <Link
                href="/pricing"
                className="inline-block bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-all border-2 border-white"
              >
                View Pricing
              </Link>
            </div>
            <p className="text-sm text-blue-100 mt-6">
              Questions? Feedback? Email me directly at{' '}
              <a href="mailto:support@prooflayer.app" className="underline hover:text-white">
                support@prooflayer.app
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
