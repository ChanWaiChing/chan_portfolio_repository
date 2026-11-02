import type { PortfolioProject } from "@/lib/projects";
import { useSiteLanguage } from "./site-language";
import { TechnologyTags } from "./technology-tags";

/** Owner-requested estimates stay separate from documented project information. */
export function ProjectStack({ item, compact = false }: { item: PortfolioProject; compact?: boolean }) {
  const { language } = useSiteLanguage();
  const labels = {
    ja: { tools: "技術・サービス", languages: "プログラミング言語", frameworks: "フレームワーク・ライブラリ", missing: "提供資料に記載なし", suggested: "想定技術スタック（未確認）", documented: "提供資料に記載された技術・分野" },
    en: { tools: "Technologies & services", languages: "Programming languages", frameworks: "Frameworks & libraries", missing: "Not specified in supplied notes", suggested: "Suggested stack (unverified)", documented: "Documented technologies & areas" },
    "zh-CN": { tools: "技术与服务", languages: "编程语言", frameworks: "框架与库", missing: "提供的资料中未注明", suggested: "建议技术栈（未经确认）", documented: "资料中注明的技术与领域" },
    "zh-HK": { tools: "技術及服務", languages: "程式語言", frameworks: "框架及程式庫", missing: "提供嘅資料未有註明", suggested: "建議技術組合（未經確認）", documented: "資料中列明嘅技術及範疇" },
  }[language];
  const suggested = item.suggestedStack;
  const summary = [...new Set(suggested
    ? [...suggested.languages, ...suggested.frameworks, ...suggested.technologies]
    : [...item.technologies, ...(item.programmingLanguages || []), ...(item.frameworks || [])])];
  const groups = [
    { title: labels.tools, values: suggested?.technologies || item.technologies },
    { title: labels.languages, values: suggested?.languages || item.programmingLanguages || [] },
    { title: labels.frameworks, values: suggested?.frameworks || item.frameworks || [] },
  ];
  if (compact) return <div className="project-stack-compact text-left">
    {suggested && <span data-stack-status="suggested" className="mb-2 block font-heading text-[11px] leading-normal font-medium text-[#e4dbff]">{labels.suggested}</span>}
    <TechnologyTags technologies={summary} label={labels.tools} compact />
  </div>;
  return <div className="project-stack" data-project-stack={item.id}>
    {suggested && <><TechnologyTags technologies={item.technologies} label={labels.documented} emptyLabel={labels.missing} /><p data-stack-status="suggested" className="!mb-4 rounded-lg border border-solid border-[#b4a9e1] bg-[#f0ecff] px-3 py-2 !font-heading !text-sm !font-semibold text-[#51427c]">{labels.suggested}</p></>}
    {groups.map(group => <TechnologyTags key={group.title} technologies={group.values} label={group.title} emptyLabel={labels.missing} />)}
  </div>;
}
