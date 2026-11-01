import { accessConfigured, createSession, sessionCookie, validCredentials, sameOriginRequest } from "@/lib/site-access.server";

const attempts = new Map<string, { count: number; until: number }>();
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!sameOriginRequest(request)) return Response.json({ error: "この画面からログインしてください" }, { status: 403, headers });
  if (!accessConfigured()) return Response.json({ error: "現在ログインの準備中です。しばらくしてからお試しください" }, { status: 503, headers });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "入力内容を確認してください" }, { status: 415, headers });
  const now = Date.now();
  for (const [key, attempt] of attempts) if (attempt.until <= now) attempts.delete(key);
  const source = request.headers.get("cf-connecting-ip") || "local";
  const attempt = attempts.get(source) || { count: 0, until: now + 60000 };
  if (attempt.count >= 10 || attempts.size >= 10000) return Response.json({ error: "しばらく待ってから、もう一度お試しください" }, { status: 429, headers });
  attempt.count++; attempts.set(source, attempt);
  let id: string, password: string;
  try {
    const raw = await request.text();
    if (raw.length > 2048) throw new Error();
    const data = JSON.parse(raw);
    if (typeof data.id !== "string" || typeof data.password !== "string" || data.id.length > 100 || data.password.length > 256) throw new Error();
    id = data.id.trim(); password = data.password;
  } catch { return Response.json({ error: "入力内容を確認してください" }, { status: 400, headers }); }
  if (!await validCredentials(id, password)) return Response.json({ error: "IDまたはパスワードが正しくありません" }, { status: 401, headers });
  attempts.delete(source);
  return Response.json({ ok: true }, { headers: { ...headers, "Set-Cookie": sessionCookie(request, await createSession()) } });
}
