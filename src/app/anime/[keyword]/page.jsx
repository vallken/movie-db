import { SearchAnimeComponent } from "@/src/components/NavBar/SearchAnimeComponent";
import { getAnimeData } from "@/src/lib/api-lib";
import Image from "next/image";
import DisqusComments from "@/src/components/discqus-comment";
import Link from "next/link";

const Page = async ({ params, searchParams }) => {
  const id = searchParams.id;

  const response = await getAnimeData(id);
  const anime = await response.data;

  const defaultImage = "https://placehold.co/400x600.png";

  return (
    <div className="bg-gray-200 p-2">
      <SearchAnimeComponent />
      <div className="container mx-auto px-4 py-8">
        <div className="hero min-h-screen max-w-5xl mx-auto mt-4">
          <div className="hero-content flex-col lg:flex-row bg-white rounded-lg shadow-md mx-6">
            <section>
              <div>
                <Image
                  src={anime.images?.jpg || anime.images?.webp || defaultImage}
                  alt={anime.title}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div>
                  <h2 className="font-bold text-xl mb-2 px-3 mt-3">
                    {anime.title}
                  </h2>
                  <div className="p-4 grid grid-cols-2">
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-bold">Episodes:</span>{" "}
                      {anime.episodes}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-bold">Status:</span> {anime.status}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-bold">Duration:</span>{" "}
                      {anime.duration}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-bold">Rating:</span> {anime.rating}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-bold">Score:</span> {anime.score}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm px-3">
                    <span className="font-bold">Sinopsis:</span>
                    <br />
                    {anime.synopsis}
                  </p>
                </div>
              </div>
              <div className="relative mt-4">
                <details className="dropdown w-full">
                  <summary className="btn btn-md md:mx-auto">Download</summary>
                  <div className="mt-4 px-3">
                    {anime.link &&
                      anime.link.map((resolution) => (
                        <div key={resolution._id} className="mb-4">
                          <details className="dropdown">
                            <summary className="btn btn-outline btn-sm font-semibold text-md mb-1">
                              {resolution.resolution}
                            </summary>
                            <ul className="menu bg-base-200 rounded-lg z-[1] dropdown-content dropdown-top list-none">
                              {resolution.details.map((detail) => (
                                <li key={detail._id}>
                                  <Link
                                    href={detail.link}
                                    className="text-blue-600 hover:text-blue-800"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {detail.provider}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      ))}
                  </div>
                </details>
              </div>
            </section>
          </div>
        </div>
        <section>
          <div className="mt-8">
            <div className="disqus-container" style={{ all: "initial" }}>
              <DisqusComments post={anime} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
