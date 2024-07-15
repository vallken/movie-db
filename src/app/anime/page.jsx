import { getAnime } from '@/src/lib/api-lib'
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/src/lib/utilities/Pagination';
import { SearchAnimeComponent } from '@/src/components/NavBar/SearchAnimeComponent';

export default async function Page({ searchParams }) {
  const page = parseInt(searchParams.page, 10) || 1

  const result = await getAnime(page)

  if (result.error) {
    return <h1 className="text-3xl font-bold text-color-primary">{result.error}</h1>;
  }

  const posts = result.data;
  const totalPages = result.totalPages;

  return (
    <div className="bg-gray-200 p-2">
      <SearchAnimeComponent />
      <div className="grid md:grid-cols-4 grid-cols-3 gap-4 px-2 mt-2">
        {posts?.map((anime) => {
          const defaultImage = anime.images.webp
            ? `${anime.images.webp}`
            : "https://placehold.co/400x600.png";
          return (
            <Link
              href={`/anime/${anime.title.replace(/ /g, '-')}`}
              key={anime.title}
              className="cursor-pointer text-slate-900 hover:text-blue-800 transition-all"
            >
              <Image
                src={defaultImage}
                alt={anime.title}
                width={200}
                height={200}
                className="w-full max-h-64 shadow-xl transform transition-transform duration-500 hover:scale-105"
              />
              <h3 className="font-bold md:text-xl text-lg p-4">
                {anime.title}
              </h3>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-2">
        <Pagination page={page} totalPages={totalPages}/>
      </div>
    </div>
  );
}
