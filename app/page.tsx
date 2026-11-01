import Portfolio from "@/components/portfolio";
import { SiteLogin } from "@/components/site-login";
import { cookies } from "next/headers";
import { SESSION_COOKIE, validSession } from "@/lib/site-access.server";
export const dynamic = "force-dynamic";
export default async function Home() {
  if (!await validSession((await cookies()).get(SESSION_COOKIE)?.value)) return <SiteLogin />;
  return <Portfolio directSend={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM)} />;
}
