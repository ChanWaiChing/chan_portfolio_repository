"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Gamepad2, Mail, MessagesSquare, Send } from "lucide-react";
import { contactMethods } from "@/lib/site";

const icons = { mail: Mail, chatwork: MessagesSquare, discord: Gamepad2, telegram: Send };

export function ContactMethods() {
  const [copied, setCopied] = useState("");
  const [status, setStatus] = useState("");
  return <div className="contact-method-list">
    <h4>連絡先情報</h4>
    <p className="contact-method-intro">ご都合のよい窓口から、お気軽にご相談ください。</p>
    <ul>{contactMethods.map(method => {
      const Icon = icons[method.id];
      return <li key={method.id} className={`contact-method method-${method.id}`}>
        <span className="contact-method-icon" aria-hidden="true"><Icon size={21} /></span>
        <div className="contact-method-value"><span>{method.label}</span>{method.href ? <a href={method.href} target={method.id === "mail" ? undefined : "_blank"} rel={method.id === "mail" ? undefined : "noreferrer"}>{method.value}<ArrowUpRight size={13} /></a> : <strong>{method.value}</strong>}</div>
        <button type="button" className="contact-method-copy" aria-label={`${method.label}の${method.id === "mail" ? "メールアドレス" : "ID"}をコピー`} onClick={async () => {
          try { await navigator.clipboard.writeText(method.value); setCopied(method.id); setStatus(`${method.label}の連絡先をコピーしました。`); }
          catch { setCopied(""); setStatus("コピーできませんでした。表示されている連絡先を選択してコピーしてください。"); }
        }}>{copied === method.id ? <Check size={16} /> : <Copy size={16} />}</button>
      </li>;
    })}</ul>
    <small className="discord-contact-help">Discordはユーザー名をコピーして、Discordの「フレンドに追加」から検索してください。</small>
    <span className="contact-method-status" role="status">{status}</span>
  </div>;
}
