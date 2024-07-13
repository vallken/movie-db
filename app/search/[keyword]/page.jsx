'use client';

import { Search } from "@/app/components/NavBar/Search";
import Pagination from "@/app/components/utilities/Pagination";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Page = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { keyword } = params;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/api/searchMovie/${keyword}?page=${page}`
        );

        const result = await response.json();

        if (!response.ok || result.data.length === 0) {
          setError('Movie not found');
          setPosts([]);
        } else {
          setPosts(result);
        }
      } catch (err) {
        setError('Error fetching movies');
        setPosts([]);
      }

      setLoading(false);
    };

    if (keyword) {
      fetchMovies();
    } else {
      setLoading(false);
      setError('Keyword is required');
    }
  }, [keyword, page]);

  if (loading) {
    return <h1 className="text-3xl font-bold text-color-primary">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-3xl font-bold text-color-primary">{error}</h1>;
  }

  return (
    <div className="bg-gray-200 p-2">
      <Search />
      <div className="grid md:grid-cols-4 grid-cols-3 gap-4 px-2 mt-2">
        {posts.data.map((movie) => {
          return (
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
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-2">
      <Pagination page={page} setPage={setPage} lastpage={posts.totalPages} />
      </div>
    </div>
  );
};

export default Page;
