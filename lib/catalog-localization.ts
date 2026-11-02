import translations from "./catalog-translations.json";
import projectTranslations from "./global-project-copy.json";
import cardTranslations from "./project-card-copy.json";
import { localizeProjectPeriod } from "./project-period";
import type { SiteLanguage } from "@/components/site-language";
import type { PortfolioProject } from "./projects";
import type { ServicePackage } from "./service-packages";

const copy: Record<string, Partial<Record<SiteLanguage, string>>> = translations;
const projectCopy: Record<string, Partial<Record<SiteLanguage, Pick<PortfolioProject, "description" | "scope">>>> = projectTranslations;
const cardCopy: Record<string, Partial<Record<SiteLanguage, Partial<Pick<PortfolioProject, "title" | "shortTitle" | "description">>>>> = cardTranslations;

/** Only editorial copy is translated. IDs, URLs, prices, source files and filter keys stay stable. */
export function translateContent(value: string, language: SiteLanguage): string {
  return copy[value]?.[language] || value;
}

export function localizeProject(item: PortfolioProject, language: SiteLanguage): PortfolioProject {
  const t = (value: string) => translateContent(value, language);
  const localizedCopy = projectCopy[item.id]?.[language];
  const localizedCard = cardCopy[item.id]?.[language];
  return {
    ...item,
    title: localizedCard?.title || t(item.title),
    shortTitle: localizedCard?.shortTitle || (item.shortTitle ? t(item.shortTitle) : undefined),
    description: localizedCopy?.description || localizedCard?.description || t(item.description),
    scope: localizedCopy?.scope || t(item.scope),
    period: localizeProjectPeriod(t(item.period), language),
    periodLabel: item.periodLabel ? t(item.periodLabel) : undefined,
    thumbnailAlt: item.thumbnailAlt ? t(item.thumbnailAlt) : undefined,
    skills: item.skills,
    highlights: item.highlights?.map(value => ({ title: t(value.title), text: t(value.text) })),
  };
}

export function localizePackage(item: ServicePackage, language: SiteLanguage): ServicePackage {
  const t = (value: string) => translateContent(value, language);
  return {
    ...item, title: t(item.title), description: t(item.description), duration: t(item.duration),
    conditions: t(item.conditions), deliverables: item.deliverables.map(t),
    plans: item.plans.map(plan => ({ ...plan, name: t(plan.name), scope: t(plan.scope), unit: plan.unit ? t(plan.unit) : undefined })),
  };
}
