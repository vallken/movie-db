import { getMovies, searchMovie } from "@/src/lib/api-lib";
import Link from "next/link";
import Pagination from "@/src/lib/utilities/Pagination";
import { cleanUrl } from "@/src/lib/utilities/cleanUrl";
import EmptyState from "@/src/components/EmptyState";

export default async function Page({ searchParams }) {
  const page = parseInt(searchParams.page, 10) || 1;
  const search = searchParams.search || "";

  const result = search
    ? await searchMovie(search, page)
    : await getMovies(page);

  if (result.error) {
    return (
      <h1 className="text-3xl font-bold text-color-primary">{result.error}</h1>
    );
  }

  const posts = result.data;

  if (posts.length === 0) {
    return <EmptyState message="No posts found" />;
  }
  const totalPages = result.totalPages;

  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-2">
      <div className="grid md:grid-cols-4 grid-cols-3 gap-4 px-2 mt-2">
        {posts?.map((movie) => {
          const defaultImage = movie.image
            ? `${movie.image}`
            : "https://placehold.co/400x600.png";
          return (
            <Link
              href={`/movie/${cleanUrl(movie.title)}?id=${movie._id}`}
              key={movie.title}
              className="cursor-pointer text-slate-900 hover:text-blue-800 transition-all"
            >
              <img
                src={defaultImage}
                alt={movie.title}
                width={200}
                height={200}
                className="w-full max-h-64 shadow-xl transform transition-transform duration-500 hover:scale-105"
              />
              <h3 className="font-bold md:text-xl dark:text-gray-200 text-lg p-4">
                {movie.title}
              </h3>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-2">
        <Pagination page={page} totalPages={totalPages} search={search} />
      </div>
    </div>
  );
}
