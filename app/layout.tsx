import type { Metadata } from "next";
import "./site.css";
import "./bot-palette.css";
import { SiteMotion } from "@/components/site-motion";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"),
  twitter: { card: "summary_large_image" },
  title: "大穂兄弟 | デザインと開発を、ひとつのチームで。",
  description:
    "中小企業・小さなチームのウェブサイトと業務システムを、企画・デザイン・開発から公開後の改善まで。技術を担当する兄と、デザインを担当する弟の制作チーム、大穂兄弟。操作できる自主制作デモと制作の進め方をご紹介します。",
  robots: { index: true, follow: true },
  openGraph: {
    title: "大穂兄弟 | デザインと開発を、ひとつのチームで。",
    description:
      "考える兄と、描く弟。デザインとテクノロジーで、事業の次の一歩を。",
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
