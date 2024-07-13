'use client';

import Image from "next/image";
import Link from "next/link";
import {useState, useEffect, React} from "react";

const MovieList = ({ api }) => {


  return (
    <div className="grid md:grid-cols-4 grid-cols-3 gap-4 px-2">
      {api.map((movie) => {
        return (
          <Link
            href={`/movie/${movie.title}`}
            key={movie.title}
            className="cursor-pointer text-color-primary hover:text-color-accent transition-all "
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
  );
};

export default MovieList;
