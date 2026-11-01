export const SESSION_COOKIE = "oho_site_session";
const SESSION_MS = 8 * 60 * 60 * 1000;
const encoder = new TextEncoder();
const hex = (bytes: ArrayBuffer | Uint8Array) => Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, "0")).join("");

export function accessConfigured() {
  return Boolean(process.env.SITE_LOGIN_ID && process.env.SITE_LOGIN_PASSWORD && process.env.SITE_SESSION_SECRET);
}
export function sameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const source = new URL(origin), target = new URL(request.url);
    return ["http:", "https:"].includes(source.protocol) && (source.origin === target.origin || source.host === request.headers.get("host"));
  } catch { return false; }
}
async function signingKey() {
  return crypto.subtle.importKey("raw", encoder.encode(`${process.env.SITE_SESSION_SECRET}:${process.env.SITE_LOGIN_ID}:${process.env.SITE_LOGIN_PASSWORD}`), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
export async function validCredentials(id: string, password: string) {
  if (!accessConfigured()) return false;
  const [actual, expected] = await Promise.all([`${id}\0${password}`, `${process.env.SITE_LOGIN_ID}\0${process.env.SITE_LOGIN_PASSWORD}`].map(value => crypto.subtle.digest("SHA-256", encoder.encode(value))));
  const a = new Uint8Array(actual), b = new Uint8Array(expected);
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a[i] ^ b[i];
  return difference === 0;
}
export async function createSession() {
  if (!accessConfigured()) throw new Error("Site access is not configured");
  const payload = `${Date.now() + SESSION_MS}.${hex(crypto.getRandomValues(new Uint8Array(16)))}`;
  return `${payload}.${hex(await crypto.subtle.sign("HMAC", await signingKey(), encoder.encode(payload)))}`;
}
export async function validSession(value?: string) {
  if (!accessConfigured() || !value || value.length > 130) return false;
  const parts = /^(\d{13})\.([a-f0-9]{32})\.([a-f0-9]{64})$/.exec(value);
  if (!parts || Number(parts[1]) <= Date.now() || Number(parts[1]) > Date.now() + SESSION_MS + 60000) return false;
  const signature = Uint8Array.from(parts[3].match(/../g)!, byte => parseInt(byte, 16));
  return crypto.subtle.verify("HMAC", await signingKey(), signature, encoder.encode(`${parts[1]}.${parts[2]}`));
}
export function requestSession(request: Request) {
  const value = request.headers.get("cookie")?.split(";").map(part => part.trim()).find(part => part.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1);
  return validSession(value);
}
export function sessionCookie(request: Request, value: string, clear = false) {
  const secure = new URL(request.url).protocol === "https:" || process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax${secure}${clear ? "; Max-Age=0" : ""}`;
}
