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
    cover?: string | null;
    published?: boolean;
  };
  content?: string;
}

export interface SimplePostRef {
  slug: string;
  title: string;
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
          cover: (data.cover ?? null),
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
      cover: (data.cover ?? null),
      published: data.published ?? true,
    },
    content: content || '',
  };
}

export function getAllTagsCount(): Record<string, number> {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });

  return counts;
}

export function getAdjacentPosts(slug: string): { prev: SimplePostRef | null; next: SimplePostRef | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  // posts are sorted by date desc (newest first)
  const newer = index > 0 ? posts[index - 1] : null; // next (新しい)
  const older = index < posts.length - 1 ? posts[index + 1] : null; // prev (古い)

  const toRef = (p: Post | null): SimplePostRef | null => (p ? { slug: p.slug, title: p.frontmatter.title } : null);

  return {
    prev: toRef(older),
    next: toRef(newer),
  };
}
