import { apiBaseUrl, hasBackend } from '@/config/site';

/**
 * Thin API client.
 *
 * Every call goes through the application's own backend. No third-party
 * credentials are ever present in this bundle: anything requiring a secret
 * (mail delivery, CRM writes, model providers) is the backend's job.
 *
 *   browser → VITE_API_BASE_URL → provider
 *
 * While `VITE_API_BASE_URL` is unset, `hasBackend` is false and callers are
 * expected to degrade honestly rather than simulate a successful request.
 */

export class ApiNotConfiguredError extends Error {
  constructor() {
    super('No API base URL is configured for this deployment.');
    this.name = 'ApiNotConfiguredError';
  }
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface RequestOptions {
  signal?: AbortSignal;
  /** Milliseconds before the request is aborted. */
  timeoutMs?: number;
}

export async function apiPost<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
  { signal, timeoutMs = 15000 }: RequestOptions = {},
): Promise<TResponse> {
  if (!hasBackend) throw new ApiNotConfiguredError();

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  // Honour an externally supplied signal as well as the timeout.
  signal?.addEventListener('abort', () => controller.abort(), { once: true });

  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      let message = `Request failed with status ${response.status}.`;
      try {
        const data = (await response.json()) as { message?: string };
        if (data?.message) message = data.message;
      } catch {
        /* response body was not JSON; keep the status-based message */
      }
      throw new ApiError(response.status, message);
    }

    return (await response.json()) as TResponse;
  } finally {
    window.clearTimeout(timeout);
  }
}
