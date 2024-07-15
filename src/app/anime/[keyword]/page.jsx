import { SearchAnimeComponent } from "@/src/components/NavBar/SearchAnimeComponent";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }) => {
  const { keyword } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/AnimeData/${keyword.replace(
      /-/g,
      " "
    )}`
  );
  const result = await response.json();

  if (!response.ok || result.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-red-600">Anime not found</h1>
      </div>
    );
  }

  const anime = result.data;

  const defaultImage = "https://placehold.co/400x600.png";

  return (
    <div className="bg-gray-200 p-2">
      <SearchAnimeComponent />
      <div className="mt-2">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
          <div className="bg-white rounded-lg shadow-md ">
            <Image
              src={anime.images.webp || anime.images.jpg}
              alt={anime.title}
              width={300}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">{anime.title}</h2>
              <p className="text-gray-700 text-sm mb-2">Episodes: {anime.episodes}</p>
              <p className="text-gray-700 text-sm mb-2">Duration: {anime.duration}</p>
              <p className="text-gray-700 text-sm mb-2">Rating: {anime.rating}</p>
              <p className="text-gray-700 text-sm mb-2">Score: {anime.score}</p>
              <p className="text-gray-700 text-sm">Sinopsis: {anime.synopsis}</p>
            </div>
          </div>

        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2">Download Links:</h3>
          {anime.link.map((resolution) => (
            <div key={resolution._id} className="mb-4">
              <h4 className="font-semibold text-md mb-1">{resolution.resolution}</h4>
              <ul className="list-disc pl-5">
                {resolution.details.map((detail) => (
                  <li key={detail._id}>
                    <a 
                      href={detail.link} 
                      className="text-blue-600 hover:text-blue-800"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {detail.provider}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;
