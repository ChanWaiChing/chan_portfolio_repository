"use client";

import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { BotMascot } from "./bot-mascot";

const faqs = [
  ["内容が決まっていなくても相談できますか？", "はい。アイデアの段階からご相談いただけます。目的・使う人・運用方法を整理し、必要な機能と優先順位を一緒に考えます。"],
  ["デザインと開発をまとめて依頼できますか？", "はい。兄が要件整理・設計・開発、弟がデザインを担当し、ひとつのチームで進めます。デザインだけ、実装だけなど、一部のご依頼も可能です。"],
  ["費用や制作期間はどのくらいですか？", "制作範囲・機能・素材・スケジュールを確認し、個別にお見積もりします。パッケージには税別のプラン料金と支援範囲を掲載しています。デザイン制作は単体メニューの目安料金です。外部サービス等の実費、保守の範囲、正式な費用・納期は個別に確認し、ご提案します。"],
  ["掲載されている制作例は実際の納品実績ですか？", "現在掲載している30件は、制作の方向性をご覧いただくための架空のサンプル・コンセプトです。実在するクライアントや納品実績ではありません。ご希望の雰囲気や必要な機能を伝えるきっかけとしてご活用ください。"],
  ["公開後の保守や改善も相談できますか？", "はい。更新・保守・機能追加・導線改善までご相談いただけます。運用体制を確認し、対応範囲と期間を個別に決めます。"],
  ["お問い合わせフォームに入力すれば、そのまま送信されますか？", "メールで受け付けている場合、ボタンを押すと入力済みのメールが開きます。メールアプリで送信してください。ほかの連絡窓口もご利用いただけます。"],
  ["既存のツールやシステムと連携できますか？", "外部連携・データ形式・権限を確認し、実現方法をご提案します。利用中のサービス名と、つなぎたい情報をお知らせください。"],
  ["人工知能活用は、何から始めればよいですか？", "繰り返し作業や時間がかかる工程から整理します。人工知能の担当と人が確認する範囲を決め、小さく試せる方法をご提案します。"],
];

export function FaqSection({ directSend = false }: { directSend?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const questions = faqs.map(([question, answer], index) => index === 5 ? ["フォームから送信できますか？", directSend ? "はい。必要事項を入力して「この内容で送信する」を押すと、ご相談を送信できます。送信を確認できない場合は内容が残り、メールアプリからの送信も選べます。メール・チャットワーク・ディスコード・テレグラムからもご連絡いただけます。" : "現在はメールで受け付けています。「メールで相談する」を押すと入力済みのメールが開きます。メールアプリで送信してください。入力内容はサイトに保存されません。メール・チャットワーク・ディスコード・テレグラムからもご相談いただけます。"] : [question, answer]);
  return <section className="content-section faq-guide-section" id="faq" aria-labelledby="faq-title">
    <div className="faq-guide-heading"><span>よくあるご質問</span><h2 id="faq-title">よくあるご質問</h2><p>ご相談の前に気になることを、まとめました。<br />知りたいことから、ひとつずつご覧ください。</p></div>
    <div className="faq-guide-layout"><aside className="faq-bot-guide"><div className="faq-bot-speech"><strong>ループが、<br />ご相談前の疑問をご案内。</strong><span>費用・進め方・公開後のこと。<br />知りたいところから確認できます。</span></div><BotMascot variant="mint" className="faq-guide-bot" /><a href="#contact">ほかの質問を相談する<ArrowRight size={17} /></a></aside>
      <div className="faq-guide-list">{questions.map(([question, answer], index) => <article className={active === index ? "faq-guide-item is-open" : "faq-guide-item"} key={question}><h3><button type="button" id={`faq-question-${index}`} aria-expanded={active === index} aria-controls={`faq-answer-${index}`} onClick={() => setActive(active === index ? null : index)}><span className="faq-guide-q">問</span><span>{question}</span><span className="faq-guide-toggle" aria-hidden="true">{active === index ? <Minus size={17} /> : <Plus size={17} />}</span></button></h3><div id={`faq-answer-${index}`} hidden={active !== index} role="region" aria-labelledby={`faq-question-${index}`}><span className="faq-guide-a" aria-hidden="true">答</span><p>{answer}</p></div></article>)}</div>
    </div>
  </section>;
}
