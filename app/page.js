

import PostsPage from "./components/Fetching/MoviePostPage";
import { Search } from "./components/NavBar/Search";

export default async function Home() {


  return (
    <div className="p-2 bg-gray-200">
      <h1>Search Movie</h1>
      <div>
       <Search />
        <div className="mt-4">
       <PostsPage />
        </div>
      </div>
    </div>
  );
}
