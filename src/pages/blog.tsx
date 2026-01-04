import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import PostList from '@/components/organisms/PostList';
import Meta from '@/components/atoms/Meta';
import TagList from '@/components/molecules/TagList';
import { getAllPosts, getAllTagsCount } from '@/lib/posts/api';
import styles from '@/styles/Blog.module.css';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
  };
}

interface BlogProps {
  posts: Post[];
  tagCounts: Record<string, number>;
}

export default function Blog({ posts, tagCounts }: BlogProps) {
  const router = useRouter();
  const { date } = router.query;

  const filteredPosts = useMemo(() => {
    if (!date) return posts;
    return posts.filter(post => post.frontmatter.date === date);
  }, [posts, date]);

  const title = date ? `Posts on ${date}` : 'All Posts';

  return (
    <>
      <Meta title="Blog" description="All blog posts" />

      <div className={styles.blogLayout}>
        <div className={styles.mainContent}>
          <h1>{title}</h1>
          <PostList posts={filteredPosts} />
        </div>
        <aside className={styles.sidebar}>
          <TagList tagCounts={tagCounts} />
        </aside>
      </div>
    </>
  );
}

// Enable wide layout for this page
Blog.wide = true;

export async function getStaticProps() {
  const posts = getAllPosts();
  const tagCounts = getAllTagsCount();

  return {
    props: {
      posts,
      tagCounts,
    },
  };
}
