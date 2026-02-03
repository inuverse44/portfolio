import React from 'react';
import Tag from '@/components/atoms/Tag';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: {
    slug: string;
    data: {
      title: string;
      date: Date | string;
      tags?: string[];
      cover?: string | null;
    };
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const DEFAULT_COVER = '/images/placeholder-card.svg';
  const { title, date, tags = [], cover } = post.data;
  const coverSrc = cover || DEFAULT_COVER;
  
  const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <a href={`/posts/${post.slug}`}>{title}</a>
        </h2>
        <div className={styles.metaRow}>
          <time className={styles.meta} dateTime={dateStr as string}>{dateStr}</time>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.thumb}>
        <img
          src={coverSrc}
          alt=""
          width={160}
          height={100}
          style={{ width: 160, height: 100, objectFit: 'contain', background: '#f3f4f6', borderRadius: 4 }}
        />
      </div>
    </article>
  );
};

export default PostCard;