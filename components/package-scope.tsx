import type { ServicePackage } from "@/lib/service-packages";

export function PackageScope({ item }: { item: ServicePackage }) {
  const entry=item.plans.length===4 ? item.plans.find(p=>p.name==="ウェブバナー制作")! : item.plans[0];
  return <div className="package-entry-scope"><span>{item.plans.length===4 ? "最小価格の対象：ウェブバナー" : "この価格に含む範囲"}</span><p>{entry.scope}</p><details><summary>修正・追加費用の条件</summary><small>修正回数・作業量は見積もりで合意。追加制作・大幅な変更は別途相談。</small><small>{item.category==="デザイン" ? "有料素材・印刷費などの実費は別途確認。" : "外部サービスの利用料・公開後の保守費は別途確認。"}</small></details></div>;
}
