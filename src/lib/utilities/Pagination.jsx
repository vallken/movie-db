"use client";

import { useRouter } from 'next/navigation';

export default function Pagination({ page, totalPages }) {
  const router = useRouter();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage) => {
    router.push(`?page=${newPage}`);
    scrollTop();
  };

const handleNextPage = () => {
  const nextPage = parseInt(page, 10) + 1; 
  if (nextPage <= totalPages) {
    handlePageChange(nextPage);
  }
};

const handlePreviousPage = () => {
  const previousPage = parseInt(page, 10) - 1;
  if (previousPage >= 1) {
    router.push(`?page=${previousPage}`);
  }
};

  return (
    <div className="flex justify-center items-center gap-4 my-4">
      <button
        className={`py-2 px-4 bg-indigo-600 text-white rounded-md transition-all ${
          page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
        }`}
        onClick={handlePreviousPage}
        disabled={page === 1}
      >
        Previous
      </button>
      <p>
        {page} of {totalPages}
      </p>
      <button
        className={`py-2 px-4 bg-indigo-600 text-white rounded-md transition-all ${
          page >= totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-indigo-700"
        }`}
        onClick={handleNextPage}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
