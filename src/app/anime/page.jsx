import { getAnime, searchAnime } from "@/src/lib/api-lib";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/src/lib/utilities/Pagination";
import EmptyState from "@/src/components/EmptyState";
import { cleanUrl } from "@/src/lib/utilities/cleanUrl";

export default async function Page({ searchParams }) {
  const page = parseInt(searchParams.page, 10) || 1;
  const search = searchParams.search || "";

  const result = search
    ? await searchAnime(search, page)
    : await getAnime(page);

  if (result.error) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold text-error">
              {result.error}
            </h1>
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
        {posts?.map((anime) => {
          const defaultImage = anime.images?.webp
            ? `${anime.images?.webp}`
            : "https://placehold.co/400x600.png";
          return (
            <Link
              href={`/anime/${cleanUrl(anime.title)}?id=${anime._id}`}
              key={anime.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <figure className="px-2 pt-2 md:px-4 md:pt-4">
                <img
                  src={defaultImage}
                  alt={anime.title}
                  width={200}
                  height={200}
                  className="rounded-xl object-cover h-48 sm:h-56 md:h-64 w-full"
                />
              </figure>
              <div className="card-body p-2 md:p-4">
                <h2 className="card-title text-sm sm:text-base md:text-lg font-bold truncate">
                  {anime.title.replace(
                    /(Batch\s*Subtitle\s*Indonesia|BD\s*Subtitle\s*Indonesia|Subtitle\s*Indonesia|BD\s*Batch\s*Subtitle\s*Indonesia|BD\s*Batch\s*Subtitle\s*Indonesia)/g,
                    ""
                  )}
                </h2>
                <p className="text-xs sm:text-sm text-base-content/70 truncate">
                {anime.status || "status not available"}
              </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-8">
        <Pagination page={page} totalPages={totalPages} search={search} />
      </div>
    </div>
  );
}
