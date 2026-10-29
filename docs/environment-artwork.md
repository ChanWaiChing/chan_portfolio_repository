# 背景画像とパッケージの簡略化

2026年10月29日。組み込みの画像生成ツールを使用しました。元の生成画像は保持し、下記の軽量なウェブピー画像をサイト内へ保存しています。背景は装飾として扱い、本文は通常の日本語テキストです。

| 保存先 | 用途 |
| --- | --- |
| `public/images/environments/studio-light.webp` | 紹介・パッケージ・お問い合わせ |
| `public/images/environments/paper-architecture.webp` | 制作デモ・進め方・実績 |
| `public/images/environments/garden-light.webp` | サービス・よくあるご質問 |
| `public/images/environments/footer-collaboration.webp` | フッターの人物・ボットの背景 |

白に近い不透明のベールを画像に重ね、文字のあるカードは白い面で保護。画像の最暗部を仮定した本文色とのコントラストもテストします。背景画像は固定せず、アニメーションを追加していません。既存の七色ホバー・フォーカス発光を維持しています。

フッターには4人の大人と、異なる姿勢のボットを描写しています。人物と重なる位置に本文を置かず、画面幅にかかわらず全景が入る3対1の比率を保ちます。掲載画像は生成したブランド用の情景です。

パッケージカードはサムネイル・分類・名称・短い説明・詳細ボタンに簡略化。赤枠で指定された対応内容、税別価格、制作期間、最小価格に含む範囲、修正・追加費用の条件を詳細ダイアログへ移動しました。元の20件の料金とプランは変更していません。

## 使用した生成プロンプト

### スタジオ

Elegant photographic background for a refined Japanese web design and development studio website, extra-wide 16:9 image. Empty contemporary creative studio interior, pale limestone, frosted glass, clean oak desk edges, translucent curtains, soft daylight and distant greenery, subtle blue-gray accents. No people, robots, screens, lettering, logos, clutter, furniture in the center. Extremely quiet low-contrast composition with generous light open space, tactile architectural photography, premium Japanese editorial aesthetic. Decorative background behind dark navy web text, keep strongest details near edges and lower corners. Natural not artificial, no colorful gradients or neon.

### 紙とガラス

Premium abstract photographic background for a calm Japanese design studio website, landscape 16:9. Real sculptural folded ivory paper and gently curving milky glass panels on warm pale limestone, very faint slate-blue reflections and soft warm shadows, restrained contemporary editorial still life. Large central area of quiet warm white space. Layered forms only at perimeter, subtle detail and no high contrast. No text, logos, people or interfaces. Elegant, architectural, tactile, not sci-fi, not a UI mockup. Used behind readable dark navy website copy.

### 庭の光

Elegant natural photographic website section background for a premium Japanese creative studio, landscape 16:9. Soft shadows of maple leaves through a shoji-inspired frosted window onto pale mineral plaster, fine oak edge, a hint of sage greenery outside at far right. Morning daylight, serene understated Japanese architecture, beautiful real materials, restrained cool white and light sage palette. Very quiet near-white center with details around the perimeter; low contrast intended behind navy body text. No people, dolls, robots, text, brands or interfaces. Not a dark scene, no saturation, no neon.

### フッター

Edit/reference task: use the SECOND uploaded image (the sunny street shelter with green doll and yellow Yoom poster) as the composition reference, NOT the package screenshot. Create a new elegant ultra-wide website footer background, cinematic editorial photo, 3:1 landscape. Replace all plush doll characters with the website's friendly small glossy WHITE robots with black glass faces, cyan smiling eyes, and colorful swept hair: blue-purple, orange-pink, mint-purple, peach. Include exactly FOUR natural Japanese adult human figures (two men and two women, late twenties to thirties) in tasteful contemporary smart casual clothes, standing and sitting casually beside the wooden shelter bench, collaboratively looking at a silver laptop and a sketchbook. Humans lead the conversation. Four small robots support them, each with a DISTINCT pose: one seated on bench looking at sketch, one offering an idea, one holding a small tablet, one waving gently. No giant robots, no toys or plush dolls. Keep realistic scale, believable light and contact shadows. Adapt shelter/storefront to a refined Japanese design studio street scene: pale limestone, glass, warm oak, subtle plants, soft morning daylight, subdued navy and sage accents. Remove Yoom branding, yellow billboard, English slogans, all text, watermark, and advertising. Replace poster panel with frosted glass. Place people and bots primarily across the LOWER HALF and outer sides, preserving quiet upper areas for readable website copy overlay. Premium, natural, sophisticated, human warmth; no neon atmosphere or loud colors.
