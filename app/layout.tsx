import type { Metadata } from "next";
import "./site.css";
import "./bot-palette.css";
import "./bold-blue.css";
import { SiteMotion } from "@/components/site-motion";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"),
  twitter: { card: "summary_large_image" },
  title: "大穂兄弟 | デザインと開発を、ひとつのチームで。",
  description:
    "中小企業・小さなチームのウェブサイトと業務システムを、企画・デザイン・開発から公開後の改善まで。事業分析とグローバルな視点を大切にする、大穂兄弟の制作ポートフォリオ。プロフィールと操作できる自主制作デモ、制作の進め方をご紹介します。",
  robots: { index: true, follow: true },
  openGraph: {
    title: "大穂兄弟 | デザインと開発を、ひとつのチームで。",
    description:
      "デザインとテクノロジー、事業分析とグローバルな視点で、次の一歩へ。",
    locale: "ja_JP",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head><link rel="preload" href="/fonts/shippori-mincho-headings.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /><link rel="preload" href="/fonts/yuji-boku-brand.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /></head>
      <body>{children}<SiteMotion /></body>
    </html>
  );
}
