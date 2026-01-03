import React from 'react';
import Link from 'next/link';
import styles from './TagList.module.css';

interface TagListProps {
  tagCounts: Record<string, number>;
}

const TagList = ({ tagCounts }: TagListProps) => {
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  return (
    <div className={styles.tagListContainer}>
      <h2 className={styles.tagListTitle}>Tags</h2>
      <ul className={styles.tagList}>
        {sortedTags.map(([tag, count]) => (
          <li key={tag} className={styles.tagItem}>
            <Link href={`/tags/${tag}`} className={styles.tagLink}>
              {tag}
              <span className={styles.tagCount}>({count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
