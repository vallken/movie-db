"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import VideoPlayer from "@/src/components/LazyFrame";

const DynamicDisqusComments = dynamic(
  () => import("@/src/components/discqus-comment"),
  { ssr: false }
);

const DramaDetail = ({ posts }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

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

  const handleEpisodeSelect = (link) => {
    setSelectedVideo(link);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <figure>
                <img
                  src={posts.image}
                  alt={posts.title}
                  className="w-full h-96 object-cover"
                />
              </figure>
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className="font-bold text-3xl mb-6 text-gray-800 dark:text-gray-100">
                {posts?.title.split("Season")[0].trim()}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <DetailItem label="Status" value={posts?.data.status} />
                <DetailItem label="Negara" value={posts?.data.negara} />
                <DetailItem label="Durasi" value={posts?.data.durasi} />
                <DetailItem
                  label="Bintang Film"
                  value={posts?.data.bintangFilm.join(", ")}
                />
                <DetailItem
                  label="iMDb"
                  value={`${posts?.data.imdb.rating}/${posts?.data.imdb.scale} (${posts?.data.imdb.users} Users)`}
                />
                <DetailItem label="Genre" value={posts?.data.genre} />
              </div>
              <div className="mt-8">
                <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-100">
                  Sinopsis
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {posts.synopsis}
                </p>
              </div>
            </div>
          </div>
          <div className="card-actions flex-col items-center p-8 bg-base-200">
            <div className="tabs tabs-boxed">
              {posts.seasons &&
                posts.seasons.map((season, index) => (
                  <a
                    key={index}
                    className={`tab ${
                      selectedSeason === index ? "tab-active" : ""
                    }`}
                    onClick={() => setSelectedSeason(index)}
                  >
                    {season.season}
                  </a>
                ))}
            </div>

            {posts.seasons && posts.seasons[selectedSeason] && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4 w-full">
                {posts.seasons[selectedSeason].episodes.map(
                  (episode, index) => (
                    <button
                      key={index}
                      className={`btn btn-outline ${
                        selectedEpisode === index ? "btn-primary" : ""
                      }`}
                      onClick={() => setSelectedEpisode(index)}
                    >
                      {episode.episode}
                    </button>
                  )
                )}
              </div>
            )}

            {selectedEpisode !== null && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {posts.seasons[selectedSeason].episodes[
                  selectedEpisode
                ].links.map((link, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      link.provider === "Streaming"
                        ? "btn-secondary"
                        : "btn-primary"
                    }`}
                    onClick={() =>
                      link.provider === "Streaming"
                        ? handleEpisodeSelect(link.link)
                        : null
                    }
                  >
                    {link.provider === "Streaming" ? (
                      "Watch"
                    ) : (
                      <Link
                        href={link.link || "/"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download ({link.provider})
                      </Link>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedVideo && (
            <div className="p-8">
              <VideoPlayer src={selectedVideo} />
            </div>
          )}
        </div>
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          <div className="disqus-container" style={{ all: "initial" }}>
            <DynamicDisqusComments post={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DramaDetail;
