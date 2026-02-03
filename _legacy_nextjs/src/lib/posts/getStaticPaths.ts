import { GetStaticPaths } from 'next';
import { getAllPosts } from './api';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default getStaticPaths;

