import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalEntries,
  perPage,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showingStart = (currentPage - 1) * perPage + 1;
  const showingEnd = Math.min(currentPage * perPage, totalEntries);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 text-sm">
      <div className="text-gray-500">
        Showing {showingStart} to {showingEnd} of {totalEntries} Entries
      </div>
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border border-black text-black rounded-md disabled:text-gray-300 cursor-pointer hover:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-300"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
        {pages.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 rounded-md text-sm flex items-center justify-center hover:bg-gray-200 border border-black hover:text-black ${
              num === currentPage ? "text-white bg-black" : ""
            }`}
          >
            {num}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border border-black text-black rounded-md disabled:text-gray-300 cursor-pointer hover:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-300"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
