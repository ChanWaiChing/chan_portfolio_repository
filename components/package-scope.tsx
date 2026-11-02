import type { ServicePackage } from "@/lib/service-packages";
import { useSiteLanguage } from "./site-language";

export function PackageScope({ item }: { item: ServicePackage }) {
  const { language } = useSiteLanguage();
  const copy = language === "ja" ? { minimum: "最小価格の対象：ウェブバナー", included: "この価格に含む範囲", details: "修正・追加費用の条件", scope: "修正回数・作業量は見積もりで合意。追加制作・大幅な変更は別途相談。", design: "有料素材・印刷費などの実費は別途確認。", external: "外部サービスの利用料・公開後の保守費は別途確認。" }
    : language === "en" ? { minimum: "Minimum price applies to: web banner", included: "Included in this price", details: "Revisions and additional costs", scope: "Revision rounds and workload are agreed in the estimate. Additional work or major changes are quoted separately.", design: "Licensed assets, printing and other direct costs are confirmed separately.", external: "Third-party service fees and post-launch maintenance are confirmed separately." }
      : language === "zh-CN" ? { minimum: "最低价格适用范围：网页横幅", included: "此价格包含范围", details: "修改与追加费用条件", scope: "修改次数与工作量以报价为准。追加制作或重大变更需另行报价。", design: "付费素材、印刷等实际费用另行确认。", external: "外部服务费用及上线后维护费用另行确认。" }
        : { minimum: "最低價格適用範圍：網頁橫幅", included: "此價格包含範圍", details: "修改及追加費用條件", scope: "修改次數及工作量以報價為準。追加製作或重大變更需另行報價。", design: "付費素材、印刷等實際費用另行確認。", external: "外部服務費用及推出後保養費用另行確認。" };
  const entry=item.plans.length===4 ? item.plans.reduce((lowest, plan) => plan.price < lowest.price ? plan : lowest, item.plans[0]) : item.plans[0];
  return <div className="package-entry-scope" lang={language}><span>{item.plans.length===4 ? copy.minimum : copy.included}</span><p>{entry.scope}</p><details><summary>{copy.details}</summary><small>{copy.scope}</small><small>{item.category==="デザイン" ? copy.design : copy.external}</small></details></div>;
}
