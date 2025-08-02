'use client';

import { useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../ui/pagination';

type PaginationContainerProps = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export default function PaginationContainer({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage
}: PaginationContainerProps) {
  const urlSearchParams = useSearchParams();

  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(urlSearchParams);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pagesAroundCurrentPage = 2;
    const minimumPages = 5;
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= minimumPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > pagesAroundCurrentPage + 2) {
        pages.push('ellipsis');
      }

      const start = Math.max(2, currentPage - pagesAroundCurrentPage);
      const end = Math.min(
        totalPages - 1,
        currentPage + pagesAroundCurrentPage
      );

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - pagesAroundCurrentPage - 1) {
        pages.push('ellipsis');
      }
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={hasPreviousPage ? getPageUrl(currentPage - 1) : '#'}
              className={
                !hasPreviousPage
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={getPageUrl(page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={hasNextPage ? getPageUrl(currentPage + 1) : '#'}
              className={
                !hasNextPage
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
