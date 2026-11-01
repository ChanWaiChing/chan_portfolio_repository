"use client";

import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { BotMascot } from "./bot-mascot";
import { SectionLabel } from "./section-label";

const faqs = [
  ["内容が決まっていなくても相談できますか？", "はい。アイデアの段階からご相談いただけます。目的・使う人・運用方法を整理し、必要な機能と優先順位を一緒に考えます。"],
  ["デザインと開発をまとめて依頼できますか？", "はい。要件整理・設計・デザイン・開発を、一貫した流れで進めます。デザインだけ、実装だけなど、一部のご依頼も可能です。"],
  ["費用や制作期間はどのくらいですか？", "制作範囲・機能・素材・スケジュールを確認し、個別にお見積もりします。パッケージには税別のプラン料金と支援範囲を掲載しています。デザイン制作は単体メニューの目安料金です。外部サービス等の実費、保守の範囲、正式な費用・納期は個別に確認し、ご提案します。"],
  ["掲載されている制作例は実際の納品実績ですか？", "制作実績の一覧には、これまでに制作した18件のサイトを掲載しています。各詳細から公開サイトをご覧いただけます。"],
  ["公開後の保守や改善も相談できますか？", "はい。更新・保守・機能追加・導線改善までご相談いただけます。運用体制を確認し、対応範囲と期間を個別に決めます。"],
  ["お問い合わせフォームに入力すれば、そのまま送信されますか？", "メールで受け付けている場合、ボタンを押すと入力済みのメールが開きます。メールアプリで送信してください。ほかの連絡窓口もご利用いただけます。"],
  ["既存のツールやシステムと連携できますか？", "外部連携・データ形式・権限を確認し、実現方法をご提案します。利用中のサービス名と、つなぎたい情報をお知らせください。"],
  ["AI活用は、何から始めればよいですか？", "繰り返し作業や時間がかかる工程から整理します。AIの担当と人が確認する範囲を決め、小さく試せる方法をご提案します。"],
];

export function FaqSection({ directSend = false }: { directSend?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const questions = faqs.map(([question, answer], index) => index === 5 ? ["フォームから送信できますか？", directSend ? "はい。必要事項を入力して「この内容で送信する」を押すと、ご相談を送信できます。送信を確認できない場合は内容が残り、メールアプリからの送信も選べます。メール・チャットワーク・ディスコード・テレグラムからもご連絡いただけます。" : "現在はメールで受け付けています。「メールで相談する」を押すと入力済みのメールが開きます。メールアプリで送信してください。入力内容はサイトに保存されません。メール・チャットワーク・ディスコード・テレグラムからもご相談いただけます。"] : [question, answer]);
  return <section className="content-section faq-guide-section scroll-mt-0" id="faq" aria-labelledby="faq-title">
    <div className="faq-guide-heading"><SectionLabel>FAQ</SectionLabel><h2 id="faq-title">よくあるご質問</h2><p>ご相談の前に気になることを、まとめました<br />知りたいことから、ひとつずつご覧ください</p></div>
    <div className="faq-guide-layout grid grid-cols-[220px_minmax(0,1fr)] gap-8 max-[760px]:grid-cols-1"><aside className="faq-bot-guide flex flex-col items-center gap-4 max-[760px]:static max-[760px]:flex-row max-[760px]:justify-center"><BotMascot variant="mint" className="faq-guide-bot" /><a className="text-[#b6dfff] underline decoration-[#8ebbd64d] underline-offset-4 transition-colors hover:text-white hover:decoration-[#b6e7ff] focus-visible:text-white" href="#contact">ほかの質問を相談する<ArrowRight size={17} /></a></aside>
      <div className="faq-guide-list">{questions.map(([question, answer], index) => <article className={`faq-guide-item overflow-hidden rounded-2xl border border-solid shadow-none transition-[border-color,background] duration-200 ${active === index ? "is-open border-[#8ec4ed] bg-[#112541]" : "border-[#779bc05c] bg-[#0d1c36e6]"}`} key={question}><h3 className="m-0"><button className="m-0 flex w-full transform-none items-center gap-3 border-0 bg-transparent px-5 py-5 text-left font-heading text-[clamp(16px,1.4vw,20px)] leading-[1.7] font-semibold text-[#deedff] shadow-none hover:transform-none hover:bg-[#a3d7ff0a] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#a1dcff]" type="button" id={`faq-question-${index}`} aria-expanded={active === index} aria-controls={`faq-answer-${index}`} onClick={() => setActive(active === index ? null : index)}><span className="faq-guide-q shrink-0 text-xl leading-none font-semibold text-[#9ad9ff]">問</span><span className="min-w-0 flex-1">{question}</span><span className="faq-guide-toggle ml-auto grid size-8 min-w-8 shrink-0 place-items-center rounded-full bg-[#c4e9ff12] text-[#bce8ff]" aria-hidden="true">{active === index ? <Minus size={17} /> : <Plus size={17} />}</span></button></h3><div className="flex gap-3 border-0 border-t border-solid border-[#7b9eb333] px-5 py-4" id={`faq-answer-${index}`} hidden={active !== index} role="region" aria-labelledby={`faq-question-${index}`}><span className="faq-guide-a shrink-0 text-xl font-semibold text-[#9ad9ff]" aria-hidden="true">答</span><p className="font-body text-[17px] leading-[1.95] text-[#c4d9ef] max-[760px]:text-base">{answer}</p></div></article>)}</div>
    </div>
  </section>;
}
