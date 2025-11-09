import { GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';

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
    fallback: false,
  };
};

export default getStaticPaths;

