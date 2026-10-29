# UIレビューの修正

2026年10月29日のデスクトップ・携帯画面レビューに対応。

- 左の読書レールと縦組み見出しを維持。携帯画面では見出しの余白を導入部分だけにし、カード・フォームの幅を回復。レールの矢印は44ピクセル、章の名称と実際のセクション位置の目盛りを表示。
- 縦見出しは短い章名に変更。長いメッセージは本文側に横組みで配置し、日本語の改行を調整。
- 本文と補足文字のサイズを拡大。主要な相談ボタンと控えめな二次操作の段差・配色を区別。
- ヒーロータブを携帯画面で２列に整理。短い表示名を使い、完全な名前はアクセシブル名に保持。アニメーション操作は下の行へ。
- パッケージ説明の重複を削除。カテゴリ表示は短い日本語にし、件数バッジ・中央配置・元のカテゴリ識別子を維持。携帯画面では２段の３列フィルタ、実績は長いカテゴリ名に対応する２列フィルタ。
- パッケージ20件の表紙を、短い見出しと画面・端末・連携の図に変更。`scripts/create-package-previews.cjs` が `public/images/packages/previews/package-01.svg`〜`package-20.svg` を生成。既存の写真表紙は削除せず保管。SVGはコードで作成し、画像生成ツールは使用していない。
- サービスカードの上下を同系色に統一。背景写真の読み取り用レイヤーを強め、画面サイズ別に位置と濃度を調整。
- 携帯画面の問い合わせ案内を短くし、４つの窓口を２列の横長ボタンに整理。フォームへ早く進める構成へ変更。
- フッターの改行・小さい縦文字を調整。デスクトップ画像と左右の余白は維持し、携帯画面では専用の縦長画像を表示。
- ７色のホバーと流星カーソルは維持。ヒーローの流星ボーダーを選択中のタブに限定し、速度を穏やかに変更。画面外で止まる既存制御に加え、サイト全体の停止操作をヒーローとスキル紹介の自動演出へ連動。

## 携帯用フッター素材

保存先：`public/images/environments/footer-mobile-ja.webp`。組み込み画像生成ツールで既存フッター画像を編集し、WebPへ変換。参照元：`footer-original-ja.webp`。日本語の見出しは画像内に統合。

最終プロンプト：

> Edit target: the supplied current footer photograph. Create a mobile-specific 4:5 portrait recomposition of the same serene Japanese studio street bench scene. Preserve the natural photographic look, the four young Japanese adults (two men aged approximately 25 and 21 and two adult women), the three small friendly white robots with blue-purple, orange-pink and mint-purple hair, their identities and outfits. The people lead a relaxed collaborative design discussion with a laptop and notebook; the small robots help with notes and ideas in distinct poses. Arrange the bench and group compactly in the lower two thirds so all four people and three bots are clearly visible on a narrow phone screen. Glass architecture, subtle foliage, warm wood, calm slate and sage color grade. Integrate exact Japanese headline into the upper part of the image in two large highly legible lines: 「お客様のために、」「時間をつくる。」 White bold clean typography with subtle contrast support. Keep text away from faces. One complete image, no separate overlays. No extra text, no English, no invented logos. Preserve a believable real environment and clean sharp detail.

縦組み明朝はしっぽり明朝のサブセットを新しい章名に合わせて更新。既存のSIL Open Font Licenseを保持。

## 検証

本番ビルド、デスクトップ・携帯ブラウザーでのカタログ・フォーム・キーボード操作・画像読み込み・停止操作を確認。320ピクセル幅で発見した実績カテゴリのはみ出しを修正し、320/390/768/1024/1440ピクセルの幅を再確認。
