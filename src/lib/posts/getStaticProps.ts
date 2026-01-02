import { GetStaticProps } from 'next';
import { getPostBySlug } from './api';

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const post = getPostBySlug(slug);

  return {
    props: {
      ...post,
    },
  };
};

export default getStaticProps;
