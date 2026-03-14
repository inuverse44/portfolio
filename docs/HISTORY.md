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

### Removed
- **不要なNext.jsファイルの削除**: 移行時の残骸と思われる `src/lib/posts/getStaticPaths.ts` および `src/lib/posts/getStaticProps.ts` を削除。
