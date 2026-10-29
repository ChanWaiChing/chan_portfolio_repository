const names=new Set(["contact_intent","contact_started","contact_draft_ready","contact_mail_open","contact_provider_accepted","contact_failed","portfolio_open","concept_open","package_open","service_browse"]);
const categories=new Set(["すべて","ウェブ制作","デザイン","システム開発","人工知能・業務改善","コンサルティング"]);
// Bounded per-instance volume guard; no IPs, user agents, form fields or cookies are collected.
let windowStart=0, count=0;
export async function POST(request:Request) {
  if(request.headers.get("origin")!==new URL(request.url).origin) return new Response(null,{status:403});
  if(!request.headers.get("content-type")?.includes("application/json")) return new Response(null,{status:415});
  const raw=await request.text();
  if(raw.length>400) return new Response(null,{status:413});
  let event: Record<string,unknown>;
  try {event=JSON.parse(raw);if(!event||typeof event!=="object"||Array.isArray(event))throw Error();} catch{return new Response(null,{status:400});}
  if(Object.keys(event).some(key=>!["name","id"].includes(key))||typeof event.name!=="string"||!names.has(event.name))return new Response(null,{status:400});
  if(event.id!==undefined&&(typeof event.id!=="string"||!(categories.has(event.id)||/^(package|work)-(0[1-9]|[12][0-9]|30)$/.test(event.id))))return new Response(null,{status:400});
  const now=Date.now();if(now-windowStart>60000){windowStart=now;count=0;}if(++count>600)return new Response(null,{status:429});
  console.info(JSON.stringify({type:"site_interaction",day:new Date(now).toISOString().slice(0,10),name:event.name,...(event.id?{id:event.id}:{})}));
  return new Response(null,{status:204});
}
