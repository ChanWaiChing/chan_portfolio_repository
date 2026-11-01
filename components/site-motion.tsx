"use client";
import { useEffect } from "react";

/** Keep foreground motion in sync with the same system preference as the sky. */
export function SiteMotion() {
 useEffect(()=>{
  const media=matchMedia("(prefers-reduced-motion: reduce)");
  const update=()=>{
   if(media.matches) delete document.documentElement.dataset.siteMotion;
   else document.documentElement.dataset.siteMotion="on";
  };
  update();
  media.addEventListener("change",update);
  return ()=>{media.removeEventListener("change",update);delete document.documentElement.dataset.siteMotion;};
 },[]);
 return null;
}
