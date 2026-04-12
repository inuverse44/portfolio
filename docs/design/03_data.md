# データ設計書

## 1. データフロー図（DFD）

### レベル 0：コンテキスト図

```mermaid
flowchart LR
    Author["著者"]
    System["Inuverse Blog\nシステム"]
    Reader["読者"]

    Author -->|"Markdown 記事"| System
    System -->|"静的 HTML ページ"| Reader
```

---

### レベル 1：主要プロセス

```mermaid
flowchart TD
    MD["src/content/posts/\nMarkdown ファイル"]

    P1["P1\nコンテンツ収集\ngetCollection()"]
    P2["P2\nMarkdown 変換\nremark / rehype pipeline"]
    P3["P3\n静的ページ生成\ngetStaticPaths()"]
    P4["P4\nHTML ビルド\nastro build"]

    DS1[("Content Store\nAstro Content Collections")]
    DS2[("dist/\n静的ファイル")]

    MD --> P1
    P1 --> DS1
    DS1 --> P2
    P2 --> P3
    P3 --> P4
    P4 --> DS2
```

---

### レベル 2：Markdown 変換パイプライン（P2 詳細）

```mermaid
flowchart LR
    IN["Markdown\n入力"]
    GFM["remark-gfm\n表・打ち消し線等"]
    MATH["remark-math\n数式パース"]
    WL["remarkWikiLinks\n[[slug]] → リンク変換"]
    KATEX["rehype-katex\n数式 HTML 変換"]
    SHIKI["Shiki\nコードハイライト"]
    OUT["HTML\n出力"]

    IN --> GFM --> MATH --> WL --> KATEX --> SHIKI --> OUT
```

---

### レベル 2：記事追加フロー（著者操作）

```mermaid
sequenceDiagram
    participant A as 著者
    participant FS as ファイルシステム
    participant GH as GitHub
    participant CI as GitHub Actions（CI）
    participant CD as GitHub Actions（Deploy）
    participant FB as Firebase Hosting

    A->>FS: posts/YYYY/YYYY-MM-DD-topic.md 作成
    A->>GH: git push (develop)
    GH->>CI: ci.yml トリガー
    CI->>CI: lint / astro check / build / test
    A->>GH: PR 作成 → main へマージ
    GH->>CD: deploy-firebase.yml トリガー
    CD->>CD: npm run build
    CD->>FB: dist/ をデプロイ
    FB-->>A: https://www.inuverse.dev に反映
```

---

## 2. データモデル

### 2.1 Post（記事）

```mermaid
erDiagram
    POST {
        string slug PK "ファイル名ベース（frontmatter で上書き可）"
        string title "記事タイトル（必須）"
        date   date  "公開日（必須）"
        string category FK "カテゴリ slug（任意）"
        array  tags  "タグ一覧（任意）"
        string cover "カバー画像 URL（任意）"
        bool   published "false で下書き（省略時 true）"
        string description "OG description（任意）"
        text   content "Markdown 本文"
    }

    CATEGORY {
        string slug PK
        string title
        string description
    }

    TAG {
        string name PK
    }

    POST }o--|| CATEGORY : "belongs to"
    POST }o--o{ TAG : "tagged with"
```

### 2.2 frontmatter サンプル

```yaml
---
slug: 2026-01-03-statistics-chapter2-prob   # サブディレクトリ移行時に明示
title: 統計学入門 第2章の問題について
date: '2026-01-03'
category: statistics-intro
tags:
  - 統計学
  - Kotlin
cover: https://example.com/image.jpg
published: true
description: 統計学入門の第2章を読んだメモです
---
```

---

## 3. ルーティングとスラッグの関係

| ファイルパス | slug | URL |
|------------|------|-----|
| `posts/2025/2025-11-14-rust.md` | `2025-11-14-rust`（frontmatter） | `/posts/2025-11-14-rust` |
| `posts/2026/2026-01-03-statistics-chapter2-prob.md` | `2026-01-03-statistics-chapter2-prob` | `/posts/2026-01-03-statistics-chapter2-prob` |

> Astro Content Collections はサブディレクトリを含めてスラッグを生成するが、frontmatter に `slug` フィールドを明示することで URL を上書きできる。年別移行スクリプト（`scripts/migrate-posts-to-year-dirs.mjs`）がこの挿入を自動処理する。

---

## 4. カテゴリ定義

カテゴリは `src/constants/categories.ts` に静的定義する。記事との紐付けは frontmatter の `category` フィールドで行う。

| slug | タイトル | 説明 |
|------|---------|------|
| `statistics-intro` | 統計学入門を読んでみた | 「統計学入門 東京大学出版会」の読書メモ |
