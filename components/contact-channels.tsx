"use client";
import { useState, type FormEvent } from "react";
import {
  Copy,
  Check,
  Mail,
  ArrowUpRight,
  MessageCircle,
  MessagesSquare,
} from "lucide-react";
import { site } from "@/lib/site";
const channels = [
  {
    name: "Discord",
    value: site.discord,
    text: "気軽に、チャットで。",
    icon: MessageCircle,
    color: "discord",
    href: "https://discord.com/app",
  },
  {
    name: "Chatwork",
    value: site.chatwork,
    text: "お仕事のご相談に。",
    icon: MessagesSquare,
    color: "chatwork",
    href: `https://www.chatwork.com/${site.chatwork}`,
  },
  {
    name: "Email",
    value: site.email,
    text: "じっくり、想いを伝える。",
    icon: Mail,
    color: "email",
    href: `mailto:${site.email}`,
  },
];
export function ContactChannels() {
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const draft = () =>
    `大穂兄弟 ご担当者様\n\n${message}\n\nお名前：${name}\nメールアドレス：${email}`;
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(
      `mailto:${site.email}?subject=${encodeURIComponent(`【ポートフォリオからのご相談】${name}`)}&body=${encodeURIComponent(draft())}`,
      "_blank",
      "noopener,noreferrer",
    );
    setFormStatus(
      "メールアプリで内容を確認して送信してください。開かない場合は、相談内容をコピーしてご連絡ください。",
    );
  };
  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft());
      setFormStatus(
        "相談内容をコピーしました。メールやチャットに貼り付けてお使いください。",
      );
    } catch {
      setFormStatus(
        "コピーできませんでした。入力内容を選択してコピーしてください。",
      );
    }
  };
  const copy = async (name: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(name);
      setStatus(`${name}の連絡先をコピーしました。`);
    } catch {
      setCopied("");
      setStatus(
        "コピーできませんでした。表示されている連絡先を選択してコピーしてください。",
      );
    }
  };
  return (
    <div className="contact-channels-area">
      <div className="contact-two-column">
        <div className="contact-information-panel">
          <span className="contact-panel-eyebrow">SAY HELLO</span>
          <h3>連絡先情報</h3>
          <p className="contact-panel-intro">
            あなたにとって、話しやすい方法で。
            <br />
            アイデアの種から、お聞かせください。
          </p>
          <div className="contact-channels">
            {channels.map(({ name, value, text, icon: Icon, color, href }) => (
              <article
                className={`contact-channel contact-${color}`}
                key={name}
              >
                <div className="channel-top">
                  <span className="channel-icon">
                    <Icon size={23} />
                  </span>
                  <span>
                    {name}
                    <small>{text}</small>
                  </span>
                  <button
                    aria-label={`${name}の連絡先をコピー`}
                    title="連絡先をコピー"
                    onClick={() => copy(name, value)}
                  >
                    {copied === name ? <Check size={17} /> : <Copy size={17} />}
                  </button>
                </div>
                <p className="channel-value">{value}</p>
                <a
                  href={href}
                  target={name === "Email" ? undefined : "_blank"}
                  rel={name === "Email" ? undefined : "noopener noreferrer"}
                >
                  {name === "Email"
                    ? "メールを書く"
                    : name === "Discord"
                      ? "Discordを開く"
                      : "Chatworkで連絡する"}
                  <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
          <p className="contact-id-note">
            Discordでは「フレンドに追加」からユーザー名{" "}
            <strong>{site.discord}</strong> を検索できます。
          </p>
          <p className="contact-copy-status" role="status" aria-live="polite">
            {status}
          </p>
          <div className="contact-services">
            <span>お手伝いできること</span>
            <p>
              Webサイト・LP / UI・UXデザイン / Web・業務システム /
              モバイルアプリ / AI・業務改善
            </p>
          </div>
          <a
            className="contact-lancers-link"
            href={site.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lancersプロフィールを見る <ArrowUpRight size={15} />
          </a>
        </div>
        <form className="contact-draft-form" onSubmit={send}>
          <span className="contact-panel-eyebrow">YOUR NEXT PROJECT</span>
          <h3>プロジェクトのご相談</h3>
          <p>まずは、まとまっていない想いのままで。</p>
          <label htmlFor="contact-name">
            お名前 <span>必須</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="大穂 太郎"
          />
          <label htmlFor="contact-email">
            メールアドレス <span>必須</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
          <label htmlFor="contact-message">
            ご相談内容 <span>必須</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            maxLength={2500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="実現したいこと、お困りごと、ご希望の時期など。お気軽にお聞かせください。"
          />
          <button
            type="submit"
            className="animated-button button-dark inline-mail-submit"
          >
            <span>メールアプリを開いて相談する</span>
            <ArrowUpRight size={17} />
          </button>
          <button
            type="button"
            className="draft-copy-button"
            onClick={copyDraft}
          >
            <Copy size={14} />
            相談内容をコピー
          </button>
          <p className="contact-form-note">
            入力内容はサイトに保存されません。メールアプリでご確認のうえ、送信してください。
          </p>
          <p className="contact-form-status" role="status" aria-live="polite">
            {formStatus}
          </p>
        </form>
      </div>
    </div>
  );
}
