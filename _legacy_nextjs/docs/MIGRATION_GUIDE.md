# Next.js + TypeScript ブログ移行と機能追加手順

## 概要
このドキュメントは、Create React App (CRA) で構築された既存のプロジェクトを Next.js + TypeScript 環境へ移行し、Markdownベースのブログ機能、アトミックデザインによるコンポーネントのリファクタリング、タグフィルタリング、サイト定数の一元管理、および Google Fonts の導入を行った際の主要な変更点と手順を記録したものです。

## 前提条件
- Node.js (v18以上推奨)
- npm または Yarn
- Git

## 1. プロジェクトの初期化と移行

### 1.1 既存ファイルのクリーンアップ
既存のCRAプロジェクトのファイルを削除し、Next.jsプロジェクトの基盤を準備します。`.git` ディレクトリは残して、Gitの履歴を保持します。

```bash
rm -rf .gitignore craco.config.js node_modules package-lock.json package.json public README.md scripts src tsconfig.json
```

### 1.2 Next.jsプロジェクトの作成
カレントディレクトリに Next.js + TypeScript プロジェクトを初期化します。Pages Router を使用し、Tailwind CSS や Turbopack は導入しません。

```bash
npx create-next-app@latest . --ts --use-npm --no-tailwind --eslint --src-dir --no-app --no-turbopack --import-alias "@/*"
```

### 1.3 必要なライブラリのインストール
Markdownのレンダリング、フロントマターの解析、コードハイライト、数式表示に必要なライブラリをインストールします。

```bash
npm install react-markdown remark-gfm rehype-highlight remark-math rehype-katex gray-matter
```

## 2. ブログ機能の実装

### 2.1 Markdownファイルの配置
ブログ記事のMarkdownファイルをプロジェクトルートの `posts` ディレクトリに配置します。

```bash
mkdir posts
# 例: posts/sample-post.md, posts/second-post.md, posts/third-post.md を作成
```

### 2.2 `pages/index.tsx` (記事一覧) の実装
`getStaticProps` を使用してビルド時に `posts` ディレクトリから記事データを読み込み、ホームページに記事一覧を表示するようにします。

### 2.3 `pages/posts/[slug].tsx` (記事詳細) の実装
`getStaticPaths` と `getStaticProps` を使用して、各Markdownファイルに対応する記事詳細ページをビルド時に生成するようにします。

## 3. アトミックデザインによるリファクタリング

### 3.1 ディレクトリ構造の作成
`src/components` 内にアトミックデザインの階層 (`atoms`, `molecules`, `organisms`) を作成します。

```bash
mkdir -p src/components/atoms src/components/molecules src/components/organisms
```

### 3.2 `Tag` アトムの作成と修正
タグを表示する最小単位のコンポーネントを作成し、タグページへのリンク機能を追加します。
- `src/components/atoms/Tag.module.css`
- `src/components/atoms/Tag.tsx`

### 3.3 `PostCard` モレキュールの作成
ホームページに表示される各記事のプレビューカードを作成します。
- `src/components/molecules/PostCard.module.css`
- `src/components/molecules/PostCard.tsx`

### 3.4 `PostList`, `PostHeader`, `PostBody` オーガニズムの作成
- `PostList`: `PostCard` を一覧表示するコンポーネント。
  - `src/components/organisms/PostList.tsx`
- `PostHeader`: 記事詳細ページのタイトル、日付、タグを表示するコンポーネント。
  - `src/components/organisms/PostHeader.module.css`
  - `src/components/organisms/PostHeader.tsx`
- `PostBody`: 記事のMarkdown本文をレンダリングするコンポーネント。
  - `src/components/organisms/PostBody.module.css` (旧 `src/styles/Post.module.css` を移動)
  - `src/components/organisms/PostBody.tsx`

### 3.5 `Layout` コンポーネントの作成と `_app.tsx` への適用
サイト全体に共通のレイアウト（中央寄せ、ヘッダー・フッター）を適用するためのコンポーネントを作成し、`_app.tsx` で全ページをラップします。
- `src/styles/Layout.module.css`
- `src/components/Layout.tsx`

### 3.6 `Header`, `Footer` オーガニズムの作成と `Layout` への組み込み
共通のヘッダーとフッターコンポーネントを作成し、`Layout` コンポーネント内に配置します。
- `src/components/organisms/Header.module.css`
- `src/components/organisms/Header.tsx`
- `src/components/organisms/Footer.module.css`
- `src/components/organisms/Footer.tsx`

### 3.7 ページコンポーネント (`index.tsx`, `[slug].tsx`) のリファクタリング
各ページコンポーネントからUIのロジックを削除し、新しく作成したアトム、モレキュール、オーガニズムを組み合わせてページを構築するように修正します。

### 3.8 不要なCSSのクリーンアップ
リファクタリングにより不要になった `src/styles/Home.module.css` 内のブログ関連スタイルを削除します。

## 4. タグフィルタリング機能の追加

### 4.1 `Tag` コンポーネントのリンク化
`Tag` アトムを、対応するタグページ (`/tags/タグ名`) への `next/link` コンポーネントに変更します。

### 4.2 `pages/tags/[tag].tsx` の実装
タグごとの記事一覧ページを作成します。`getStaticPaths` で全タグのパスを生成し、`getStaticProps` で指定されたタグを持つ記事をフィルタリングして表示します。

## 5. サイト定数の導入

### 5.1 `src/constants/site.ts` の作成
サイトタイトルなど、サイト全体で利用する定数を一元管理するためのファイルを作成します。

```typescript
export const SITE_TITLE = 'My Blog';
```

### 5.2 `Header` コンポーネントでの定数参照
`Header` コンポーネントがハードコードされた文字列の代わりに `SITE_TITLE` 定数を参照するように修正します。

## 6. Google Fontsの導入

### 6.1 `_app.tsx` でのフォント設定
`@next/font/google` を使用して、`Playfair Display` (見出し用), `Roboto Mono` (本文・コード用), `Playwrite US Modern` (見出し用) を設定し、CSS変数として利用できるようにします。

### 6.2 `globals.css` でのフォント適用
`globals.css` で、これらのCSS変数を `body` (本文・コード) および `h1`〜`h6` (見出し) に適用します。

### 6.3 フォント名の修正
`Playwrite USA Modern` のフォント名が誤っていたため、`Playwrite US Modern` に修正しました。

## 7. Git操作

### 7.1 `develop` ブランチへの切り替え

```bash
git checkout -b develop
```

### 7.2 リモートリポジトリの設定

```bash
git remote add origin git@github-inuverse44:inuverse44/portfolio.git
# または、既存のリモートURLを更新する場合
git remote set-url origin git@github-inuverse44:inuverse44/portfolio.git
```

### 7.3 変更のコミットとプッシュ
すべての変更をステージングし、コミットしてリモートリポジトリにプッシュします。

```bash
git add .
git commit -m "feat: Next.js migration and blog features implementation"
git push -u origin develop
```
