"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';
import { remoteAnalytics } from '@/lib/tracking';

// Hook to automatically track page views on route changes
export const usePageTracking = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.toString();
    const fullPath = search ? `${pathname}?${search}` : pathname;
    // Track page view to GA
    trackPageView(fullPath);
    // Track page view to remote dashboard
    remoteAnalytics.trackPageView(pathname);
  }, [pathname, searchParams]);
};
