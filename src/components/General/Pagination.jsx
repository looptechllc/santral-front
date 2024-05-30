function Pagination({ currentPage, totalPages, onPageChange }) {
    const pagesToShow = 10; // Number of pages to show
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2)); // Calculate start page
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1); // Calculate end page
  
    const pages = [...Array(endPage - startPage + 1).keys()].map(
      (number) => startPage + number
    );
  
    return (
      <div className="flex items-center justify-center my-[24px] select-none">
        <button
          className={`pagination-arrow ${
            currentPage === 1 ? "hidden" : ""
          } rounded-full w-[40px] h-[40px] mx-[4px] border border-[#EAEAEA] flex items-center justify-center p-2 bg-white hover:bg-yellow-200 transition-colors`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {"<"}
        </button>
        <div className="pagination">
          {pages.map((page) => (
            <button
              key={page}
              className={`pagination-button ${
                page === currentPage
                  ? "active bg-[#FFD23F] border-[#ffd23f]"
                  : "border-[#EAEAEA] "
              } rounded-full w-[40px] h-[40px] mx-[4px] border  p-2  transition-colors`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          className={`pagination-arrow ${
            currentPage === totalPages ? "hidden" : ""
          } rounded-full w-[40px] h-[40px] mx-[4px] border border-[#EAEAEA]  p-2 bg-white hover:bg-yellow-200 transition-colors`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {">"}
        </button>
      </div>
    );
  }
  export default Pagination