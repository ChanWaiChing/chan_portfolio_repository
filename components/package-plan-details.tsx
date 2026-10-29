import type { ServicePackage } from "@/lib/service-packages";

export function PackagePlanDetails({ item }: { item: ServicePackage }) {
  const isMenu = item.plans.length === 4;
  return <div className="package-plan-details">
    <h3>{isMenu ? "制作メニュー" : "目的に合わせた三つのプラン"}</h3>
    <p className="package-plan-intro">表示価格はすべて税別です。{isMenu ? "制作する内容とボリュームに応じてお見積もりします。" : "構築・支援範囲を確認し、正式なお見積もりをご案内します。"}</p>
    <div className="package-plan-grid" data-menu={isMenu}>{item.plans.map((plan, index) => <section className="package-plan" key={plan.name}>
      <h4>{plan.name}</h4>
      <p className="package-plan-amount">¥{plan.price.toLocaleString("ja-JP")}{plan.priceEnd ? <><span>〜</span>¥{plan.priceEnd.toLocaleString("ja-JP")}</> : plan.unit === "〜" ? "〜" : null}<small>税別{plan.unit && plan.unit !== "〜" ? `・${plan.unit}` : ""}</small></p>
      <p>{plan.scope}</p>
      {!isMenu && <p className="package-plan-monthly">運用・保守費<strong>利用環境と支援範囲に応じて別途見積もり</strong></p>}
    </section>)}</div>
    <div className="package-plan-conditions"><h3>費用・納期について</h3><p>{item.conditions}</p><p>修正の回数、対象のページ・画面・機能数、素材の準備、検収の条件を見積もりに記載します。範囲外の追加や大幅な変更は、費用と納期を確認してから着手します。</p>{!isMenu && <p>外部サービスの契約・実費と、保守の支援費は分けてご案内します。資料の月額目安だけで運用総額が決まることはありません。</p>}<p>資料に固定の制作期間は記載されていません。ご希望の公開日と要件を確認し、正式な費用・納期は個別にご相談のうえ決定します。</p></div>
    <div className="package-request-guide"><h3>ご相談時にお聞かせください</h3><p>実現したいこと、現在のサイトやシステム、必要な機能、素材・データの有無、ご予算と希望納期をお知らせください。まだ決まっていない内容は、一緒に整理します。</p></div>
  </div>;
}
