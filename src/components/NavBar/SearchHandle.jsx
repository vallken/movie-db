'use client';

import { SearchMovieComponent } from "./SearchMovieComponent";
import { SearchDramaComponent } from "./SearchDramaComponent";
import { SearchAnimeComponent } from "./SearchAnimeComponent";
import { usePathname } from "next/navigation";

export default function SearchHandle() {
  const currentPath = usePathname();

  const SearchComponent = () => {
    if (currentPath.includes("/movie")) {
      return <SearchMovieComponent />;
    } else if (currentPath.includes("/drama")) {
      return <SearchDramaComponent />;
    } else if (currentPath.includes("/anime")) {
      return <SearchAnimeComponent />;
    } else {
      return null;
    }
  };

  return SearchComponent();
};
