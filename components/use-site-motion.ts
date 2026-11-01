"use client";
import { useEffect, useState } from "react";

/** Follow the visitor's system motion preference without a floating control. */
export function useSiteMotion() {
 const [enabled,setEnabled]=useState(true);
 useEffect(()=>{
  const media=matchMedia("(prefers-reduced-motion: reduce)");
  const update=()=>setEnabled(!media.matches);
  update();
  media.addEventListener("change",update);
  return ()=>media.removeEventListener("change",update);
 },[]);
 return enabled;
}
