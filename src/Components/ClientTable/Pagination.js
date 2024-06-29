import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  listLimit,
  setListLimit,
}) => {
  const getPages = () => {
    // Get total pages range,
    let pages = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      {getPages().map((page, index) => (
        <button
          key={index}
          className={`pagination-button ${
            page === currentPage ? "active" : ""
          }`}
          onClick={() => page !== "..." && onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
