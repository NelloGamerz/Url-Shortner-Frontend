import { Link } from 'react-router-dom';
import { CheckCircle2, Link2, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { SEO } from '../../components/SEO.tsx';
import { FAQSchema } from '../../components/SEO/FAQSchema.tsx';

const faqs = [
  {
    question: 'What is a URL shortener?',
    answer:
      'A URL shortener converts long links into shorter, cleaner links that are easier to share and remember.',
  },
  {
    question: 'Is Vialink free to use?',
    answer:
      'Yes, Vialink offers a free plan to help you create short links and manage your URLs quickly.',
  },
  {
    question: 'Can I track clicks on my short links?',
    answer:
      'Yes, Vialink provides analytics so you can monitor clicks, geography, and engagement trends.',
  },
];

export function FreeUrlShortenerPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <SEO
        title="Free URL Shortener - Create Short Links Instantly"
        description="Create free short links with Vialink. Convert long URLs into short, memorable links."
        keywords="free URL shortener, short link generator, URL shortener online"
        canonical="https://vialink.in/free-url-shortener"
      />
      <FAQSchema faqs={faqs} />

      <main className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <Sparkles className="h-4 w-4" />
                Free URL shortener for everyone
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Free URL Shortener - Create Short Links in Seconds
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Turn long, messy links into short, branded URLs that are easy to share across social, email, and print.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                  <Link to="/sign-up">Get started free</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                <Link2 className="h-8 w-8" />
                <h2 className="text-xl font-semibold">Why Vialink?</h2>
              </div>
              <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
                {['Fast shortening in seconds', 'Clean links for campaigns', 'Track clicks and engagement'].map((item) => (
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
              <h2 className="text-2xl font-semibold">What is a URL shortener?</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                A URL shortener creates compact, shareable links from longer destinations while preserving the destination target.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">Why use Vialink?</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Use Vialink to simplify your links, improve social sharing, and monitor clicks with real-time analytics.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">How to shorten a URL</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Paste your long URL, customize the alias if needed, and generate a short link that you can copy and share instantly.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">Benefits</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Short links improve readability, save space in messages, and make campaigns easier to track and manage.
              </p>
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

export default FreeUrlShortenerPage;
