/** Optional analytics hook. No network requests, storage, contact text, or personal data. */
export function trackInteraction(name: "contact_intent" | "contact_draft_ready" | "contact_provider_accepted" | "concept_open" | "service_browse", context?: { id: string }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("oho:interaction", { detail: { name, ...(context ? { context } : {}) } }));
}
