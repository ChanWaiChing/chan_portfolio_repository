"use client";

import { useEffect, useState } from "react";

/** Share the site-wide animation preference with autonomous artwork. */
export function useMotionGate() {
  const [allowed,setAllowed] = useState(true);
  useEffect(() => {
    try { setAllowed(sessionStorage.getItem("oho-motion") !== "off"); } catch { /* Optional preference. */ }
    const update = (event: Event) => setAllowed((event as CustomEvent<boolean>).detail);
    window.addEventListener("oho-motion-change",update);
    return () => window.removeEventListener("oho-motion-change",update);
  },[]);
  return allowed;
}
