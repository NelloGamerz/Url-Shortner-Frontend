import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, Tag } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { SEO } from '../../components/SEO.tsx';
import { FAQSchema } from '../../components/SEO/FAQSchema.tsx';

const faqs = [
  {
    question: 'What is a custom short link?',
    answer: 'A custom short link uses your own memorable alias instead of a random string.',
  },
  {
    question: 'Are branded links better for marketing?',
    answer: 'Yes, they look more trustworthy and can help improve recognition across campaigns.',
  },
];

export function CustomLinksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <SEO
        title="Custom Short Links - Create Branded URLs"
        description="Create custom short links that build your brand and improve trust with every share."
        keywords="custom short links, branded URLs, custom link alias"
        canonical="https://vialink.in/custom-short-links"
      />
      <FAQSchema faqs={faqs} />

      <main className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <Sparkles className="h-4 w-4" />
                Branded links made simple
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Create Custom Short Links That Build Your Brand
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Make every shared link feel professional and memorable with a custom alias that matches your brand.
              </p>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link to="/sign-up">Create a branded link</Link>
              </Button>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                <Tag className="h-8 w-8" />
                <h2 className="text-xl font-semibold">Branded URL benefits</h2>
              </div>
              <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
                {['More recognizable URLs', 'Improved trust and click-through', 'Consistent campaign naming'].map((item) => (
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
              <h2 className="text-2xl font-semibold">Branded URLs</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Custom aliases make your links more recognizable, clickable, and easier to remember.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">Benefits</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Branded links can improve trust, make sharing easier, and strengthen your marketing presence.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">Marketing examples</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Use branded links for product launches, event promotions, or recurring newsletters and campaigns.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">FAQ</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Custom links are ideal when you want your links to reflect your business, campaign, or personal brand.</p>
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

export default CustomLinksPage;
