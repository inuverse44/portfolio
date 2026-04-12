# 設計書

## 1. システム概要

Inuverse の個人ポートフォリオ兼技術ブログ。Markdown で記事を書くと静的 HTML としてビルドされ、Firebase Hosting に自動デプロイされる。

- **URL**: https://www.inuverse.dev
- **フレームワーク**: Astro 5（静的サイト生成）
- **ホスティング**: Firebase Hosting
- **CI/CD**: GitHub Actions

---

## 2. システム構成図

```
┌─────────────────────────────────────────────────────┐
│                   開発者（ローカル）                    │
│                                                     │
│  src/content/posts/YYYY/*.md  ←── 記事執筆           │
│           │                                         │
│     npm run build                                   │
│           │                                         │
│        dist/  （静的 HTML/CSS/JS）                   │
└─────────────────┬───────────────────────────────────┘
                  │ git push → develop
                  ▼
┌─────────────────────────────────────────────────────┐
│                  GitHub                             │
│                                                     │
│  develop ──PR──▶ main                               │
│                   │                                 │
│           GitHub Actions                            │
│           ┌───────┴──────────┐                      │
│           │   ci.yml         │  deploy-firebase.yml │
│           │ lint             │  npm run build       │
│           │ astro check      │  Firebase deploy     │
│           │ npm run build    │  （main push のみ）   │
│           │ vitest run       │                      │
│           └──────────────────┘                      │
└─────────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│            Firebase Hosting                         │
│         https://www.inuverse.dev                    │
└─────────────────────────────────────────────────────┘
```

---

## 3. ディレクトリ構成

```
portfolio/
├── src/
│   ├── content/
│   │   ├── config.ts              # コレクションスキーマ定義
│   │   └── posts/
│   │       ├── 2025/              # 年別に整理
│   │       └── 2026/
│   ├── pages/                     # ファイルシステムルーティング
│   │   ├── index.astro            # /
│   │   ├── about.astro            # /about
│   │   ├── external.astro         # /external
│   │   ├── blog/
│   │   │   ├── index.astro        # /blog
│   │   │   └── page/[page].astro  # /blog/page/N
│   │   ├── posts/[slug].astro     # /posts/:slug
│   │   ├── category/
│   │   │   ├── index.astro        # /category
│   │   │   └── [slug].astro       # /category/:slug
│   │   └── tags/[tag].astro       # /tags/:tag
│   ├── components/
│   │   ├── atoms/                 # 最小単位
│   │   │   ├── Meta.astro         # OG/SEO メタタグ
│   │   │   └── Tag.tsx            # タグリンク
│   │   ├── molecules/             # 複合コンポーネント
│   │   │   ├── BackButton.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostNav.tsx
│   │   │   └── TagList.tsx
│   │   └── organisms/             # ページ構成単位
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── PostHeader.tsx
│   │       └── PostList.tsx
│   ├── layouts/
│   │   └── Layout.astro           # 全ページ共通ラッパー
│   ├── plugins/
│   │   └── remarkWikiLinks.ts     # [[slug]] リンク変換プラグイン
│   ├── constants/
│   │   ├── site.ts                # サイト定数・ナビ定義
│   │   └── categories.ts          # カテゴリ定義
│   ├── hooks/
│   │   └── useScrollLock.ts       # （未使用・将来用）
│   ├── lib/posts/
│   │   └── api.ts                 # （レガシー・未使用）
│   └── styles/
│       ├── globals.css            # 唯一の CSS ファイル
│       └── markdown.css           # 空（globals.css に統合済み）
├── scripts/
│   └── migrate-posts-to-year-dirs.mjs  # 記事移行スクリプト
├── public/                        # 静的アセット
│   └── images/
├── docs/
│   ├── DESIGN.md                  # 本ドキュメント
│   └── HISTORY.md                 # 変更履歴
├── .github/workflows/
│   ├── ci.yml                     # lint / check / build / test
│   └── deploy-firebase.yml        # Firebase デプロイ
├── astro.config.mjs
├── CLAUDE.md                      # Claude Code 向けガイド
└── GEMINI.md                      # （旧 Gemini 向けガイド）
```

---

## 4. 機能一覧

### 4.1 ページ

| URL | 機能 |
|-----|------|
| `/` | トップページ。最新5件の記事リスト |
| `/blog` | 全記事一覧（20件/ページ、ページネーション付き） |
| `/blog/page/N` | ページネーション |
| `/posts/:slug` | 記事詳細。前後の記事ナビ付き |
| `/category` | カテゴリ一覧 |
| `/category/:slug` | カテゴリ別記事一覧 |
| `/tags/:tag` | タグ別記事一覧 |
| `/about` | 自己紹介・経歴・出版物 |
| `/external` | 外部リンク集 |

### 4.2 Markdown 機能

| 機能 | 実装 |
|------|------|
| GFM（表・打ち消し線等） | `remark-gfm` |
| LaTeX 数式 | `remark-math` + `rehype-katex` |
| コードシンタックスハイライト | Shiki（`one-dark-pro` テーマ） |
| コードブロックのコピーボタン | `Layout.astro` インラインスクリプト |
| Kotlin インタラクティブ実行 | Kotlin Playground（CDN） |
| `[[slug]]` 内部リンク | `remarkWikiLinks.ts`（独自実装） |

### 4.3 記事メタデータ（frontmatter）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `slug` | string | URL スラッグ（サブディレクトリ移行時に明示） |
| `title` | string | 記事タイトル（必須） |
| `date` | date | 公開日（必須） |
| `category` | string? | カテゴリ slug |
| `tags` | string[]? | タグ一覧 |
| `cover` | string? | カバー画像 URL |
| `published` | boolean? | `false` で下書き（省略時 true） |
| `description` | string? | OG description |

### 4.4 カテゴリ

`src/constants/categories.ts` で定義。現在のカテゴリ：

| slug | タイトル |
|------|---------|
| `statistics-intro` | 統計学入門を読んでみた |

---

## 5. データフロー

### ビルド時（静的生成）

```
src/content/posts/YYYY/*.md
        │
        │  getCollection('posts')
        ▼
  Astro Content Collections
        │
        │  remark pipeline
        │  ├─ remark-gfm
        │  ├─ remark-math
        │  ├─ remarkWikiLinks  ([[slug]] → <a href="/posts/slug">)
        │  └─ rehype-katex
        ▼
  HTML レンダリング（getStaticPaths で全スラッグ展開）
        │
        ▼
     dist/  （静的ファイル）
```

### 記事追加フロー

```
1. src/content/posts/YYYY/YYYY-MM-DD-topic.md を作成
   （frontmatter に slug: YYYY-MM-DD-topic を明示）
2. git add / commit / push → develop
3. PR → main へマージ
4. GitHub Actions が自動ビルド & Firebase デプロイ
```

---

## 6. スタイリング方針

- **CSS ファイル**: `src/styles/globals.css` のみ
- **CSS Modules・Tailwind は使用しない**
- コンポーネント固有のスタイルは `style={{}}` インライン属性で対応
- デザインテーマ: Obsidian 風ミニマル

| 変数 | 値 | 用途 |
|------|----|------|
| フォント | Roboto Mono | 全体 |
| リンク色 | `#7c3aed` | Obsidian パープル |
| テキスト | `#1a1a1a` | 本文 |
| 背景 | `#ffffff` | ページ背景 |
| max-width | `740px` | コンテンツ幅 |

---

## 7. CI/CD パイプライン

### ci.yml（develop / main への push・PR で実行）

```
npm ci
  └─ npm run lint        （ESLint）
  └─ npx astro check     （型チェック）
  └─ npm run build       （静的ビルド）
  └─ npx vitest run      （単体テスト）
```

### deploy-firebase.yml（main への push のみ）

```
npm ci
  └─ npm run build
  └─ Google Cloud 認証（GCP_SA_KEY）
  └─ Firebase Hosting デプロイ（live チャンネル）
```

### Secrets / Variables

| 名前 | 種別 | 用途 |
|------|------|------|
| `GCP_SA_KEY` | Secret | Firebase デプロイ用サービスアカウント |
| `FIREBASE_PROJECT_ID` | Variable | Firebase プロジェクト ID |

---

## 8. テスト方針

単体テストのみ（個人ブログのため E2E は不要と判断）。

| 対象 | テストファイル | 内容 |
|------|-------------|------|
| `Pagination.tsx` | `Pagination.test.tsx` | ページネーションの表示・リンク生成 |

新しいロジックを持つコンポーネント・ユーティリティを追加した場合は同階層に `.test.tsx` を配置する。
