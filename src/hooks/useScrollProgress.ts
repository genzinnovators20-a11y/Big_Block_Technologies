import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Skip all measurement and report complete. Used for reduced motion. */
  disabled?: boolean;
}

/**
 * Reports how far an element has travelled through the viewport, 0 to 1.
 *
 * Read-only: it observes scroll position and never writes to it. There is no
 * pinning, no snapping and no `preventDefault` anywhere in this file — the
 * page scrolls exactly as the browser intends, and the progress value simply
 * follows.
 *
 * Two safeguards keep it off the critical path:
 *
 *   1. The scroll listener is only attached while the element is intersecting,
 *      so a timeline three screens down costs nothing until it is approached.
 *   2. Measurement is coalesced into one `requestAnimationFrame` per frame, so
 *      a burst of scroll events produces a single `getBoundingClientRect`
 *      rather than dozens of forced synchronous layouts.
 *
 * When the user prefers reduced motion the hook reports 1 immediately and
 * never observes anything, so the rail renders complete rather than animating.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>({
  disabled = false,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(disabled ? 1 : 0);

  useEffect(() => {
    if (disabled) {
      setProgress(1);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setProgress(1);
      return;
    }

    let frame = 0;
    let listening = false;

    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 0;
      if (rect.height === 0) return;

      // Begins once the element's top passes 85% of the viewport height, and
      // completes as its body clears the upper portion of the screen.
      const travelled = viewport * 0.85 - rect.top;
      const distance = rect.height * 0.82;
      const next = Math.min(1, Math.max(0, travelled / distance));

      setProgress((previous) => (Math.abs(previous - next) < 0.005 ? previous : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll, { passive: true });
          measure();
        } else if (!entry.isIntersecting && listening) {
          listening = false;
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      },
      { threshold: 0 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [disabled]);

  return { ref, progress } as const;
}
