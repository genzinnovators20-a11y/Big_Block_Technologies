/**
 * Runtime site configuration.
 *
 * Anything here is baked into the public bundle at build time. It must never
 * hold secrets — only values that are safe to display to every visitor.
 *
 * Contact details and social links intentionally default to empty. The UI
 * hides the corresponding rows when a value is missing rather than showing a
 * placeholder that looks like a real detail.
 */

const env = import.meta.env;

/** Trim a trailing slash so URL joins stay predictable. */
const trimSlash = (value: string) => value.replace(/\/+$/, '');

export const siteConfig = {
  name: 'Big Block Technologies',
  shortName: 'Big Block',
  /** Used in <title> as "Page — Big Block Technologies". */
  titleSuffix: 'Big Block Technologies',
  description:
    'Big Block Technologies is a technology engineering and consulting company building custom software, cloud-native platforms, AI-enabled systems and blockchain infrastructure.',
  url: trimSlash(env.VITE_SITE_URL || 'https://www.bigblocktechnologies.com'),
  ogImage: '/og-image.png',
  locale: 'en',
} as const;

export const contactConfig = {
  email: env.VITE_CONTACT_EMAIL || '',
  phone: env.VITE_CONTACT_PHONE || '',
  location: env.VITE_CONTACT_LOCATION || '',
} as const;

export const socialConfig = {
  linkedin: env.VITE_SOCIAL_LINKEDIN || '',
  github: env.VITE_SOCIAL_GITHUB || '',
  x: env.VITE_SOCIAL_X || '',
} as const;

/**
 * Base URL of the backend API.
 *
 * While this is empty the application has no backend. Forms and the assistant
 * detect that and tell the user plainly instead of simulating success.
 */
export const apiBaseUrl = env.VITE_API_BASE_URL ? trimSlash(env.VITE_API_BASE_URL) : '';

export const hasBackend = apiBaseUrl.length > 0;

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path: string) =>
  `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
