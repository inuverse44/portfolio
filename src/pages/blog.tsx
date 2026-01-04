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
  return (
    <>
      <Meta title="Blog" description="All blog posts" />

      <div className={styles.blogLayout}>
        <div className={styles.mainContent}>
          <h1>All Posts</h1>
          <PostList posts={posts} />
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
