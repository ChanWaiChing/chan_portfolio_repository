const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function route({ configured = true, providerOK = true } = {}) {
  const calls = [];
  const context = { exports: {}, require, URL, Request, Response, AbortSignal, Date, Map, process: { env: configured ? { RESEND_API_KEY: 'test-key', CONTACT_FROM: 'Website <contact@example.com>' } : {} }, fetch: async (...args) => { calls.push(args); return Response.json({ id: 'mock-only' }, { status: providerOK ? 200 : 503 }); } };
  const code = ts.transpileModule(fs.readFileSync('app/api/contact/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, context);
  return { post: context.exports.POST, calls };
}
const valid = { name: 'Test User', email: 'visitor@example.com', company: 'Example', topic: 'Website', message: 'Please help us plan a new website.', website: '', requestId: 'c649f05e-287c-4981-b550-07fcc427907f' };
function request(data = valid, origin = 'https://portfolio.example') {
  return new Request('https://portfolio.example/api/contact', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(data) });
}

test('contact accepts valid requests with fixed recipient, reply-to and stable idempotency key', async () => {
  const { post, calls } = route();
  assert.equal((await post(request())).status, 200);
  const [url, options] = calls[0];
  assert.equal(url, 'https://api.resend.com/emails');
  const body = JSON.parse(options.body);
  assert.deepEqual(body.to, ['cbnbc07@gmail.com']);
  assert.equal(body.reply_to, valid.email);
  assert.equal(options.headers['Idempotency-Key'], `contact-${valid.requestId}`);
  assert.ok(body.text.includes(valid.message));
});
test('contact rejects cross-origin requests and honeypot submissions without contacting provider', async () => {
  const { post, calls } = route();
  assert.equal((await post(request(valid, 'https://other.example'))).status, 403);
  assert.equal((await post(request({ ...valid, website: 'spam' }))).status, 400);
  assert.equal(calls.length, 0);
});
test('contact validates field types, email, header injection and message length', async () => {
  const { post, calls } = route();
  for (const data of [{ ...valid, name: [] }, { ...valid, email: 'invalid' }, { ...valid, name: 'Test\nBcc: another@example.com' }, { ...valid, message: 'short' }, { ...valid, message: 'x'.repeat(3001) }]) assert.equal((await post(request(data))).status, 400);
  assert.equal(calls.length, 0);
});
test('contact never reports success when credentials are missing or provider fails', async () => {
  const missing = route({ configured: false });
  assert.equal((await missing.post(request())).status, 503);
  assert.equal(missing.calls.length, 0);
  const failed = route({ providerOK: false });
  assert.equal((await failed.post(request())).status, 502);
});
test('contact rate limits repeated submissions', async () => {
  const { post, calls } = route();
  for (let index = 0; index < 5; index++) assert.equal((await post(request())).status, 200);
  assert.equal((await post(request())).status, 429);
  assert.equal(calls.length, 5);
});
