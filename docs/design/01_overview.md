# 概要設計書

## 1. システム概要

Inuverse の個人ポートフォリオ兼技術ブログ。Markdown で記事を執筆し、静的 HTML としてビルドして Firebase Hosting へ自動デプロイする。

| 項目 | 内容 |
|------|------|
| URL | https://www.inuverse.dev |
| フレームワーク | Astro 5（静的サイト生成） |
| レンダリング | SSG（ビルド時に全ページを HTML 生成） |
| ホスティング | Firebase Hosting |
| CI/CD | GitHub Actions |
| リポジトリ | github.com/inuverse44/portfolio |

---

## 2. システム構成図

```mermaid
graph TD
    Dev["開発者（ローカル）"]
    GH["GitHub\ndevelop / main"]
    CI["GitHub Actions\nci.yml"]
    CD["GitHub Actions\ndeploy-firebase.yml"]
    FB["Firebase Hosting\ninuverse.dev"]
    Browser["ブラウザ"]

    Dev -->|"git push (develop)"| GH
    GH -->|"PR merge → main"| GH
    GH -->|"push / PR イベント"| CI
    GH -->|"push to main"| CD
    CI -->|"lint / check / build / test"| CI
    CD -->|"npm run build → dist/"| FB
    Browser -->|"HTTPS"| FB
```

---

## 3. デプロイフロー

```mermaid
flowchart LR
    A["記事執筆\nsrc/content/posts/YYYY/*.md"]
    B["develop ブランチへ push"]
    C{"CI パス?"}
    D["main へ PR & マージ"]
    E["Firebase へ自動デプロイ"]
    F["公開"]
    X["❌ 修正して再 push"]

    A --> B --> C
    C -->|Yes| D --> E --> F
    C -->|No| X --> B
```

---

## 4. CI/CD パイプライン

### 4.1 ci.yml（develop・main への push および PR）

```mermaid
flowchart TD
    T["トリガー\npush / PR to develop or main"]
    A["Checkout & npm ci"]
    B["npm run lint\nESLint"]
    C["npx astro check\n型チェック"]
    D["npm run build\n静的ビルド"]
    E["npx vitest run\n単体テスト"]
    OK["✅ 全ステップ通過"]

    T --> A --> B --> C --> D --> E --> OK
```

### 4.2 deploy-firebase.yml（main への push のみ）

```mermaid
flowchart TD
    T["トリガー\npush to main"]
    A["Checkout & npm ci"]
    B["npm run build\ndist/ 生成"]
    C["Google Cloud 認証\nGCP_SA_KEY"]
    D["Firebase Hosting デプロイ\nlive チャンネル"]

    T --> A --> B --> C --> D
```

### 4.3 必要な Secrets / Variables

| 名前 | 種別 | 用途 |
|------|------|------|
| `GCP_SA_KEY` | Secret | Firebase デプロイ用 GCP サービスアカウントキー |
| `FIREBASE_PROJECT_ID` | Variable | Firebase プロジェクト ID |
