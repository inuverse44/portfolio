interface TagProps {
  children: string;
}

const Tag = ({ children }: TagProps) => {
  return (
    <a href={`/tags/${encodeURIComponent(children)}`} style={{ fontSize: '0.8rem', color: '#7c3aed', marginRight: '0.5rem' }}>
      #{children}
    </a>
  );
};

export default Tag;
