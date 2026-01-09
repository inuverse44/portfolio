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
    description: '「基礎統計学I　統計学入門　東京大学出版会」の読書メモや演習などのまとめ',
    posts: [
      '2026-01-03-statistics-chapter2-prob',
      '2026-01-04-statistics-probability-definitions',
      '2026-01-04-statistics-chapter4-prob4of1',
      '2026-01-04-statistics-chapter4-prob4of4',
      '2026-01-05-statistics-chapter5-prob5of1', 
      '2026-01-05-statistics-chapter5-prob5of2', 
      '2026-01-06-statistics-chapter5-prob5of3', 
      '2026-01-06-statistics-chapter5-prob5of4', 
      '2026-01-06-statistics-chapter5-prob5of5', 
      '2026-01-07-statistics-chapter5-prob5of6', 
      '2026-01-07-statistics-chapter5-prob5of7', 
      '2026-01-07-statistics-chapter6-hypergeometric', 
      '2026-01-07-statistics-chapter6-hypergeometric',
      '2026-01-08-statistics-chapter6-hypergeometric'
    ],
  }
];
