import { sessionCookie, sameOriginRequest } from "@/lib/site-access.server";
export async function POST(request: Request) {
  if (!sameOriginRequest(request)) return new Response(null, { status: 403 });
  return new Response(null, { status: 303, headers: { Location: "/", "Cache-Control": "no-store", "Set-Cookie": sessionCookie(request, "", true) } });
}
