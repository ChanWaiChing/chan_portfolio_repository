/** First-party measurement. Never send free text, URLs, form values, or contact identifiers. */
export function trackInteraction(name: "contact_intent" | "contact_started" | "contact_draft_ready" | "contact_mail_open" | "contact_provider_accepted" | "contact_failed" | "portfolio_open" | "concept_open" | "package_open" | "service_browse", context?: { id: string }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("oho:interaction", { detail: { name, ...(context ? { context } : {}) } }));
  if (navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
  const body=JSON.stringify({ name, ...(context ? { id: context.id } : {}) });
  try {
    if (navigator.sendBeacon?.("/api/events",new Blob([body],{type:"application/json"}))) return;
    void fetch("/api/events",{method:"POST",headers:{"Content-Type":"application/json"},body,keepalive:true}).catch(()=>{});
  } catch { /* Measurement must never interrupt an interaction. */ }
}
