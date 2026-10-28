import type { Metadata } from "next";
import "./globals.css";
import "./component-theme.css";
import "./brand-theme.css";
import "./catalog.css";
import "./modern-cards.css";
import "./hero-scenes.css";
import "./workflow-footer.css";
import "./brother-introductions.css";
import "./contact-layout.css";

export const metadata: Metadata = {
  title: "大穂兄弟 | BROTHERS — 兄弟の力で、アイデアをカタチに。",
  description:
    "ITコンサルタント・フルスタックエンジニアの兄と、デザイナーの弟。企画からデザイン、開発、運用まで。兄弟のチームワークで、あなたのアイデアをカタチにします。",
  robots: { index: true, follow: true },
  openGraph: {
    title: "大穂兄弟 | BROTHERS — 兄弟の力で、アイデアをカタチに。",
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
      <body>{children}</body>
    </html>
  );
}
