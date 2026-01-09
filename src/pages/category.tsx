import React from 'react';
import Meta from '@/components/atoms/Meta';
import styles from '@/styles/Blog.module.css';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts/api';
import type { Post } from '@/lib/posts/api';
import type { CategoryDefinition } from '@/constants/categories';

type CategorySummary = {
  slug: string;
  title: string;
  description?: string;
  posts: Post[];
};

export default function Category({ categories }: { categories: CategorySummary[] }) {
  return (
    <>
      <Meta title="Category" description="Curated article groups" />
      <div className={styles.blogLayout}>
        <div className={styles.mainContent}>
          <h1>Categories</h1>
          <ul>
            {categories.map((c) => (
              <li key={c.slug} style={{ marginBottom: 16 }}>
                <h2 style={{ margin: '4px 0' }}>
                  <Link href={`/category/${c.slug}`}>{c.title}</Link>
                </h2>
                {c.description ? <p style={{ margin: '4px 0', opacity: 0.8 }}>{c.description}</p> : null}
                <p style={{ margin: '4px 0' }}>{c.posts.length} posts</p>
                {c.posts.slice(0, 3).map((p) => (
                  <div key={p.slug}>
                    <Link href={`/posts/${p.slug}`}>{p.frontmatter.title}</Link>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

// Enable wide layout for this page
(Category as unknown as { wide?: boolean }).wide = true;

export async function getStaticProps() {
  const { CATEGORIES } = await import('@/constants/categories');
  const all = getAllPosts();
  const categories: CategorySummary[] = (CATEGORIES as CategoryDefinition[]).map((c) => (
    slug: c.slug,
    title: c.title,
    description: c.description,
    posts: c.posts
      .map((slug: string) => all.find((p) => p.slug === slug))
      .filter(Boolean) as Post[],
  }));

  return { props: { categories } };
}
