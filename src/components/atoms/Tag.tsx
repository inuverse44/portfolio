import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  children: string;
}

const Tag = ({ children }: TagProps) => {
  return (
    <a href={`/tags/${children}`} className={styles.tag}>
      {children}
    </a>
  );
};

export default Tag;