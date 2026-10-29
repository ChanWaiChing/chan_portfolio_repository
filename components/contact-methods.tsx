"use client";

import { useEffect, useState } from "react";
import { BrandIcon } from "./brand-icons";
import { contactMethods } from "@/lib/site";

export function ContactMethods() {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 5000);
    return () => clearTimeout(timer);
  }, [status]);
  return <div className="contact-method-list icon-contact-list"><h4>お好きな窓口からご相談</h4><p className="contact-method-intro">アイコンを選ぶと、それぞれの窓口が開きます。</p><ul>{contactMethods.map(method => <li key={method.id} className={`contact-platform method-${method.id}`}>
    {method.href ? <a href={method.href} aria-label={`${method.label}で相談する`} target={method.id === "mail" ? undefined : "_blank"} rel={method.id === "mail" ? undefined : "noopener noreferrer"}><BrandIcon name={method.id} width={30} height={30} aria-hidden="true" /><span>{method.label}</span></a> : <button type="button" aria-label="ディスコードの連絡先をコピー" onClick={async () => { try { await navigator.clipboard.writeText(method.value); setStatus("ユーザー名をコピーしました。ディスコードの「フレンドに追加」に貼り付けてください。"); } catch { setStatus("コピーできませんでした。ほかの窓口からご相談ください。"); } }}><BrandIcon name="discord" width={30} height={30} aria-hidden="true" /><span>{method.label}</span></button>}
  </li>)}</ul><small className="discord-contact-help">ディスコードはアイコンを押すと連絡先をコピーできます。</small><p className="contact-method-status" role="status">{status}</p></div>;
}
