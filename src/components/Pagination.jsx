const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalEntries,
  perPage,
}) => {
  const showingStart = (currentPage - 1) * perPage + 1;
  const showingEnd = Math.min(currentPage * perPage, totalEntries);

  const renderPageButtons = () => {
    const buttons = [];

    // Always show first page
    if (currentPage > 2) {
      buttons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`px-3 py-1 rounded-md text-sm border border-black ${
            currentPage === 1 ? "text-white bg-black" : ""
          }`}
        >
          1
        </button>
      );
    }

    // Ellipsis before current
    if (currentPage > 3) {
      buttons.push(
        <span key="start-ellipsis" className="px-2">
          ...
        </span>
      );
    }

    // Current page - 1
    if (currentPage > 1) {
      buttons.push(
        <button
          key={currentPage - 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 rounded-md text-sm border border-black hover:bg-gray-200"
        >
          {currentPage - 1}
        </button>
      );
    }

    // Current page
    buttons.push(
      <button
        key={currentPage}
        onClick={() => onPageChange(currentPage)}
        className="px-3 py-1 rounded-md text-sm border border-black text-white bg-black"
      >
        {currentPage}
      </button>
    );

    // Current page + 1
    if (currentPage + 1 < totalPages) {
      buttons.push(
        <button
          key={currentPage + 1}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 rounded-md text-sm border border-black hover:bg-gray-200"
        >
          {currentPage + 1}
        </button>
      );
    }

    // Ellipsis after current
    if (currentPage + 2 < totalPages) {
      buttons.push(
        <span key="end-ellipsis" className="px-2">
          ...
        </span>
      );
    }

    // Always show last page
    if (currentPage < totalPages - 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1 rounded-md text-sm border border-black ${
            currentPage === totalPages ? "text-white bg-black" : ""
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 text-sm">
      <div className="text-gray-500">
        Showing {showingStart} to {showingEnd} of {totalEntries} Entries
      </div>
      <div className="flex items-center gap-1 mt-2 md:mt-0 overflow-x-auto">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 text-sm border border-black text-black rounded-md disabled:text-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-300"
        >
          Prev
        </button>

        {renderPageButtons()}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 text-sm border border-black text-black rounded-md disabled:text-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
