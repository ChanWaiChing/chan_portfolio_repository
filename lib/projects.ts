// Transcribed from the 15 portfolio entries in the user's uploaded Lancers screenshots.
// No project URLs, dates, prices or implementation technologies were supplied.
// thumbnail can be set to an original image path once that image file is available.
export type ProjectCategory =
  "CORPORATE" | "RECRUITMENT" | "HEALTHCARE" | "BRAND";
export type Project = {
  id: string;
  category: ProjectCategory;
  title: string;
  desc: string;
  name: string;
  tag: string;
  accent: "blue" | "teal" | "orange" | "pink" | "violet";
  thumbnail?: string;
};
export const projectCategories = [
  ["ALL", "すべて"],
  ["CORPORATE", "企業・サービス"],
  ["RECRUITMENT", "採用"],
  ["HEALTHCARE", "医療・薬局"],
  ["BRAND", "ブランド・LP"],
] as const;
export const projects: Project[] = [
  {
    id: "web-marketing",
    category: "CORPORATE",
    name: "WEB MARKETING",
    title: "Webマーケティング事業のサービス紹介サイト",
    desc: "Webマーケティング事業の集客を支えるサービス紹介サイトを制作しました。",
    tag: "サービスサイト",
    accent: "blue",
  },
  {
    id: "graduate-recruitment",
    category: "RECRUITMENT",
    name: "NEW GRADUATES",
    title: "企業理念と社員の声を伝える新卒採用サイト",
    desc: "企業理念・社員の声・選考情報を伝える新卒採用サイトを制作しました。",
    tag: "新卒採用サイト",
    accent: "teal",
  },
  {
    id: "creative-company",
    category: "CORPORATE",
    name: "CREATIVE COMPANY",
    title: "クリエイティブ事業・制作実績を紹介する企業サイト",
    desc: "多彩なクリエイティブ事業と制作実績を紹介する企業サイトを制作しました。",
    tag: "コーポレートサイト",
    accent: "orange",
  },
  {
    id: "dog-kindergarten",
    category: "BRAND",
    name: "DOG KINDERGARTEN",
    title: "犬の社会性と成長を支える幼稚園サイト",
    desc: "犬の社会性と成長を支える幼稚園サイトを制作しました。",
    tag: "サービスサイト",
    accent: "orange",
  },
  {
    id: "saiseikai-recruitment",
    category: "RECRUITMENT",
    name: "済生会川口総合病院",
    title: "済生会川口総合病院 総合採用サイト",
    desc: "済生会川口総合病院の総合採用サイトを制作しました。",
    tag: "病院採用サイト",
    accent: "teal",
  },
  {
    id: "layerx",
    category: "CORPORATE",
    name: "LayerX",
    title: "AI・Fintech・SaaS事業のコーポレートサイト",
    desc: "AI・Fintech・SaaS事業の魅力を伝えるコーポレートサイトを制作しました。",
    tag: "コーポレートサイト",
    accent: "violet",
  },
  {
    id: "konyo-management",
    category: "CORPORATE",
    name: "金葉マネジメント",
    title: "外国人向け住まい探し・生活支援の企業サイト",
    desc: "外国人向けの住まい探しと生活支援を紹介する企業サイトを制作しました。",
    tag: "不動産・生活支援",
    accent: "orange",
  },
  {
    id: "kojima-press",
    category: "CORPORATE",
    name: "小島プレス工業",
    title: "小島プレス工業 コーポレートサイト",
    desc: "小島プレス工業のコーポレートサイトを構築しました。",
    tag: "製造業コーポレート",
    accent: "blue",
  },
  {
    id: "branding-design",
    category: "BRAND",
    name: "BRANDING DESIGN",
    title: "ブランドの世界観を伝えるブランディングデザイン",
    desc: "ブランディングデザインを制作しました。",
    tag: "ブランディング",
    accent: "orange",
  },
  {
    id: "utena",
    category: "BRAND",
    name: "utena",
    title: "化粧品メーカー「ウテナ」公式サイト",
    desc: "化粧品メーカー「ウテナ」の公式サイトで、ブランド・商品情報を伝えるWeb制作を行いました。",
    tag: "化粧品・ブランドサイト",
    accent: "pink",
  },
  {
    id: "hotakubo-hospital",
    category: "HEALTHCARE",
    name: "保田窪整形外科病院",
    title: "安心感と診療情報の分かりやすさを重視した病院サイト",
    desc: "整形外科病院の公式サイトで、安心感と診療情報の分かりやすさを重視したWeb制作を行いました。",
    tag: "整形外科病院サイト",
    accent: "teal",
  },
  {
    id: "pharmacy",
    category: "HEALTHCARE",
    name: "HEALTHCARE PHARMACY",
    title: "健康相談・オンライン服薬指導に対応する薬局サイト",
    desc: "健康相談・オンライン服薬指導に対応する薬局サイトを制作しました。",
    tag: "薬局・ヘルスケア",
    accent: "pink",
  },
  {
    id: "tanica-amazake",
    category: "BRAND",
    name: "タニカのあまざけ",
    title: "タニカのあまざけ 商品紹介LP",
    desc: "「タニカのあまざけ」の商品紹介LP制作に携わりました。",
    tag: "食品・商品紹介LP",
    accent: "orange",
  },
  {
    id: "wacoal",
    category: "BRAND",
    name: "WACOAL",
    title: "ワコール公式Webサイトの構築・運用",
    desc: "ワコール公式Webサイトの構築・運用を行いました。",
    tag: "ブランドサイト・運用",
    accent: "pink",
  },
  {
    id: "creer-plus",
    category: "RECRUITMENT",
    name: "Creer+",
    title: "Creer+ 採用サイト制作サービスサイト",
    desc: "Creer+の採用サイト制作サービスサイトを制作しました。",
    tag: "採用サービスサイト",
    accent: "teal",
  },
];
