import { Search } from "@/app/components/NavBar/Search";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }) => {
  const { keyword } = params;
  const response = await fetch(
    `${process.env.MOVIE_API_URL}/api/MovieData/${keyword}`
  );
  const result = await response.json();

  if (!response.ok || result.data.length === 0) {
    return (
      <h1 className="text-3xl font-bold text-color-primary">Movie not found</h1>
    );
  }

  return (
    <div className="bg-gray-200 p-2">
      <Search />
      <div className="flex">
        <div className="items-center">
          <Image
            src={`https:${result.data.image}`}
            alt={result.data.title}
            width={200}
            height={200}
            className="w-full max-h-64 shadow-xl"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-color-primary">
            {result.data.title}
          </h1>
          <ul>
            {result.data.details.map((detail) => {
              return (
                <Link
                  href={detail.link}
                  key={detail._id}
                  className="text-color-primary hover:text-color-accent transition-all"
                >
                  <li>{detail.provider}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
