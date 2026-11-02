"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Copy } from "lucide-react";
import { categories, servicePackages } from "@/lib/catalog";
import { trackInteraction } from "@/lib/interaction-events";
import { translateContent } from "@/lib/catalog-localization";
import { useSiteLanguage } from "./site-language";
import { localizeCategory } from "@/lib/localization";

export function ContactForm({ topic, onTopic, directSend }: { topic: string; onTopic: (topic: string) => void; directSend: boolean }) {
  const { language } = useSiteLanguage();
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
  const copy = language === "ja" ? { title: "メッセージを送る", selected: "ご相談の内容：", name: "お名前", email: "メールアドレス", message: "ご相談内容", company: "会社名・屋号", optional: "任意", required: "必須", namePlaceholder: "山田 太郎", emailPlaceholder: "ご連絡用のメールアドレス", messagePlaceholder: "実現したいこと、今のお困りごと、ご希望の時期など", help: "10〜3,000文字。ご予算や時期が未定でも、ご相談いただけます。", extra: "会社名・相談内容を追加する（任意）", topic: "相談したいこと", topics: "ご相談の内容", basic: ["まずは相談したい", "ウェブサイト制作", "デザイン / 画面・体験設計", "ウェブ・業務システム開発", "AI活用 / 業務改善"], delivery: directSend ? "入力内容は、ご相談への返信のために使用します。ボタンを押すと送信されます。" : "メールアプリが開きます。内容をご確認のうえ送信してください。", sending: "送信中…", submit: directSend ? "この内容で送信する" : "メールで相談する", another: "別の相談を作成する", review: "メールアプリで送信してください", reviewText: "まだ送信されていません。メールが開かなかった場合は、下のボタンから再度開くか、内容をコピーして別の窓口へお送りください。", sendEmail: "メールアプリで送る", copy: "内容をコピー", copied: "内容をコピーしました。", copyFail: "コピーできませんでした。上の内容を選択してコピーしてください。", copyHelp: "メールアプリを使えない場合は、内容をコピーしてお好みの窓口からお送りください。" }
    : language === "en" ? { title: "Send a message", selected: "Topic: ", name: "Name", email: "Email address", message: "How can we help?", company: "Company or business name", optional: "Optional", required: "Required", namePlaceholder: "Your name", emailPlaceholder: "Email address for our reply", messagePlaceholder: "What you would like to achieve, your current challenge, and preferred timing", help: "10–3,000 characters. You can contact us even if your budget or timing is undecided.", extra: "Add company and topic details (optional)", topic: "What would you like to discuss?", topics: "Contact topic", basic: ["I’d like to discuss an idea", "Website development", "Design / UI and user experience", "Web or business system development", "AI and workflow improvement"], delivery: directSend ? "We use your details to respond to your inquiry. Submit the form to send it." : "Your email app will open with a draft. Review and send it there.", sending: "Sending…", submit: directSend ? "Send message" : "Continue in email", another: "Start another inquiry", review: "Send using your email app", reviewText: "This message has not been sent yet. If your email app did not open, use the button below or copy the text to another channel.", sendEmail: "Open email app", copy: "Copy message", copied: "Message copied.", copyFail: "Could not copy. Select and copy the message above.", copyHelp: "If you cannot use an email app, copy this message and send it through another channel." }
      : language === "zh-CN" ? { title: "发送消息", selected: "咨询主题：", name: "姓名", email: "电子邮件", message: "咨询内容", company: "公司或店铺名称", optional: "选填", required: "必填", namePlaceholder: "您的姓名", emailPlaceholder: "用于接收回复的邮箱", messagePlaceholder: "希望实现的目标、目前遇到的问题及期望时间", help: "10至3,000字。预算或时间尚未确定也可以咨询。", extra: "补充公司与咨询主题（选填）", topic: "想咨询的内容", topics: "咨询主题", basic: ["先聊聊想法", "网站制作", "设计 / 界面与体验设计", "网站及业务系统开发", "AI应用 / 业务改善"], delivery: directSend ? "所填写的信息仅用于回复咨询。点击按钮即可提交。" : "将打开已填写内容的邮件，请确认后发送。", sending: "正在发送…", submit: directSend ? "提交咨询" : "使用邮件发送", another: "创建新的咨询", review: "请通过邮件应用发送", reviewText: "邮件尚未发送。如果邮件应用未打开，可点击下方按钮重试，或复制内容通过其他渠道发送。", sendEmail: "打开邮件应用", copy: "复制内容", copied: "内容已复制。", copyFail: "无法复制，请选择并复制上方内容。", copyHelp: "如果无法使用邮件应用，请复制内容并通过其他渠道发送。" }
        : { title: "傳送訊息", selected: "查詢主題：", name: "姓名", email: "電郵地址", message: "查詢內容", company: "公司或商號", optional: "選填", required: "必填", namePlaceholder: "你的姓名", emailPlaceholder: "用嚟接收回覆嘅電郵", messagePlaceholder: "想實現嘅目標、目前遇到嘅問題同期望時間", help: "10至3,000字。預算或時間未確定都可以查詢。", extra: "補充公司及查詢主題（選填）", topic: "想查詢嘅內容", topics: "查詢主題", basic: ["先傾吓想法", "網站製作", "設計 / 介面及體驗設計", "網站及業務系統開發", "AI應用 / 業務改善"], delivery: directSend ? "所填資料只會用作回覆查詢。按下按鈕即可提交。" : "將會開啟已填妥嘅電郵，請確認後寄出。", sending: "傳送中…", submit: directSend ? "提交查詢" : "使用電郵傳送", another: "建立新查詢", review: "請透過電郵應用程式寄出", reviewText: "電郵尚未寄出。如果電郵應用程式未有開啟，可以按下方按鈕重試，或複製內容透過其他方式傳送。", sendEmail: "開啟電郵應用程式", copy: "複製內容", copied: "內容已複製。", copyFail: "無法複製，請選取並複製上方內容。", copyHelp: "如果無法使用電郵應用程式，請複製內容並透過其他方式傳送。" };
  useEffect(() => { setReviewed(false); setStatus(""); setSent(false); requestId.current = ""; }, [topic, language]);
  const basicTopics = ["まずは相談したい", "ウェブサイト制作", "デザイン / 画面・体験設計", "ウェブ・業務システム開発", "AI活用 / 業務改善"];
  const knownTopic = basicTopics.includes(topic) || servicePackages.some(item => item.title === topic);
  const displayTopic = knownTopic && basicTopics.includes(topic) ? copy.basic[basicTopics.indexOf(topic)] : translateContent(topic, language);
  const draft = `${copy.title}\n\n${copy.name}: ${name}\n${copy.email}: ${email}\n${copy.company}: ${company || copy.optional}\n${copy.topic}: ${displayTopic}\n\n${message}`;
  const mailHref = `mailto:cbnbc07@gmail.com?subject=${encodeURIComponent(`${copy.title}: ${displayTopic} / ${name}`)}&body=${encodeURIComponent(draft)}`;

  return <form className="contact-form" onFocusCapture={() => { if (!started.current) { started.current=true; trackInteraction("contact_started"); } }} onInvalid={event => { const field = event.target as HTMLInputElement; field.setCustomValidity(field.validity.typeMismatch ? (language === "ja" ? "メールアドレスを正しく入力してください。" : language === "en" ? "Enter a valid email address." : language === "zh-CN" ? "请输入有效的电子邮件地址。" : "請輸入有效嘅電郵地址。") : field.validity.tooShort ? (language === "ja" ? "ご相談内容は１０文字以上で入力してください。" : language === "en" ? "Please enter at least 10 characters." : language === "zh-CN" ? "请至少输入10个字符。" : "請至少輸入10個字。") : (language === "ja" ? "必須項目を入力してください。" : language === "en" ? "Complete all required fields." : language === "zh-CN" ? "请填写所有必填项。" : "請填寫所有必填項。")); }} onInput={event => { (event.target as HTMLInputElement).setCustomValidity(""); }} onChange={() => { setReviewed(false); setStatus(""); setSent(false); requestId.current = ""; }} onSubmit={async event => {
    event.preventDefault();
    if (!directSend) { setReviewed(true); trackInteraction("contact_draft_ready"); trackInteraction("contact_mail_open"); window.location.assign(mailHref); return; }
    const form = event.currentTarget;
    setSending(true); setStatus("");
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, company, topic, message, website: new FormData(form).get("website"), requestId: requestId.current }) });
      if (!response.ok) throw new Error("send failed");
      setSent(true); setStatus(language === "ja" ? "お問い合わせを受け付けました。送信ありがとうございます。" : language === "en" ? "Your message has been received. Thank you." : language === "zh-CN" ? "已收到您的咨询，谢谢。" : "已收到你嘅查詢，多謝。");
      trackInteraction("contact_provider_accepted");
    } catch { trackInteraction("contact_failed"); setStatus(language === "ja" ? "送信を確認できませんでした。入力内容は残っています。もう一度お試しいただくか、メールアプリからご連絡ください。" : language === "en" ? "We could not confirm delivery. Your entries are preserved. Please try again or contact us by email." : language === "zh-CN" ? "暂时无法确认是否发送成功，已保留填写内容。请重试或通过邮件联系我们。" : "暫時未能確認是否成功寄出，已保留輸入內容。請重試或透過電郵聯絡我哋。"); setReviewed(true); }
    finally { setSending(false); }
  }}>
    <h3>{copy.title}</h3>
    {topic !== "まずは相談したい" && <p className="contact-selected-topic">{copy.selected}{displayTopic}</p>}
    <fieldset disabled={sending || sent}>
      <div className="form-row"><label htmlFor="contact-name">{copy.name} <span>{copy.required}</span></label><input id="contact-name" autoComplete="name" required maxLength={100} placeholder={copy.namePlaceholder} value={name} onChange={event => setName(event.target.value)} /></div>
      <div className="form-row"><label htmlFor="contact-email">{copy.email} <span>{copy.required}</span></label><input id="contact-email" type="email" autoComplete="email" required maxLength={200} placeholder={copy.emailPlaceholder} value={email} onChange={event => setEmail(event.target.value)} /></div>
      <div className="form-row"><label htmlFor="contact-message">{copy.message} <span>{copy.required}</span></label><textarea id="contact-message" required minLength={10} maxLength={3000} rows={5} aria-describedby="message-help" placeholder={copy.messagePlaceholder} value={message} onChange={event => setMessage(event.target.value)} /><small id="message-help">{copy.help}</small></div>
      <details className="contact-extra"><summary>{copy.extra}</summary><div>
      <div className="form-row"><label htmlFor="contact-company">{copy.company} <small>{copy.optional}</small></label><input id="contact-company" autoComplete="organization" maxLength={150} placeholder={copy.company} value={company} onChange={event => setCompany(event.target.value)} /></div>
      <div className="form-row"><label htmlFor="contact-topic">{copy.topic} <span>{copy.required}</span></label><select id="contact-topic" value={topic} onChange={event => onTopic(event.target.value)}><optgroup label={copy.topics}>{basicTopics.map((value, index) => <option key={value} value={value}>{copy.basic[index]}</option>)}</optgroup>{categories.slice(1).map(category => <optgroup label={`${localizeCategory(category, language)} ${copy.topics}`} key={category}>{servicePackages.filter(item => item.category === category).map(item => <option key={item.id} value={item.title}>{translateContent(item.title, language)}</option>)}</optgroup>)}{!knownTopic && <optgroup label={copy.topic}><option value={topic}>{translateContent(topic, language)}</option></optgroup>}</select></div>
      </div></details>
      <label className="honeypot" aria-hidden="true">{language === "ja" ? "予備欄" : language === "en" ? "Leave blank" : language === "zh-CN" ? "请留空" : "請留空"}<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <p className="form-delivery-note">{copy.delivery}</p>
      <button type="submit" className="catalog-cta contact-submit">{sending ? copy.sending : copy.submit}<ArrowRight size={18} /></button>
    </fieldset>
    <p className="form-status" role="status">{status}</p>
    {sent && <button type="button" className="draft-copy" onClick={() => { setSent(false); setStatus(""); requestId.current = ""; }}>{copy.another}</button>}
    {reviewed && <div className="contact-review" id="contact-review" tabIndex={-1}><h3>{copy.review}</h3><p>{copy.reviewText}</p><pre>{draft}</pre><a className="catalog-cta" href={mailHref} onClick={() => trackInteraction("contact_mail_open")}>{copy.sendEmail}<ArrowUpRight size={17} /></a><button type="button" className="draft-copy" onClick={async () => { try { await navigator.clipboard.writeText(draft); setStatus(copy.copied); } catch { setStatus(copy.copyFail); } }}><Copy size={15} />{copy.copy}</button><small>{copy.copyHelp}</small></div>}
  </form>;
}
