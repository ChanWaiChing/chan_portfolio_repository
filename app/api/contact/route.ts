import { createHash } from "node:crypto";

// Per-instance backstop. Configure an edge/WAF rate limit for a multi-instance deployment.
const attempts = new Map<string, { count: number; expires: number }>();
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return Response.json({ error: "Invalid origin" }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "JSON required" }, { status: 415 });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM) return Response.json({ error: "Email unavailable" }, { status: 503 });
  const raw = await request.text();
  if (raw.length > 12000) return Response.json({ error: "Request too large" }, { status: 413 });
  let data: Record<string, unknown>;
  try { data = JSON.parse(raw); if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error(); }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  const value = (key: string) => typeof data[key] === "string" ? (data[key] as string).trim() : "";
  const name = value("name"), email = value("email"), company = value("company"), topic = value("topic"), message = value("message"), requestId = value("requestId");
  if (value("website")) return Response.json({ error: "Invalid submission" }, { status: 400 });
  if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200 || company.length > 150 || !topic || topic.length > 200 || message.length < 10 || message.length > 3000 || !/^[a-f0-9-]{36}$/i.test(requestId) || /[\r\n]/.test(name + email + topic)) return Response.json({ error: "Invalid fields" }, { status: 400 });
  const now = Date.now();
  for (const [key, item] of attempts) if (item.expires < now) attempts.delete(key);
  const key = createHash("sha256").update(email.toLowerCase()).digest("hex");
  const attempt = attempts.get(key) || { count: 0, expires: now + 600000 };
  if (attempt.count >= 5 || attempts.size >= 10000) return Response.json({ error: "Please try again later" }, { status: 429 });
  attempt.count++; attempts.set(key, attempt);
  const text = `お名前：${name}\nメール：${email}\n会社・屋号：${company}\n相談内容：${topic}\n\n${message}`;
  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `contact-${requestId}` }, body: JSON.stringify({ from: process.env.CONTACT_FROM, to: ["cbnbc07@gmail.com"], reply_to: email, subject: `【ご相談】${topic}`, text }), signal: AbortSignal.timeout(10000) });
    if (!response.ok) return Response.json({ error: "Email unavailable" }, { status: 502 });
    return Response.json({ accepted: true });
  } catch { return Response.json({ error: "Email unavailable" }, { status: 502 }); }
}
