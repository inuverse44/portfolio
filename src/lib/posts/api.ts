import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    published?: boolean;
  };
  content?: string;
}

export function getAllPosts(includeDrafts: boolean = false): Post[] {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
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
          published: data.published ?? true,
        },
      };
    })
    .filter((post) => includeDrafts || post.frontmatter.published)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: {
      title: data.title || 'No Title',
      date: data.date || 'No Date',
      tags: data.tags || [],
      published: data.published ?? true,
    },
    content: content || '',
  };
}
