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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold text-error">{result.error}</h1>
          </div>
        </div>
      </div>
    );
  }

  const posts = result.data;

  if (posts.length === 0) {
    return <EmptyState message="No posts found" />;
  }

  const totalPages = result.totalPages;

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {posts?.map((movie) => (
          <Link
            href={`/movie/${cleanUrl(movie.title)}?id=${movie._id}`}
            key={movie.title}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <figure className="px-2 pt-2 md:px-4 md:pt-4">
              <img
                src={movie.image || "https://placehold.co/400x600.png"}
                alt={movie.title}
                className="rounded-xl object-cover h-48 sm:h-56 md:h-64 w-full"
              />
            </figure>
            <div className="card-body p-2 md:p-4">
              <h2 className="card-title text-sm sm:text-base md:text-lg font-bold truncate">
                {movie.title}
              </h2>
              <p className="text-xs sm:text-sm text-base-content/70 truncate">
                {movie.data?.genre || "Genre not available"}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <Pagination page={page} totalPages={totalPages} search={search} />
      </div>
    </div>
  );
}