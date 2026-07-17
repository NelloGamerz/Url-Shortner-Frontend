import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle2, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { SEO } from '../../components/SEO.tsx';
import { FAQSchema } from '../../components/SEO/FAQSchema.tsx';

const faqs = [
  {
    question: 'What is link analytics?',
    answer: 'Link analytics collects data about clicks, devices, locations, and referral sources for your shortened links.',
  },
  {
    question: 'Why is click tracking useful?',
    answer: 'It helps you see which campaigns drive engagement and optimize your marketing efforts.',
  },
];

export function UrlAnalyticsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <SEO
        title="URL Shortener With Analytics - Track Link Clicks"
        description="Understand campaign performance with Vialink analytics and click tracking for every shortened link."
        keywords="url shortener analytics, click tracking, marketing link analytics"
        canonical="https://vialink.in/url-shortener-with-analytics"
      />
      <FAQSchema faqs={faqs} />

      <main className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <TrendingUp className="h-4 w-4" />
                Built-in link tracking
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                URL Shortener With Analytics and Click Tracking
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Measure how your audience interacts with every link and turn data into better marketing decisions.
              </p>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link to="/sign-up">Start tracking links</Link>
              </Button>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                <BarChart3 className="h-8 w-8" />
                <h2 className="text-xl font-semibold">What you can track</h2>
              </div>
              <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
                {['Clicks by day', 'Referrer sources', 'Device and location insights', 'Campaign performance'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">Link tracking explanation</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Each shortened link captures click events so you can understand user behavior without extra setup.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">Click analytics</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Review traffic trends and measure performance across every campaign or social channel.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">Marketing use cases</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Use link analytics for email marketing, social campaigns, influencer outreach, and product launches.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">Business benefits</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Better visibility into user behavior helps you improve messaging, budget allocation, and conversion rates.</p>
            </article>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default UrlAnalyticsPage;
