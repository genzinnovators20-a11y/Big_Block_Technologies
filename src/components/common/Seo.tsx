import { useEffect } from 'react';
import { absoluteUrl, siteConfig } from '@/config/site';

interface SeoProps {
  /** Page title without the company suffix. Omit on the homepage. */
  title?: string;
  description: string;
  /** Site-relative path, used for the canonical URL and og:url. */
  path: string;
  /** Site-relative or absolute image for social cards. */
  image?: string;
  type?: 'website' | 'article';
  /** Discourage indexing for utility pages such as 404. */
  noIndex?: boolean;
  /** JSON-LD injected into <head> for the lifetime of the page. */
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-page document metadata.
 *
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree
 * into <head>, so no metadata library is needed. JSON-LD is handled by the
 * effect below because script elements are not hoisted the same way.
 */
export function Seo({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  type = 'website',
  noIndex = false,
  jsonLd,
}: SeoProps) {
  const fullTitle = title ? `${title} — ${siteConfig.titleSuffix}` : siteConfig.titleSuffix;
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

  useEffect(() => {
    if (!jsonLd) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [jsonLd]);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
