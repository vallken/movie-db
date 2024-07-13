import { Search } from "@/src/components/NavBar/Search";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }) => {
  const { keyword } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/api/MovieData/${keyword}`
  );
  const result = await response.json();

  if (!response.ok || result.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-red-600">Movie not found</h1>
      </div>
    );
  }

  const movie = result.data;
  const defaultImage = "https://placehold.co/400x600.png"; // Path to default image

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Search />
      <div className="max-w-5xl mx-auto my-4 bg-white p-6 shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center ">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <Image
              src={movie.image ? `https:${movie.image}` : defaultImage}
              alt={movie.title}
              width={300}
              height={500}
              className="h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:ml-6">
            <h1 className="md:text-4xl text-xl text-center font-bold text-gray-800 mb-4">
              {movie.title}
            </h1>
            <ul className="list-disc pl-5 space-y-2">
              {movie.details?.map((detail) => (
                <li key={detail._id}>
                  <Link
                    href={detail.link}
                    className="text-blue-500 hover:underline"
                  >
                    {detail.provider}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
