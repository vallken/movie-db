import { SearchMovieComponent } from "@/src/components/NavBar/SearchMovieComponent";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import LoadingSpinner from "../../loading";
import { getMovieData } from "@/src/lib/api-lib";
import DisqusComments from "@/src/components/discqus-comment";

const Page = async ({ params, searchParams }) => {
  const { keyword } = params;
  const id = searchParams.id;
  const result = await getMovieData(id);

  if (!result) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-red-600">Movie not found</h1>
      </div>
    );
  }

  const movie = result.data;
  const defaultImage = "https://placehold.co/400x600.png";

  return (
    <div className="bg-gray-200 dark:bg-gray-800 min-h-screen p-4">
      <SearchMovieComponent />
      <Suspense fallback={<LoadingSpinner />}>
        <div className="hero min-h-screen max-w-5xl mx-auto my-4 bg-gray-100 dark:bg-gray-500 shadow-md rounded-lg">
          <div className="hero-content flex-col lg:flex-row items-start md:items-center">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <Image
                src={movie.image ? `https:${movie.image}` : defaultImage}
                alt={movie.title}
                width={300}
                height={500}
                className="h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:ml-6 w-full md:w-2/3">
              <h1 className="md:text-4xl text-xl text-center dark:text-gray-200 font-bold text-gray-800 mb-4">
                {movie.title}
              </h1>
              <div className="relative">
                <details className="dropdown w-full">
                  <summary className="btn md:mx-auto btn-outline w-full">Download</summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full md:w-52 p-2 shadow mt-1">
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
                </details>
              </div>
            </div>
          </div>
        </div>
        <div>
          
          <DisqusComments post={movie} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;