import { SearchDramaComponent } from "@/src/components/NavBar/SearchDramaComponent";
import { getDramaData } from "@/src/lib/api-lib";
import DramaDetail from "./dramaPage";

const Page = async ({ params, searchParams }) => {
  const id = searchParams.id;
  const response = await getDramaData(id);
  const posts = await response.data;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <SearchDramaComponent />
      <div className="container mx-auto px-4 py-8">
        <DramaDetail posts={posts} />
      </div>
    </div>
  );
};

export default Page;
