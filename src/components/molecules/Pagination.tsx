import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // e.g., '/blog/page'
}

const Pagination = ({ currentPage, totalPages, basePath = '/blog/page' }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav aria-label="Pagination" style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '16px 0' }}>
      {prevPage ? (
        <Link href={`${basePath}/${prevPage}`}>← Prev</Link>
      ) : (
        <span style={{ opacity: 0.4 }}>← Prev</span>
      )}

      <span style={{ marginLeft: 8, marginRight: 8 }}>
        Page {currentPage} / {totalPages}
      </span>

      {nextPage ? (
        <Link href={`${basePath}/${nextPage}`}>Next →</Link>
      ) : (
        <span style={{ opacity: 0.4 }}>Next →</span>
      )}
    </nav>
  );
};

export default Pagination;

