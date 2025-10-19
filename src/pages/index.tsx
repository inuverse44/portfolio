import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostList from '@/components/organisms/PostList';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
  };
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="A blog about technology and life." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Posts</h1>
        <PostList posts={posts} />
      </div>
    </>
  );
}

export async function getStaticProps() {
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
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return {
    props: {
      posts,
    },
  };
}