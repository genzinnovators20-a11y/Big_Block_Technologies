/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute site origin without a trailing slash. */
  readonly VITE_SITE_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_CONTACT_LOCATION?: string;
  readonly VITE_SOCIAL_LINKEDIN?: string;
  readonly VITE_SOCIAL_GITHUB?: string;
  readonly VITE_SOCIAL_X?: string;
  /** Base URL of the backend API. Empty while no backend is deployed. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
