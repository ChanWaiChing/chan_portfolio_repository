import { Mail } from "lucide-react";
import { contactMethods } from "@/lib/site";
import { ContactMethods } from "./contact-methods";
import { useSiteLanguage } from "./site-language";

export function ContactInformation() {
  const { language } = useSiteLanguage();
  const copy = {
    ja: { title: "連絡先情報", email: "メール", services: "対応可能業務", tasks: ["ウェブサイト制作・リニューアル", "UI/UX・ウェブデザイン", "ウェブ・業務システム開発", "CMS・ECサイト構築", "外部サービス・API連携", "AI活用・業務改善", "スマートフォンアプリ開発・改修", "SaaS・月額型ウェブサービス開発", "SEO対策・サイト改善", "サーバー移行・クラウド環境整備", "セキュリティ診断・技術相談"] },
    en: { title: "Contact information", email: "Email", services: "How we can help", tasks: ["Website design and redesign", "UI/UX and web design", "Web and business system development", "CMS and e-commerce builds", "Third-party service and API integrations", "AI enablement and workflow improvement", "Mobile app development and updates", "SaaS and subscription web services", "SEO and website improvements", "Server migration and cloud setup", "Security reviews and technical consultation"] },
    "zh-CN": { title: "联系方式", email: "电子邮件", services: "服务范围", tasks: ["网站制作与改版", "UI/UX与网页设计", "网站及业务系统开发", "CMS与电商网站搭建", "外部服务与API集成", "AI应用与业务改善", "手机应用开发与改造", "SaaS与订阅式网站服务", "SEO与网站优化", "服务器迁移与云环境搭建", "安全检查与技术咨询"] },
    "zh-HK": { title: "聯絡資料", email: "電郵", services: "服務範圍", tasks: ["網站製作及改版", "UI/UX及網頁設計", "網站及業務系統開發", "CMS及網店建置", "外部服務及API整合", "AI應用及業務改善", "手機應用程式開發及更新", "SaaS及訂閱式網站服務", "SEO及網站優化", "伺服器遷移及雲端環境設定", "安全檢查及技術諮詢"] },
  }[language];
  const email = contactMethods.find(method => method.id === "mail")!;
  return <aside className="contact-aside contact-overview contact-reference-info p-8 max-[600px]:p-6">
    <h3 className="m-0 mb-7 font-heading text-xl font-bold">{copy.title}</h3>
    <div><h4 className="mb-2 font-heading text-xs font-bold tracking-wide">{copy.email}</h4><a href={email.href!} className="contact-email-link inline-flex max-w-full items-center gap-2 text-base leading-relaxed break-all hover:underline"><Mail size={19} className="shrink-0" aria-hidden="true" />{email.value}</a></div>
    <ContactMethods />
    <div className="contact-services mt-7"><h4 className="mb-3 font-heading text-xs font-bold tracking-wide">{copy.services}</h4>
      <ul className="m-0 grid list-none gap-2.5 p-0 text-sm leading-[1.7]">
        {copy.tasks.map(task => <li key={task}>{task}</li>)}
      </ul>
    </div>
  </aside>;
}
