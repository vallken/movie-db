import { SearchDramaComponent } from "@/src/components/NavBar/SearchDramaComponent";
import { getDramaData } from "@/src/lib/api-lib";
import DramaDetail from "./dramaPage";
import { Suspense } from "react";
import LoadingSpinner from "../../loading";

const Page = async ({ params, searchParams }) => {
  const id = searchParams.id;
  const response = await getDramaData(id);
  const posts = await response.data;

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        <DramaDetail posts={posts} />
      </div>
    </div>
  );
};

export default Page;
