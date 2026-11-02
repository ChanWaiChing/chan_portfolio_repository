<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project instructions

- このプロジェクトは日本語のポートフォリオです。利用者向けの文言は日本語にし、既存のブランド、アクセシビリティ、レスポンシブ対応を保ってください。
- 変更前に関連する実装・テスト・ドキュメントを確認し、既存のコンポーネントや共通処理を優先してください。依頼の範囲外の変更は避けてください。
- Next.js は `package.json` に記載されたバージョンを使います。Next.js のコードを変更するときは、作業前に `node_modules/next/dist/docs/` の該当ガイドを読み、そのバージョン固有の API と注意事項に従ってください。
- Node.js 24.x を使用します。Windows PowerShell では `npm.cmd` を使えます。
- 変更に応じて、まず関連するテストを実行してください。アプリケーションの型チェックには `npx tsc --noEmit -p tsconfig.build.json`、連絡先・イベント API の変更には `npm.cmd run test:contact` / `npm.cmd run test:events`、画面操作の変更には `npm.cmd run test:e2e` を使います。必要に応じて `npm.cmd run build` も実行してください。
- 公開サイトへのデプロイ、外部サービスへの送信、実際のメール送信は、利用者から明示的な依頼がない限り行わないでください。
- `.env*` の秘密情報を表示・記録・コミットせず、環境変数の例やログに実際の値を含めないでください。
- `AGENTS.md` 冒頭の Next.js が生成する案内ブロックは保持してください。必要なプロジェクト指示はその外側に記述してください。
