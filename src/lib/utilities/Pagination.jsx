export default function Pagination ({ page, setPage, lastpage }) {
    
    const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleNextPage = () => {
      if (page < lastpage) {
        setPage(page + 1);
        scrollTop();
      }
    }
    const handlePreviousPage = () => {
      if (page > 1) {
        setPage(page - 1);
        scrollTop();
      }
    }

  return (
    <div>
      <button className="transition-all hover:text-color-accent" onClick={handlePreviousPage} disabled={page === 1}>
        Previous
      </button>
      <p>{page} of {lastpage}</p>
      <button className="transition-all hover:text-color-accent" onClick={handleNextPage} disabled={page === lastpage}>
        Next
      </button>
    </div>
  );
};
