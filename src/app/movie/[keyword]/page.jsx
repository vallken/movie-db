import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchMovieComponent } from "@/src/components/NavBar/SearchMovieComponent";
import { getMovieData } from "@/src/lib/api-lib";
import dynamic from "next/dynamic";

const DynamicDisqusComments = dynamic(
  () => import("@/src/components/discqus-comment"),
  {
    ssr: false,
  }
);

const defaultImage = "https://placehold.co/400x600.png";

const DetailItem = ({ label, value }) => (
  <div className="mb-2">
    <span className="font-semibold text-gray-700 dark:text-gray-300">
      {label}:
    </span>
    <span className="ml-2 text-gray-600 dark:text-gray-400">{value}</span>
  </div>
);

const Page = async ({ params, searchParams }) => {
  const { id } = searchParams;
  const result = await getMovieData(id);

  if (!result) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-red-600">Movie not found</h1>
      </div>
    );
  }

  const movie = result.data;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <SearchMovieComponent />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="">
            <section>
            <div className="md:max-w-90 md:mx-auto">
                <Image
                  src={movie.image || defaultImage}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="w-full h-64 object-cover md: rounded-t-lg"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  {movie.title}
                </h1>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <DetailItem label="Negara" value={movie?.data.negara} />
                  <DetailItem
                    label="Bintang Film"
                    value={movie.data.bintangFilm.join(", ")}
                  />
                  <DetailItem label="Sutradara" value={movie?.data.sutradara} />
                  <DetailItem
                    label="iMDb"
                    value={`${movie.data.imdb.rating}/${movie.data.imdb.scale} (${movie.data.imdb.users} Users)`}
                  />
                  <DetailItem label="Genre" value={movie.data.genre} />
                  <DetailItem label="Durasi" value={movie.data.durasi} />
                </div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Sinopsis
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {movie.synopsis}
                  </p>
                </div>
                <div className="relative">
                  <details className="dropdown w-full">
                    <summary className="btn btn-primary w-auto">
                      Download
                    </summary>
                    <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] w-full md:w-52 p-2 shadow mt-1 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 absolute">
                      {movie.details.map((detail) => (
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
    </div>
  );
};

export default Page;
