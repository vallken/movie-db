"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import VideoPlayer from "@/src/components/LazyFrame";

const DynamicDisqusComments = dynamic(
  () => import("@/src/components/discqus-comment"),
  {
    ssr: false,
  }
);

const MovieDetail = ({ movie }) => {
  const [selectedLink, setSelectedLink] = useState(null);
  const DetailItem = ({ label, value }) => (
    <div className="mb-2">
      <span className="font-semibold text-gray-700 dark:text-gray-200">
        {label}:
      </span>
      <span className="ml-2 text-gray-600 dark:text-gray-200">{value}</span>
    </div>
  );

  const handleStreamingClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-100 dark:bg-gray-600 rounded-lg shadow-lg">
        <div>
          <section>
            <div className="md:max-w-90 md:mx-auto">
              <img
                src={movie.image}
                alt={movie.title}
                width={400}
                height={600}
                className="w-full h-64 object-cover md:rounded-t-lg"
              />
            </div>
            <div>
              <h2 className="font-bold text-xl mb-2 px-3 mt-3">
                {movie.title}
              </h2>
              <div className="p-4 grid grid-cols-2">
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
              <p className="text-gray-700 px-4 dark:text-gray-200">
                <span className="font-bold">Sinopsis:</span>
                <br />
                {movie.synopsis}
              </p>
              <div className="grid">
                <div className="relative p-4">
                  <details className="dropdown w-full">
                    <summary className="btn btn-active w-auto">
                      Download
                    </summary>
                    <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] w-full md:w-52 p-2 shadow mt-1 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 absolute">
                      {movie.details
                        .filter((detail) => detail.provider !==("Streaming" || "FileLion"))
                        .map((detail) => (
                          <li key={detail._id}>
                            <Link
                              href={detail.link}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                            >
                              {detail.provider}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </details>
                </div>
                <div className="relative p-4">
                  <div>
                    {movie.details
                      .filter((prov) => prov.provider === "FileLion" || prov.provider === "Streaming")
                      .map((detail) => (
                        <button
                          key={detail._id}
                          className="btn btn-active w-auto"
                          onClick={() => handleStreamingClick(detail.link)}
                        >
                          {detail.provider.replace("FileLion", "PC").replace("Streaming", "HP")}
                        </button>
                      ))}
                  </div>
                  {selectedLink && (
                    <div className="p-4">
                      <div className="mt-2">
                        <VideoPlayer src={selectedLink}/>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="mt-8">
        <div className="disqus-container" style={{ all: "initial" }}>
          <DynamicDisqusComments post={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
