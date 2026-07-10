import { Link, useNavigate } from 'react-router-dom';
import {
  Link2,
  BarChart3,
  Zap,
  Shield,
  Globe,
  QrCode,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/layout/Navbar';
import { FeatureCard } from '../components/common/FeatureCard';
import { AnalyticsChart } from '../components/common/AnalyticsChart';
import { generateDashboardChart } from '../utils/mockData';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const features = [
  {
    icon: Link2,
    title: 'Instant Short Links',
    description:
      'Transform long URLs into short, memorable links in seconds. Perfect for sharing on social media, emails, and messages.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description:
      'Track every click with comprehensive analytics. Understand your audience with location, device, and referrer data.',
  },
  {
    icon: QrCode,
    title: 'QR Code Generation',
    description:
      'Generate QR codes for your short links instantly. Perfect for print materials, events, and offline marketing.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built for speed with instant redirects. Your users will never notice the difference.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'Enterprise-grade security with SSL encryption. Your links are safe and always accessible.',
  },
  {
    icon: Globe,
    title: 'Custom Domains',
    description:
      'Use your own domain for branded short links. Build trust with professional-looking URLs.',
  },
];

const faqs = [
  {
    question: 'How many links can I create for free?',
    answer:
      'On the free plan, you can create up to 20 short links with basic analytics. This is perfect for personal use or trying out the platform.',
  },
  {
    question: 'Can I customize my short links?',
    answer:
      'Absolutely! You can create custom aliases for your links, making them more memorable and on-brand. For example, short.ly/my-product instead of random characters.',
  },
  {
    question: 'What analytics are included?',
    answer:
      'Track total clicks, geographic location of visitors, device types, browsers, referrers, and click trends over time. Pro users get advanced analytics with detailed breakdowns.',
  },
  {
    question: 'Are the links permanent?',
    answer:
      'Yes, all links remain active as long as your account is in good standing. Unlike some free services, we never delete your links.',
  },
  {
    question: 'Can I use my own custom domain?',
    answer:
      'Custom domains are available on the Pro plan. This allows you to create branded short links like go.yourcompany.com/promo.',
  },
  {
    question: 'How do I upgrade to Pro?',
    answer:
      'You can upgrade to Pro at any time from the Billing page in your dashboard. Pro unlocks unlimited links, advanced analytics, priority support, and custom domains.',
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const chartData = generateDashboardChart();

  const handleCreateLink = () => {
    if (isSignedIn) {
      navigate('/dashboard/links');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar isAuthenticated={isSignedIn} showDashboard={isSignedIn} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-full mb-6">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Now with advanced analytics
              </span>
              <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Shorten, Track and Share Links{' '}
              <span className="text-indigo-600 dark:text-indigo-400">Effortlessly</span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Create beautiful short links with detailed analytics. Understand your audience,
              optimize your campaigns, and drive more clicks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <Link to="/sign-up">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 h-12"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 h-12"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </SignedIn>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 h-12"
                onClick={handleCreateLink}
              >
                Create Short Link
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Free to get started
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                No credit card required
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Instant setup
              </div>
            </div>
          </div>

          {/* Analytics Preview */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
              <AnalyticsChart data={chartData} title="Click Analytics Demo" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to manage your links
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful features to create, track, and optimize your short links
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Start for free, upgrade when you need more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Free</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">$0</span>
                <span className="text-slate-500 dark:text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  '20 Links',
                  'Basic Analytics',
                  'Custom Alias',
                  'QR Code Generation',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/sign-up" className="block">
                <Button
                  variant="outline"
                  className="w-full"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-indigo-500 ring-2 ring-indigo-500/20 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Pro</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">For serious link managers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">$12</span>
                <span className="text-slate-500 dark:text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited Links',
                  'Unlimited Analytics',
                  'Priority Support',
                  'Advanced Analytics',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/sign-up" className="block">
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Start Pro Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Everything you need to know about ViaLink
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 dark:text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-indigo-600 dark:bg-indigo-900 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Create your first short link in under 30 seconds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <Link to="/sign-up">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 h-12 bg-white text-indigo-600 hover:bg-slate-100"
                  >
                    Get Started Free
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 h-12 bg-white text-indigo-600 hover:bg-slate-100"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 h-12 border-white text-white hover:bg-white/10"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">ViaLink</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              &copy; 2025 ViaLink. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400">
              <a href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Privacy
              </a>
              <a href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Terms
              </a>
              <a href="mailto:support@ViaLink.com" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
