export type CategoryDefinition = {
  slug: string; // used in URL: /category/[slug]
  title: string;
  description?: string;
  posts?: string[]; // Deprecated: posts are now filtered by 'category' in frontmatter
};

// Edit this list to curate categories.
// Posts are now automatically aggregated based on the 'category' field in their frontmatter.
export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'statistics-intro',
    title: '統計学入門を読んでみた',
    description: '「基礎統計学I　統計学入門　東京大学出版会」の読書メモや演習などのまとめ',
  }
];
