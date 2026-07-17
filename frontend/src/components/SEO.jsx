import { Helmet } from 'react-helmet-async';

export function SEO({
  title = 'Vialink - URL Shortener',
  description = 'Create short links, track analytics, and manage your URLs with Vialink.',
  keywords = 'url shortener, link management, short links',
  canonical,
  image = 'https://vialink.in/og-image.jpg',
}) {
  const pageTitle = title.includes('Vialink') ? title : `${title} | Vialink`;
  const canonicalUrl = canonical || 'https://vialink.in/';

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default SEO;
