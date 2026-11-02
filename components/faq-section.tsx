"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { BotMascot } from "./bot-mascot";
import { SectionLabel } from "./section-label";
import { useSiteLanguage } from "./site-language";

const faqs = [
  ["内容が決まっていなくても相談できますか？", "はい。アイデアの段階からご相談いただけます。目的・使う人・運用方法を整理し、必要な機能と優先順位を一緒に考えます。"],
  ["デザインと開発をまとめて依頼できますか？", "はい。要件整理・設計・デザイン・開発を、一貫した流れで進めます。デザインだけ、実装だけなど、一部のご依頼も可能です。"],
  ["費用や制作期間はどのくらいですか？", "制作範囲・機能・素材・スケジュールを確認し、個別にお見積もりします。パッケージには税別のプラン料金と支援範囲を掲載しています。デザイン制作は単体メニューの目安料金です。外部サービス等の実費、保守の範囲、正式な費用・納期は個別に確認し、ご提案します。"],
  ["掲載されている制作例は実際の納品実績ですか？", "制作実績の一覧には、これまでに制作したサイトと、守秘義務に配慮した匿名のシステム開発実績を掲載しています。公開可能な案件は、各詳細から公式サイトをご覧いただけます。"],
  ["公開後の保守や改善も相談できますか？", "はい。更新・保守・機能追加・導線改善までご相談いただけます。運用体制を確認し、対応範囲と期間を個別に決めます。"],
  ["お問い合わせフォームに入力すれば、そのまま送信されますか？", "メールで受け付けている場合、ボタンを押すと入力済みのメールが開きます。メールアプリで送信してください。ほかの連絡窓口もご利用いただけます。"],
  ["既存のツールやシステムと連携できますか？", "外部連携・データ形式・権限を確認し、実現方法をご提案します。利用中のサービス名と、つなぎたい情報をお知らせください。"],
  ["AI活用は、何から始めればよいですか？", "繰り返し作業や時間がかかる工程から整理します。AIの担当と人が確認する範囲を決め、小さく試せる方法をご提案します。"],
];

export function FaqSection({ directSend = false }: { directSend?: boolean }) {
  const { language, text } = useSiteLanguage();
  const [active, setActive] = useState<number | null>(null);
  const translatedFaqs = language === "ja" ? faqs : language === "en" ? [
    ["Can I ask for advice before I have decided what I need?", "Yes. We can help from the idea stage by clarifying your goals, users, and operations, then prioritizing the features that matter."],
    ["Can you handle both design and development?", "Yes. We can take a project from requirements and design through implementation. Design-only or development-only requests are also welcome."],
    ["How much will it cost, and how long will it take?", "We prepare a tailored estimate after confirming scope, features, materials, and schedule. Package prices are tax-exclusive estimates; third-party costs, maintenance, final fees, and delivery dates are confirmed individually."],
    ["Are the projects shown actual client work?", "The portfolio includes delivered websites and anonymized system projects presented with confidentiality in mind. Publicly shareable work links are available in the project details."],
    ["Can you help after launch?", "Yes. We can discuss updates, maintenance, new features, and improving user journeys based on your operations and support needs."],
    [directSend ? "Can I submit the contact form directly?" : "Does the contact form send my message?", directSend ? "Yes. Complete the required fields and choose Send. If delivery cannot be confirmed, your entries remain and you can also use email or another contact channel." : "The button opens a prepared email in your mail app. Please review and send it there. Your entries are not stored by the site."],
    ["Can you connect existing tools or systems?", "We review available integrations, data formats, and permissions, then suggest an approach. Tell us which services and information you would like to connect."],
    ["Where should I start with AI?", "We start by identifying repetitive or time-consuming work, then define what AI drafts and what people review. We recommend a small, testable first step."],
  ] : language === "zh-CN" ? [
    ["需求还没确定，也可以咨询吗？", "可以。即使只有初步想法，也可以先沟通。我们会一起梳理目标、使用者与运营方式，并确定功能优先级。"],
    ["设计和开发可以一起委托吗？", "可以。我们可从需求整理、设计到开发一并协作，也接受仅设计或仅开发的委托。"],
    ["费用和制作周期大概是多少？", "确认范围、功能、素材和时间安排后，我们会提供个别报价。方案价格不含税，第三方费用、维护内容及正式报价与交付日期会另行确认。"],
    ["作品集中的项目都是真实交付案例吗？", "作品集包含已制作的网站，以及为遵守保密义务而匿名介绍的系统项目。可公开的案例可在详情中查看官网链接。"],
    ["上线后也能委托维护和改进吗？", "可以。我们可根据运营情况，讨论内容更新、维护、功能追加和流程改善。"],
    [directSend ? "可以直接提交联系表单吗？" : "填写联系表单后会直接发送吗？", directSend ? "可以。填写必填项后点击发送。如暂时无法确认发送结果，输入内容会保留，也可改用邮件或其他联系渠道。" : "按钮会在邮件应用中打开已填写的邮件，请确认内容后发送。网站不会保存表单内容。"],
    ["可以连接现有工具或系统吗？", "我们会确认外部服务、数据格式和权限，并建议合适的实现方式。请告知正在使用的服务及希望连接的信息。"],
    ["使用AI应该从哪里开始？", "先整理重复或耗时的工作，再明确AI负责草拟、人负责确认的范围，并从小规模试行开始。"],
  ] : [
    ["未確定需求都可以先查詢嗎？", "可以。即使只有初步想法，都歡迎先傾談。我哋會一齊整理目標、使用者同營運方式，再排定功能優先次序。"],
    ["設計同開發可以一併委託嗎？", "可以。我哋可以由整理需求、設計到開發一齊處理，亦接受只做設計或只做開發。"],
    ["費用同製作時間大約幾多？", "確認範圍、功能、素材同時間安排後，我哋會提供個別報價。方案價格未含稅，第三方費用、保養內容及正式報價同交付日期會另行確認。"],
    ["作品集入面嘅項目都係實際交付案例嗎？", "作品集包括已製作嘅網站，以及為遵守保密責任而匿名介紹嘅系統項目。可公開嘅案例可以喺詳情查看官方網站。"],
    ["推出之後都可以委託保養同改善嗎？", "可以。我哋可以按營運情況，討論內容更新、保養、功能追加同流程改善。"],
    [directSend ? "可以直接提交聯絡表格嗎？" : "填妥聯絡表格之後會直接寄出嗎？", directSend ? "可以。填妥必填項目後按傳送。如果暫時未能確認傳送結果，輸入內容會保留，亦可以改用電郵或其他聯絡方式。" : "按鈕會喺電郵應用程式開啟已填妥嘅電郵，請確認內容後寄出。網站唔會儲存表格內容。"],
    ["可以連接現有工具或系統嗎？", "我哋會確認外部服務、資料格式同權限，再建議合適做法。請告知使用中嘅服務同想連接嘅資料。"],
    ["使用AI應該由邊度開始？", "先整理重複或耗時嘅工作，再決定AI負責草擬、由人負責確認嘅範圍，並由小規模試行開始。"],
  ];
  const questions = translatedFaqs;
  const heading = language === "ja" ? ["よくあるご質問", "ご相談の前に気になることを、まとめました", "知りたいことから、ひとつずつご覧ください", "ほかの質問を相談する"] : language === "en" ? ["Frequently asked questions", "Answers to common questions before you get in touch.", "Choose a topic to learn more.", "Ask us another question"] : language === "zh-CN" ? ["常见问题", "整理了咨询前可能关心的问题。", "欢迎从您想了解的内容开始。", "咨询其他问题"] : ["常見問題", "整理咗查詢前可能關心嘅問題。", "歡迎由你想了解嘅內容開始。", "查詢其他問題"];
  return <section className="content-section faq-guide-section scroll-mt-0" id="faq" aria-labelledby="faq-title">
    <div className="faq-guide-heading"><SectionLabel>FAQ</SectionLabel><h2 id="faq-title">{text("faq.title")}</h2><p>{heading[1]}<br />{heading[2]}</p></div>
    <div className="faq-guide-layout grid grid-cols-[220px_minmax(0,1fr)] gap-8 max-[760px]:grid-cols-1"><aside className="faq-bot-guide flex flex-col items-center gap-4 max-[760px]:static max-[760px]:flex-row max-[760px]:justify-center"><BotMascot variant="mint" className="faq-guide-bot" /><a className="text-[#b6dfff] underline decoration-[#8ebbd64d] underline-offset-4 transition-colors hover:text-white hover:decoration-[#b6e7ff] focus-visible:text-white" href="#contact">{heading[3]}<ArrowRight size={17} /></a></aside>
      <div className="faq-guide-list">{questions.map(([question, answer], index) => <article lang={language} className={`faq-guide-item overflow-hidden rounded-2xl border border-solid shadow-none transition-[border-color,background] duration-200 ${active === index ? "is-open border-[#8ec4ed] bg-[#112541]" : "border-[#779bc05c] bg-[#0d1c36e6]"}`} key={question}><h3 className="m-0"><button className="m-0 flex w-full transform-none items-center gap-3 border-0 bg-transparent px-5 py-5 text-left font-heading text-[clamp(16px,1.4vw,20px)] leading-[1.7] font-semibold text-[#deedff] shadow-none hover:transform-none hover:bg-[#a3d7ff0a] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#a1dcff]" type="button" id={`faq-question-${index}`} aria-expanded={active === index} aria-controls={`faq-answer-${index}`} onClick={() => setActive(active === index ? null : index)}><span className="faq-guide-q shrink-0 text-xl leading-none font-semibold text-[#9ad9ff]">{language === "ja" ? "問" : language === "en" ? "Q" : language === "zh-CN" ? "问" : "問"}</span><span className="min-w-0 flex-1">{question}</span><span className="faq-guide-toggle ml-auto grid size-8 min-w-8 shrink-0 place-items-center rounded-full bg-[#c4e9ff12] text-[#bce8ff]" aria-hidden="true"><Plus size={17} /></span></button></h3><div className="faq-answer-motion" data-open={active === index} id={`faq-answer-${index}`} aria-hidden={active !== index} inert={active !== index} role="region" aria-labelledby={`faq-question-${index}`}><div className="faq-answer-clip"><div className="faq-answer-content flex gap-3 border-0 border-t border-solid border-[#7b9eb333] px-5 py-4"><span className="faq-guide-a shrink-0 text-xl font-semibold text-[#9ad9ff]" aria-hidden="true">{language === "ja" ? "答" : language === "en" ? "A" : "答"}</span><p className="font-body text-[17px] leading-[1.95] text-[#c4d9ef] max-[760px]:text-base">{answer}</p></div></div></div></article>)}</div>
    </div>
  </section>;
}
