import React from "react";
import Link from "next/link";
import { getMovieData } from "@/src/lib/api-lib";
import dynamic from "next/dynamic";
import CloudinaryImage from "@/src/components/CdnImage";
import VideoPlayer from "@/src/components/LazyFrame";
import MovieDetail from "./moviePage";

const DynamicDisqusComments = dynamic(
  () => import("@/src/components/discqus-comment"),
  {
    ssr: false,
  }
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
      <MovieDetail movie={movie} />
    </div>
  );
};

export default Page;
