import React from 'react';
import Link from 'next/link';
import Tag from '@/components/atoms/Tag';
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
  return (
    <article className={styles.card}>
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
    </article>
  );
};

export default PostCard;
