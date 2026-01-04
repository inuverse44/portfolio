import Meta from '@/components/atoms/Meta';
import BackButton from '@/components/molecules/BackButton';
import PostHeader from '@/components/organisms/PostHeader';
import PostBody from '@/components/organisms/PostBody';
export { getStaticPaths } from '@/lib/posts/getStaticPaths';
export { getStaticProps } from '@/lib/posts/getStaticProps';

interface PostProps {
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
  };
  content: string;
  slug: string;
}

export default function Post({ frontmatter, content, slug }: PostProps) {
  return (
    <article>
      <BackButton />
      <Meta
        title={frontmatter.title}
        description={frontmatter.title}
        type="article"
      />
      <PostHeader
        title={frontmatter.title}
        date={frontmatter.date}
        tags={frontmatter.tags}
      />
      <PostBody content={content} slug={slug} />
      <BackButton />
    </article>
  );
}
