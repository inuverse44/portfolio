import Head from 'next/head';
import PostList from '@/components/organisms/PostList';
import { SITE_TITLE } from '@/constants/site';

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
      <Head>
        <title>Blog | {SITE_TITLE}</title>
        <meta name="description" content="All blog posts" />
      </Head>

      <div>
        <h1>All Posts</h1>
        <PostList posts={posts} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const fs = await import('fs');
  const path = await import('path');
  const matter = (await import('gray-matter')).default;
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
