import PostList from '@/components/organisms/PostList';
import Meta from '@/components/atoms/Meta';
import { getAllPosts } from '@/lib/posts/api';

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
}

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <Meta title="Blog" description="All blog posts" />

      <div>
        <h1>All Posts</h1>
        <PostList posts={posts} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}
