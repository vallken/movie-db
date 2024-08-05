import React from "react";
import Link from "next/link";
import { getMovieData } from "@/src/lib/api-lib";
import dynamic from "next/dynamic";
import CloudinaryImage from "@/src/components/CdnImage";

const DynamicDisqusComments = dynamic(
  () => import("@/src/components/discqus-comment"),
  {
    ssr: false,
  }
);

const defaultImage = "https://placehold.co/400x600.png";

const DetailItem = ({ label, value }) => (
  <div className="mb-2">
    <span className="font-semibold text-gray-700 dark:text-gray-200">
      {label}:
    </span>
    <span className="ml-2 text-gray-600 dark:text-gray-200">{value}</span>
  </div>
);

const Page = async ({ params, searchParams }) => {
  console.log({ params });
  const { id } = searchParams;
  const result = await getMovieData(id);

  if (result.totalPages === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-red-600">Movie not found</h1>
      </div>
    );
  }

  const movie = result.data;

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 dark:bg-gray-600 rounded-lg shadow-lg">
          <div className="">
            <section>
              <div className="md:max-w-90 md:mx-auto">
                <CloudinaryImage
                  src={movie.cloudinaryId}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="w-full h-64 object-cover md: rounded-t-lg"
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
                <div className="relative p-4">
                  <details className="dropdown w-full">
                    <summary className="btn btn-active w-auto">
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
