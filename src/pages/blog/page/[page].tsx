import React from 'react';
import PostList from '@/components/organisms/PostList';
import Meta from '@/components/atoms/Meta';
import TagList from '@/components/molecules/TagList';
import { getAllPosts, getAllTagsCount } from '@/lib/posts/api';
import styles from '@/styles/Blog.module.css';
import Pagination from '@/components/molecules/Pagination';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
  };
}

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
  posts: Post[];
  tagCounts: Record<string, number>;
  currentPage: number;
  totalPages: number;
}

export default function BlogPage({ posts, tagCounts, currentPage, totalPages }: BlogPageProps) {
  const title = `All Posts`;

  return (
    <>
      <Meta title={`Blog - Page ${currentPage}`} description="All blog posts" />

      <div className={styles.blogLayout}>
        <div className={styles.mainContent}>
          <h1>{title}</h1>
          <PostList posts={posts} />
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
        <aside className={styles.sidebar}>
          <TagList tagCounts={tagCounts} />
        </aside>
      </div>
    </>
  );
}

// Enable wide layout for this page
// @ts-expect-error custom static prop
BlogPage.wide = true;

export async function getStaticPaths() {
  const allPosts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({ params: { page: String(i + 2) } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const allPosts = getAllPosts();
  const tagCounts = getAllTagsCount();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.max(1, Math.min(totalPages, parseInt(params.page, 10) || 1));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return {
    props: {
      posts: pagePosts,
      tagCounts,
      currentPage,
      totalPages,
    },
  };
}
