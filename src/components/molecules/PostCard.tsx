import Tag from '@/components/atoms/Tag';

interface PostCardProps {
  post: {
    slug: string;
    data: {
      title: string;
      date: Date | string;
      tags?: string[];
    };
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const { title, date, tags = [] } = post.data;
  const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;

  return (
    <article style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 0' }}>
      <a href={`/posts/${post.slug}`} style={{ fontWeight: '600', fontSize: '1rem', color: '#1a1a1a' }}>
        {title}
      </a>
      <div style={{ marginTop: '0.25rem', fontSize: '0.85rem', color: '#888' }}>
        <time dateTime={dateStr as string}>{dateStr}</time>
        {tags.length > 0 && (
          <span style={{ marginLeft: '0.75rem' }}>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </span>
        )}
      </div>
    </article>
  );
};

export default PostCard;
