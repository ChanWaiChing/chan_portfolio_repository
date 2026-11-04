import type { PortfolioField } from "./portfolio-fields";
/** Project descriptions, dates, responsibilities and stacks supplied by the site owner. */
export const portfolioCategories = ["すべて", "ウェブサイト", "ECサイト", "ランディングページ", "システム開発"] as const;
export type PortfolioMarket = "japan" | "global";
export type PortfolioProject = {
  id: string; title: string; description: string; url?: string; category: string;
  thumbnail?: string; technologies: string[]; period: string; scope: string; field: PortfolioField;
  preview?: boolean; market: PortfolioMarket; shortTitle?: string; skills?: string[]; periodLabel?: string; thumbnailAlt?: string; confidential?: boolean; highlights?: { title: string; text: string }[];
  programmingLanguages?: string[]; frameworks?: string[];
  suggestedStack?: { technologies: string[]; languages: string[]; frameworks: string[] };
  thumbnailKind?: "concept" | "representative";
  gallery?: { src: string; alt: string }[];
  copyStatus?: "draft";
  thumbnailScale?: number;
  thumbnailOrigin?: string;
};
export const portfolioItems: PortfolioProject[] = [
  {
    "id": "hankyu-hanshin",
    "title": "阪急阪神ホールディングス",
    "url": "https://www.hankyu-hanshin.co.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/hankyu-hanshin.webp",
    "period": "リニューアル：2025年10月〜2026年3月",
    "description": "阪急阪神ホールディングスグループの公式ポータルサイトです。交通、不動産、エンタテインメントなど多岐にわたる事業情報や、株主・投資家向けのIR情報を網羅しています。",
    "scope": "CMSを使用し、グループポータルサイトのリニューアルおよび情報アーキテクチャの再構築を担当しました。",
    "technologies": [
      "CMS"
    ],
    "market": "japan",
    "field": "corporate"
  },
  {
    "id": "tiger-gym",
    "title": "タイガージム",
    "url": "https://tigergym-yokohama.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/tiger-gym.webp",
    "period": "リニューアル：2025年11月〜2025年12月",
    "description": "横浜エリアにあるフィットネス＆トレーニングジム「タイガージム」の公式サイトです。ジムのコンセプト、トレーナー紹介、設備環境などをわかりやすく発信しています。",
    "scope": "WordPressを使用し、ジム公式サイトの構築および問い合わせ・予約フォームの実装を担当しました。",
    "technologies": [
      "WordPress"
    ],
    "market": "japan",
    "field": "fitness"
  },
  {
    "id": "momo-pilates",
    "title": "MOMO",
    "url": "https://momo-pilates.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/momo-pilates.webp",
    "period": "新規制作：2025年6月〜2025年8月",
    "description": "東京都麻布十番にある女性専用パーソナルマシンピラティススタジオ「MOMO」の公式Webサイトです。モダンな技術構成により、洗練されたデザインと快適な操作性を両立したプラットフォームです。",
    "scope": "React, Next.js, Node.jsを使用し、フロントエンド全般の実装、予約システム連携、およびVercelへのデプロイ・パフォーマンス最適化を担当しました。",
    "technologies": [
      "React",
      "Next.js",
      "Node.js",
      "Vercel"
    ],
    "market": "japan",
    "field": "fitness"
  },
  {
    "id": "wacoal",
    "title": "ワコール",
    "url": "https://www.wacoal.jp",
    "category": "ECサイト",
    "thumbnail": "/images/portfolio/wacoal.webp",
    "period": "リニューアル：2025年1月〜2025年12月",
    "description": "大手インナーウェアメーカー「ワコール」の公式オンラインストアおよびブランドサイトです。豊富なラインナップの中から自分に合った下着やルームウェアを快適に選べる設計になっています。",
    "scope": "大規模ECプラットフォームを使用し、オンラインストアの大規模改修およびフロントエンドUIの改善を担当しました。",
    "technologies": [
      "大規模ECプラットフォーム"
    ],
    "market": "japan",
    "field": "fashion"
  },
  {
    "id": "ryuyu",
    "title": "Ryuyu",
    "url": "https://www.ryuyu.net/",
    "category": "ECサイト",
    "thumbnail": "/images/portfolio/ryuyu.webp",
    "period": "リニューアル：2025年5月〜2025年7月",
    "description": "ドレスやスーツなどのレディースファッションを中心に扱うEC通販サイト「Ryuyu」です。華やかでトレンド感のある商品を多角的な写真と分かりやすいカテゴリ分類で展開しています。",
    "scope": "ECプラットフォームを使用し、通販サイトのリニューアルおよび商品検索・決済まわりの実装を担当しました。",
    "technologies": [
      "ECプラットフォーム"
    ],
    "market": "japan",
    "field": "fashion"
  },
  {
    "id": "fits-store",
    "title": "FITS you. STORE",
    "url": "https://store.fits-japan.com/shop/",
    "category": "ECサイト",
    "thumbnail": "/images/portfolio/fits-store.webp",
    "period": "リニューアル：2025年2月〜2025年5月",
    "description": "フィッツコーポレーションが運営する公式オンラインショップです。人気の香水やボディケア商品を扱い、最新のフロントエンド技術（Astro）とECフォースの組み合わせによりスムーズな買い物体験を提供しています。",
    "scope": "EC-force、Astroを使用し、モダン技術を用いたECサイトのフロントエンド構築およびカート・購買導線の実装を担当しました。",
    "technologies": [
      "EC-force",
      "Astro"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "chiikawa-market",
    "title": "ちいかわマーケット",
    "url": "https://chiikawamarket.jp/",
    "category": "ECサイト",
    "thumbnail": "/images/portfolio/chiikawa-market.webp",
    "period": "リニューアル：2025年5月〜2025年7月",
    "description": "大人気キャラクター「ちいかわ」の公式グッズ通販サイト「ちいかわマーケット」です。Shopifyを基盤とし、新商品発売時の高アクセスにも耐えられる強固なショップ構造になっています。",
    "scope": "Shopifyを使用し、Shopifyを用いたECサイト構築、デザインカスタマイズ、SEO、および購入フローの最適化を担当しました。",
    "technologies": [
      "Shopify"
    ],
    "market": "japan",
    "field": "lifestyle"
  },
  {
    "id": "saiseikai",
    "title": "済生会",
    "url": "https://www.saiseikai.gr.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/saiseikai.webp",
    "period": "リニューアル：2025年4月〜2025年10月",
    "description": "全国規模で医療・社会福祉事業を展開する済生会グループの公式ポータルサイトです。患者様や地域住民に向けて、医療機関の案内や健康情報、組織の取り組みを広く発信しています。",
    "scope": "WordPressを使用し、病院ポータルサイトの全体設計、テーマカスタマイズ、およびコンテンツ移行を担当しました。",
    "technologies": [
      "WordPress"
    ],
    "market": "japan",
    "field": "healthcare"
  },
  {
    "id": "webmarks",
    "title": "WEBMARKS",
    "url": "https://webmarks.co.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/webmarks.webp",
    "period": "リニューアル：2025年1月〜2025年3月",
    "description": "Webマーケティング支援やSEOマーケター養成スクールを運営するWEBMARKSのコーポレートサイトです。企業の集客支援実績やスクールの講座内容を明確に伝えるデザインになっています。",
    "scope": "WordPressを使用し、コーポレートサイトの構築およびSEO対策を意識したレイアウト実装を担当しました。",
    "technologies": [
      "WordPress"
    ],
    "market": "japan",
    "field": "technology"
  },
  {
    "id": "fit-u",
    "title": "FIT U",
    "url": "https://fitu.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/fit-u.webp",
    "period": "リニューアル：2025年6月〜2025年8月",
    "description": "24時間営業のフィットネスジム「FIT U」の公式サイトです。トレーニング機器のほか、セルフエステやサウナなどの充実した設備と利用プランを案内しています。",
    "scope": "WordPressを使用し、ジム公式サイトの構築および店舗別ページのテンプレート実装を担当しました。",
    "technologies": [
      "WordPress"
    ],
    "market": "japan",
    "field": "fitness"
  },
  {
    "id": "siki-sai",
    "title": "SIKI-SAI",
    "url": "https://sikisai.net/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/siki-sai.webp",
    "period": "リニューアル：2025年8月〜2025年9月",
    "description": "パーソナルカラーや骨格診断などを行うイメージコンサルティング「SIKI-SAI」のオフィシャルサイトです。親しみやすいテーマ「SWELL」を活用し、個性を引き出すスタイリング情報を詳しく紹介しています。",
    "scope": "WordPress（SWELLテーマ）を使用し、イメージコンサルティングサイトの初期構築およびデザイン調整を担当しました。",
    "technologies": [
      "WordPress",
      "SWELL"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "refa-beauty-showcase",
    "thumbnailScale": 2.7,
    "thumbnailOrigin": "center center",
    "title": "ReFa BEAUTY SHOWCASE",
    "url": "https://www.refa.net/beauty_showcase/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/refa-beauty-showcase.webp",
    "period": "新規制作：2026年3月〜2026年4月",
    "description": "ReFaのヘアケア商品を訴求するスペシャルコラボレーション企画のプロモーションページです。ブランドの世界観を伝えながら、注目の新ラインナップやカラー展開を魅力的に紹介しています。",
    "scope": "HTML/CSS/JavaScriptを使用し、キャンペーンLPのフロントエンド実装およびアニメーション構築を担当しました。",
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "lair-de-savon",
    "title": "レールデュサボン AIR OASIS",
    "url": "https://store.fits-japan.com/lp?u=lairdesavon_airoasis",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/lair-de-savon.webp",
    "period": "リニューアル：2025年10月〜2025年11月",
    "description": "せっけんの香りをテーマにしたフレグランスシリーズ「レールデュサボン」の特設ページです。心地よい空間づくりを提案し、製品の魅力や清潔感のある世界観をわかりやすく伝えています。",
    "scope": "HTML/CSS/JavaScriptを使用し、特設LPのコーディングおよび商品情報のレイアウト調整を担当しました。",
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "yoom",
    "title": "Yoom",
    "url": "https://lp.yoom.fun/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/yoom.webp",
    "period": "リニューアル：2025年5月〜2025年6月",
    "description": "業務自動化およびクラウドツール連携プラットフォーム「Yoom」の紹介・集客用ページです。ノーコードで様々なサービスを連携し、業務効率化を実現する仕組みをわかりやすく解説しています。",
    "scope": "HTML/CSS/JavaScriptを使用し、マーケティングLPの構築およびフォーム周りの実装を担当しました。",
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "market": "japan",
    "field": "technology"
  },
  {
    "id": "fancl-skinpatch",
    "title": "FANCL SKIN PATCH",
    "url": "https://www.fancl.co.jp/skinpatch/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/fancl-skinpatch.webp",
    "period": "リニューアル：2025年2月〜2025年3月",
    "description": "ファンケルが提供する独自のAI角層解析サービス「スキンパッチ」の案内ページです。角層細胞の分析により現在の肌状態を把握し、未来の肌リスクまで予測する先進的な取り組みを紹介しています。",
    "scope": "HTML/CSS/JavaScriptを使用し、サービス紹介ページのフロントエンド実装を担当しました。",
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "kirei-preview",
    "thumbnailScale": 3.1,
    "thumbnailOrigin": "center 30%",
    "title": "美容ローション 検証用ページ",
    "url": "https://remmier-test.com/preview/lp/kirei",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/kirei-preview.webp",
    "preview": true,
    "period": "リニューアル：2025年1月〜2025年2月",
    "description": "美容ローション製品の販売検証およびデザイン確認用に制作されたプレビューページです。商品の透明感や保湿力、限定キャンペーンの訴求効果を事前に確認するためのデザインとなっています。",
    "scope": "HTML/CSS/JavaScriptを使用し、テスト用プレビューページのレイアウト構築および検証用コーディングを担当しました。",
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "sanwa-holdings",
    "title": "三和ホールディングス",
    "url": "https://www.sanwa-hldgs.co.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/sanwa-holdings.webp",
    "period": "リニューアル：2025年5月20日",
    "description": "三和ホールディングスのコーポレートサイトです。建築建材・製造業に関する企業情報やグループの取り組みを広く公開しています。",
    "scope": "Swiper、jQueryを使用し、コーポレートサイトのリニューアルおよびスライダー・UIコンポーネントの実装を担当しました。",
    "technologies": [
      "Swiper",
      "jQuery"
    ],
    "market": "japan",
    "field": "corporate"
  },
  {
    "id": "synx",
    "title": "シンク",
    "url": "https://www.synx.co.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/synx.webp",
    "period": "リニューアル：2025年5月1日",
    "description": "ITおよびビジネスソリューションを提供するシンクの公式サイトです。企業向けシステムや各種ソリューションの情報を分かりやすく発信しています。",
    "scope": "Laravel、Embedly、MathJax、GSAPを使用し、Webサイトのリニューアルおよび動的なアニメーション演出・システム連携の実装を担当しました。",
    "technologies": [
      "Laravel",
      "Embedly",
      "MathJax",
      "GSAP"
    ],
    "market": "japan",
    "field": "technology"
  },
  {
    "id": "smk",
    "title": "SMK",
    "url": "https://www.smk.co.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/smk.webp",
    "period": "リニューアル：2025年5月29日",
    "description": "電子部品・デバイスの製造を手がけるSMKのグローバル公式サイトです。製品カタログや技術情報、IR情報をグローバルに向けて展開しています。",
    "scope": "Drupalを使用し、大規模コーポレートサイトのリニューアルおよびCMS構築・多言語対応の基盤整備を担当しました。",
    "technologies": [
      "Drupal"
    ],
    "market": "japan",
    "field": "corporate"
  },
  {
    "id": "cosfa",
    "title": "岩瀬コスファ",
    "url": "https://www.cosfa.co.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/cosfa.webp",
    "period": "リニューアル：2025年7月1日",
    "description": "化粧品原料や健康食品素材などを扱う岩瀬コスファの公式サイトです。「美と健康」をコンセプトに、事業や研究開発、原料情報を分かりやすく紹介しています。",
    "scope": "WordPressを使用し、製品紹介ページの構築およびCMSによる情報更新体制の整備を担当しました。",
    "technologies": [
      "WordPress"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "obitsu",
    "title": "オビツ製作所",
    "url": "https://obitsu.co.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/obitsu.webp",
    "period": "リニューアル：2026年10月8日",
    "description": "ソフビ製品やドールなどの製造・販売を行うオビツ製作所の公式サイトです。ブランド・製品の紹介や、独自の技術・ものづくりへのこだわりを紹介しています。",
    "scope": "Astro、Tailwind CSSを使用し、高速でモダンなフロントエンドの構築およびスタイリングを担当しました。",
    "technologies": [
      "Astro",
      "Tailwind CSS"
    ],
    "market": "japan",
    "field": "corporate"
  },
  {
    "id": "unifast",
    "title": "ユニファースト",
    "url": "https://unifast.co.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/unifast.webp",
    "period": "リニューアル：2026年10月13日",
    "description": "ノベルティやセールスプロモーション雑貨の企画・制作を行うユニファーストの公式サイトです。豊富な実績やオリジナルグッズの魅力を伝えています。",
    "scope": "WordPress、Vue.js、MySQLを使用し、動的なコンテンツ表示およびCMSを用いた管理機能の実装を担当しました。",
    "technologies": [
      "WordPress",
      "Vue.js",
      "MySQL"
    ],
    "market": "japan",
    "field": "corporate"
  },
  {
    "id": "rosso",
    "title": "Rosso",
    "url": "https://rosso-tokyo.co.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/rosso.webp",
    "period": "リニューアル：2026年8月28日",
    "description": "機械学習・AI開発、アプリケーション開発、インフラ構築・運用を手がけるRossoの公式サイトです。サービスやソリューション、企業情報を動きのあるビジュアルで紹介しています。",
    "scope": "WordPress、GSAPを使用し、サイトのリニューアルおよび高度なアニメーション演出の組み込みを担当しました。",
    "technologies": [
      "WordPress",
      "GSAP"
    ],
    "market": "japan",
    "field": "technology"
  },
  {
    "id": "triedge",
    "title": "トライエッジ",
    "url": "https://triedge.co.jp/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/triedge.webp",
    "period": "リニューアル：2026年8月9日",
    "description": "ビジネス支援やテクノロジーサービスを展開するトライエッジの公式サイトです。サービス内容や企業情報をスマートに伝達する構成になっています。",
    "scope": "Astro、Zohoを使用し、モダンなWebサイト構築および外部CRMツール（Zoho）との連携実装を担当しました。",
    "technologies": [
      "Astro",
      "Zoho"
    ],
    "market": "japan",
    "field": "technology"
  },
  {
    "id": "towa-corporation",
    "title": "東和コーポレーション",
    "url": "https://www.towacorp.co.jp",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/towa-corporation.webp",
    "period": "リニューアル：2026年6月8日",
    "description": "各種事業を展開する東和コーポレーションの公式サイトです。企業理念や事業内容、最新情報を利便性の高いレイアウトで発信しています。",
    "scope": "WordPress、GSAPを使用し、コーポレートサイトのリニューアルおよび動きのあるインタラクティブなUI実装を担当しました。",
    "technologies": [
      "WordPress",
      "GSAP"
    ],
    "market": "japan",
    "field": "corporate"
  },
  {
    "id": "nana-canele",
    "title": "NANA-Canele",
    "url": "https://www.nanacanele.com/",
    "category": "ECサイト",
    "thumbnail": "/images/portfolio/nana-canele.webp",
    "period": "リニューアル：2026年8月27日",
    "description": "カヌレ専門店のECオンラインショップです。こだわりのスイーツ情報を美しく魅力的に見せながらスムーズな購買体験を提供しています。",
    "scope": "Shopify、Vue.jsを使用し、ECサイトのリニューアルおよびフロントエンドのカスタマイズ、購入導線の最適化を担当しました。",
    "technologies": [
      "Shopify",
      "Vue.js"
    ],
    "market": "japan",
    "field": "lifestyle"
  },
  {
    "id": "spa-touan",
    "title": "統合庵",
    "url": "https://spa-touan.org/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/spa-touan.webp",
    "period": "リニューアル：2025年6月10日",
    "description": "リラクゼーションサロン「統合庵」の公式サイトです。落ち着いた雰囲気を伝えるデザインで、施術メニューや店舗情報を分かりやすく紹介しています。",
    "scope": "WordPressを使用し、サロン公式サイトのリニューアルおよび予約・メニュー紹介ページの構築を担当しました。",
    "technologies": [
      "WordPress"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "edo-komachi",
    "title": "江戸小町",
    "url": "https://edo-komachi.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/edo-komachi.webp",
    "period": "リニューアル：2025年7月15日",
    "description": "和の趣を取り入れたサロン「江戸小町」の公式サイトです。伝統的な美意識とモダンなサービス内容を調和させたデザインで発信しています。",
    "scope": "WordPressを使用し、サロンサイトのリニューアルおよびデザインテーマのカスタマイズを担当しました。",
    "technologies": [
      "WordPress"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "love-shabon",
    "title": "ラブシャボン",
    "url": "https://loveshabon.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/love-shabon.webp",
    "period": "リニューアル：2025年8月20日",
    "description": "ビューティー・ケアサロン「ラブシャボン」の公式サイトです。清潔感のある心地よい空間とサービスメニューを丁寧に紹介しています。",
    "scope": "WordPressを使用し、サイトのリニューアルおよび店舗情報のレイアウト調整を担当しました。",
    "technologies": [
      "WordPress"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "m-no-rakuen",
    "title": "Mの楽園",
    "url": "https://m-no-rakuen.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/m-no-rakuen.webp",
    "period": "リニューアル：2025年9月10日",
    "description": "癒やしの空間を提供するサロン「Mの楽園」の公式サイトです。リラックスした雰囲気を伝えるビジュアルと充実したメニュー情報を掲載しています。",
    "scope": "WordPressを使用し、サイトのリニューアルおよびブログ・新着情報管理機能の実装を担当しました。",
    "technologies": [
      "WordPress"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "luana-shinagawa",
    "title": "ルアナ",
    "url": "https://luana-shinagawa.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/luana-shinagawa.webp",
    "period": "リニューアル：2025年10月5日",
    "description": "品川エリアにあるプライベートサロン「ルアナ」の公式サイトです。洗練されたサロンの魅力や施術プラン、アクセス情報を案内しています。",
    "scope": "WordPressを使用し、サイトのリニューアルおよびお問い合わせ・予約導線の実装を担当しました。",
    "technologies": [
      "WordPress"
    ],
    "market": "japan",
    "field": "beauty"
  },
  {
    "id": "salon-cms",
    "title": "Salon CMS",
    "url": "https://lp.salon-cms.com/",
    "category": "ランディングページ",
    "thumbnail": "/images/portfolio/salon-cms.webp",
    "period": "新規制作：2025年11月1日",
    "description": "サロン向けCMSおよびWeb制作サービスの紹介・集客用ランディングページです。サロン特化型ツールのメリットや導入効果を魅力的に訴求しています。",
    "scope": "HTML/CSS/JavaScriptを使用し、集客用ランディングページのフロントエンド実装およびコンバージョン最適化を担当しました。",
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "market": "japan",
    "field": "technology"
  },
  {
    "id": "global-acsl",
    "market": "global",
    "shortTitle": "ACSL",
    "title": "ACSL Corporate Website & Industrial Drone Solutions Platform",
    "url": "https://www.acsl.co.jp/en/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-acsl.webp",
    "period": "Development work: 2019–2024",
    "periodLabel": "Project period range",
    "description": "Designed and developed a modern corporate website for ACSL, a Japanese company specializing in industrial drones, autonomous control technology, and IoT solutions. The project focused on clearly communicating advanced technologies, business solutions, products, company information, and corporate vision through a professional and intuitive web experience. The site structure emphasizes accessibility, visual impact, responsive design, and easy navigation across logistics, infrastructure inspection, disaster response, and emerging drone applications.",
    "scope": "Corporate website design and development, information architecture, responsive layouts, accessibility, and navigation for products and industrial drone solutions.",
    "technologies": [],
    "skills": [
      "Corporate Website Development",
      "Responsive Web Design",
      "Information Architecture",
      "Accessibility"
    ],
    "field": "technology"
  },
  {
    "id": "global-nest-salon",
    "market": "global",
    "shortTitle": "The Nest Salon",
    "title": "The Nest Salon Luxury Hair & Beauty Website in Dubai",
    "url": "https://thenestsalon.ae/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-nest-salon.webp",
    "period": "Development work: 2019–2024",
    "periodLabel": "Project period range",
    "description": "Designed and developed a premium salon website for The Nest Salon, a luxury hair and beauty brand with locations in Jumeirah and Sobha Hartland, Dubai. The project focused on creating an elegant and welcoming digital experience while clearly presenting hair colouring, extensions, cuts and styling, smoothing treatments, nails, bridal services, team profiles, promotions, reviews, and online booking options. The responsive website also communicates the salon’s focus on quality, sustainability, and personalised beauty services.",
    "scope": "UI/UX design, responsive website development, service and team information architecture, and online booking integration.",
    "technologies": [],
    "skills": [
      "UI/UX Design",
      "Responsive Web Design",
      "Corporate & Service Website Development",
      "Information Architecture",
      "Online Booking Integration"
    ],
    "field": "beauty"
  },
  {
    "id": "global-well-grow",
    "thumbnailAlt": "Well Grow Store — website preview currently unavailable",
    "market": "global",
    "shortTitle": "Well Grow Store",
    "title": "Well Grow Store E-Commerce Website for Vastu Products",
    "url": "https://wellgrowstore.com/",
    "category": "ECサイト",
    "thumbnail": "/images/portfolio/global-well-grow.webp",
    "period": "Development work: 2019–2024",
    "periodLabel": "Project period range",
    "description": "Designed and developed an e-commerce website for Well Grow Store, featuring Vastu and spiritual wellness products such as Vaastu and Bizgrow Pyramids. The project focused on presenting product benefits, pricing, customer information, and purchasing options through a clean and responsive online shopping experience. The website also includes supporting content, customer policies, and a blog section to strengthen product understanding and customer engagement.",
    "scope": "E-commerce UI/UX design and development, responsive layouts, WordPress / WooCommerce implementation, and content and product management.",
    "technologies": [
      "WordPress",
      "WooCommerce"
    ],
    "skills": [
      "E-commerce Website Development",
      "UI/UX Design",
      "Responsive Web Design",
      "WordPress / WooCommerce",
      "Content & Product Management"
    ],
    "field": "lifestyle"
  },
  {
    "id": "global-animoca",
    "market": "global",
    "shortTitle": "Animoca Brands",
    "title": "Animoca Brands Web3 Technology & Digital Economy Corporate Website",
    "url": "https://www.animocabrands.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-animoca.webp",
    "period": "Development work: 2019–2024",
    "periodLabel": "Project period range",
    "description": "Designed and developed a modern corporate website for Animoca Brands, a global company focused on digital property rights, Web3 technologies, gaming, digital identity, education, and blockchain-based ecosystems. The project focused on communicating the company’s mission, investment portfolio, projects, institutional and consumer offerings, and latest announcements through a bold, technology-driven interface. The website combines clear information architecture, responsive layouts, visual storytelling, and intuitive navigation to present complex Web3 concepts and a broad ecosystem of portfolio companies in an accessible way.",
    "scope": "UI/UX design, responsive corporate website development, information architecture, visual storytelling, and navigation for Web3 and blockchain content.",
    "technologies": [],
    "skills": [
      "UI/UX Design",
      "Responsive Web Design",
      "Corporate Website Development",
      "Information Architecture",
      "Web3 / Blockchain Website"
    ],
    "field": "technology"
  },
  {
    "id": "global-sabia-amor",
    "market": "global",
    "shortTitle": "SABIA AMOR",
    "title": "SABIA AMOR Luxury Fashion & Lingerie E-Commerce Website",
    "url": "https://www.sabiaamor.com/en/",
    "category": "ECサイト",
    "thumbnail": "/images/portfolio/global-sabia-amor.webp",
    "period": "Development work: 2019–2024",
    "periodLabel": "Project period range",
    "description": "Designed and developed a premium e-commerce website for SABIA AMOR, an Austrian fashion house based in Vienna specializing in exclusive swimwear, elegant lingerie, loungewear, and luxury sets. The project focused on creating a sophisticated shopping experience with curated product collections, intuitive navigation, responsive layouts, multilingual and multi-currency support, product discovery, blog content, newsletter subscription, and a seamless shopping cart and checkout journey. The design reinforces the brand’s elegant positioning while keeping the customer experience accessible and easy to navigate.",
    "scope": "E-commerce UI/UX design and responsive online store development, multilingual and multi-currency integration, product discovery, and cart and checkout experience.",
    "technologies": [
      "Shopify"
    ],
    "skills": [
      "E-Commerce Website Development",
      "UI/UX Design",
      "Responsive Web Design",
      "Multilingual & Multi-Currency Integration",
      "Shopify / Online Store Development"
    ],
    "field": "fashion"
  },
  {
    "id": "global-sola-hair",
    "market": "global",
    "shortTitle": "SOLA Hair Singapore",
    "title": "SOLA Hair Singapore Luxury Salon Website",
    "url": "https://solahair.com.sg/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-sola-hair.webp",
    "period": "Development work: 2019–2024",
    "periodLabel": "Project period range",
    "description": "I contributed to the design and development of the SOLA Hair Singapore website by creating a refined, responsive, and user-friendly interface tailored to a premium salon brand. My contributions included structuring service and treatment information, improving navigation and content presentation, designing responsive layouts for desktop and mobile devices, integrating appointment-booking functionality, and ensuring a consistent visual experience across key pages. I also focused on presenting the salon’s services, brand story, and customer-focused information in a clear and engaging way to improve usability and conversion.",
    "scope": "Contribution to UI/UX design and development, responsive layouts, service and treatment information architecture, navigation, and online appointment booking.",
    "technologies": [],
    "skills": [
      "UI/UX Design",
      "Responsive Web Design",
      "Salon Website Development",
      "Information Architecture",
      "Online Appointment Booking"
    ],
    "field": "beauty"
  },
  {
    "id": "global-welab-bank",
    "market": "global",
    "shortTitle": "WeLab Bank",
    "title": "WeLab Bank Digital Banking Website & Financial Services Platform",
    "url": "https://www.welab.bank/en/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-welab-bank.webp",
    "period": "Development work: 2019–2024",
    "periodLabel": "Project period range",
    "description": "Designed and developed a modern digital banking website for WeLab Bank, a Hong Kong digital bank offering online banking, savings, loans, investments, foreign exchange, remittance, and wealth management services. The project focused on presenting complex financial products in a clear and approachable way, with intuitive navigation, responsive layouts, strong calls to action, product-focused content, and seamless digital account-opening and service journeys. The website also highlights WeLab Bank’s AI-first approach and mobile banking experience.",
    "scope": "UI/UX design and responsive financial website development, information architecture, product-focused content, and digital banking service journeys.",
    "technologies": [],
    "skills": [
      "UI/UX Design",
      "Financial Website Development",
      "Responsive Web Design",
      "Information Architecture",
      "Digital Banking & FinTech UX"
    ],
    "field": "finance"
  },
  {
    "id": "global-qipology",
    "shortTitle": "Qipology",
    "title": "Qipology — Modern Qipao & Fashion E-Commerce",
    "url": "https://www.qipology.com/",
    "category": "ECサイト",
    "field": "fashion",
    "technologies": [
      "Shopify"
    ],
    "description": "The official online store for Qipology, presenting modern qipao designs and contemporary apparel through a visually refined shopping experience.",
    "scope": "Built the Shopify store and implemented product management and design customizations.",
    "skills": [
      "E-Commerce Development",
      "Product Management",
      "Theme Customization"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-qipology.webp",
    "period": "Created: 2024",
    "periodLabel": "Project year"
  },
  {
    "id": "global-icanread",
    "shortTitle": "I Can Read",
    "title": "I Can Read — Education & Learning Portal",
    "url": "https://www.icanread.asia/",
    "category": "ウェブサイト",
    "field": "education",
    "technologies": [
      "CMS"
    ],
    "description": "The official website for I Can Read's education and learning programmes, presenting children's English education and programme information in an accessible format.",
    "scope": "Built a multilingual CMS portal and implemented content management functionality.",
    "skills": [
      "Portal Development",
      "Multilingual Websites",
      "Content Management"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-icanread.webp",
    "period": "Created: 2022",
    "periodLabel": "Project year"
  },
  {
    "id": "global-ms-chu",
    "shortTitle": "MS Chu Soap and Beauty",
    "title": "MS Chu Soap and Beauty — Beauty E-Commerce",
    "url": "https://www.mschusoapandbeaut.com/",
    "category": "ECサイト",
    "field": "beauty",
    "technologies": [
      "Shopify"
    ],
    "description": "An online shop for MS Chu Soap and Beauty, introducing natural soaps and beauty products with clear, considered product presentation.",
    "scope": "Created the Shopify store and implemented the product catalogue and checkout functionality.",
    "skills": [
      "E-Commerce Development",
      "Product Catalogues",
      "Checkout Implementation"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-ms-chu.webp",
    "period": "Created: 2023",
    "periodLabel": "Project year"
  },
  {
    "id": "global-lifeyoung",
    "shortTitle": "LifeYoung",
    "title": "LifeYoung — Healthcare & Wellness Website",
    "url": "https://lifeyoung.com/",
    "category": "ウェブサイト",
    "field": "healthcare",
    "technologies": [],
    "description": "The official LifeYoung healthcare and wellness website, presenting information and services that support healthy lifestyles.",
    "scope": "Built the initial website and implemented layouts for publishing information and services.",
    "skills": [
      "Website Development",
      "Information Architecture",
      "Layout Implementation"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-lifeyoung.webp",
    "period": "Created: 2022",
    "periodLabel": "Project year"
  },
  {
    "id": "global-propman",
    "shortTitle": "Propman",
    "title": "Propman — Property Management Platform Website",
    "url": "https://www.propman.io/",
    "category": "ウェブサイト",
    "field": "realestate",
    "technologies": [],
    "description": "The official website for the Propman property management platform, introducing solutions and services designed to streamline property management operations.",
    "scope": "Renewed the platform website and optimized user journeys and navigation.",
    "skills": [
      "Website Renewal",
      "Platform Websites",
      "User Journey Optimization"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-propman.webp",
    "period": "Renewal: 2024",
    "periodLabel": "Project year"
  },
  {
    "id": "global-cuthys",
    "shortTitle": "Cuthys",
    "title": "Cuthys — Brand & Product Website",
    "url": "https://www.cuthys.com/",
    "category": "ウェブサイト",
    "field": "beauty",
    "technologies": [],
    "description": "The official Cuthys brand and product website, using refined visuals to communicate its distinctive identity and product offering.",
    "scope": "Built the brand website and optimized its page layouts.",
    "skills": [
      "Brand Websites",
      "Website Development",
      "Layout Optimization"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-cuthys.webp",
    "period": "Created: 2022",
    "periodLabel": "Project year"
  },
  {
    "id": "global-brilliant-mlle",
    "shortTitle": "Brilliant Mlle",
    "title": "Brilliant Mlle — Full-Stack Brand Website",
    "url": "https://www.brilliantmlle.com.hk/",
    "category": "ウェブサイト",
    "field": "fashion",
    "technologies": [
      "React",
      "Express",
      "Node.js"
    ],
    "description": "The official Brilliant Mlle website, communicating the appeal of an apparel and lifestyle brand through a modern web experience.",
    "scope": "Built a full-stack system encompassing the React frontend and Express and Node.js backend.",
    "skills": [
      "Full-Stack Development",
      "Frontend Development",
      "Backend Development"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-brilliant-mlle.webp",
    "period": "Created: 2022",
    "periodLabel": "Project year"
  },
  {
    "id": "global-designgood",
    "shortTitle": "DesignGood",
    "title": "DesignGood — Design & Lifestyle E-Commerce",
    "url": "https://www.designgood.hk/",
    "category": "ECサイト",
    "field": "lifestyle",
    "technologies": [
      "Shopify"
    ],
    "description": "An online store for DesignGood, offering a curated selection of design goods and lifestyle items.",
    "scope": "Built the Shopify shop and customized its design theme.",
    "skills": [
      "E-Commerce Development",
      "Shopify Themes",
      "Design Customization"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-designgood.webp",
    "period": "Created: 2022",
    "periodLabel": "Project year"
  },
  {
    "id": "global-paka-wellness",
    "shortTitle": "Paka Wellness",
    "title": "Paka Wellness — Wellness & Fitness E-Commerce",
    "url": "https://www.pakawellness.com/",
    "category": "ECサイト",
    "field": "fitness",
    "technologies": [
      "Shopify"
    ],
    "description": "A wellness and fitness online shop for Paka Wellness, presenting products and information that support physical and mental wellbeing.",
    "scope": "Built the Shopify store and implemented the purchasing journey.",
    "skills": [
      "E-Commerce Development",
      "Store Setup",
      "Purchase Flows"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-paka-wellness.webp",
    "period": "Created: 2022",
    "periodLabel": "Project year"
  },
  {
    "id": "global-lean-fitness",
    "shortTitle": "Lean Fitness",
    "title": "Lean Fitness — Hong Kong Studio Website",
    "url": "https://www.leanfitnesshk.com/",
    "category": "ウェブサイト",
    "field": "fitness",
    "technologies": [],
    "description": "The official website for Hong Kong fitness studio Lean Fitness, presenting training programmes and class information in a clear and accessible way.",
    "scope": "Built the official website and implemented booking and enquiry forms.",
    "skills": [
      "Service Websites",
      "Booking Forms",
      "Enquiry Forms"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-lean-fitness.webp",
    "period": "Created: 2023",
    "periodLabel": "Project year"
  },
  {
    "id": "global-sparky",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "Node.js",
        "PostgreSQL",
        "Redis",
        "WebSocket"
      ],
      "languages": [
        "TypeScript",
        "SQL"
      ],
      "frameworks": [
        "React",
        "Next.js",
        "NestJS"
      ]
    },
    "shortTitle": "Sparky",
    "title": "Sparky — Dating & Community Platform",
    "url": "https://sparky-dating.com/",
    "category": "システム開発",
    "field": "technology",
    "technologies": [],
    "description": "A dating service platform designed to support new connections through a comfortable matching and social experience.",
    "scope": "Built the platform's frontend and backend as a web application.",
    "skills": [
      "Web Application Development",
      "Frontend Development",
      "Backend Development"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-sparky-dashboard-v2.webp",
    "thumbnailAlt": "Sparky: illustrated concept dashboard, not an actual client screen",
    "period": "Created: 2023",
    "periodLabel": "Project year"
  },
  {
    "id": "global-healing-voices",
    "shortTitle": "Healing Voices",
    "title": "Healing Voices — Counselling & Wellbeing Website",
    "url": "https://www.healingvoices.com.hk/",
    "category": "ウェブサイト",
    "field": "healthcare",
    "technologies": [
      "Wix"
    ],
    "description": "The official Healing Voices website, presenting counselling and healing services alongside information about its practitioners and approach to emotional wellbeing.",
    "scope": "Built the website in Wix and implemented layouts for the booking journey.",
    "skills": [
      "Service Websites",
      "Wix Development",
      "Booking Journeys"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-healing-voices.webp",
    "period": "Created: 2023",
    "periodLabel": "Project year"
  },
  {
    "id": "global-wintech",
    "shortTitle": "Wintech",
    "title": "Wintech — Technology & Engineering Corporate Website",
    "url": "https://wintech-hk.com/",
    "category": "ウェブサイト",
    "field": "corporate",
    "technologies": [],
    "description": "A corporate website for Wintech, introducing its technical and engineering services, business activities and company information.",
    "scope": "Built the corporate website and implemented company information pages.",
    "skills": [
      "Corporate Websites",
      "Website Development",
      "Company Information Pages"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-wintech.webp",
    "period": "Created: 2023",
    "periodLabel": "Project year"
  },
  {
    "id": "global-woaw",
    "shortTitle": "WOAW Store",
    "title": "WOAW Store — Streetwear & Selected Goods E-Commerce",
    "url": "https://woawstore.com/",
    "category": "ECサイト",
    "field": "fashion",
    "technologies": [
      "Shopify"
    ],
    "description": "An online shop for WOAW Store, presenting streetwear and selected products through a distinctive, style-led shopping experience.",
    "scope": "Created the initial Shopify store and customized its store design.",
    "skills": [
      "E-Commerce Development",
      "Store Setup",
      "Store Design Customization"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-woaw.webp",
    "period": "Created: 2019",
    "periodLabel": "Project year"
  },
  {
    "id": "global-wild-organic",
    "shortTitle": "Wild Organic Life",
    "title": "Wild Organic Life — Organic Lifestyle E-Commerce",
    "url": "https://wildorganiclife.com/",
    "category": "ECサイト",
    "field": "beauty",
    "technologies": [
      "Shopify"
    ],
    "description": "An online store for Wild Organic Life, offering natural products and lifestyle goods inspired by organic living.",
    "scope": "Built the Shopify store and implemented checkout and product management systems.",
    "skills": [
      "E-Commerce Development",
      "Checkout Implementation",
      "Product Management"
    ],
    "market": "global",
    "thumbnail": "/images/portfolio/global-wild-organic.webp",
    "period": "Created: 2019",
    "periodLabel": "Project year"
  },
  {
    "id": "nda-kintone",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "kintone",
        "REST APIs",
        "Node.js"
      ],
      "languages": [
        "JavaScript",
        "TypeScript"
      ],
      "frameworks": [
        "kintone JavaScript SDK",
        "React"
      ]
    },
    "market": "japan",
    "shortTitle": "kintone業務アプリ連携",
    "title": "kintone業務アプリ連携（NDA）",
    "technologies": [
      "kintone",
      "API Integration"
    ],
    "description": "日本向けのkintone業務アプリと外部サービスをつなぐ、匿名のシステム開発実績です。業務データの連携や定型処理の自動化を扱います。",
    "scope": "kintoneを用いた業務アプリ連携の設計・実装。公開情報は担当領域の要約に限定し、クライアント名や個別の業務構成は非公開です。 記載した月は公開表示用の参考値であり、実際の契約・稼働期間を示すものではありません。",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2024年04月〜2025年02月",
    "periodLabel": "公開表示用の参考期間",
    "thumbnail": "/images/portfolio/nda-kintone-dashboard-v2.webp",
    "thumbnailAlt": "kintone業務アプリ連携の公開用コンセプト画面。実際のクライアント画面ではありません"
  },
  {
    "id": "nda-n8n",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "n8n",
        "REST APIs",
        "PostgreSQL",
        "Docker"
      ],
      "languages": [
        "JavaScript",
        "TypeScript"
      ],
      "frameworks": [
        "Express.js"
      ]
    },
    "market": "global",
    "shortTitle": "n8n Workflow Automation",
    "title": "n8n Workflow Automation — NDA Case Summary",
    "technologies": [
      "n8n",
      "SaaS Integration"
    ],
    "description": "An anonymized development case covering n8n workflows that connect events, business tools and recurring processes. Client-specific workflows and operational data are not disclosed.",
    "scope": "Designed and implemented workflow automation and service integrations with n8n. This summary describes the development area without revealing private configurations. The displayed months are illustrative placeholders, not verified contract or delivery dates.",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2024/08–2025/03",
    "periodLabel": "Illustrative public period",
    "thumbnail": "/images/portfolio/nda-n8n-dashboard-v2.webp",
    "thumbnailAlt": "n8n Workflow Automation: illustrated concept dashboard, not an actual client screen",
    "skills": [
      "Workflow Automation",
      "Service Integration"
    ]
  },
  {
    "id": "nda-saas",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Docker"
      ],
      "languages": [
        "TypeScript",
        "SQL"
      ],
      "frameworks": [
        "Next.js",
        "NestJS"
      ]
    },
    "market": "global",
    "shortTitle": "SaaS System Development",
    "title": "SaaS System Development — NDA Case Summary",
    "technologies": [
      "SaaS",
      "API Integration"
    ],
    "description": "An anonymized SaaS development case focused on application functionality and connections with business services. Client identities, actual screens and application data remain private.",
    "scope": "Worked on SaaS application development and business-service integration. Product-specific requirements and implementation details are withheld under NDA. The displayed months are illustrative placeholders, not verified contract or delivery dates.",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2025/02–2026/06",
    "periodLabel": "Illustrative public period",
    "thumbnail": "/images/portfolio/nda-saas-dashboard-v2.webp",
    "thumbnailAlt": "SaaS System Development: illustrated concept dashboard, not an actual client screen",
    "skills": [
      "System Development",
      "Service Integration"
    ]
  },
  {
    "id": "nda-ai-workflow",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "OpenAI API",
        "PostgreSQL",
        "pgvector"
      ],
      "languages": [
        "Python",
        "TypeScript"
      ],
      "frameworks": [
        "FastAPI",
        "LangChain"
      ]
    },
    "market": "global",
    "shortTitle": "AI / LLM Workflow Automation",
    "title": "AI / LLM Workflow Automation — NDA Case Summary",
    "technologies": [
      "AI / LLM",
      "Workflow Automation"
    ],
    "description": "An anonymized project covering the integration of AI and language-model capabilities into business workflows. Private prompts, source content and system configurations are not shown.",
    "scope": "Developed AI/LLM-based workflow automation and integrations between model-driven processing and business tools. The public illustration is conceptual only. The displayed months are illustrative placeholders, not verified contract or delivery dates.",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2025/05–2026/09",
    "periodLabel": "Illustrative public period",
    "thumbnail": "/images/portfolio/nda-ai-workflow-dashboard-v2.webp",
    "thumbnailAlt": "AI / LLM Workflow Automation: illustrated concept dashboard, not an actual client screen",
    "skills": [
      "AI Integration",
      "Workflow Automation"
    ]
  },
  {
    "id": "nda-api-security",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "REST APIs",
        "OAuth 2.0",
        "JWT",
        "PostgreSQL"
      ],
      "languages": [
        "TypeScript",
        "SQL"
      ],
      "frameworks": [
        "NestJS",
        "Passport.js"
      ]
    },
    "market": "global",
    "shortTitle": "API Security & Integration",
    "title": "API Security & Integration — NDA Case Summary",
    "technologies": [
      "API Security",
      "Authentication",
      "Access Control"
    ],
    "description": "An anonymized development case covering API integration, authentication and access-control work. Endpoint addresses, credentials and client-specific policies are not disclosed.",
    "scope": "Worked on API integrations and their authentication and access-control mechanisms. Sensitive implementation and deployment information is excluded from this public summary. The displayed months are illustrative placeholders, not verified contract or delivery dates.",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2024/11–2025/04",
    "periodLabel": "Illustrative public period",
    "thumbnail": "/images/portfolio/nda-api-security-dashboard-v2.webp",
    "thumbnailAlt": "API Security & Integration: illustrated concept dashboard, not an actual client screen",
    "skills": [
      "API Integration",
      "Authentication & Access Control"
    ]
  },
  {
    "id": "nda-infrastructure",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "Linux",
        "Docker",
        "AWS",
        "Terraform"
      ],
      "languages": [
        "Bash",
        "Python",
        "HCL"
      ],
      "frameworks": [
        "Ansible"
      ]
    },
    "market": "global",
    "shortTitle": "Infrastructure & Operations",
    "title": "Infrastructure & Operations — NDA Case Summary",
    "technologies": [
      "Infrastructure",
      "Deployment",
      "Operations"
    ],
    "description": "An anonymized infrastructure project covering the runtime foundation for web systems. Network addresses, topology, accounts and deployment details remain private.",
    "scope": "Worked on infrastructure setup and operational foundations for deployed systems. The visual represents a generic development area and does not reproduce a client's environment. The displayed months are illustrative placeholders, not verified contract or delivery dates.",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2025/01–2026/02",
    "periodLabel": "Illustrative public period",
    "thumbnail": "/images/portfolio/nda-infrastructure-dashboard-v2.webp",
    "thumbnailAlt": "Infrastructure & Operations: illustrated concept dashboard, not an actual client screen",
    "skills": [
      "Infrastructure Setup",
      "Operational Support"
    ]
  },
  {
    "id": "nda-excel",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "Excel",
        "Microsoft 365"
      ],
      "languages": [
        "Python",
        "VBA"
      ],
      "frameworks": [
        "pandas",
        "openpyxl"
      ]
    },
    "market": "japan",
    "shortTitle": "Excel業務自動化",
    "title": "Excel業務自動化（NDA）",
    "technologies": [
      "Excel",
      "Workflow Automation"
    ],
    "description": "日本向けのExcel業務を対象に、定型的なデータ処理や集計作業の自動化を扱う匿名実績です。実際の帳票・業務データは公開していません。",
    "scope": "Excelを利用する業務の自動化処理と、関連するデータの受け渡しを設計・実装。公開用の図では、実際の帳票やファイル構成を使用していません。 記載した月は公開表示用の参考値であり、実際の契約・稼働期間を示すものではありません。",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2024年06月〜2024年10月",
    "periodLabel": "公開表示用の参考期間",
    "thumbnail": "/images/portfolio/nda-excel-dashboard-v2.webp",
    "thumbnailAlt": "Excel業務自動化の公開用コンセプト画面。実際のクライアント画面ではありません"
  },
  {
    "id": "nda-whatsapp",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "WhatsApp Business Platform",
        "Node.js",
        "PostgreSQL",
        "Redis"
      ],
      "languages": [
        "TypeScript",
        "SQL"
      ],
      "frameworks": [
        "Express.js"
      ]
    },
    "market": "global",
    "shortTitle": "WhatsApp Bot Development",
    "title": "WhatsApp Bot Development — NDA Case Summary",
    "technologies": [
      "WhatsApp",
      "Bot Development",
      "API Integration"
    ],
    "description": "An anonymized WhatsApp bot project covering messaging-based interactions and service connections. Real conversations, customer details and private integrations are not shared.",
    "scope": "Developed WhatsApp bot functionality and connected messaging workflows with external services. Client-specific conversation flows and credentials remain confidential. The displayed months are illustrative placeholders, not verified contract or delivery dates.",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2025/08–2026/01",
    "periodLabel": "Illustrative public period",
    "thumbnail": "/images/portfolio/nda-whatsapp-dashboard-v2.webp",
    "thumbnailAlt": "WhatsApp Bot Development: illustrated concept dashboard, not an actual client screen",
    "skills": [
      "Bot Development",
      "Messaging Integration"
    ]
  },
  {
    "id": "nda-telegram",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "Telegram Bot API",
        "PostgreSQL",
        "Redis"
      ],
      "languages": [
        "Python"
      ],
      "frameworks": [
        "aiogram",
        "FastAPI"
      ]
    },
    "market": "global",
    "shortTitle": "Telegram Bot Development",
    "title": "Telegram Bot Development — NDA Case Summary",
    "technologies": [
      "Telegram",
      "Bot Development",
      "API Integration"
    ],
    "description": "An anonymized Telegram bot development case covering command-driven interactions and automated actions. Bot identities, chat histories and private service details are withheld.",
    "scope": "Designed and implemented Telegram bot functionality and API-based workflow connections. The public description is limited to the development area. The displayed months are illustrative placeholders, not verified contract or delivery dates.",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2024/09–2025/02",
    "periodLabel": "Illustrative public period",
    "thumbnail": "/images/portfolio/nda-telegram-dashboard-v2.webp",
    "thumbnailAlt": "Telegram Bot Development: illustrated concept dashboard, not an actual client screen",
    "skills": [
      "Bot Development",
      "Messaging Integration"
    ]
  },
  {
    "id": "nda-line",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "LINE Messaging API",
        "Node.js",
        "PostgreSQL"
      ],
      "languages": [
        "TypeScript"
      ],
      "frameworks": [
        "LINE Bot SDK",
        "Express.js"
      ]
    },
    "market": "japan",
    "shortTitle": "LINEボット・業務連携",
    "title": "LINEボット・業務連携（NDA）",
    "technologies": [
      "LINE",
      "Bot Development",
      "API Integration"
    ],
    "description": "日本向けのLINEボットによるメッセージ処理と業務システム連携を扱う匿名実績です。実際の会話・アカウント・利用者情報は非公開です。",
    "scope": "LINEボットの機能と、外部システムへの通知・連携処理を設計・実装。公開用の説明では、個別の会話フローや接続情報を使用していません。 記載した月は公開表示用の参考値であり、実際の契約・稼働期間を示すものではありません。",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2025年03月〜2025年07月",
    "periodLabel": "公開表示用の参考期間",
    "thumbnail": "/images/portfolio/nda-line-dashboard-v2.webp",
    "thumbnailAlt": "LINEボット・業務連携の公開用コンセプト画面。実際のクライアント画面ではありません"
  },
  {
    "id": "nda-slack",
    "thumbnailKind": "concept",
    "suggestedStack": {
      "technologies": [
        "Slack API",
        "Node.js",
        "PostgreSQL"
      ],
      "languages": [
        "TypeScript"
      ],
      "frameworks": [
        "Bolt for JavaScript",
        "Express.js"
      ]
    },
    "market": "japan",
    "shortTitle": "Slackボット・業務自動化",
    "title": "Slackボット・業務自動化（NDA）",
    "technologies": [
      "Slack",
      "Bot Development",
      "Workflow Automation"
    ],
    "description": "日本向けのSlackボットを利用した通知・業務自動化の匿名実績です。実際のワークスペース、メッセージ、社内運用情報は公開していません。",
    "scope": "Slackボットの機能と業務フローの連携処理を設計・実装。公開情報は担当領域の要約に限定し、社内固有のルールや接続構成は非公開です。 記載した月は公開表示用の参考値であり、実際の契約・稼働期間を示すものではありません。",
    "category": "システム開発",
    "field": "technology",
    "confidential": true,
    "period": "2026年02月〜2026年08月",
    "periodLabel": "公開表示用の参考期間",
    "thumbnail": "/images/portfolio/nda-slack-dashboard-v2.webp",
    "thumbnailAlt": "Slackボット・業務自動化の公開用コンセプト画面。実際のクライアント画面ではありません"
  },
  {
    "id": "utage-teacher-training",
    "thumbnail": "/images/portfolio/utage-teacher-training.webp",
    "thumbnailAlt": "教師向け 3か月オンライン養成講座の公開ページのスクリーンショット",
    "copyStatus": "draft",
    "title": "教師向け 3か月オンライン養成講座",
    "url": "https://utage-system.com/p/lloh2X5NECgz",
    "category": "ランディングページ",
    "period": "掲載情報に制作期間の記載なし",
    "description": "使命感・レジリエンス・AI活用をテーマにした、教師向けの3か月オンライン養成講座の紹介LPです。講座の考え方、カリキュラム、講師紹介、受講生の声を掲載し、受講を検討する方を申込へ案内します。",
    "scope": "担当範囲の文案例：講座の訴求整理、カリキュラム・講師紹介セクションの構成、UTAGEでのLP組み立て、申込ボタンとフォームの導線設計、スマートフォン表示の調整。",
    "technologies": ["UTAGE"],
    "market": "japan",
    "field": "education",
    "highlights": [
      { "title": "講座内容", "text": "教師向けの3か月間オンライン養成講座。" },
      { "title": "カリキュラム", "text": "テーマ別のカリキュラムを掲載。" },
      { "title": "講師・受講生", "text": "講師プロフィールと受講生の声を紹介。" },
      { "title": "講座の価値", "text": "講座の価値や受講後の変化を訴求。" }
    ]
  },
  {
    "id": "utage-toeic-course",
    "thumbnailScale": 1.45,
    "thumbnailOrigin": "center top",
    "thumbnail": "/images/portfolio/utage-toeic-course.webp",
    "thumbnailAlt": "TOEIC対策 無料オンライン講座の公開ページのスクリーンショット",
    "copyStatus": "draft",
    "title": "TOEIC対策 無料オンライン講座",
    "url": "https://utage-system.com/p/Hi4eHXtmlOz0",
    "category": "ランディングページ",
    "period": "掲載情報に制作期間の記載なし",
    "description": "TOEIC対策と仕事で使える英語力の学習方法を紹介する、無料動画講座の登録LPです。3ステップの講座内容、講師プロフィール、学習者の声を掲載し、メールアドレスの登録から動画視聴へつなげます。",
    "scope": "担当範囲の文案例：講座内容と見出しの整理、UTAGEのLPレイアウト作成、メール登録フォームの配置、動画視聴への案内文整備、画面サイズ別の表示と入力項目の確認。",
    "technologies": ["UTAGE"],
    "market": "japan",
    "field": "education",
    "highlights": [
      { "title": "講座", "text": "TOEIC対策の無料オンライン講座。" },
      { "title": "課題の提示", "text": "学習者の悩みを提示し、学習後に期待できる変化を訴求。" },
      { "title": "登録導線", "text": "無料受講の登録フォームを設置。" }
    ]
  },
  {
    "id": "utage-parent-course",
    "thumbnail": "/images/portfolio/utage-parent-course.webp",
    "thumbnailAlt": "子育て中の保護者向けオンライン講座の公開ページのスクリーンショット",
    "copyStatus": "draft",
    "title": "子育て中の保護者向けオンライン講座",
    "url": "https://utage-system.com/p/gnUglcxjjTqM",
    "category": "ランディングページ",
    "period": "掲載情報に制作期間の記載なし",
    "description": "子育て中の保護者向けオンライン講座・コミュニティ「ママの学校」の紹介ページです。親子のコミュニケーションをテーマに、講座の特徴、動画教材、オンライン授業、会員サイトでの学習環境を案内し、申込・決済ページへつなげます。",
    "scope": "担当範囲の文案例：講座とコミュニティの情報設計、教材・授業紹介のレイアウト作成、UTAGEでのページ実装、申込・決済への導線整理、スマートフォンでの可読性とボタン配置の調整。",
    "technologies": ["UTAGE"],
    "market": "japan",
    "field": "education",
    "highlights": [
      { "title": "対象", "text": "子育て中の保護者向けオンライン講座。" },
      { "title": "学習環境", "text": "動画教材・オンライン授業・会員サイトを案内。" },
      { "title": "授業", "text": "月2回のZoom授業。" },
      { "title": "継続学習", "text": "継続的な学習カリキュラムを掲載。" }
    ]
  },
  {
    "id": "utage-trial-lesson",
    "thumbnailScale": 1.6,
    "thumbnailOrigin": "center top",
    "thumbnail": "/images/portfolio/utage-trial-lesson.webp",
    "thumbnailAlt": "実店舗向け 初回無料体験レッスンの公開ページのスクリーンショット",
    "copyStatus": "draft",
    "title": "実店舗向け 初回無料体験レッスン",
    "url": "https://utage-system.com/page/rjcUhRyjEPrc",
    "category": "ランディングページ",
    "period": "掲載情報に制作期間の記載なし",
    "description": "ピラティススタジオの初回無料体験を案内する、スマートフォンで見やすい縦長LPです。スタジオの特徴、体験キャンペーン、駅からのアクセスをコンパクトにまとめ、仕事帰りの利用を検討する方を予約へ案内します。",
    "scope": "担当範囲の文案例：体験キャンペーンの見せ方とファーストビューの構成、スタジオ紹介・アクセス情報の配置、UTAGEでのLP実装、予約ボタンの設置、スマートフォン表示の調整。",
    "technologies": ["UTAGE"],
    "market": "japan",
    "field": "education",
    "highlights": [
      { "title": "体験募集", "text": "初回無料体験レッスンを案内。" },
      { "title": "限定訴求", "text": "月5名限定のキャンペーン。" },
      { "title": "料金訴求", "text": "通常2,500円の体験を初回0円で案内。" },
      { "title": "利用シーン", "text": "仕事帰りの利用を想定した訴求。" }
    ]
  },
  {
    "id": "utage-treatment-trial",
    "thumbnailScale": 1.65,
    "thumbnailOrigin": "center top",
    "thumbnail": "/images/portfolio/utage-treatment-trial.webp",
    "thumbnailAlt": "初回体験コース・予約LPの公開ページのスクリーンショット",
    "copyStatus": "draft",
    "title": "初回体験コース・予約LP",
    "url": "https://utage-system.com/page/6Xt9nRj4vLBN",
    "category": "ランディングページ",
    "period": "掲載情報に制作期間の記載なし",
    "description": "サロンの初回施術体験を案内する予約LPです。コースの紹介、体験料金、カウンセリングから施術後までの流れを掲載し、利用者の声とあわせて検討材料を提示。第1〜第3希望日を入力できる予約フォームへつなげます。",
    "scope": "担当範囲の文案例：コース情報と料金表示の整理、施術の流れ・利用者の声のレイアウト作成、UTAGEでのLP組み立て、希望日入力フォームの設計、予約周辺の案内文と表示の確認。",
    "technologies": ["UTAGE"],
    "market": "japan",
    "field": "beauty",
    "highlights": [
      { "title": "体験コース", "text": "通常25,000円から特別価格15,000円への訴求。" },
      { "title": "施術の流れ", "text": "カウンセリングから施術後までを掲載。" },
      { "title": "予約フォーム", "text": "第1〜第3希望日を入力可能。" }
    ]
  },
  {
    "id": "utage-regional-trial-events",
    "thumbnailScale": 1.5,
    "thumbnailOrigin": "center top",
    "thumbnail": "/images/portfolio/utage-regional-trial-events.webp",
    "thumbnailAlt": "地域別 対面体験会・申し込みページの公開ページのスクリーンショット",
    "copyStatus": "draft",
    "title": "地域別 対面体験会・申し込みページ",
    "url": "https://utage-system.com/p/P8q3fQ98wsrT?area=tokai_hokuriku",
    "category": "ランディングページ",
    "period": "掲載情報に制作期間の記載なし",
    "description": "地域別の対面体験会を選び、参加を申し込めるページです。地域に応じた開催日時・会場・残席数を表示し、参加者情報、支払方法、同伴者、キャンセル規定をまとめて確認できる構成で、申込確認へ案内します。",
    "scope": "担当範囲の文案例：地域別の日程選択と残席表示の構成、参加者・同伴者・支払方法のフォーム項目設計、UTAGEでのページ実装、注意事項と確認画面への導線整理、選択内容と表示の動作確認。",
    "technologies": ["UTAGE"],
    "market": "japan",
    "field": "education",
    "highlights": [
      { "title": "地域別の日程", "text": "地域を選択すると該当地域の開催日程を表示。" },
      { "title": "開催情報", "text": "開催場所・日時・残席数を掲載。" },
      { "title": "申込情報", "text": "参加者情報・支払方法・注意事項を入力。" },
      { "title": "申込後の案内", "text": "申込完了後に自動返信メールを送信。" }
    ]
  },
  {
    "id": "global-hush-uk",
    "copyStatus": "draft",
    "shortTitle": "Hush",
    "title": "Hush — UK Website",
    "url": "https://www.hush-uk.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-hush-uk.webp",
    "thumbnailAlt": "Hush homepage hero image",
    "period": "United Kingdom · August–September 2020",
    "periodLabel": "Project period and location",
    "description": "A fashion storefront concept that brings seasonal collections, editorial imagery and everyday styling ideas into a cohesive shopping experience. The sample direction emphasizes clear product discovery and a calm, mobile-friendly presentation.",
    "scope": "Sample contribution: organize collection navigation, design responsive product and editorial layouts, implement reusable interface components, and review the journey from browsing to product selection.",
    "technologies": ["Vue", "Nuxt", "Node.js", "Tailwind CSS", "Vercel"],
    "market": "global",
    "field": "fashion"
  },
  {
    "id": "global-lomi-cafe",
    "copyStatus": "draft",
    "shortTitle": "Lomi Café",
    "title": "Lomi Café — Website",
    "url": "https://lomi.cafe/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-lomi-cafe.webp",
    "thumbnailAlt": "Lomi Café website homepage screenshot",
    "period": "France · May–June 2022",
    "periodLabel": "Project period and location",
    "description": "A coffee-brand website concept connecting the character of a roastery with its coffee selection, brewing equipment and learning experiences. Large imagery and concise storytelling create a warm introduction to the brand.",
    "scope": "Sample contribution: develop the page structure, translate brand storytelling into responsive layouts, build image-led sections and product entry points, and refine typography and navigation across screen sizes.",
    "technologies": ["React", "Next.js", "Node.js", "Swiper"],
    "market": "global",
    "field": "lifestyle"
  },
  {
    "id": "global-lambert-bags",
    "copyStatus": "draft",
    "shortTitle": "Lambert Bags",
    "title": "Lambert Bags — E-Commerce Website",
    "url": "https://lambertbags.com/",
    "category": "ECサイト",
    "thumbnail": "/images/portfolio/global-lambert-bags.webp",
    "thumbnailAlt": "Lambert Bags website homepage screenshot",
    "period": "Canada · February–March 2022",
    "periodLabel": "Project period and location",
    "description": "An e-commerce concept for bags and accessories that balances lifestyle photography with practical product information. The sample presentation makes it easy to explore collections and compare everyday essentials.",
    "scope": "Sample contribution: configure Shopify collection templates, arrange product imagery and variant information, customize reusable storefront sections, and check the mobile shopping flow and visual consistency.",
    "technologies": ["Shopify"],
    "market": "global",
    "field": "fashion"
  },
  {
    "id": "global-la-crawfish",
    "copyStatus": "draft",
    "shortTitle": "LA Crawfish",
    "title": "LA Crawfish — Website",
    "url": "https://www.lacrawfish.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-la-crawfish.webp",
    "thumbnailAlt": "Louisiana Crawfish Company shipped-fresh image from its website",
    "period": "United States · March–April 2022",
    "periodLabel": "Project period and location",
    "description": "A seafood retail website concept that combines product discovery with clear ordering and delivery guidance. An approachable visual hierarchy helps visitors move between product categories and useful preparation information.",
    "scope": "Sample contribution: plan category and content navigation, create responsive promotional sections, organize product and delivery information, and review calls to action and readability on mobile devices.",
    "technologies": ["WordPress"],
    "market": "global",
    "field": "lifestyle"
  },
  {
    "id": "global-facefacts-buxton",
    "copyStatus": "draft",
    "shortTitle": "Facefacts Buxton",
    "title": "Facefacts Buxton — Website",
    "url": "https://www.facefactsbuxton.co.uk/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-facefacts-buxton.webp",
    "thumbnailAlt": "Facefacts Buxton website homepage screenshot",
    "period": "United Kingdom · March–April 2020",
    "periodLabel": "Project period and location",
    "description": "A beauty and skincare website concept presenting treatments in an approachable, reassuring format. Service categories, treatment imagery and clear contact paths help visitors understand their options before making an inquiry.",
    "scope": "Sample contribution: structure treatment information, design reusable service-page components, implement responsive page layouts, and improve the visibility of consultation and appointment entry points.",
    "technologies": ["React", "Next.js", "Node.js", "Tailwind CSS", "Vercel"],
    "market": "global",
    "field": "beauty"
  },
  {
    "id": "global-van-michael",
    "copyStatus": "draft",
    "shortTitle": "Van Michael",
    "title": "Van Michael — Website",
    "url": "https://vanmichael.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-van-michael.webp",
    "thumbnailAlt": "Van Michael website homepage screenshot",
    "period": "United States · February–March 2020",
    "periodLabel": "Project period and location",
    "description": "A salon website concept built around expressive photography, confident typography and a clear introduction to the salon experience. The sample direction balances a strong brand impression with useful service and location information.",
    "scope": "Sample contribution: compose the visual hierarchy, implement responsive image sections and restrained transitions, organize salon and service navigation, and refine appointment calls to action.",
    "technologies": ["GSAP", "Swiper"],
    "market": "global",
    "field": "beauty"
  },
  {
    "id": "global-koko-hair",
    "copyStatus": "draft",
    "shortTitle": "Koko Hair",
    "title": "Koko Hair — Website",
    "url": "https://kokohair.co.uk/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-koko-hair.webp",
    "thumbnailAlt": "Koko Hair website homepage screenshot",
    "period": "United Kingdom · July–August 2022",
    "periodLabel": "Project period and location",
    "description": "A hair-salon website concept highlighting style, atmosphere and the range of available services. The layout pairs large visual moments with concise information so visitors can explore the salon comfortably on any device.",
    "scope": "Sample contribution: adapt a content-managed page structure, build responsive service and gallery layouts, arrange navigation and booking links, and check image presentation and basic accessibility.",
    "technologies": ["WordPress", "React", "MySQL"],
    "market": "global",
    "field": "beauty"
  },
  {
    "id": "global-beauty-lounge-bergedorf",
    "copyStatus": "draft",
    "shortTitle": "Beauty Lounge Bergedorf",
    "title": "Beauty Lounge Bergedorf — E-Commerce Website",
    "url": "https://beauty-lounge-bergedorf.de/",
    "category": "ECサイト",
    "thumbnail": "/images/portfolio/global-beauty-lounge-bergedorf.webp",
    "thumbnailAlt": "Beauty Lounge Bergedorf website homepage screenshot",
    "period": "Germany · March–May 2021",
    "periodLabel": "Project period and location",
    "description": "A beauty and wellness website concept bringing salon services, spa treatments and retail information into a unified visual experience. Soft color accents and organized content support a relaxed browsing experience.",
    "scope": "Sample contribution: customize page templates and reusable content blocks, organize treatment and product categories, adjust responsive layouts, and review service-to-inquiry navigation.",
    "technologies": ["WooCommerce", "Elementor", "Swiper", "Astra", "MySQL"],
    "market": "global",
    "field": "beauty"
  },
  {
    "id": "global-anushka-spa",
    "copyStatus": "draft",
    "shortTitle": "Anushka Spa",
    "title": "Anushka Spa — Website",
    "url": "https://www.anushkaspa.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-anushka-spa.webp",
    "thumbnailAlt": "Anushka Spa website homepage screenshot",
    "period": "United States · August–September 2024",
    "periodLabel": "Project period and location",
    "description": "A spa and salon website concept combining a premium editorial feel with clear treatment discovery. Spacious layouts and carefully paced imagery introduce the setting while keeping service information easy to find.",
    "scope": "Sample contribution: plan the homepage narrative, create responsive treatment-page layouts, arrange image galleries and promotional sections, and refine the hierarchy of booking and contact actions.",
    "technologies": ["WordPress"],
    "market": "global",
    "field": "beauty"
  },
  {
    "id": "global-manor-real-estate",
    "copyStatus": "draft",
    "shortTitle": "Manor Real Estate",
    "title": "Manor Real Estate — Website",
    "url": "https://manorrealestate.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-manor-real-estate.webp",
    "thumbnailAlt": "Manor Real Estate website homepage screenshot",
    "period": "United States · September–November 2022",
    "periodLabel": "Project period and location",
    "description": "A real-estate website concept that presents property opportunities alongside company and service information. A structured layout gives property imagery room to stand out while keeping practical details accessible.",
    "scope": "Sample contribution: design property-card and detail-page layouts, organize service navigation and inquiry paths, build responsive listing sections, and check content hierarchy across desktop and mobile views.",
    "technologies": [],
    "market": "global",
    "field": "realestate"
  },
  {
    "id": "global-charcot-immobilier",
    "copyStatus": "draft",
    "shortTitle": "Charcot Immobilier",
    "title": "Charcot Immobilier — Website",
    "url": "https://www.charcot-immobilier.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-charcot-immobilier.webp",
    "thumbnailAlt": "Charcot Immobilier website homepage screenshot",
    "period": "France · 2022",
    "periodLabel": "Project period and location",
    "description": "A property-agency website concept combining local expertise, attractive listing imagery and approachable contact options. The sample structure guides visitors from an initial property search toward more detailed information.",
    "scope": "Sample contribution: define the listing and agency-page structure, design responsive property information blocks, organize search and contact entry points, and refine spacing and image treatment.",
    "technologies": [],
    "market": "global",
    "field": "realestate"
  },
  {
    "id": "global-lancastrian-estates",
    "copyStatus": "draft",
    "shortTitle": "Lancastrian Estates",
    "title": "Lancastrian Estates — Website",
    "url": "https://www.lancastrianestates.co.uk/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-lancastrian-estates.webp",
    "thumbnailAlt": "Lancastrian Estates team image from its website",
    "period": "United Kingdom · November 2022",
    "periodLabel": "Project period and location",
    "description": "An estate-agency website concept supporting visitors exploring property sales, lettings and valuation services. Clear service pathways and consistent listing layouts help different audiences reach relevant information.",
    "scope": "Sample contribution: customize content-managed templates, organize buyer and landlord navigation, compose property and branch information sections, and review responsive inquiry and valuation calls to action.",
    "technologies": ["WordPress"],
    "market": "global",
    "field": "realestate"
  },
  {
    "id": "global-kent-place",
    "copyStatus": "draft",
    "shortTitle": "Kent Place",
    "title": "Kent Place — Website",
    "url": "https://www.kentplace.org/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-kent-place.webp",
    "thumbnailAlt": "Kent Place website homepage screenshot",
    "period": "United States · March–May 2022",
    "periodLabel": "Project period and location",
    "description": "An education website concept using school-life imagery and a clear information hierarchy to introduce learning opportunities and community activities. The sample direction supports prospective families as they explore the school.",
    "scope": "Sample contribution: organize admissions and programme navigation, design responsive editorial sections, create reusable event and news layouts, and review accessible reading order and contact pathways.",
    "technologies": ["Java", "Firebase"],
    "market": "global",
    "field": "education"
  },
  {
    "id": "global-sgs",
    "copyStatus": "draft",
    "shortTitle": "SGS",
    "title": "SGS — Website",
    "url": "https://sgs.org/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-sgs.webp",
    "thumbnailAlt": "SGS website homepage screenshot",
    "period": "Canada · November–December 2022",
    "periodLabel": "Project period and location",
    "description": "An institutional website concept that brings an organization’s identity, activities and community stories into a coherent presentation. Large visual sections are balanced with concise navigation and reusable editorial content.",
    "scope": "Sample contribution: establish a flexible content structure, compose news and information templates, implement responsive page sections, and refine navigation consistency and editorial readability.",
    "technologies": ["WordPress"],
    "market": "global",
    "field": "corporate"
  },
  {
    "id": "global-beacon-derm",
    "copyStatus": "draft",
    "shortTitle": "Beacon Dermatology",
    "title": "Beacon Dermatology — Website",
    "url": "https://www.beaconderm.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-beacon-derm.webp",
    "thumbnailAlt": "Beacon Dermatology website homepage screenshot",
    "period": "Canada · June–September 2020",
    "periodLabel": "Project period and location",
    "description": "A dermatology-clinic website concept organizing clinic information and treatment categories into a clear, reassuring experience. The sample presentation prioritizes readable service descriptions and straightforward inquiry options.",
    "scope": "Sample contribution: structure treatment and clinic pages, develop reusable responsive components, arrange consultation calls to action, and check contrast, text hierarchy and mobile navigation.",
    "technologies": ["React", "Next.js", "Node.js", "Vercel"],
    "market": "global",
    "field": "healthcare"
  },
  {
    "id": "global-pillway",
    "copyStatus": "draft",
    "shortTitle": "Pillway",
    "title": "Pillway — Website",
    "url": "https://www.pillway.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-pillway.webp",
    "thumbnailAlt": "Pillway website homepage screenshot",
    "period": "Canada · March–May 2021",
    "periodLabel": "Project period and location",
    "description": "A digital-pharmacy website concept explaining a service journey through concise steps, approachable illustrations and clear support information. The sample content structure helps visitors understand the service before taking the next step.",
    "scope": "Sample contribution: plan the service-explanation flow, design responsive feature and FAQ sections, implement clear conversion entry points, and review the usability of supporting information and navigation.",
    "technologies": [],
    "market": "global",
    "field": "healthcare"
  },
  {
    "id": "global-jetts",
    "copyStatus": "draft",
    "shortTitle": "Jetts",
    "title": "Jetts — Website",
    "url": "https://jetts.co.uk/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-jetts.webp",
    "thumbnailAlt": "Jetts website homepage screenshot",
    "period": "United Kingdom · May–August 2023",
    "periodLabel": "Project period and location",
    "description": "A fitness-club website concept that pairs energetic imagery with practical information about locations and membership options. The layout balances a strong first impression with clear routes to club details and inquiries.",
    "scope": "Sample contribution: build reusable location and membership sections, arrange promotional content and calls to action, customize responsive templates, and review the mobile club-discovery experience.",
    "technologies": ["WordPress"],
    "market": "global",
    "field": "fitness"
  },
  {
    "id": "global-catering",
    "copyStatus": "draft",
    "shortTitle": "Catering.com",
    "title": "Catering.com — Website",
    "url": "https://catering.com/",
    "category": "ウェブサイト",
    "thumbnail": "/images/portfolio/global-catering.webp",
    "thumbnailAlt": "Catering.com website homepage screenshot",
    "period": "May–July 2023",
    "periodLabel": "Project period",
    "description": "An event-catering website concept using food and event photography to introduce service options and inspire planning. The sample presentation leads visitors from visual exploration toward an organized event inquiry.",
    "scope": "Sample contribution: compose image-led service pages, organize gallery and event information, create responsive inquiry entry points, and refine page rhythm, navigation and content-managed layouts.",
    "technologies": ["WordPress"],
    "market": "global",
    "field": "lifestyle"
  },
  {
    "id": "nda-clinic-line-reminder",
    "shortTitle": "医療機関向けLINE予約・フォロー",
    "title": "医療機関向け LINE予約リマインド＆自動フォローアップシステム",
    "category": "システム開発",
    "field": "healthcare",
    "market": "japan",
    "confidential": true,
    "thumbnailKind": "representative",
    "thumbnail": "/images/portfolio/nda-clinic-line-reminder-01.webp",
    "thumbnailAlt": "医療機関向けLINE予約リマインドシステムの管理画面と通知の掲載用代表画像",
    "gallery": [
      { "src": "/images/portfolio/nda-clinic-line-reminder-01.webp", "alt": "予約管理画面と予約前日・当日のLINEリマインドの代表画像" },
      { "src": "/images/portfolio/nda-clinic-line-reminder-02.webp", "alt": "術後フォローアップの自動配信と回答状況を管理する画面の代表画像" },
      { "src": "/images/portfolio/nda-clinic-line-reminder-03.webp", "alt": "未応答時にクリニックスタッフへ通知する管理画面の代表画像" }
    ],
    "period": "2025年2月〜2025年5月（4ヶ月）",
    "periodLabel": "開発期間",
    "description": "患者様へ予約前日と当日の決まった時間にLINEでリマインドを自動送信し、来院状況や術後の体調を確認するシステムです。指定時間内に返信がない場合は再通知し、未応答が続いた場合はクリニックの管理画面にアラートを表示して、スタッフが電話で確認できる仕組みを構築しました。指定時間での配信、未応答時の再通知、運営側への通知を組み合わせる構成例です。",
    "scope": "兄：AWSインフラ設計、要件定義、PythonによるLINE Messaging API連携とバッチ処理の開発を担当。弟：高齢の方にも見やすいLINEリッチメニューとスタッフ用管理画面のUI/UXデザインを担当しました。",
    "technologies": ["Python", "FastAPI", "AWS EventBridge", "AWS Lambda", "Amazon DynamoDB", "LINE Messaging API"],
    "skills": ["AWSインフラ設計", "LINE Messaging API連携", "バッチ処理", "UI/UXデザイン"],
    "highlights": [
      { "title": "定時リマインド", "text": "予約前日と当日の指定時刻にLINEで自動通知。" },
      { "title": "未応答時の再通知", "text": "一定時間内に返信がない場合は再通知し、対応状況を記録。" },
      { "title": "スタッフへのエスカレーション", "text": "未応答が続いた患者様を管理画面で知らせ、電話確認につなげます。" }
    ]
  },
  {
    "id": "nda-construction-line-health",
    "shortTitle": "建設業向けLINE安否・体調確認",
    "title": "建設業向け LINE従業員安否確認・体調管理システム",
    "category": "システム開発",
    "field": "corporate",
    "market": "japan",
    "confidential": true,
    "thumbnailKind": "representative",
    "thumbnail": "/images/portfolio/nda-construction-line-health-01.webp",
    "thumbnailAlt": "建設業向けLINE従業員安否確認と未回答者への再通知の掲載用代表画像",
    "gallery": [
      { "src": "/images/portfolio/nda-construction-line-health-01.webp", "alt": "未回答の作業員へLINEで自動リマインドを送る管理画面の代表画像" },
      { "src": "/images/portfolio/nda-construction-line-health-02.webp", "alt": "毎朝の体調確認を一斉配信し回答状況を確認する画面の代表画像" },
      { "src": "/images/portfolio/nda-construction-line-health-03.webp", "alt": "未応答者を現場責任者へ通知する管理画面の代表画像" }
    ],
    "period": "2025年8月〜2025年11月（4ヶ月）",
    "periodLabel": "開発期間",
    "description": "数百名規模の作業員を対象に、毎朝指定の時間に体調確認のLINEメッセージを一斉送信するシステムです。一定時間内に回答がない作業員には自動で再送し、それでも応答がない場合は現場責任者のLINEと管理画面に緊急通知を送ります。小規模テストから始め、段階的に対象者を拡大しました。",
    "scope": "兄：データベース設計、プロジェクト管理、バックエンドのロジック実装、クラウドサーバー構築を担当。弟：直感的に操作できる管理者用ダッシュボードのUI設計を担当しました。",
    "technologies": ["Python", "Django", "AWS EC2", "Amazon RDS", "Amazon SQS", "LINE Messaging API", "PostgreSQL"],
    "skills": ["データベース設計", "バックエンド開発", "AWS構築", "管理画面UI設計"],
    "highlights": [
      { "title": "毎朝の一斉配信", "text": "指定時刻に作業員へ体調確認メッセージを送信。" },
      { "title": "回答状況の把握", "text": "回答・未回答と再通知の状況を管理画面で確認。" },
      { "title": "段階的な展開", "text": "小規模なテストから開始し、対象者を段階的に拡大。" }
    ]
  },
  {
    "id": "nda-restaurant-line-ai-support",
    "shortTitle": "飲食チェーン向けLINE AI応対",
    "title": "飲食チェーン向け AI連携LINE自動応対＆エスカレーションボット",
    "category": "システム開発",
    "field": "lifestyle",
    "market": "japan",
    "confidential": true,
    "thumbnailKind": "representative",
    "thumbnail": "/images/portfolio/nda-restaurant-line-ai-01.webp",
    "thumbnailAlt": "飲食チェーン向けLINE AI自動応対とスタッフ引き継ぎ画面の掲載用代表画像",
    "gallery": [
      { "src": "/images/portfolio/nda-restaurant-line-ai-01.webp", "alt": "AI応対中の問い合わせと有人対応への引き継ぎを管理する画面の代表画像" },
      { "src": "/images/portfolio/nda-restaurant-line-ai-02.webp", "alt": "飲食店への問い合わせにLINE上でAIが応答する代表画像" }
    ],
    "period": "2026年3月〜2026年5月（3ヶ月）",
    "periodLabel": "開発期間",
    "description": "顧客からの問い合わせにAIがLINE上で自動応答し、複雑な要件や返信が途絶えた場合には、対話履歴を人間のオペレーターへ引き継ぐシステムです。将来的なAI会話機能の追加を見据え、自然言語処理モデル（LLM）をLINEボットへ組み込む構成を扱いました。",
    "scope": "兄：システム全体のアーキテクチャ策定、LLMのプロンプト設計、API統合、セキュリティ対策を担当。弟：ブランドイメージに合わせたキャラクターデザインと操作画面のUX改善を担当しました。",
    "technologies": ["Python", "AWS API Gateway", "AWS Lambda", "LINE Messaging API", "OpenAI API（LLM）"],
    "skills": ["LLM連携", "プロンプト設計", "API統合", "セキュリティ対策", "UX改善"],
    "highlights": [
      { "title": "AIによる一次応対", "text": "LINEで届く問い合わせにAIが自動で応答。" },
      { "title": "有人対応への引き継ぎ", "text": "複雑な相談や応答が止まった会話を、履歴とともにスタッフへ引き継ぎます。" },
      { "title": "安全性を考慮した統合", "text": "LLMと各種APIを連携し、セキュリティに配慮した構成を設計。" }
    ]
  }
];
