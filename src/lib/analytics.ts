// ── Google Analytics GA4 — Event Tracking Utility ────────────────────────────
// Usage: import { trackEvent } from "@/lib/analytics"
//        trackEvent("resume_download")
//        trackEvent("github_click", { label: "CP Tracker" })

const GA_ID = "G-LC5HXJDS39";

// Extend Window type to include gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Send a custom GA4 event.
 * Safe to call — silently no-ops if gtag hasn't loaded yet.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, {
    ...params,
    send_to: GA_ID,
  });
}

/**
 * Track a page view manually (useful for SPA route changes).
 * GA4 auto-tracks the initial load; call this on React Router navigation.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    send_to: GA_ID,
  });
}

// ── Pre-built event helpers ───────────────────────────────────────────────────

/** Track resume PDF download */
export const trackResumeDownload = () =>
  trackEvent("resume_download", { event_category: "engagement" });

/** Track outbound GitHub link clicks */
export const trackGitHubClick = (repoName?: string) =>
  trackEvent("github_click", {
    event_category: "outbound",
    label: repoName ?? "github_profile",
  });

/** Track project live demo clicks */
export const trackProjectDemoClick = (projectName: string) =>
  trackEvent("project_demo_click", {
    event_category: "engagement",
    label: projectName,
  });

/** Track contact form / email CTA clicks */
export const trackContactClick = (method: "email" | "linkedin" | "consult") =>
  trackEvent("contact_click", {
    event_category: "engagement",
    label: method,
  });

/** Track blog article reads */
export const trackBlogRead = (slug: string, title: string) =>
  trackEvent("blog_read", {
    event_category: "content",
    label: slug,
    blog_title: title,
  });
