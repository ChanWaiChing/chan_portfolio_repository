"use client";

import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { BotMascot } from "./bot-mascot";

const faqs = [
  ["アイデアはありますが、何を依頼すればよいか決まっていません。相談できますか？", "はい。まずは実現したいことや、今のお困りごとをお聞かせください。事業の目的・使う人・運用方法を整理しながら、必要な機能と優先順位を一緒に考えます。仕様書がない段階でもご相談いただけます。"],
  ["デザインと開発を別々に依頼すると、認識のずれが心配です。まとめてお願いできますか？", "はい。兄が要件整理や設計・開発、弟がデザインを担当し、ひとつのチームで進めます。デザインだけ、実装だけ、既存サイトの一部改善など、必要な範囲からのご相談も可能です。"],
  ["費用や制作期間はどのくらいですか？ パッケージの金額で依頼できますか？", "費用と期間は、制作範囲・必要な機能・素材の準備状況・ご希望のスケジュールを確認して個別にお見積もりします。掲載中のパッケージ金額と期間は仮のサンプルです。正式な条件は、ご相談の内容を整理したうえでご提案します。"],
  ["掲載されている制作例は実際の納品実績ですか？", "現在掲載している30件は、制作の方向性をご覧いただくための架空のサンプル・コンセプトです。実在するクライアントや納品実績ではありません。ご希望の雰囲気や必要な機能を伝えるきっかけとしてご活用ください。"],
  ["公開した後の更新や、使いにくい部分の改善も相談できますか？", "はい。保守・運用、機能追加、デザインや導線の改善までご相談いただけます。更新する方や運用体制を確認し、長く使い続けやすい進め方を考えます。対応する範囲や期間は個別にご相談します。"],
  ["お問い合わせフォームに入力すれば、そのまま送信されますか？", "このフォームはメール作成用です。入力内容を確認した後、「メールアプリで送る」からご自身のメールアプリを開いて送信してください。サイトからの自動送信や入力内容の保存は行いません。Mail・Chatwork・Discord・Telegramの窓口からもご相談いただけます。"],
  ["既存のシステムや、普段使っているツールと連携できますか？", "連携先のAPIやデータ形式、利用権限などを確認して、実現できる方法をご提案します。利用中のサービス名と、どの情報をどうつなぎたいかをお知らせください。既存の仕組みを活かせるかどうかも含めて検討します。"],
  ["AIを使いたいのですが、どの業務から始めればよいかわかりません。", "日々繰り返している作業や、時間がかかっている工程から一緒に整理します。AIに任せる範囲と人が判断・確認する範囲を分け、小さく試せる活用方法を考えます。業務や取り扱う情報に合わせた運用もご相談いただけます。"],
];

export function FaqSection() {
  const [active, setActive] = useState<number | null>(0);
  return <section className="content-section faq-guide-section" id="faq" aria-labelledby="faq-title">
    <div className="faq-guide-heading"><span>QUESTIONS & ANSWERS</span><h2 id="faq-title">よくあるご質問</h2><p>ご相談の前に気になることを、まとめました。<br />知りたいことから、ひとつずつご覧ください。</p></div>
    <div className="faq-guide-layout"><aside className="faq-bot-guide"><div className="faq-bot-speech"><strong>気になること、<br />ボクと一緒に解決しよう！</strong><span>ご相談から制作、その先のことまで<br />わかりやすくご案内します。</span></div><BotMascot variant="mint" className="faq-guide-bot" /><a href="#contact">ほかの質問を相談する<ArrowRight size={17} /></a></aside>
      <div className="faq-guide-list">{faqs.map(([question, answer], index) => <article className={active === index ? "faq-guide-item is-open" : "faq-guide-item"} key={question}><h3><button type="button" id={`faq-question-${index}`} aria-expanded={active === index} aria-controls={`faq-answer-${index}`} onClick={() => setActive(active === index ? null : index)}><span className="faq-guide-q">Q</span><span>{question}</span><span className="faq-guide-toggle" aria-hidden="true">{active === index ? <Minus size={17} /> : <Plus size={17} />}</span></button></h3><div id={`faq-answer-${index}`} hidden={active !== index} role="region" aria-labelledby={`faq-question-${index}`}><span className="faq-guide-a" aria-hidden="true">A</span><p>{answer}</p></div></article>)}</div>
    </div>
  </section>;
}
