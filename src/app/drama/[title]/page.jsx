import { getDramaData } from "@/src/lib/api-lib";
import DramaDetail from "./dramaPage";

const Page = async ({ searchParams }) => {
  const { id } = searchParams;

  try {
    const result = await getDramaData(id);
    const posts = await result.data;
    if (!result || result.totalPages === 0) {
      return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <h1 className="text-3xl font-bold text-red-600 bg-white dark:bg-gray-800 px-8 py-4 rounded-lg shadow-lg">
            Movie not found
          </h1>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <DramaDetail posts={posts} />
      </div>
    );
  } catch (e) {
    console.error("Error fetching movie data:", error);
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <h1 className="text-3xl font-bold text-red-600 bg-white dark:bg-gray-800 px-8 py-4 rounded-lg shadow-lg">
          Error loading movie data
        </h1>
      </div>
    );
  }
};

export default Page;
