"use client";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import {
  Copy,
  Check,
  Mail,
  ArrowUpRight,
  MessageCircle,
  MessagesSquare,
  Globe2,
  PenTool,
  Code2,
  Sparkles,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { site } from "@/lib/site";
import { scenes } from "@/lib/visuals";
const channels = [
  {
    name: "Email",
    value: site.email,
    text: "想いを、じっくり伝える。",
    icon: Mail,
    color: "email",
    href: `mailto:${site.email}`,
  },
  {
    name: "Discord",
    value: site.discord,
    text: "気軽にチャットで。",
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
];
const topics = [
  { label: "Webサイト", icon: Globe2 },
  { label: "UI / UX", icon: PenTool },
  { label: "システム開発", icon: Code2 },
  { label: "AI・業務改善", icon: Sparkles },
  { label: "まずは相談", icon: MessageCircle },
];
export function ContactChannels() {
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [kind, setKind] = useState("まずは相談");
  const [timing, setTiming] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const draft = () =>
    `大穂兄弟 ご担当者様\n\n【ご相談のテーマ】${kind}\n【ご希望の時期】${timing || "相談して決めたい"}\n\n${message}\n\nお名前：${name}\nメールアドレス：${email}`;
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(
      `mailto:${site.email}?subject=${encodeURIComponent(`【ポートフォリオからのご相談】${kind} / ${name}`)}&body=${encodeURIComponent(draft())}`,
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
  const copy = async (channel: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(channel);
      setStatus(`${channel}の連絡先をコピーしました。`);
    } catch {
      setCopied("");
      setStatus(
        "コピーできませんでした。表示されている連絡先を選択してコピーしてください。",
      );
    }
  };
  return (
    <div className="contact-channels-area modern-contact">
      <div className="contact-two-column">
        <div className="contact-information-panel">
          <div className="contact-panel-heading">
            <span className="contact-panel-eyebrow">
              GOOD CONVERSATIONS, GREAT IDEAS.
            </span>
            <h3>
              つながる方法も、
              <br />
              あなたらしく。
            </h3>
            <p className="contact-panel-intro">
              相談のきっかけは、小さなひとことで。
              <br />
              話しやすい窓口から、お声がけください。
            </p>
          </div>
          <figure className="contact-scene" data-people="1">
            <Image
              src={scenes.solo.src}
              alt={scenes.solo.alt}
              fill
              sizes="(max-width:900px) 90vw, 520px"
            />
            <figcaption>
              <Sparkles size={14} /> IDEAS BEGIN WITH HELLO.
            </figcaption>
          </figure>
          <div className="contact-channels">
            {channels.map(
              ({ name: channel, value, text, icon: Icon, color, href }) => (
                <article
                  className={`contact-channel contact-${color}`}
                  key={channel}
                >
                  <div className="channel-top">
                    <span className="channel-icon">
                      <Icon size={21} />
                    </span>
                    <span>
                      {channel}
                      <small>{text}</small>
                    </span>
                    <button
                      type="button"
                      aria-label={`${channel}の連絡先をコピー`}
                      title="連絡先をコピー"
                      onClick={() => copy(channel, value)}
                    >
                      {copied === channel ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                  <p className="channel-value">{value}</p>
                  <a
                    href={href}
                    target={channel === "Email" ? undefined : "_blank"}
                    rel={
                      channel === "Email" ? undefined : "noopener noreferrer"
                    }
                  >
                    {channel === "Email"
                      ? "メールを書く"
                      : channel === "Discord"
                        ? "Discordを開く"
                        : "Chatworkで連絡する"}
                    <ArrowUpRight size={16} />
                  </a>
                </article>
              ),
            )}
          </div>
          <p className="contact-id-note">
            Discordの「フレンドに追加」で <strong>{site.discord}</strong>{" "}
            を検索できます。
          </p>
          <p className="contact-copy-status" role="status" aria-live="polite">
            {status}
          </p>
          <a
            className="contact-lancers-link"
            href={site.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lancersプロフィールを見る
            <ArrowUpRight size={15} />
          </a>
        </div>
        <form className="contact-draft-form" onSubmit={send}>
          <div className="form-heading">
            <span className="form-heading-icon">
              <ArrowUpRight size={24} />
            </span>
            <div>
              <span className="contact-panel-eyebrow">
                LET’S MAKE IT HAPPEN
              </span>
              <h3>次の一歩を、ここから。</h3>
            </div>
          </div>
          <p className="form-lead">
            まだ言葉になっていないアイデアも、大歓迎です。
          </p>
          <fieldset className="inquiry-topics">
            <legend>
              どんなことを相談したいですか？<span>任意</span>
            </legend>
            <div role="group" aria-label="ご相談のテーマ">
              {topics.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={kind === label}
                  onClick={() => {
                    setKind(label);
                    setFormStatus("");
                  }}
                >
                  <Icon size={16} />
                  {label}
                  {kind === label && <Check size={12} />}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="contact-field-grid">
            <div className="contact-field">
              <label htmlFor="contact-name">
                お名前<span>必須</span>
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFormStatus("");
                }}
                placeholder="山田 太郎"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">
                メールアドレス<span>必須</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormStatus("");
                }}
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">
              ご相談内容<span>必須</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              maxLength={2500}
              aria-describedby="contact-message-hint"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setFormStatus("");
              }}
              placeholder="つくりたいもの、お困りごと、ご希望など。まとまっていなくても大丈夫です。"
            />
            <div className="message-meta">
              <span id="contact-message-hint">
                アイデアの段階から、お気軽に。
              </span>
              <span aria-label="入力文字数">
                {message.length.toLocaleString()} / 2,500
              </span>
            </div>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-timing">
              <CalendarDays size={14} />
              ご希望の時期<span className="optional-label">任意</span>
            </label>
            <input
              id="contact-timing"
              name="timing"
              maxLength={100}
              value={timing}
              onChange={(e) => {
                setTiming(e.target.value);
                setFormStatus("");
              }}
              placeholder="例：相談しながら決めたい"
            />
          </div>
          <div className="contact-form-actions">
            <button
              type="submit"
              className="animated-button button-dark inline-mail-submit"
            >
              <span>メールアプリを開いて相談する</span>
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              className="draft-copy-button"
              onClick={copyDraft}
            >
              <Copy size={14} />
              相談内容をコピー
            </button>
          </div>
          <p className="contact-form-note">
            <Mail size={13} />
            メールアプリで内容をご確認のうえ、送信してください。入力内容はサイトに保存されません。
          </p>
          <p className="contact-form-status" role="status" aria-live="polite">
            {formStatus}
          </p>
        </form>
      </div>
    </div>
  );
}
