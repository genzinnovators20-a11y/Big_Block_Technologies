/**
 * Generates public/sitemap.xml and public/robots.txt from the route table.
 *
 * Run before `vite build` so the generated files are copied into dist/ as
 * static assets. Keeping this derived from the same data the router uses means
 * a new case study or article cannot be forgotten in the sitemap.
 *
 *   node scripts/generate-sitemap.mjs [siteUrl]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const siteUrl = (
  process.argv[2] ||
  process.env.VITE_SITE_URL ||
  'https://www.bigblocktechnologies.com'
).replace(/\/+$/, '');

/** Pull slugs straight from the data modules without needing a TS toolchain. */
function slugsFrom(file, key) {
  const source = readFileSync(join(root, 'src/data', file), 'utf8');
  const matches = [...source.matchAll(new RegExp(`${key}:\\s*'([^']+)'`, 'g'))];
  return matches.map((m) => m[1]);
}

const caseStudySlugs = slugsFrom('caseStudies.ts', 'slug');
const blogSlugs = slugsFrom('blog.ts', 'slug');

// Priority reflects how central a page is to the site, not how good it is.
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/solutions', priority: '0.9', changefreq: 'monthly' },
  { path: '/industries', priority: '0.8', changefreq: 'monthly' },
  { path: '/case-studies', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/careers', priority: '0.6', changefreq: 'weekly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
];

const dynamicRoutes = [
  ...caseStudySlugs.map((slug) => ({
    path: `/case-studies/${slug}`,
    priority: '0.6',
    changefreq: 'yearly',
  })),
  ...blogSlugs.map((slug) => ({ path: `/blog/${slug}`, priority: '0.6', changefreq: 'yearly' })),
];

const all = [...staticRoutes, ...dynamicRoutes];
const lastmod = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(root, 'public/sitemap.xml'), xml);

writeFileSync(
  join(root, 'public/robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
);

console.log(
  `sitemap.xml: ${all.length} URLs (${staticRoutes.length} static, ${dynamicRoutes.length} dynamic) for ${siteUrl}`,
);
