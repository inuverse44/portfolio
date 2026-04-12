interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const filtered = headings.filter((h) => h.depth === 2 || h.depth === 3);
  if (filtered.length === 0) return null;

  return (
    <nav aria-label="目次" style={{ borderLeft: '3px solid #e5e5e5', paddingLeft: '1rem', margin: '1.5rem 0', fontSize: '0.9rem' }}>
      <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#555' }}>目次</p>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filtered.map((h) => (
          <li key={h.slug} style={{ margin: '0.25rem 0', paddingLeft: h.depth === 3 ? '1rem' : '0' }}>
            <a href={`#${h.slug}`} style={{ color: '#555' }}>{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TableOfContents;
