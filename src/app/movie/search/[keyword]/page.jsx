import { searchMovie } from '@/src/lib/api-lib'
import Link from 'next/link';
import Image from 'next/image';
import { SearchMovieComponent } from '@/src/components/NavBar/SearchMovieComponent'
import Pagination from '@/src/lib/utilities/Pagination';
import { Suspense } from 'react';
import LoadingSpinner from '@/src/app/loading';

export default async function Page({ params, searchParams }) {
  const keyword = params.keyword;
  const page = searchParams.page || 1;

  const result = await searchMovie(keyword, page);

  if (result.error) {
    return <h1 className="text-3xl font-bold text-color-primary">{result.error}</h1>;
  }

  const posts = result.data;
  const totalPages = result.totalPages;

  return (
    <div className="bg-gray-200 p-2">
      <SearchMovieComponent />
      <Suspense fallback={<LoadingSpinner />}>
      <div className="grid md:grid-cols-4 grid-cols-3 gap-4 px-2 mt-2">
        {posts.map((movie) => {
          const defaultImage = movie.image
            ? `https:${movie.image}`
            : "https://placehold.co/400x600.png";
          return (
            <Link
              href={`/movie/${movie.title.replace(/ /g, '-')}`}
              key={movie.title}
              className="cursor-pointer text-slate-900 hover:text-blue-800 transition-all"
            >
              <Image
                src={defaultImage}
                alt={movie.title}
                width={200}
                height={200}
                className="w-full max-h-64 shadow-xl transform transition-transform duration-500 hover:scale-105"
              />
              <h3 className="font-bold md:text-xl text-lg p-4">
                {movie.title}
              </h3>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-2">
        <Pagination page={page} totalPages={totalPages} keyword={keyword} />
      </div>
      </Suspense>
    </div>
  );
}
