"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../utilities/Pagination";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const fetchData = async () => {
    setError(null);
    try {
      const response = await fetch(`/api/Movie/?page=${page}`);
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
        setTotalPages(data.totalPages);
      } else {
        setError(data.message || "Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      {error ? (
        <h1 className="text-3xl font-bold text-color-primary">{error}</h1>
      ) : (
        <>
          <div className="grid md:grid-cols-4 grid-cols-3 gap-4 px-2">
            {posts.map((movie) => (
              <Link
                href={`/movie/${movie.title}`}
                key={movie.title}
                className="cursor-pointer text-color-primary hover:text-color-accent transition-all"
              >
                <Image
                  src={`https:${movie.image}`}
                  alt={movie.title}
                  width={200}
                  height={200}
                  className="w-full max-h-64 shadow-xl"
                />
                <h3 className="font-bold md:text-xl text:md p-4">
                  {movie.title}
                </h3>
              </Link>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2">
            <Pagination page={page} setPage={handlePageChange} lastpage={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}
