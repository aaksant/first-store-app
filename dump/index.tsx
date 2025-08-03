import { useLoaderData, useSearchParams } from 'react-router';

export default function PaginationContainer() {
  const { meta } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, pageCount } = meta.pagination;

  const handlePageChange = (pageNumber) => {
    searchParams.set('page', pageNumber);
    setSearchParams(searchParams);
  };

  // Function to generate the page buttons with ellipsis
  const renderPageButtons = () => {
    const pageButtons = [];

    // Add the first page button
    pageButtons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`join-item btn ${page === 1 ? 'btn-active' : ''}`}
      >
        1
      </button>
    );

    // Add dots if the current page is far from the beginning
    if (page > 3) {
      pageButtons.push(
        <button key="dots-start" className="join-item btn btn-disabled">
          ...
        </button>
      );
    }

    // Add the page before the current page
    if (page > 2) {
      pageButtons.push(
        <button
          key={page - 1}
          onClick={() => handlePageChange(page - 1)}
          className="join-item btn"
        >
          {page - 1}
        </button>
      );
    }

    // Add the current page button (if it's not the first or the last)
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className="join-item btn btn-active"
        >
          {page}
        </button>
      );
    }

    // Add the page after the current page
    if (page < pageCount - 1) {
      pageButtons.push(
        <button
          key={page + 1}
          onClick={() => handlePageChange(page + 1)}
          className="join-item btn"
        >
          {page + 1}
        </button>
      );
    }

    // Add dots if the current page is far from the end
    if (page < pageCount - 2) {
      pageButtons.push(
        <button key="dots-end" className="join-item btn btn-disabled">
          ...
        </button>
      );
    }

    // Add the last page button
    pageButtons.push(
      <button
        key={pageCount}
        onClick={() => handlePageChange(pageCount)}
        className={`join-item btn ${page === pageCount ? 'btn-active' : ''}`}
      >
        {pageCount}
      </button>
    );

    return pageButtons;
  };

  if (pageCount <= 1) return null; // Don't render pagination if there's only one page

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="join-item btn"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="join-item btn"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
