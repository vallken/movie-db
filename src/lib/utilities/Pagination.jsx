"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Pagination({ page, totalPages, search }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage) => {
    const searchParam = search ? `?search=${search}&page=${newPage}` : `?page=${newPage}`;
    router.push(`${searchParam}`);
    setCurrentPage(newPage);
    scrollTop();
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = isMobile ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        if (!isMobile) {
          pageNumbers.push(currentPage + 1);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap justify-center items-center my-8 gap-2">
      <button
        className={`btn btn-circle btn-sm md:btn-md ${
          currentPage <= 1
            ? "btn-disabled"
            : "btn-primary"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      {generatePageNumbers().map((pageNum, index) => (
        <button
          key={index}
          className={`btn btn-sm md:btn-md ${
            pageNum === currentPage 
              ? "btn-primary" 
              : pageNum === "..." 
                ? "btn-disabled" 
                : "btn-ghost hover:btn-primary"
          }`}
          onClick={() => pageNum !== "..." && handlePageChange(pageNum)}
          disabled={pageNum === "..."}
        >
          {pageNum}
        </button>
      ))}
      <button
        className={`btn btn-circle btn-sm md:btn-md ${
          currentPage >= totalPages
            ? "btn-disabled"
            : "btn-primary"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
}