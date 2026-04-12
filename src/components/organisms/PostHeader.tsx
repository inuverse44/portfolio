import Tag from '../atoms/Tag';

interface PostHeaderProps {
  title: string;
  date: string;
  tags: string[];
}

const PostHeader = ({ title, date, tags }: PostHeaderProps) => {
  return (
    <header style={{ marginBottom: '2rem' }}>
      <h1 style={{ marginTop: 0 }}>{title}</h1>
      <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#888' }}>
        <time dateTime={date}>{date}</time>
      </div>
      {tags.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </header>
  );
};

export default PostHeader;
