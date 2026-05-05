"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/analytics';
import { remoteAnalytics } from '@/lib/tracking';

// Hook to track scroll depth at 25%, 50%, 75%, and 100%
export const useScrollTracking = () => {
  const pathname = usePathname();
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset tracked depths on route change
    trackedDepths.current = new Set();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
      const thresholds = [25, 50, 75, 100];

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedDepths.current.has(threshold)) {
          trackedDepths.current.add(threshold);
          // Track to GA
          analytics.trackScrollDepth(threshold, pathname);
          // Track to remote dashboard
          remoteAnalytics.trackScrollDepth(threshold, pathname);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
};
