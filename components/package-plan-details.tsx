import type { ServicePackage } from "@/lib/service-packages";
import { useSiteLanguage } from "./site-language";

export function PackagePlanDetails({ item }: { item: ServicePackage }) {
  const { language } = useSiteLanguage();
  const isMenu = item.plans.length === 4;
  const copy = language === "ja" ? { menu: "制作メニュー", plans: "目的に合わせた三つのプラン", introMenu: "制作する内容とボリュームに応じてお見積もりします。", introPlans: "構築・支援範囲を確認し、正式なお見積もりをご案内します。", tax: "表示価格はすべて税別です。", excluded: "税別", monthly: "運用・保守費", estimate: "利用環境と支援範囲に応じて別途見積もり", conditions: "費用・納期について", revisions: "修正の回数、対象のページ・画面・機能数、素材の準備、検収の条件を見積もりに記載します。範囲外の追加や大幅な変更は、費用と納期を確認してから着手します。", external: "外部サービスの契約・実費と、保守の支援費は分けてご案内します。資料の月額目安だけで運用総額が決まることはありません。", fixed: "資料に固定の制作期間は記載されていません。ご希望の公開日と要件を確認し、正式な費用・納期は個別にご相談のうえ決定します。", request: "ご相談時にお聞かせください", requestText: "実現したいこと、現在のサイトやシステム、必要な機能、素材・データの有無、ご予算と希望納期をお知らせください。まだ決まっていない内容は、一緒に整理します。" }
    : language === "en" ? { menu: "Service menu", plans: "Three plans for different needs", introMenu: "We’ll estimate based on the scope and volume of work.", introPlans: "We’ll confirm the build and support scope before preparing a final estimate.", tax: "All prices shown exclude tax.", excluded: "excl. tax", monthly: "Maintenance and support", estimate: "Quoted separately based on the environment and support scope", conditions: "Costs and schedule", revisions: "The estimate will specify revision rounds, page, screen and feature counts, supplied materials, and acceptance criteria. Additional work or major changes begin after confirming any cost and schedule impact.", external: "Third-party subscriptions and direct costs are listed separately from maintenance support. The monthly reference price alone does not determine the total operating cost.", fixed: "No fixed delivery period is stated in the supplied materials. We’ll confirm your target launch date and requirements, then agree on a schedule and final estimate.", request: "What to tell us", requestText: "Please share your goals, current site or system, required features, available assets and data, budget, and desired schedule. We can work through undecided details together." }
      : language === "zh-CN" ? { menu: "制作菜单", plans: "按目标选择的三种方案", introMenu: "我们会根据制作内容与工作量提供报价。", introPlans: "确认构建与支持范围后，我们会提供正式报价。", tax: "所有标示价格均未含税。", excluded: "未含税", monthly: "运营与维护费用", estimate: "根据使用环境及支持范围另行报价", conditions: "费用与周期", revisions: "报价中会列明修改次数、页面/界面/功能数量、素材准备和验收条件。超出范围的追加工作或重大变更，将在确认费用与周期后开始。", external: "外部服务订阅与实际费用会和维护支持费用分开说明。月度参考价并不代表全部运营成本。", fixed: "资料未注明固定制作周期。确认期望上线日期与需求后，再协商确定正式费用与交付时间。", request: "咨询时请告诉我们", requestText: "请告知希望实现的目标、现有网站或系统、所需功能、素材与数据情况、预算及期望时间。尚未确定的内容也可以一起梳理。" }
        : { menu: "製作服務", plans: "配合目標選擇嘅三個方案", introMenu: "我哋會按製作內容同工作量提供報價。", introPlans: "確認建置及支援範圍後，我哋會提供正式報價。", tax: "所有標示價格均未連稅。", excluded: "未連稅", monthly: "營運及保養費用", estimate: "按使用環境及支援範圍另行報價", conditions: "費用及時間", revisions: "報價會列明修改次數、頁面/介面/功能數量、素材準備及驗收條件。超出範圍嘅追加工作或重大變更，會喺確認費用同時間後開始。", external: "外部服務訂閱及實際費用會同保養支援費分開說明。每月參考價並不代表全部營運成本。", fixed: "資料未有列明固定製作週期。確認期望推出日期同需求後，再協商正式費用同交付時間。", request: "查詢時請告訴我哋", requestText: "請告知想實現嘅目標、現有網站或系統、所需功能、素材及資料情況、預算同期望時間。未確定嘅內容都可以一齊整理。" };
  return <div className="package-plan-details">
    <h3>{isMenu ? copy.menu : copy.plans}</h3>
    <p className="package-plan-intro">{copy.tax}{isMenu ? copy.introMenu : copy.introPlans}</p>
    <div className="package-plan-grid" data-menu={isMenu}>{item.plans.map((plan, index) => <section className="package-plan" key={plan.name}>
      <h4>{plan.name}</h4>
      <p className="package-plan-amount">¥{plan.price.toLocaleString("ja-JP")}{plan.priceEnd ? <><span>〜</span>¥{plan.priceEnd.toLocaleString("ja-JP")}</> : plan.unit === "〜" ? "〜" : null}<small>{copy.excluded}{plan.unit && plan.unit !== "〜" ? `・${plan.unit}` : ""}</small></p>
      <p>{plan.scope}</p>
      {!isMenu && <p className="package-plan-monthly">{copy.monthly}<strong>{copy.estimate}</strong></p>}
    </section>)}</div>
    <div className="package-plan-conditions"><h3>{copy.conditions}</h3><p>{item.conditions}</p><p>{copy.revisions}</p>{!isMenu && <p>{copy.external}</p>}<p>{copy.fixed}</p></div>
    <div className="package-request-guide"><h3>{copy.request}</h3><p>{copy.requestText}</p></div>
  </div>;
}
