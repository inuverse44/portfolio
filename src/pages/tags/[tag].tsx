import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import PostList from '@/components/organisms/PostList';
import { SITE_TITLE } from '@/constants/site';
import { getAllPosts, getAllTagsCount } from '@/lib/posts/api';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    cover?: string | null;
  };
}

interface TagPageProps {
  posts: Post[];
  tag: string;
}

export default function TagPage({ posts, tag }: TagPageProps) {
  return (
    <>
      <Head>
        <title>{`Posts tagged "${tag}" | ${SITE_TITLE}`}</title>
      </Head>
      <div>
        <h1>
          Posts tagged: <em>{tag}</em>
        </h1>
        <PostList posts={posts} />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tagCounts = getAllTagsCount();
  const paths = Object.keys(tagCounts).map((tag) => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { tag } = context.params as { tag: string };
  const allPosts = getAllPosts();
  
  const posts = allPosts.filter((post) => 
    post.frontmatter.tags && post.frontmatter.tags.includes(tag)
  );

  return {
    props: {
      posts,
      tag,
    },
  };
};
