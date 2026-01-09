export type CategoryDefinition = {
  slug: string; // used in URL: /category/[slug]
  title: string;
  description?: string;
  posts: string[]; // list of post slugs to include
};

// Edit this list to curate categories and their posts.
// Post slug is the markdown filename without .md under /posts.
export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'statistics-intro',
    title: '統計学入門を読んでみた',
    description: '統計学入門の読書メモや演習などをまとめたカテゴリ',
    posts: [
      // '2026-01-03-statistics-chapter2-prob',
      // '2026-01-04-statistics-probability-definitions',
    ],
  },
  {
    slug: 'inflation',
    title: 'インフレーション',
    description: '宇宙のインフレーションに関する記事群',
    posts: [
      // add post slugs here
    ],
  },
];
