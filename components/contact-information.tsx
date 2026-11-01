import { Mail } from "lucide-react";
import { contactMethods } from "@/lib/site";
import { ContactMethods } from "./contact-methods";

export function ContactInformation() {
  const email = contactMethods.find(method => method.id === "mail")!;
  return <aside className="contact-aside contact-overview contact-reference-info p-8 max-[600px]:p-6">
    <h3 className="m-0 mb-7 font-heading text-xl font-bold">連絡先情報</h3>
    <div><h4 className="mb-2 font-heading text-xs font-bold tracking-wide">メール</h4><a href={email.href!} className="contact-email-link inline-flex max-w-full items-center gap-2 text-base leading-relaxed break-all hover:underline"><Mail size={19} className="shrink-0" aria-hidden="true" />{email.value}</a></div>
    <ContactMethods />
    <div className="contact-services mt-7"><h4 className="mb-3 font-heading text-xs font-bold tracking-wide">対応可能業務</h4>
      <ul className="m-0 grid list-none gap-2.5 p-0 text-sm leading-[1.7]">
        <li>ウェブサイト制作・リニューアル</li>
        <li>UI/UX・ウェブデザイン</li>
        <li>ウェブ・業務システム開発</li>
        <li>CMS・ECサイト構築</li>
        <li>外部サービス・API連携</li>
        <li>AI活用・業務改善</li>
        <li>スマートフォンアプリ開発・改修</li>
        <li>SaaS・月額型ウェブサービス開発</li>
        <li>SEO対策・サイト改善</li>
        <li>サーバー移行・クラウド環境整備</li>
        <li>セキュリティ診断・技術相談</li>
      </ul>
    </div>
  </aside>;
}
