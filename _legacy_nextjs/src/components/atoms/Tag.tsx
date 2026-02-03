import React from 'react';
import Link from 'next/link';
import styles from './Tag.module.css';

interface TagProps {
  children: string;
}

const Tag = ({ children }: TagProps) => {
  return (
    <Link href={`/tags/${children}`} className={styles.tag}>
      {children}
    </Link>
  );
};

export default Tag;
