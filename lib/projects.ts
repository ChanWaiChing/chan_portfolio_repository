/** Projects supplied by the site owner. No unprovided role, outcome, or stack is inferred. */
export const portfolioCategories = ["すべて", "ウェブサイト", "ランディングページ", "ウェブアプリ"] as const;
export type PortfolioProject = { id: string; title: string; description: string; url: string; category: string; thumbnail: string; technologies: string[] };
export const portfolioItems: PortfolioProject[] = [
  {
    "id": "work-01",
    "title": "タイガージム 横浜店",
    "description": "パーソナルジムの施設・料金・トレーナーを紹介するウェブサイト。",
    "url": "https://tigergym-yokohama.com",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/work-01.webp",
    "technologies": []
  },
  {
    "id": "work-02",
    "title": "埼玉県済生会川口総合病院",
    "description": "診療科や受診案内、アクセスなどを案内する病院のウェブサイト。",
    "url": "https://www.saiseikai.gr.jp",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/work-02.webp",
    "technologies": []
  },
  {
    "id": "work-03",
    "title": "ワコール",
    "description": "商品・ブランド・店舗の情報を案内するウェブサイト。",
    "url": "https://www.wacoal.jp",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/work-03.webp",
    "technologies": []
  },
  {
    "id": "work-04",
    "title": "フランフラン",
    "description": "家具やインテリア雑貨を紹介するオンラインストア。",
    "url": "https://francfranc.com",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/work-04.webp",
    "technologies": []
  },
  {
    "id": "work-05",
    "title": "リューユ",
    "description": "ドレスやファッションアイテムを紹介する通販サイト。",
    "url": "https://www.ryuyu.net",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/work-05.webp",
    "technologies": []
  },
  {
    "id": "work-06",
    "title": "ハナヤプロジェクト",
    "description": "企業情報と採用情報を紹介するウェブサイト。",
    "url": "https://hanaya-project.co.jp",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/work-06.webp",
    "technologies": []
  },
  {
    "id": "work-07",
    "title": "タニカのあまざけ",
    "description": "商品の特徴や楽しみ方を伝える甘酒の紹介ページ。",
    "url": "https://tanica.jp/amazake/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/work-07.webp",
    "technologies": []
  },
  {
    "id": "work-08",
    "title": "モグ 雲にのる夢枕",
    "description": "枕の特徴や使い心地を紹介する商品ページ。",
    "url": "https://mogus.jp/products/kumo/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/work-08.webp",
    "technologies": []
  },
  {
    "id": "work-09",
    "title": "ユーム",
    "description": "業務自動化サービスの特徴や活用方法を紹介するページ。",
    "url": "https://lp.yoom.fun/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/work-09.webp",
    "technologies": []
  },
  {
    "id": "work-10",
    "title": "ファンケル スキンパッチ",
    "description": "肌の測定・カウンセリングサービスを紹介するページ。",
    "url": "https://www.fancl.co.jp/skinpatch/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/work-10.webp",
    "technologies": []
  },
  {
    "id": "work-11",
    "title": "シフトラ",
    "description": "シフト作成・管理サービスの特徴を紹介するページ。",
    "url": "https://aishift.com/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/work-11.webp",
    "technologies": []
  },
  {
    "id": "work-12",
    "title": "ききょうがおか",
    "description": "整体・整骨院の施術や施設を紹介するページ。",
    "url": "https://kikyougaoka.com/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/work-12.webp",
    "technologies": []
  },
  {
    "id": "work-13",
    "title": "みかげ小児歯科・矯正歯科クリニック",
    "description": "小児矯正の相談について案内するページ。",
    "url": "https://www.mikage-dc.com/pediatric_lp",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/work-13.webp",
    "technologies": []
  },
  {
    "id": "work-14",
    "title": "きれい総合研究所",
    "description": "サービス紹介ページのプレビュー。",
    "url": "https://remmier-test.com/preview/lp/kirei",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/work-14.webp",
    "technologies": []
  },
  {
    "id": "work-15",
    "title": "任天堂",
    "description": "ゲームや製品に関する情報を紹介するページ。",
    "url": "https://www.nintendo.com/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/work-15.webp",
    "technologies": []
  },
  {
    "id": "work-16",
    "title": "パウパーク",
    "description": "犬の幼稚園のサービスや施設を紹介するウェブサイト。",
    "url": "https://pawpark.jp/",
    "category": "ウェブアプリ",
    "thumbnail": "/images/portfolio/work-16.webp",
    "technologies": [
      "ビュー",
      "ナクスト",
      "ノード",
      "ファイアベース"
    ]
  },
  {
    "id": "work-17",
    "title": "ねこねこ薬局",
    "description": "薬局の取り組みやサービス、店舗を紹介するウェブサイト。",
    "url": "https://nekoneko-pharmacy.com/",
    "category": "ウェブアプリ",
    "thumbnail": "/images/portfolio/work-17.webp",
    "technologies": [
      "ビュー",
      "ナクスト",
      "ノード",
      "ファイアベース",
      "ジーサップ"
    ]
  },
  {
    "id": "work-18",
    "title": "フィオラボ",
    "description": "ヘアケア・スキンケア製品を紹介する企業サイト。",
    "url": "https://fiolab-corp.jp/",
    "category": "ウェブアプリ",
    "thumbnail": "/images/portfolio/work-18.webp",
    "technologies": [
      "ビュー",
      "ナクスト",
      "ノード",
      "ファイアベース"
    ]
  }
];
