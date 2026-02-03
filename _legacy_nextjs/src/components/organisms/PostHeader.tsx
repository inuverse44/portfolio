import React from 'react';
import Tag from '@/components/atoms/Tag';
import styles from './PostHeader.module.css';

interface PostHeaderProps {
  title: string;
  date: string;
  tags: string[];
}

const PostHeader = ({ title, date, tags }: PostHeaderProps) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <div className={styles.meta}>
        <time dateTime={date}>{date}</time>
      </div>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </header>
  );
};

export default PostHeader;
