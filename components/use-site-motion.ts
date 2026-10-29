"use client";
import { useEffect, useState } from "react";

/** One site-wide control also pauses autonomous hero effects. */
export function useSiteMotion() {
 const [enabled,setEnabled]=useState(true);
 useEffect(()=>{
  try {setEnabled(sessionStorage.getItem("oho-motion")!=="off");} catch { /* Optional preference. */ }
  const update=(event:Event)=>setEnabled((event as CustomEvent<boolean>).detail);
  window.addEventListener("oho-motion-change",update);
  return ()=>window.removeEventListener("oho-motion-change",update);
 },[]);
 return enabled;
}
