import { SearchAnimeComponent } from "@/src/components/NavBar/SearchAnimeComponent";
import { getAnimeData } from "@/src/lib/api-lib";
import Image from "next/image";
import { Suspense } from "react";
import LoadingSpinner from "../../loading";

const Page = async ({params, searchParams}) => {
  const id = searchParams.id

  const response = await getAnimeData(id)
  const anime = await response.data;

  const defaultImage = "https://placehold.co/400x600.png";

  return (
    <div className="bg-gray-200 p-2">
      <SearchAnimeComponent />
      <Suspense fallback={<LoadingSpinner />}>
      <div className="mt-2">
        <div className="bg-white rounded-xl shadow-md mx-6 ">
          <section>
            <div>
              <Image
                src={anime.images?.jpg || anime.images?.webp || defaultImage}
                alt={anime.title}
                width={300}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div>
                <h2 className="font-bold text-xl mb-2 px-3">{anime.title}</h2>
                <div className="p-4 grid grid-cols-2">
                  <p className="text-gray-700 text-sm mb-2">
                    Episodes: {anime.episodes}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    Status: {anime.status}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    Duration: {anime.duration}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    Rating: {anime.rating}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    Score: {anime.score}
                  </p>
                </div>
                <p className="text-gray-700 text-sm px-3">
                  Sinopsis: {anime.synopsis}
                </p>
              </div>
            </div>
          </section>
          <section>
            <div>
              <h3 className="font-bold text-lg mb-2 px-3">Download Links:</h3>
              <div className="mt-4 px-3 grid grid-cols-3">
                {anime.link &&
                  anime.link.map((resolution) => (
                    <div key={resolution._id} className="mb-4">
                      <h4 className="font-semibold text-md mb-1">
                        {resolution.resolution}
                      </h4>
                      <ul className="list-disc pl-5">
                        {resolution.details.map((detail) => (
                          <li key={detail._id}>
                            <a
                              href={detail.link}
                              className="text-blue-600 hover:text-blue-800"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {detail.provider}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      </Suspense>
    </div>
  );
};

export default Page;
