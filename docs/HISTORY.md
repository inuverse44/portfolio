# Changelog

すべての注目すべき変更はこのファイルに記録されます。

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
    - `--section-color` を黒系 (`#111827`) からブルー系 (`#0070f3`) に変更し、サイト全体のアクセントカラーを統一。

### Removed
- **不要なNext.jsファイルの削除**: 移行時の残骸と思われる `src/lib/posts/getStaticPaths.ts` および `src/lib/posts/getStaticProps.ts` を削除。
