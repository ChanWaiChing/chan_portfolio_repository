import type { PortfolioField } from "./portfolio-fields";
/** Project descriptions, dates, responsibilities and stacks supplied by the site owner. */
export const portfolioCategories = ["すべて", "ウェブサイト", "ECサイト", "ランディングページ", "システム開発"] as const;
export type PortfolioMarket = "japan" | "global";
export type PortfolioProject = {
  id: string; title: string; description: string; url?: string; category: string;
  thumbnail: string; technologies: string[]; period: string; scope: string; field: PortfolioField;
  preview?: boolean; market: PortfolioMarket; shortTitle?: string; skills?: string[]; periodLabel?: string; thumbnailAlt?: string; confidential?: boolean; highlights?: { title: string; text: string }[];
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
    "thumbnail": "/images/portfolio/global-sparky.webp",
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
    "thumbnail": "/images/portfolio/nda-kintone.webp",
    "thumbnailAlt": "kintone業務アプリ連携の公開用概念図。実際の画面・構成ではありません"
  },
  {
    "id": "nda-n8n",
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
    "thumbnail": "/images/portfolio/nda-n8n.webp",
    "thumbnailAlt": "n8n Workflow Automation: public conceptual diagram, not an actual system screen",
    "skills": [
      "Workflow Automation",
      "Service Integration"
    ]
  },
  {
    "id": "nda-saas",
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
    "thumbnail": "/images/portfolio/nda-saas.webp",
    "thumbnailAlt": "SaaS System Development: public conceptual diagram, not an actual system screen",
    "skills": [
      "System Development",
      "Service Integration"
    ]
  },
  {
    "id": "nda-ai-workflow",
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
    "thumbnail": "/images/portfolio/nda-ai-workflow.webp",
    "thumbnailAlt": "AI / LLM Workflow Automation: public conceptual diagram, not an actual system screen",
    "skills": [
      "AI Integration",
      "Workflow Automation"
    ]
  },
  {
    "id": "nda-api-security",
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
    "thumbnail": "/images/portfolio/nda-api-security.webp",
    "thumbnailAlt": "API Security & Integration: public conceptual diagram, not an actual system screen",
    "skills": [
      "API Integration",
      "Authentication & Access Control"
    ]
  },
  {
    "id": "nda-infrastructure",
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
    "thumbnail": "/images/portfolio/nda-infrastructure.webp",
    "thumbnailAlt": "Infrastructure & Operations: public conceptual diagram, not an actual system screen",
    "skills": [
      "Infrastructure Setup",
      "Operational Support"
    ]
  },
  {
    "id": "nda-excel",
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
    "thumbnail": "/images/portfolio/nda-excel.webp",
    "thumbnailAlt": "Excel業務自動化の公開用概念図。実際の画面・構成ではありません"
  },
  {
    "id": "nda-whatsapp",
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
    "thumbnail": "/images/portfolio/nda-whatsapp.webp",
    "thumbnailAlt": "WhatsApp Bot Development: public conceptual diagram, not an actual system screen",
    "skills": [
      "Bot Development",
      "Messaging Integration"
    ]
  },
  {
    "id": "nda-telegram",
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
    "thumbnail": "/images/portfolio/nda-telegram.webp",
    "thumbnailAlt": "Telegram Bot Development: public conceptual diagram, not an actual system screen",
    "skills": [
      "Bot Development",
      "Messaging Integration"
    ]
  },
  {
    "id": "nda-line",
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
    "thumbnail": "/images/portfolio/nda-line.webp",
    "thumbnailAlt": "LINEボット・業務連携の公開用概念図。実際の画面・構成ではありません"
  },
  {
    "id": "nda-slack",
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
    "thumbnail": "/images/portfolio/nda-slack.webp",
    "thumbnailAlt": "Slackボット・業務自動化の公開用概念図。実際の画面・構成ではありません"
  }
];
