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
      {!isMenu && <p className="package-plan-monthly">資料記載の運用月額目安<strong>{["零円〜数千円程度", "数千円〜一万円程度", "用途・環境に応じて設計"][index]}</strong></p>}
    </section>)}</div>
    <div className="package-plan-conditions"><h3>費用・納期について</h3><p>{item.conditions}</p>{!isMenu && <p>月額の目安は外部サービスの利用料や保守条件によって変動します。必要な契約・実費・支援費の内訳は、お見積もり時に確認します。</p>}<p>資料に固定の制作期間は記載されていません。ご希望の公開日と要件を確認し、正式な費用・納期は個別にご相談のうえ決定します。</p></div>
    <div className="package-request-guide"><h3>ご相談時にお聞かせください</h3><p>実現したいこと、現在のサイトやシステム、必要な機能、素材・データの有無、ご予算と希望納期をお知らせください。まだ決まっていない内容は、一緒に整理します。</p></div>
  </div>;
}
