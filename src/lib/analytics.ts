// Google Analytics (GA4) Utility Functions + Remote Dashboard Tracking
// GA Measurement ID is configured via NEXT_PUBLIC_GA_MEASUREMENT_ID env var

import { remoteAnalytics } from './tracking';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params);
  }
};

// Predefined event helpers for common actions
export const analytics = {
  // Button clicks
  trackButtonClick: (buttonName: string, location?: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      location: location || 'unknown',
    });
  },

  // CTA interactions
  trackCTAClick: (ctaName: string, page: string) => {
    trackEvent('cta_click', {
      cta_name: ctaName,
      page,
    });
  },

  // Navigation
  trackNavigation: (destination: string, source?: string) => {
    trackEvent('navigation', {
      destination,
      source: source || 'direct',
    });
  },

  // Form submissions
  trackFormSubmit: (formName: string, success: boolean) => {
    trackEvent('form_submit', {
      form_name: formName,
      success,
    });
  },

  // Newsletter signup
  trackNewsletterSignup: (success: boolean) => {
    trackEvent('newsletter_signup', {
      success,
    });
  },

  // Service page toggle
  trackServiceToggle: (service: 'product-leadership' | 'custom-solutions') => {
    trackEvent('service_toggle', {
      service_selected: service,
    });
  },

  // External link clicks
  trackExternalLink: (url: string, linkText?: string) => {
    trackEvent('external_link_click', {
      url,
      link_text: linkText || 'unknown',
    });
  },

  // Scroll depth
  trackScrollDepth: (percentage: number, page: string) => {
    trackEvent('scroll_depth', {
      percentage,
      page,
    });
  },

  // Time on page
  trackTimeOnPage: (seconds: number, page: string) => {
    trackEvent('time_on_page', {
      duration_seconds: seconds,
      page,
    });
  },

  // Pricing interaction
  trackPricingView: () => {
    trackEvent('pricing_view');
  },

  // Blog interactions
  trackBlogPostClick: (postTitle: string, category: string) => {
    trackEvent('blog_post_click', {
      post_title: postTitle,
      category,
    });
  },

  trackBlogSearch: (query: string, resultsCount: number) => {
    trackEvent('blog_search', {
      search_query: query,
      results_count: resultsCount,
    });
  },

  trackBlogCategoryFilter: (category: string) => {
    trackEvent('blog_category_filter', {
      category,
    });
  },
};
