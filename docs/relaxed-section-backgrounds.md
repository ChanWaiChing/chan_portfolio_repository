# リラックスした背景と左側の読書コントロール

復元したバージョン８の構成を維持し、スクロール操作を左へ移動。デスクトップでは左の76ピクセルの余白内、携帯画面では左下に収めています。携帯画面の演出停止ボタンは右下へ移し、フッターナビゲーション下に操作用の余白を確保。

各章には９種類の新しい風景写真を使用。写真だけを独立した疑似要素に置き、デスクトップは5ピクセル、携帯画面は3ピクセルのぼかしを適用。読み取り用の半透明レイヤーと、共通の背景色へ溶ける上下のマスクで切れ目をなじませています。文章・カード・画像・操作部品にはぼかしをかけていません。

ヒーローの背景は、複数の章を含む紹介セクション全体ではなく、ヒーロー自体の高さでフェードします。フッター画像は既存の画像と縦横比を維持し、デスクトップで左右32ピクセル、携帯画面で左右14ピクセルの余白と角丸を追加。

## 素材と最終プロンプト

組み込み画像生成ツールで各素材を別々に生成。WebPに形式変換して以下に保存。写真のぼかしはCSSで適用しています。

共通プロンプト（各Sceneと連結して使用）：

> Use case: photorealistic-natural. Create a wide landscape editorial photograph as a comfortable relaxed website section background. Natural Japanese contemporary interior/architecture, pale limestone, muted sage, mist blue and soft warm gray, gentle overcast daylight, understated refined materials. Central 65 percent spacious and uncluttered for website content, objects concentrated near edges. Calm medium-light exposure, low saturation, no bright glare or heavy shadows. Sharp believable material details in the source, no artificial blur because the website will apply moderate CSS blur. No people, robots, logos, letters or text. Scene: 

### relaxed-welcome

保存先：`public/images/environments/relaxed-welcome.webp`

Scene: An inviting contemporary Japanese studio lounge with low linen sofa, pale oak floor, large window, muted blue-gray cushions and a potted olive at the far edge.

### relaxed-selected

保存先：`public/images/environments/relaxed-selected.webp`

Scene: A quiet creative studio tabletop with one closed sketchbook, cream paper samples and a small ceramic vase at the right edge, afternoon garden light.

### relaxed-about

保存先：`public/images/environments/relaxed-about.webp`

Scene: A comfortable small studio meeting nook with two simple upholstered chairs and a round pale wood table, soft sage walls and greenery through a window.

### relaxed-services

保存先：`public/images/environments/relaxed-services.webp`

Scene: A peaceful covered garden terrace, slender timber beams, a low side table and soft linen seating at the edges, bamboo leaves beyond glass.

### relaxed-process

保存先：`public/images/environments/relaxed-process.webp`

Scene: A calm Japanese courtyard path of broad warm-gray stone slabs alongside moss and low maple branches, inviting gentle progression.

### relaxed-packages

保存先：`public/images/environments/relaxed-packages.webp`

Scene: An airy design studio library wall with pale oak shelving, a few neatly arranged books and material samples at the edges, a generous uncluttered plaster plane in the center.

### relaxed-portfolio

保存先：`public/images/environments/relaxed-portfolio.webp`

Scene: A serene contemporary gallery lounge with softly textured limewash walls and a long oak bench along the side, subtle framed abstract artworks in muted sage and slate.

### relaxed-faq

保存先：`public/images/environments/relaxed-faq.webp`

Scene: A cozy reading nook with a linen armchair, small ceramic tea cup on a side table, a low bookshelf, tranquil diffused window light.

### relaxed-contact

保存先：`public/images/environments/relaxed-contact.webp`

Scene: A restful studio desk by a garden window, an unmarked simple wall clock, a closed notebook and a small ceramic cup at the outer edges; an atmosphere of unhurried personal attention.

## 検証

本番ビルド、背景９件の読み込み、写真のみのぼかし、読みやすさ、フッターの余白、スクロール操作、カテゴリの中央配置、ヒーロー切り替え、320〜1440ピクセルのはみ出しをデスクトップ・携帯ブラウザーで確認。

