# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What（何を作っているか）

Inuverse の個人ポートフォリオ兼技術ブログ。Astro 5 + React で構成された静的サイト。Markdown で記事を書き、Firebase Hosting へ自動デプロイする。

## How（コマンド）

```bash
npm run dev       # 開発サーバー起動 (http://localhost:4321)
npm run build     # 本番ビルド
npm run check     # Astro 型チェック (npx astro check)
npm run lint      # ESLint
npm run test      # 単体テスト (Vitest)
```

変更後は必ず `npm run build && npm run test && npm run lint && npx astro check` を実行してから push する。

単一テストファイルの実行: `npx vitest run src/path/to/file.test.tsx`

## Why（重要な制約）

- **CSS Modules・Tailwind は使用しない** — `src/styles/globals.css` 1ファイルのみ。コンポーネント固有スタイルはインライン `style={{}}` で対応。
- **`client:*` ディレクティブは最小限に** — インタラクティブな操作が不要なコンポーネントはサーバーレンダリングのまま。
- **記事は年別ディレクトリに配置** — `src/content/posts/YYYY/YYYY-MM-DD-topic.md`。frontmatter に `slug: YYYY-MM-DD-topic` を明示してURLを維持する。

## Harness Engineering

自動化できる反復作業はフックやスクリプトに落とし込む。

- 繰り返す判断はスクリプト化する（例: `scripts/migrate-posts-to-year-dirs.mjs`）
- 自動化すべき振る舞いは `update-config` スキルでフックとして設定する
- 同じミスが2回起きたら、チャットで説明するのではなくハーネスを更新する

## Git ワークフロー

`develop` で作業 → `main` へ PR マージ → Firebase へ自動デプロイ。

```bash
# main マージ後のローカル反映
git checkout main && git pull && git checkout develop && git merge main
```

## ドキュメントインデックス

詳細は各設計書を参照。

| ドキュメント | 内容 |
|------------|------|
| @docs/design/01_overview.md | システム構成図・CI/CD パイプライン |
| @docs/design/02_architecture.md | コンポーネント構成・ルーティング・モジュール依存 |
| @docs/design/03_data.md | DFD・データモデル・スラッグ仕様 |
| @docs/design/04_features.md | ページ一覧・Markdown 機能・スタイリング仕様 |
| @docs/HISTORY.md | 変更履歴 |
