import { GetStaticProps } from 'next';
import { getPostBySlug, getAdjacentPosts } from './api';

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const post = getPostBySlug(slug);
  const { prev, next } = getAdjacentPosts(slug);

  return {
    props: {
      ...post,
      prevPost: prev,
      nextPost: next,
    },
  };
};

export default getStaticProps;
