import { getAnimeData } from "@/src/lib/api-lib";
import DisqusComments from "@/src/components/discqus-comment";
import Link from "next/link";

const DetailItem = ({ label, value }) => (
  <div className="mb-4">
    <span className="font-semibold text-gray-700 dark:text-gray-200 block mb-1">
      {label}
    </span>
    <span className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
      {value}
    </span>
  </div>
);

const Page = async ({ params, searchParams }) => {
  const id = searchParams.id;

  const response = await getAnimeData(id);
  const anime = await response.data;

  const defaultImage = "https://placehold.co/400x600.png";

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/3">
              <figure>
                <img
                  src={anime.images?.jpg || anime.images?.webp || defaultImage}
                  alt={anime.title}
                  width={300}
                  height={400}
                  className="w-full h-96 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </figure>
            </div>
            <div className="md:w-2/3 card-body p-6">
            <h2 className="font-bold text-3xl mb-6 text-gray-800 dark:text-gray-100">
            {anime.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <DetailItem label="Episodes" value={anime.episodes} />
                <DetailItem label="Status" value={anime.status} />
                <DetailItem label="Duration" value={anime.duration} />
                <DetailItem label="Rating" value={anime.rating} />
                <DetailItem label="Score" value={anime.score} />
              </div>
              <div className="mt-8">
              <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-100">
              Sinopsis
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {anime.synopsis}
                </p>
              </div>
            </div>
          </div>
          <div className="card-actions flex-col items-center p-8 ">
            <details className="dropdown w-full">
              <summary className="btn btn-active w-auto">Download</summary>
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
        </div>
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          <div className="disqus-container" style={{ all: "initial" }}>
            <DisqusComments post={anime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
