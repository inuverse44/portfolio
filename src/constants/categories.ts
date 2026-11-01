export type CategoryDefinition = {
  slug: string; // used in URL: /category/[slug]
  title: string;
  description?: string;
};

// 記事は frontmatter の `category` にここの slug を 1 つ書く。
// 一覧にない slug や、category のない公開記事はビルドで止まる（src/content.config.ts）。
export const CATEGORIES = [
  {
    slug: 'statistics-intro',
    title: '統計学入門を読んでみた',
    description: '「基礎統計学I　統計学入門　東京大学出版会」の読書メモや演習などのまとめ',
  },
  {
    slug: 'physics',
    title: '物理・宇宙論',
    description: '一般相対論、宇宙論、解析力学、量子力学のノート',
  },
  {
    slug: 'math',
    title: '数学・機械学習',
    description: '確率・統計の計算、圏論、数値計算、機械学習のメモ',
  },
  {
    slug: 'programming',
    title: 'プログラミング',
    description: 'Kotlin や Rust などの言語、読みやすいコード、競技プログラミング、計算機の基礎',
  },
  {
    slug: 'infra',
    title: 'クラウド・インフラ',
    description: 'GKE、RabbitMQ、Prometheus、Docker など、運用と負荷検証のメモ',
  },
  {
    slug: 'data-analysis',
    title: 'データ解析',
    description: '公開データを Python で調べてみた記事',
  },
  {
    slug: 'misc',
    title: '雑記',
    description: '日記や、気になっている論文のメモ',
  },
] as const satisfies readonly CategoryDefinition[];

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];
export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];
