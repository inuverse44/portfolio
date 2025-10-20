import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostList from '@/components/organisms/PostList';
import { SITE_TITLE } from '@/constants/site';

// This is the same interface as in index.tsx
interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
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
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const allTags = new Set<string>();

  filenames.forEach((filename) => {
    if (filename.endsWith('.md')) {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => allTags.add(tag));
      }
    }
  });

  const paths = Array.from(allTags).map((tag) => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { tag } = context.params as { tag: string };
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug: filename.replace(/\.md$/, ''),
        frontmatter: {
          title: data.title || 'No Title',
          date: data.date || 'No Date',
          tags: data.tags || [],
        },
      };
    })
    .filter((post) => {
      return post.frontmatter.tags && post.frontmatter.tags.includes(tag);
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return {
    props: {
      posts,
      tag,
    },
  };
};
