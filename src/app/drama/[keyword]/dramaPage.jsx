"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import CloudinaryImage from "@/src/components/CdnImage";

const DynamicDisqusComments = dynamic(
  () => import("@/src/components/discqus-comment"),
  {
    ssr: false,
  }
);

const DramaDetail = ({ posts }) => {
  const defaultImage = "https://placehold.co/400x600.png";

  return (
    <>
      <div className=" bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="">
          <section>
            <div className="md:max-w-90 md:mx-auto">
              <CloudinaryImage
                src={posts.cloudinaryId}
                alt={posts.title}
                width={300}
                height={400}
                className="w-full h-64 object-cover md: rounded-t-lg"
              />
              <div>
                <h2 className="font-bold text-xl mb-2 px-3 mt-3">
                  {posts?.title.split("Season")[0].trim()}
                </h2>
                <div className="p-4 grid grid-cols-2">
                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-bold">Status:</span>{" "}
                    {posts?.data.status}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-bold">Negara:</span>{" "}
                    {posts?.data.negara}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-bold">Durasi:</span>{" "}
                    {posts.data.durasi}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-bold">Bintang Film:</span>{" "}
                    {posts.data.bintangFilm.join(", ")}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-bold">iMDb:</span>{" "}
                    {posts.data.imdb.rating}/{posts.data.imdb.scale} from{" "}
                    {posts.data.imdb.users} Users
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-bold">Genre:</span> {posts.data.genre}
                  </p>
                </div>
                <p className="text-gray-700 text-sm px-3">
                  <span className="font-bold">Sinopsis:</span>
                  <br />
                  {posts.synopsis}
                </p>
              </div>
            </div>
            <div className="relative p-4">
              <details className="dropdown w-full ">
                <summary className="btn md:mx-auto">Download</summary>
                <div className="mt-4 px-3">
                  {posts.seasons &&
                    posts.seasons.map((season, seasonIndex) => (
                      <div key={seasonIndex} className="mb-4">
                        <h4 className="font-semibold text-md mb-1">
                          {season.season}
                        </h4>
                        <ul className="list-none pl-5">
                          <details className="dropdown w-auto">
                            <summary className="btn btn-outline btn-sm">
                              Eps ‣
                            </summary>
                            {season.episodes.map((detail, episodeIndex) => (
                              <div className="join " key={episodeIndex}>
                                <details className="dropdown w-full ">
                                  <summary className="join-horizontal join-item btn btn-outline btn-sm">
                                    {detail.episode}
                                  </summary>
                                  <li key={episodeIndex}>
                                    <ul className="menu menu-sm z-[1] dropdown-content bg-base-200 rounded-box">
                                      {detail.links.map((prov, linkIndex) => (
                                        <li key={linkIndex}>
                                          <Link
                                            href={prov.link ? prov.link : "/"}
                                            className="text-blue-600 hover:text-blue-800"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {prov.provider}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                </details>
                              </div>
                            ))}
                          </details>
                        </ul>
                      </div>
                    ))}
                </div>
              </details>
            </div>
          </section>
        </div>
      </div>
      <div className="disqus-container" style={{ all: "initial" }}>
        <DynamicDisqusComments post={posts} />{" "}
      </div>
    </>
  );
};

export default DramaDetail;
