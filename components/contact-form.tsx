"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Clock3, Copy, Sparkles } from "lucide-react";
import { categories, servicePackages } from "@/lib/catalog";
import { trackInteraction } from "@/lib/interaction-events";

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
  const started = useRef(false);
  useEffect(() => { setReviewed(false); setStatus(""); setSent(false); requestId.current = ""; }, [topic]);
  const draft = `【プロジェクトのご相談】\n\nお名前：${name}\nメールアドレス：${email}\n会社・屋号：${company || "未入力"}\n相談したいこと：${topic}\n\n${message}`;
  const mailHref = `mailto:cbnbc07@gmail.com?subject=${encodeURIComponent(`【ご相談】${topic} / ${name}`)}&body=${encodeURIComponent(draft)}`;
  const basicTopics = ["まずは相談したい", "ウェブサイト制作", "デザイン / 画面・体験設計", "ウェブ・業務システム開発", "人工知能活用 / 業務改善"];
  const knownTopic = basicTopics.includes(topic) || servicePackages.some(item => item.title === topic);

  return <form className="contact-form" onFocusCapture={() => { if (!started.current) { started.current=true; trackInteraction("contact_started"); } }} onInvalid={event => { const field = event.target as HTMLInputElement; field.setCustomValidity(field.validity.typeMismatch ? "メールアドレスを正しく入力してください。" : field.validity.tooShort ? "ご相談内容は１０文字以上で入力してください。" : "必須項目を入力してください。"); }} onInput={event => { (event.target as HTMLInputElement).setCustomValidity(""); }} onChange={() => { setReviewed(false); setStatus(""); setSent(false); requestId.current = ""; }} onSubmit={async event => {
    event.preventDefault();
    if (!directSend) { setReviewed(true); trackInteraction("contact_draft_ready"); trackInteraction("contact_mail_open"); window.location.assign(mailHref); return; }
    const form = event.currentTarget;
    setSending(true); setStatus("");
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, company, topic, message, website: new FormData(form).get("website"), requestId: requestId.current }) });
      if (!response.ok) throw new Error("send failed");
      setSent(true); setStatus("お問い合わせを受け付けました。送信ありがとうございます。");
      trackInteraction("contact_provider_accepted");
    } catch { trackInteraction("contact_failed"); setStatus("送信を確認できませんでした。入力内容は残っています。もう一度お試しいただくか、メールアプリからご連絡ください。"); setReviewed(true); }
    finally { setSending(false); }
  }}>
    <h3>プロジェクトのご相談</h3>
    <p className="form-intro">まずはお困りごとをひとつ。ご予算や時期は、決まっている範囲で大丈夫です。</p>
    <details className="contact-privacy"><summary>お問い合わせ情報の取り扱い</summary><p>窓口は大穂兄弟です。お名前・連絡先・ご相談内容は、ご相談への対応と連絡のために利用します。</p><p>{directSend ? "フォームはメール送信サービスを経由して窓口へ送ります。サイト独自のデータベースには入力内容を保存しません。" : "現在はメールで受け付けています。メールアプリで送信するまで、入力内容は窓口へ送られません。サイトには保存されません。"}</p><p>送信後の内容確認や訂正については、同じ窓口へご連絡ください。</p></details>
    <div className="contact-time-intro">
      <span><Clock3 size={18} aria-hidden="true" />あなたの時間を、大切に。</span>
      <h3>本来の仕事に、<br />向き合う時間をつくる。</h3>
      <p>整理・設計・制作をひとつのチームで。<br />手間を減らし、次の一歩を考える余白をご一緒に。</p>
      <div className="contact-time-shapes" aria-hidden="true"><span /><span /><Sparkles size={23} /></div>
    </div>
    <fieldset disabled={sending || sent}>
      <div className="form-row"><label htmlFor="contact-name">お名前 <span>必須</span></label><input id="contact-name" autoComplete="name" required maxLength={100} placeholder="山田 太郎" value={name} onChange={event => setName(event.target.value)} /></div>
      <div className="form-row"><label htmlFor="contact-email">メールアドレス <span>必須</span></label><input id="contact-email" type="email" autoComplete="email" required maxLength={200} placeholder="ご連絡用のメールアドレス" value={email} onChange={event => setEmail(event.target.value)} /></div>
      <div className="form-row"><label htmlFor="contact-company">会社名・屋号 <small>任意</small></label><input id="contact-company" autoComplete="organization" maxLength={150} placeholder="株式会社サンプル" value={company} onChange={event => setCompany(event.target.value)} /></div>
      <div className="form-row"><label htmlFor="contact-topic">相談したいこと <span>必須</span></label><select id="contact-topic" value={topic} onChange={event => onTopic(event.target.value)}><optgroup label="ご相談の内容">{basicTopics.map(value => <option key={value}>{value}</option>)}</optgroup>{categories.slice(1).map(category => <optgroup label={`${category}のパッケージ`} key={category}>{servicePackages.filter(item => item.category === category).map(item => <option key={item.id}>{item.title}</option>)}</optgroup>)}{!knownTopic && <optgroup label="選択した制作イメージ"><option>{topic}</option></optgroup>}</select></div>
      <div className="form-row"><label htmlFor="contact-message">ご相談内容 <span>必須</span></label><textarea id="contact-message" required minLength={10} maxLength={3000} rows={6} aria-describedby="message-help" placeholder="実現したいこと、今のお困りごと、ご希望の時期など" value={message} onChange={event => setMessage(event.target.value)} /><small id="message-help">10〜3,000文字。ご予算や時期が未定でも、ご相談いただけます。</small></div>
      <label className="honeypot" aria-hidden="true">予備欄<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <p className="form-delivery-note">{directSend ? "入力内容は、ご相談への返信のために使用します。ボタンを押すと送信されます。" : "現在はメールで受け付けています。ボタンを押すと入力済みのメールが開きます。メールアプリで送信してください。"}</p>
      <button type="submit" className="catalog-cta contact-submit">{sending ? "送信中…" : directSend ? "この内容で送信する" : "メールで相談する"}<ArrowRight size={18} /></button>
    </fieldset>
    <p className="form-status" role="status">{status}</p>
    <p className="measurement-note">サイト改善のため、操作の種類のみを匿名で集計します。お名前・メールアドレス・ご相談内容は計測に含めません。</p>
    {sent && <button type="button" className="draft-copy" onClick={() => { setSent(false); setStatus(""); requestId.current = ""; }}>別の相談を作成する</button>}
    {reviewed && <div className="contact-review" id="contact-review" tabIndex={-1}><h3>メールアプリで送信してください。</h3><p>まだ送信されていません。メールが開かなかった場合は、下のボタンから再度開くか、内容をコピーして別の窓口へお送りください。</p><pre>{draft}</pre><a className="catalog-cta" href={mailHref} onClick={() => trackInteraction("contact_mail_open")}>メールアプリで送る<ArrowUpRight size={17} /></a><button type="button" className="draft-copy" onClick={async () => { try { await navigator.clipboard.writeText(draft); setStatus("内容をコピーしました。"); } catch { setStatus("コピーできませんでした。上の内容を選択してコピーしてください。"); } }}><Copy size={15} />内容をコピー</button><small>メールアプリを使えない場合は、内容をコピーしてお好みの窓口からお送りください。</small></div>}
  </form>;
}
