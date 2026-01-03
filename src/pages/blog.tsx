import PostList from '@/components/organisms/PostList';
import Meta from '@/components/atoms/Meta';
import TagList from '@/components/molecules/TagList';
import { getAllPosts, getAllTagsCount } from '@/lib/posts/api';

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

      <div>
        <h1>All Posts</h1>
        <TagList tagCounts={tagCounts} />
        <PostList posts={posts} />
      </div>
    </>
  );
}

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
