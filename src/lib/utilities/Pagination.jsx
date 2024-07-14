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
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
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
