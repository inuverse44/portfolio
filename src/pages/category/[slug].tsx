import React from 'react';
import Meta from '@/components/atoms/Meta';
import styles from '@/styles/Blog.module.css';
import { getAllPosts } from '@/lib/posts/api';
import type { Post } from '@/lib/posts/api';
import PostList from '@/components/organisms/PostList';
import type { CategoryDefinition } from '@/constants/categories';

interface CategoryPageProps {
  title: string;
  description?: string;
  posts: Post[];
}

export default function CategoryPage({ title, description, posts }: CategoryPageProps) {
  return (
    <>
      <Meta title={title} description={description || title} />
      <div className={styles.blogLayout}>
        <div className={styles.mainContent}>
          <h1>{title}</h1>
          {description ? <p style={{ opacity: 0.8 }}>{description}</p> : null}
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}

// Enable wide layout for this page
(CategoryPage as unknown as { wide?: boolean }).wide = true;

export async function getStaticPaths() {
  const { CATEGORIES } = await import('@/constants/categories');
  const paths = (CATEGORIES as CategoryDefinition[]).map((c) => ({ params: { slug: c.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { CATEGORIES } = await import('@/constants/categories');
  const def = (CATEGORIES as CategoryDefinition[]).find((c) => c.slug === params.slug);
  if (!def) return { notFound: true } as const;
  const all = getAllPosts();
  const posts = def.posts
    .map((slug) => all.find((p) => p.slug === slug))
    .filter(Boolean) as Post[];
  return {
    props: {
      title: def.title,
      description: def.description || null,
      posts,
    },
  };
}
