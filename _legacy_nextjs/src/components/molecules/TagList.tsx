import React, { useMemo } from 'react';
import Link from 'next/link';
import styles from './TagList.module.css';

interface TagListProps {
  tagCounts: Record<string, number>;
}

const TagList = ({ tagCounts }: TagListProps) => {
  const sortedTags = useMemo(() => {
    return Object.entries(tagCounts).sort((a, b) => {
      if (b[1] != a[1]) return b[1] - a[1];
      return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
    });
  }, [tagCounts]);

  return (
    <div className={styles.tagListContainer}>
      <h2 className={styles.tagListTitle}>Tags</h2>
      <ul className={styles.tagList}>
        {sortedTags.map(([tag, count]) => (
          <li key={tag} className={styles.tagItem}>
            <Link href={`/tags/${encodeURIComponent(tag)}`} className={styles.tagLink}>
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
