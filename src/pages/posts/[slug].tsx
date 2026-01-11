import Meta from '@/components/atoms/Meta';
import BackButton from '@/components/molecules/BackButton';
import PostHeader from '@/components/organisms/PostHeader';
import PostBody from '@/components/organisms/PostBody';
import AdSense from '@/components/AdSense';
import styles from '@/styles/PostDetail.module.css';
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
  const postInlineSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_POST_INLINE;
  return (
    <>
      <BackButton />
      <article className={styles.article}>
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
        {postInlineSlot ? (
          <AdSense slot={postInlineSlot} />
        ) : null}
      </article>
      <BackButton />
    </>
  );
}
