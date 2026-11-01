"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { BrandWordmark } from "./brand-wordmark";

export function SiteLogin() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true); setError("");
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: data.get("id"), password: data.get("password") }) });
      const result = await response.json();
      if (!response.ok) { setError(result.error || "ログインできませんでした。もう一度お試しください"); setPending(false); return; }
      if (window.location.pathname === "/login") window.location.replace("/");
      else window.location.reload();
    } catch { setError("接続を確認して、もう一度お試しください"); setPending(false); }
  }
  return <main id="site-login" className="relative z-10 grid min-h-svh place-items-center px-5 py-12 text-[#e4f1ff]">
    <section className="w-full max-w-[440px] rounded-3xl border border-solid border-[#a3cbe440] bg-[linear-gradient(145deg,#213b52ed,#0e1b32f5)] p-8 shadow-[0_28px_80px_#02081699,inset_0_1px_0_#ffffff12] max-[480px]:p-6" aria-labelledby="login-title">
      <div className="mb-8 flex justify-center"><BrandWordmark href="#site-login" /></div>
      <div className="mb-7 text-center"><span className="mx-auto mb-4 grid size-11 place-items-center rounded-full border border-solid border-[#a3cbe440] bg-[#a8daff0c] text-[#b9e3ff]" aria-hidden="true"><LockKeyhole size={20} /></span><h1 id="login-title" className="m-0 font-heading text-2xl font-bold text-[#edf6ff]">ログイン</h1><p className="mt-3 text-sm leading-[1.9] text-[#b9cde0]">IDとパスワードを入力してください</p></div>
      <form onSubmit={submit} className="grid gap-5">
        <label className="grid gap-2 font-heading text-sm font-semibold text-[#d6e6f5]">ログインID<input name="id" autoComplete="username" autoCapitalize="none" spellCheck={false} required maxLength={100} aria-describedby={error ? "login-error" : undefined} className="min-h-12 w-full rounded-xl border border-solid border-[#8eb9d44d] bg-[#0b182cb3] px-4 font-heading text-base font-normal text-[#edf6ff] outline-none focus:border-[#b9e3ff] focus:ring-2 focus:ring-[#b9e3ff33]" /></label>
        <label className="grid gap-2 font-heading text-sm font-semibold text-[#d6e6f5]">パスワード<span className="relative block"><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required maxLength={256} aria-describedby={error ? "login-error" : undefined} className="min-h-12 w-full rounded-xl border border-solid border-[#8eb9d44d] bg-[#0b182cb3] pr-12 pl-4 font-heading text-base font-normal text-[#edf6ff] outline-none focus:border-[#b9e3ff] focus:ring-2 focus:ring-[#b9e3ff33]" /><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示する"} className="absolute inset-y-0 right-0 grid w-12 place-items-center border-0 bg-transparent text-[#b9d8ed] shadow-none">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
        {error && <p id="login-error" role="alert" className="m-0 text-sm leading-relaxed text-[#ffd0ce]">{error}</p>}
        <button disabled={pending} type="submit" className="mt-1 flex min-h-12 items-center justify-center gap-3 rounded-full border border-solid border-[#93c9ff] bg-[linear-gradient(115deg,#1766ba,#304bb8)] px-5 font-heading text-base font-bold text-white shadow-[0_4px_0_#0c2d70] transition-colors hover:brightness-110 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9e3ff] motion-reduce:transition-none">{pending ? "ログイン中…" : "サイトを見る"}<ArrowRight size={18} /></button>
      </form>
    </section>
  </main>;
}
