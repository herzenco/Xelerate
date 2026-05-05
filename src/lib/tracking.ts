// Remote tracking API client for the shared dashboard backend
// Posts events and leads to Supabase edge functions

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iftavwzmvuqykujebini.supabase.co';
const TRACK_EVENT_URL = `${SUPABASE_URL}/functions/v1/track-event`;
const SUBMIT_LEAD_URL = `${SUPABASE_URL}/functions/v1/submit-lead`;

// Generate or retrieve session ID
const getSessionId = (): string => {
  const key = 'xelerate_session_id';
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
};

// Track an event to the remote analytics backend
export const trackRemoteEvent = async (
  eventType: string,
  pagePath: string,
  eventData?: Record<string, string | number | boolean>
): Promise<void> => {
  try {
    await fetch(TRACK_EVENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: eventType,
        page_path: pagePath,
        event_data: eventData || {},
        session_id: getSessionId(),
      }),
    });
  } catch (error) {
    // Silently fail - don't break the user experience for analytics
    console.debug('Failed to track event:', error);
  }
};

// Submit a lead to the backend
export interface LeadData {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  url?: string;
  message?: string;
  source: string; // e.g. "Product Leadership", "Custom Solutions", "Product Leadership - Contact"
  page_source?: string; // e.g. "product_leadership_hero", "custom_solutions_hero"
}

export const submitLead = async (
  lead: LeadData
): Promise<{ success: boolean; error?: string; status?: number }> => {
  try {
    const response = await fetch(SUBMIT_LEAD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type") || "";

      let errorMessage = "Failed to submit";
      if (contentType.includes("application/json")) {
        const errorData = await response.json().catch(() => ({} as any));
        errorMessage = errorData?.error || errorData?.message || errorMessage;
      } else {
        const text = await response.text().catch(() => "");
        if (text) errorMessage = text;
      }

      // Avoid logging PII; only log status and endpoint.
      console.debug("[submitLead] request failed", {
        status: response.status,
        url: SUBMIT_LEAD_URL,
      });

      return { success: false, error: `HTTP ${response.status}: ${errorMessage}`, status: response.status };
    }

    return { success: true, status: response.status };
  } catch {
    console.debug("[submitLead] network error", { url: SUBMIT_LEAD_URL });
    return { success: false, error: "Network error. Please try again.", status: 0 };
  }
};

// Predefined event tracking helpers
export const remoteAnalytics = {
  // Page view
  trackPageView: (path: string) => {
    trackRemoteEvent('page_view', path);
  },

  // Scroll depth
  trackScrollDepth: (percentage: number, page: string) => {
    trackRemoteEvent('scroll_depth', page, { percentage });
  },

  // CTA clicks
  trackCTAClick: (ctaName: string, page: string) => {
    trackRemoteEvent('cta_click', page, { cta_name: ctaName });
  },

  // Form submissions
  trackFormSubmit: (formName: string, page: string, success: boolean) => {
    trackRemoteEvent('form_submit', page, { form_name: formName, success });
  },

  // Consultation/Calendly clicks
  trackConsultationClick: (source: string, page: string) => {
    trackRemoteEvent('consultation_click', page, { source });
  },

  // Section visibility
  trackSectionView: (sectionName: string, page: string) => {
    trackRemoteEvent('section_view', page, { section_name: sectionName });
  },

  // Navigation clicks
  trackNavigation: (destination: string, source: string, page: string) => {
    trackRemoteEvent('navigation_click', page, { destination, source });
  },

  // Service toggle (Product Leadership / Custom Solutions)
  trackServiceToggle: (serviceName: string, page: string) => {
    trackRemoteEvent('service_toggle', page, { service: serviceName });
  },
};
