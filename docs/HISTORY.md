# Changelog

すべての注目すべき変更はこのファイルに記録されます。

## [2026-04-12]

### Added
- **Obsidian 風 `[[...]]` wiki-link プラグイン (`src/plugins/remarkWikiLinks.ts`)**:
  - `[[slug]]` → `/posts/slug` へのリンクに変換する独自 remark プラグインを実装。
  - `[[slug|表示テキスト]]` で任意のリンクテキストを指定可能。
  - 外部リンク `[text](url)` は通常の Markdown のまま。
  - 依存ライブラリなし・純粋な AST ウォークで実装（`unist-util-visit` 不使用）。
- **記事の年別ディレクトリ整理 (`scripts/migrate-posts-to-year-dirs.mjs`)**:
  - フラットだった `src/content/posts/*.md` を `src/content/posts/YYYY/` へ移行する Node.js スクリプトを作成・実行。
  - 各ファイルの frontmatter に `slug: <元のファイル名>` を自動挿入し、既存 URL を完全に維持。
  - Astro の legacy content collections では frontmatter の `slug` フィールドが自動生成 slug より優先される仕様を利用。
- **About ページにプロフィール写真を追加**: `public/images/profile.jpg` を円形表示。

### Changed
- **サイト全体の Obsidian 風ミニマルデザインへの刷新**:
  - CSS Module ファイル（15ファイル）を全削除。`src/styles/globals.css` 1ファイルに集約。
  - リンク色 `#7c3aed`（Obsidian パープル）、フォント Roboto Mono、`body` に `max-width: 740px` を直接適用。
  - `markdown.css` は空化（グローバルスタイルがすべてカバー）。
- **コンポーネントの大幅簡素化**:
  - Header: モバイルサイドバー・ハンバーガーメニューを廃止し、サイト名＋ナビのみのシンプルな構成に。
  - PostCard: カバー画像を廃止し、タイトル・日付・タグのみ表示。
  - Footer: テキストリンクのみ。
- **削除したコンポーネント**: `ActivityHeatmap`, `MobileSidebar`, `DesktopNav`, `Navigation`, `MenuButton` および関連 CSS Module・テストファイル。
- **ページ簡素化**: トップページの ActivityHeatmap を削除し最新5件リストに。ブログ一覧のタグサイドバーを廃止。

### Fixed
- **CI ワークフロー (`ci.yml`)**: E2E テスト削除に伴い Playwright のインストール・実行ステップを削除。
- **`tsconfig.json`**: 非推奨の `baseUrl` を削除し、`paths` を `"./src/*"` 形式に変更（TypeScript 5.0+ 推奨形式）。`vitest.config.ts` を `exclude` に追加し `astro check` の誤検知を解消。
- **`vitest.config.ts`**: `/// <reference types="vitest" />` による型解決に戻し、不要な `as any` を除去。
- **`Layout.astro`**: 外部スクリプトタグに `is:inline` を明示し、`astro check` のヒントを解消。
- **未使用 `import React` の削除**: `Pagination.tsx`, `PostList.tsx`。

### Removed
- **E2E テスト一式**: `tests/e2e/smoke.spec.ts` および `tests/` ディレクトリを削除（個人ブログのため単体テストで十分と判断）。

## [2026-03-14]

### Fixed
- **Astroパースエラーの修正**: `src/pages/test-kotlin.astro` 内のコードブロックに含まれる波括弧 `{ }` がJSX式として解釈されないよう `{"{"}` および `{"}"}` にエスケープ。
- **インポートパスの修正**: `src/pages/test-kotlin.astro` で `Layout.astro` への参照が間違っていたのを修正。
- **型チェックの最適化**: `tsconfig.json` の `exclude` に `_legacy_nextjs`, `dist`, `out` を追加し、`astro check` が不要なファイルを走査しないよう改善。
- **Astroコンポーネントの修正**: `src/pages/category/index.astro` でHTML要素に使用されていたReact固有の `key` 属性を削除。
- **TypeScript型定義の修正**:
    - `src/pages/blog/page/[page].astro` の `getStaticPaths` および `Props` に適切な型定義を追加。
    - `vitest.config.ts` の型エラー回避のため `any` キャストを適用。

### Added
- **依存関係の追加**: `src/lib/posts/api.ts` で必要な `gray-matter` および Node.js 開発用型定義 (`@types/node`) を `package.json` に追加。
- **変更履歴の作成**: `docs/HISTORY.md` を作成し、対応内容の記録を開始。

### Changed
- **数式のレスポンシブ対応 (`src/styles/globals.css`, `src/styles/markdown.css`)**:
    - 長い数式がコンテナをはみ出さないよう、`.katex-display` に横スクロール (`overflow-x: auto`) を許可。
    - 数式番号 (`.tag`) が数式本体と重ならないよう、絶対配置から静的配置に変更し、数式の右隣に並んで一緒にスクロールされるよう改善。
- **記事の可読性向上 (`src/content/posts/2026-03-14-nongaussianity.md`)**:
    - `aligned` 環境を活用して、非常に長い展開式に手動改行を加え、モバイル端末等での見やすさを向上。
- **見出しのデザイン改善 (`src/styles/markdown.css`)**:
    - `h2` および `h3` 見出しの左側にテーマカラーの縦棒（ボーダー）を追加し、記事のセクション構造を視覚的に分かりやすく改善。
- **テーマカラーの変更 (`src/styles/globals.css`)**:
    - `--section-color` を黒系 (`#111827`) からシアン系 (`#72D4DA`) に変更し、サイト全体のアクセントカラーを統一。

### Removed
- **不要なNext.jsファイルの削除**: 移行時の残骸と思われる `src/lib/posts/getStaticPaths.ts` および `src/lib/posts/getStaticProps.ts` を削除。
