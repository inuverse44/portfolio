import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  children: React.ReactNode;
}

const Tag = ({ children }: TagProps) => {
  return <span className={styles.tag}>{children}</span>;
};

export default Tag;
