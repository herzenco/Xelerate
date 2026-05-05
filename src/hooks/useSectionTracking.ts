import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';
import { remoteAnalytics } from '@/lib/tracking';

// Hook to track when a section becomes visible
export const useSectionTracking = (sectionName: string, threshold = 0.5) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            // Track to GA
            trackEvent('section_view', {
              section_name: sectionName,
              page: window.location.pathname,
            });
            // Track to remote dashboard
            remoteAnalytics.trackSectionView(sectionName, window.location.pathname);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionName, threshold]);

  return sectionRef;
};
