"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Copy } from "lucide-react";
import { categories, servicePackages } from "@/lib/catalog";

export function ContactForm({ topic, onTopic, directSend }: { topic: string; onTopic: (topic: string) => void; directSend: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const requestId = useRef("");
  useEffect(() => { setReviewed(false); setStatus(""); setSent(false); requestId.current = ""; }, [topic]);
  const draft = `【プロジェクトのご相談】\n\nお名前：${name}\nメールアドレス：${email}\n会社・屋号：${company || "未入力"}\n相談したいこと：${topic}\n\n${message}`;
  const mailHref = `mailto:cbnbc07@gmail.com?subject=${encodeURIComponent(`【ご相談】${topic} / ${name}`)}&body=${encodeURIComponent(draft)}`;
  const basicTopics = ["まずは相談したい", "Webサイト制作", "デザイン / UI・UX", "Web・業務システム開発", "AI活用 / 業務改善"];
  const knownTopic = basicTopics.includes(topic) || servicePackages.some(item => item.title === topic);

  return <form className="contact-form" onChange={() => { setReviewed(false); setStatus(""); setSent(false); requestId.current = ""; }} onSubmit={async event => {
    event.preventDefault();
    if (!directSend) { setReviewed(true); requestAnimationFrame(() => document.getElementById("contact-review")?.focus()); return; }
    const form = event.currentTarget;
    setSending(true); setStatus("");
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, company, topic, message, website: new FormData(form).get("website"), requestId: requestId.current }) });
      if (!response.ok) throw new Error("send failed");
      setSent(true); setStatus("お問い合わせを受け付けました。送信ありがとうございます。");
    } catch { setStatus("送信を確認できませんでした。入力内容は残っています。もう一度お試しいただくか、メールアプリからご連絡ください。"); setReviewed(true); }
    finally { setSending(false); }
  }}>
    <h3>プロジェクトのご相談</h3>
    <p className="form-intro">目的・ご予算・ご希望の時期を、わかる範囲でお知らせください。</p>
    <fieldset disabled={sending || sent}>
      <div className="form-row"><label htmlFor="contact-name">お名前 <span>必須</span></label><input id="contact-name" autoComplete="name" required maxLength={100} placeholder="山田 太郎" value={name} onChange={event => setName(event.target.value)} /></div>
      <div className="form-row"><label htmlFor="contact-email">メールアドレス <span>必須</span></label><input id="contact-email" type="email" autoComplete="email" required maxLength={200} placeholder="hello@example.com" value={email} onChange={event => setEmail(event.target.value)} /></div>
      <div className="form-row"><label htmlFor="contact-company">会社名・屋号 <small>任意</small></label><input id="contact-company" autoComplete="organization" maxLength={150} placeholder="株式会社サンプル" value={company} onChange={event => setCompany(event.target.value)} /></div>
      <div className="form-row"><label htmlFor="contact-topic">相談したいこと <span>必須</span></label><select id="contact-topic" value={topic} onChange={event => onTopic(event.target.value)}><optgroup label="ご相談の内容">{basicTopics.map(value => <option key={value}>{value}</option>)}</optgroup>{categories.slice(1).map(category => <optgroup label={`${category}のパッケージ`} key={category}>{servicePackages.filter(item => item.category === category).map(item => <option key={item.id}>{item.title}</option>)}</optgroup>)}{!knownTopic && <optgroup label="選択した制作イメージ"><option>{topic}</option></optgroup>}</select></div>
      <div className="form-row"><label htmlFor="contact-message">ご相談内容 <span>必須</span></label><textarea id="contact-message" required minLength={10} maxLength={3000} rows={6} aria-describedby="message-help" placeholder="実現したいこと、今のお困りごと、ご希望の時期など" value={message} onChange={event => setMessage(event.target.value)} /><small id="message-help">10〜3,000文字。まだ決まっていない項目は、空欄のままで大丈夫です。</small></div>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <p className="form-delivery-note">{directSend ? "入力内容は、ご相談への返信のために使用します。ボタンを押すと送信されます。" : "このサイトからは送信されません。確認後にメールアプリを開き、ご自身で送信してください。入力内容は保存されません。"}</p>
      <button type="submit" className="catalog-cta contact-submit">{sending ? "送信中…" : directSend ? "この内容で送信する" : "内容を確認する"}<ArrowRight size={18} /></button>
    </fieldset>
    <p className="form-status" role="status">{status}</p>
    {sent && <button type="button" className="draft-copy" onClick={() => { setSent(false); setStatus(""); requestId.current = ""; }}>別の相談を作成する</button>}
    {reviewed && <div className="contact-review" id="contact-review" tabIndex={-1}><h3>送信前に、内容をご確認ください。</h3><p>まだ送信されていません。下のボタンでメールアプリを開き、送信してください。</p><pre>{draft}</pre><a className="catalog-cta" href={mailHref}>メールアプリで送る<ArrowUpRight size={17} /></a><button type="button" className="draft-copy" onClick={async () => { try { await navigator.clipboard.writeText(draft); setStatus("内容をコピーしました。"); } catch { setStatus("コピーできませんでした。上の内容を選択してコピーしてください。"); } }}><Copy size={15} />内容をコピー</button><small>メールアプリを使えない場合は、内容をコピーしてお好みの窓口からお送りください。</small></div>}
  </form>;
}
