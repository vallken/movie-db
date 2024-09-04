"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import VideoPlayer from "@/src/components/LazyFrame";

const DynamicDisqusComments = dynamic(
  () => import("@/src/components/discqus-comment"),
  { ssr: false }
);

const MovieDetail = ({ movie }) => {
  const [selectedLink, setSelectedLink] = useState(null);

  const DetailItem = ({ label, value }) => (
    <div className="mb-4">
      <span className="font-semibold text-gray-700 dark:text-gray-200 block mb-1">
        {label}
      </span>
      <span className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
        {value}
      </span>
    </div>
  );

  const handleStreamingClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <figure>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-96 object-cover"
                />
              </figure>
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className="font-bold text-3xl mb-6 text-gray-800 dark:text-gray-100">
                {movie.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <DetailItem label="Negara" value={movie?.data.negara} />
                <DetailItem
                  label="Bintang Film"
                  value={movie.data.bintangFilm.join(", ")}
                />
                <DetailItem label="Durasi" value={movie.data.durasi} />
                <DetailItem label="Sutradara" value={movie?.data.sutradara} />
                <DetailItem
                  label="iMDb"
                  value={`${movie.data.imdb.rating}/${movie.data.imdb.scale} (${movie.data.imdb.users} Users)`}
                />
                <DetailItem label="Genre" value={movie.data.genre} />
              </div>
              <div className="mt-8">
                <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-100">
                  Sinopsis
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-8">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="relative">
                <details className="dropdown">
                  <summary className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                    Download
                  </summary>
                  <ul className="menu dropdown-content bg-white dark:bg-gray-800 rounded-xl z-[1] w-56 p-4 shadow-xl mt-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 absolute">
                    {movie.details
                      .filter(
                        (detail) =>
                          detail.provider !== "Streaming" &&
                          detail.provider !== "FileLion"
                      )
                      .map((detail) => (
                        <li key={detail._id} className="mb-2">
                          <Link
                            href={detail.link}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition duration-300"
                          >
                            {detail.provider}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </details>
              </div>
              {movie.details
                .filter(
                  (prov) =>
                    prov.provider === "FileLion" ||
                    prov.provider === "Streaming"
                )
                .map((detail) => (
                  <button
                    key={detail._id}
                    className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleStreamingClick(detail.link)}
                  >
                    {detail.provider
                      .replace("FileLion", "Desktop")
                      .replace("Streaming", "Mobile")}
                  </button>
                ))}
            </div>
            {selectedLink && (
              <div className="mt-8">
                <VideoPlayer src={selectedLink} />
              </div>
            )}
          </div>
        </div>
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          <div className="disqus-container" style={{ all: "initial" }}>
            <DynamicDisqusComments post={movie} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
