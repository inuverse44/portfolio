import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostHeader from '@/components/organisms/PostHeader';
import PostBody from '@/components/organisms/PostBody';

interface PostProps {
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
  };
  content: string;
}

export default function Post({ frontmatter, content }: PostProps) {
  return (
    <article>
      <Head>
        <title>{frontmatter.title} | My Blog</title>
        <meta name="description" content={frontmatter.title} />
      </Head>
      <PostHeader
        title={frontmatter.title}
        date={frontmatter.date}
        tags={frontmatter.tags}
      />
      <PostBody content={content} />
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => ({
      params: {
        slug: filename.replace(/\.md$/, ''),
      },
    }));

  return {
    paths,
    fallback: false, // false means any path not returned by getStaticPaths will result in a 404.
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: {
      frontmatter: {
        title: data.title || 'No Title',
        date: data.date || 'No Date',
        tags: data.tags || [],
      },
      content: content || '',
    },
  };
};
