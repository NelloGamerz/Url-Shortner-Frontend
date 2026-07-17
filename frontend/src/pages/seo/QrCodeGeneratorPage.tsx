import { Link } from 'react-router-dom';
import { CheckCircle2, QrCode, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { SEO } from '../../components/SEO.tsx';
import { FAQSchema } from '../../components/SEO/FAQSchema.tsx';

const faqs = [
  {
    question: 'What is a QR code generator?',
    answer: 'It converts a URL into a scannable QR code that can be printed or shared digitally.',
  },
  {
    question: 'Where can I use QR codes?',
    answer: 'QR codes are useful for packaging, events, posters, menus, and digital marketing materials.',
  },
];

export function QrCodeGeneratorPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <SEO
        title="Free QR Code Generator - Create QR Codes From URLs"
        description="Generate free QR codes from URLs with Vialink for print, packaging, and marketing campaigns."
        keywords="qr code generator, generate qr code from url, free qr code"
        canonical="https://vialink.in/qr-code-generator"
      />
      <FAQSchema faqs={faqs} />

      <main className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <Sparkles className="h-4 w-4" />
                Quick QR creation
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Free QR Code Generator From URL
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Create a QR code from any link and share it across physical and digital experiences.
              </p>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link to="/sign-up">Generate QR code</Link>
              </Button>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                <QrCode className="h-8 w-8" />
                <h2 className="text-xl font-semibold">How it works</h2>
              </div>
              <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
                {['Paste your URL', 'Generate the QR code instantly', 'Download or share it anywhere'].map((item) => (
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
              <h2 className="text-2xl font-semibold">URL to QR explanation</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">QR codes make it easy to connect offline audiences directly to your online content with one scan.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">How it works</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Enter a URL, generate a code, and use it in print, packaging, or digital campaigns.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">Use cases</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Perfect for menus, flyers, product packaging, events, and social media promotions.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold">FAQ</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">A QR code generator helps connect physical touchpoints with quick digital actions.</p>
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

export default QrCodeGeneratorPage;
