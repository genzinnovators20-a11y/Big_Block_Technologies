import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Fraction of the element that must be visible before it counts. */
  threshold?: number;
  /** Shrinks the viewport so reveals trigger slightly before the edge. */
  rootMargin?: string;
  /** Stop observing after the first intersection. */
  once?: boolean;
  /** Skip observation entirely and report visible immediately. */
  disabled?: boolean;
}

/**
 * Reports whether an element has entered the viewport.
 *
 * Falls back to "visible" when IntersectionObserver is unavailable so content
 * is never hidden by a missing browser feature.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  once = true,
  disabled = false,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(disabled);

  useEffect(() => {
    if (disabled) {
      setInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, disabled]);

  return { ref, inView } as const;
}
