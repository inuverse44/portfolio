import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // e.g., '/blog/page'
  indexPath?: string; // e.g., '/blog' for page 1
}

const Pagination = ({ currentPage, totalPages, basePath = '/blog/page', indexPath = '/blog' }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const hrefFor = (page: number) => (page === 1 ? indexPath : `${basePath}/${page}`);

  return (
    <nav aria-label="Pagination" style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '16px 0' }}>
      {prevPage ? (
        <a href={hrefFor(prevPage)}>← Prev</a>
      ) : (
        <span style={{ opacity: 0.4 }}>← Prev</span>
      )}

      <span style={{ marginLeft: 8, marginRight: 8 }}>
        Page {currentPage} / {totalPages}
      </span>

      {nextPage ? (
        <a href={hrefFor(nextPage)}>Next →</a>
      ) : (
        <span style={{ opacity: 0.4 }}>Next →</span>
      )}
    </nav>
  );
};

export default Pagination;