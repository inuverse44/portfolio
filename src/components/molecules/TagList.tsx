import { useMemo } from 'react';

interface TagListProps {
  tagCounts: Record<string, number>;
}

const TagList = ({ tagCounts }: TagListProps) => {
  const sortedTags = useMemo(() => {
    return Object.entries(tagCounts).sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
    });
  }, [tagCounts]);

  return (
    <div>
      <h2>Tags</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sortedTags.map(([tag, count]) => (
          <li key={tag} style={{ margin: '0.25rem 0' }}>
            <a href={`/tags/${encodeURIComponent(tag)}`}>
              #{tag} <span style={{ color: '#888', fontSize: '0.85em' }}>({count})</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
