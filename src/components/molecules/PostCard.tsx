import React from 'react';
import Link from 'next/link';
import Tag from '@/components/atoms/Tag';
import Image from 'next/image';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: {
    slug: string;
    frontmatter: {
      title: string;
      date: string;
      tags: string[];
    };
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const DEFAULT_COVER = '/images/placeholder-card.svg';
  const coverSrc = post.frontmatter.cover || DEFAULT_COVER;

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
        </h2>
        <div className={styles.metaRow}>
          <time className={styles.meta} dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
          <div className={styles.tags}>
            {post.frontmatter.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.thumb}>
        <Image
          src={coverSrc}
          alt=""
          width={160}
          height={100}
          sizes="160px"
          style={{ width: 160, height: 100, objectFit: 'contain', background: '#f3f4f6', borderRadius: 4 }}
          unoptimized
        />
      </div>
    </article>
  );
};

export default PostCard;
