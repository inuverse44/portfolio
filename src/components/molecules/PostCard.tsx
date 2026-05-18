import Tag from '@/components/atoms/Tag';

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
  const { title, date, tags = [], cover } = post.data;
  const coverSrc = cover || `https://picsum.photos/seed/${post.slug}/80/56`;
  const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;

  return (
    <article style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 0', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
      <div className="cover-img-wrap" style={{ width: '80px', flexShrink: 0 }}>
        <img
          src={coverSrc}
          alt=""
          className="cover-img"
          style={{ width: '80px', height: '56px', objectFit: 'cover', borderRadius: '3px', display: 'block' }}
        />
      </div>
      <div style={{ flex: 1 }}>
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
      </div>
    </article>
  );
};

export default PostCard;
