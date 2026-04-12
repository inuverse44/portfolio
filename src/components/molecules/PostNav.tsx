export type SimplePost = {
  slug: string;
  title: string;
};

interface PostNavProps {
  prev?: SimplePost | null;
  next?: SimplePost | null;
}

const PostNav = ({ prev, next }: PostNavProps) => {
  if (!prev && !next) return null;

  return (
    <nav aria-label="記事ナビゲーション" style={{ display: 'flex', justifyContent: 'space-between', margin: '2rem 0', gap: '1rem', fontSize: '0.9rem' }}>
      <div>
        {prev && (
          <a href={`/posts/${prev.slug}`}>← {prev.title}</a>
        )}
      </div>
      <div style={{ textAlign: 'right' }}>
        {next && (
          <a href={`/posts/${next.slug}`}>{next.title} →</a>
        )}
      </div>
    </nav>
  );
};

export default PostNav;
