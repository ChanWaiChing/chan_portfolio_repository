"use client";

import { useEffect, useState } from "react";
import { BrandIcon } from "./brand-icons";
import { contactMethods } from "@/lib/site";

function ContactIcon({ name }: { name: (typeof contactMethods)[number]["id"] }) {
  if (name === "mail") return <svg width={32} height={32} viewBox="0 0 32 32" aria-hidden="true"><rect x={1} y={1} width={30} height={30} rx={9} fill="#268BE8" /><rect x={6} y={9} width={20} height={15} rx={3} fill="#F6FBFF" /><path d="m7 22 7-6h4l7 6" fill="#C8E7FF" /><path d="m6 11 10 8 10-8v-1a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2z" fill="#FFCA68" /><path d="m7 10 9 7 9-7" fill="none" stroke="#FFF2D6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>;
  const colors = { github: "#181717", telegram: "#26A5E4", chatwork: "#F03748", discord: "#5865F2" };
  return <span className="contact-brand-mark grid size-8 place-items-center rounded-full bg-white" aria-hidden="true"><BrandIcon name={name} width={name === "telegram" ? 32 : 24} height={name === "telegram" ? 32 : 24} style={{ color: colors[name] }} /></span>;
}

export function ContactMethods() {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 5000);
    return () => clearTimeout(timer);
  }, [status]);
  return <div className="contact-method-list mt-7">
    <h4 className="mb-3 font-heading text-xs font-bold tracking-[.12em]">SNS</h4>
    <ul className="m-0 flex list-none flex-wrap gap-3 p-0">{["github", "telegram", "chatwork", "discord", "mail"].map(id => {
      const method = contactMethods.find(item => item.id === id)!;
      const icon = <ContactIcon name={method.id} />;
      const className = "contact-social-icon grid size-12 min-h-0 place-items-center rounded-full border border-solid border-[#7699bc70] bg-[#12273e] p-0 text-[#bee6ff] shadow-none transition-colors hover:border-[#a5dfff] hover:bg-[#21415d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9edaff] motion-reduce:transition-none";
      return <li className={`contact-platform method-${method.id} w-12 shrink-0`} key={method.id}>
        {method.href ? <a className={className} href={method.href} aria-label={method.id === "github" ? "GitHubプロフィールを見る" : `${method.label}で相談する`} target={method.id === "mail" ? undefined : "_blank"} rel={method.id === "mail" ? undefined : "noopener noreferrer"}>{icon}</a> : <button className={className} type="button" aria-label="ディスコードの連絡先をコピー" aria-describedby="discord-contact-help" onClick={async () => {
          try { await navigator.clipboard.writeText(method.value); setStatus("ユーザー名をコピーしました。ディスコードの「フレンドに追加」に貼り付けてください。"); }
          catch { setStatus("コピーできませんでした。ほかの窓口からご相談ください。"); }
        }}>{icon}</button>}
      </li>;
    })}</ul>
    <span id="discord-contact-help" className="sr-only">ディスコードはアイコンを押すと連絡先をコピーできます</span>
    <p className="contact-method-status" role="status">{status}</p>
  </div>;
}
