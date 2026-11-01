import type { PortfolioField } from "./portfolio-fields";
/** Project descriptions, dates, responsibilities and stacks supplied by the site owner. */
export const portfolioCategories = ["すべて", "ウェブサイト", "ECサイト", "ランディングページ"] as const;
export type PortfolioMarket = "japan" | "global";
export type PortfolioProject = {
  id: string; title: string; description: string; url: string; category: string;
  thumbnail: string; technologies: string[]; period: string; scope: string; field: PortfolioField;
  preview?: boolean; market: PortfolioMarket; shortTitle?: string; skills?: string[]; periodLabel?: string; thumbnailAlt?: string;
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
  }
];
