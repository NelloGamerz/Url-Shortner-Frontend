import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { SEO } from '../../components/SEO.tsx';

const posts = [
  {
    title: 'What Is A URL Shortener?',
    summary: 'Learn how short links work and why they are useful for everyday sharing.',
  },
  {
    title: 'How To Shorten A URL',
    summary: 'A simple guide to turning long links into clean, memorable URLs.',
  },
  {
    title: 'URL Shortener For Business',
    summary: 'See how branded links and analytics can support marketing and growth.',
  },
  {
    title: 'Link Tracking Explained',
    summary: 'Understand how click tracking helps you measure campaign performance.',
  },
];

export function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <SEO
        title="Vialink Blog - URL Shortener Tips & Link Management"
        description="Read practical articles about short links, analytics, branded URLs, and link management."
        keywords="url shortener blog, link management tips, short link articles"
        canonical="https://vialink.in/blog"
      />

      <main className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <BookOpen className="h-4 w-4" />
              Vialink insights
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Vialink Blog</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Explore articles on URL shortening, analytics, branding, and the best practices for link management.
            </p>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link to="/sign-up">Start using Vialink</Link>
            </Button>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400">{post.summary}</p>
                <Link to="/" className="mt-6 inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default BlogPage;
