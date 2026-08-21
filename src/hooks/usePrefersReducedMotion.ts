import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const list = window.matchMedia(QUERY);
  list.addEventListener('change', callback);
  return () => list.removeEventListener('change', callback);
};

const getSnapshot = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
};

/**
 * Tracks the user's motion preference and updates if they change it while the
 * page is open. Components use this to skip animation work entirely rather
 * than merely shortening it.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
