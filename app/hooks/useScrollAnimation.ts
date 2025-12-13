'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(options?: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Cleanup previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Use requestIdleCallback for better performance (fallback to setTimeout)
    const scheduleObserver = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback, { timeout: 200 });
      } else {
        setTimeout(callback, 0);
      }
    };

    scheduleObserver(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (options?.triggerOnce !== false) {
                setHasAnimated(true);
                // Disconnect observer after animation if triggerOnce is true
                if (observerRef.current) {
                  observerRef.current.disconnect();
                }
              }
            } else {
              if (options?.triggerOnce === false) {
                setIsVisible(false);
              }
            }
          });
        },
        {
          threshold: options?.threshold || 0.1,
          rootMargin: options?.rootMargin || '0px',
        }
      );

      observer.observe(element);
      observerRef.current = observer;
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [options?.threshold, options?.rootMargin, options?.triggerOnce]);

  return { ref, isVisible: options?.triggerOnce === false ? isVisible : (isVisible || hasAnimated) };
}

