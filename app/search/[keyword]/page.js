import { Search } from "@/app/components/NavBar/Search";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }) => {
  const { keyword } = params;
  const response = await fetch(`${process.env.MOVIE_API_URL}/api/searchMovie/${keyword}`);
  const result = await response.json();
  
  if (!response.ok || result.data.length === 0) {
    return (
      <h1 className="text-3xl font-bold text-color-primary">Movie not found</h1>
    );
  }

  return (
    <div className="bg-gray-200 p-2">
      <Search />
      <div className="grid md:grid-cols-4 grid-cols-3 gap-4 px-2 mt-2">
        {result.data.map((movie) => {
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
              <h3 className="font-bold md:text-xl text:md p-4">{movie.title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
