import { LogOut } from "lucide-react";
import { LanguageSwitcher, useSiteLanguage } from "./site-language";

const buttonClass = "inline-flex h-11 min-h-11 items-center justify-center gap-1.5 rounded-full border border-solid border-[#a2c4de59] bg-[#14283db3] px-3 py-0 font-heading text-[13px] font-semibold whitespace-nowrap text-[#c9e4f7] shadow-none transition-colors hover:border-[#c7e7fa] hover:bg-[#294a62] hover:text-[#edf7ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c7e7fa] motion-reduce:transition-none";

export function HeaderAccessActions() {
  const { text } = useSiteLanguage();
  return <div className="header-access-actions flex items-center gap-2">
    <LanguageSwitcher />
    <form action="/api/auth/logout" method="post" className="m-0 flex"><button type="submit" className={buttonClass}><LogOut size={15} aria-hidden="true" />{text("auth.logout")}</button></form>
  </div>;
}
