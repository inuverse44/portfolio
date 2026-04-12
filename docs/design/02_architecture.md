# アーキテクチャ設計書

## 1. ディレクトリ構成

```
portfolio/
├── src/
│   ├── content/
│   │   ├── config.ts              # コレクションスキーマ
│   │   └── posts/
│   │       ├── 2025/              # 年別ディレクトリ
│   │       └── 2026/
│   ├── pages/                     # ファイルシステムルーティング
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── layouts/
│   ├── plugins/                   # カスタム remark プラグイン
│   ├── constants/
│   ├── hooks/
│   ├── lib/                       # レガシー（未使用）
│   └── styles/
├── scripts/                       # 管理用スクリプト
├── public/                        # 静的アセット
├── docs/                          # ドキュメント
└── .github/workflows/             # CI/CD
```

---

## 2. コンポーネント構成

Atomic Design に基づく3層構成。

```mermaid
graph TD
    Layout["Layout.astro\n全ページ共通ラッパー"]

    subgraph organisms["Organisms（ページ構成単位）"]
        Header["Header.tsx"]
        Footer["Footer.tsx"]
        PostHeader["PostHeader.tsx"]
        PostList["PostList.tsx"]
    end

    subgraph molecules["Molecules（複合コンポーネント）"]
        PostCard["PostCard.tsx"]
        PostNav["PostNav.tsx"]
        Pagination["Pagination.tsx"]
        TagList["TagList.tsx"]
        BackButton["BackButton.tsx"]
    end

    subgraph atoms["Atoms（最小単位）"]
        Tag["Tag.tsx"]
        Meta["Meta.astro"]
    end

    Layout --> Header
    Layout --> Footer
    Layout --> Meta
    PostList --> PostCard
    PostCard --> Tag
    PostHeader --> Tag
    TagList --> Tag
```

---

## 3. ページとコンポーネントの対応

```mermaid
graph LR
    subgraph pages["Pages"]
        Index["index.astro\n/"]
        Blog["blog/index.astro\n/blog"]
        BlogPage["blog/page/[page].astro\n/blog/page/N"]
        PostSlug["posts/[slug].astro\n/posts/:slug"]
        CatIndex["category/index.astro\n/category"]
        CatSlug["category/[slug].astro\n/category/:slug"]
        TagPage["tags/[tag].astro\n/tags/:tag"]
        About["about.astro\n/about"]
        External["external.astro\n/external"]
    end

    subgraph components["主要コンポーネント"]
        PostCard2["PostCard"]
        PostList2["PostList"]
        Pagination2["Pagination"]
        PostHeader2["PostHeader"]
        PostNav2["PostNav"]
        BackButton2["BackButton"]
        TagList2["TagList"]
    end

    Index --> PostCard2
    Blog --> PostList2
    Blog --> Pagination2
    BlogPage --> PostList2
    BlogPage --> Pagination2
    PostSlug --> PostHeader2
    PostSlug --> PostNav2
    PostSlug --> BackButton2
    CatIndex --> PostList2
    CatSlug --> PostList2
    TagPage --> PostList2
```

---

## 4. モジュール依存関係

```mermaid
graph TD
    AC["astro.config.mjs"]
    WL["plugins/remarkWikiLinks.ts"]
    CC["content/config.ts"]
    SC["constants/site.ts"]
    CAT["constants/categories.ts"]

    AC -->|"remarkPlugin"| WL
    AC -->|"remark-gfm\nremark-math\nrehype-katex"| AC

    Header["Header.tsx"] --> SC
    Footer["Footer.tsx"] --> SC
    PostSlug["posts/[slug].astro"] --> CC
    Blog["blog/index.astro"] --> CC
    CatIndex["category/index.astro"] --> CAT
    CatIndex --> CC
    CatSlug["category/[slug].astro"] --> CAT
    CatSlug --> CC
```

---

## 5. レンダリング戦略

| コンポーネント | 種別 | hydration | 理由 |
|--------------|------|-----------|------|
| `Layout.astro` | Astro | なし | 静的シェル |
| `Header.tsx` | React | なし（サーバーレンダリング） | インタラクション不要 |
| `Footer.tsx` | React | なし | インタラクション不要 |
| `PostCard.tsx` | React | なし | 静的カード |
| `PostHeader.tsx` | React | なし | 静的ヘッダー |
| `PostNav.tsx` | React | なし | 静的ナビ |
| `Pagination.tsx` | React | なし | 静的ナビ |
| `TagList.tsx` | React | なし | 静的リスト |

> `client:*` ディレクティブはインタラクティブな操作が必要なコンポーネントにのみ付与する。現状すべてサーバーレンダリングで完結している。
