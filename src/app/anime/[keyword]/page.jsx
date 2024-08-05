import { getAnimeData } from "@/src/lib/api-lib";
import DisqusComments from "@/src/components/discqus-comment";
import Link from "next/link";

const DetailItem = ({ label, value }) => (
  <div className="mb-2">
    <span className="font-semibold text-gray-700 dark:text-gray-200">
      {label}:
    </span>
    <span className="ml-2 text-gray-600 dark:text-gray-200">{value}</span>
  </div>
);

const Page = async ({ params, searchParams }) => {
  const id = searchParams.id;

  const response = await getAnimeData(id);
  const anime = await response.data;

  const defaultImage = "https://placehold.co/400x600.png";

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-600 rounded-lg shadow-lg">
          <div className="">
            <section>
              <div className="md:max-w-90 md:mx-auto">
                <img
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
                    <DetailItem label="Episodes" value={anime.episodes} />
                    <DetailItem label="Status" value={anime.status} />
                    <DetailItem label='Duration' value={anime.duration}/>
                    <DetailItem label='Rating' value={anime.rating} />
                    <DetailItem label='Score' value={anime.score} />
                  </div>
                  <p className="text-gray-700 px-4 dark:text-gray-200">
                    <span className="font-bold">Sinopsis:</span>
                    <br />
                    {anime.synopsis}
                  </p>
                </div>
              </div>
              <div className="relative p-4">
                <details className="dropdown w-full">
                  <summary className="btn btn-active w-auto">
                    Download
                  </summary>
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
