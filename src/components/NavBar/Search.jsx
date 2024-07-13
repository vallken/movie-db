"use client";

import { useRouter } from "next/navigation";

const { useRef } = require("react");


export const Search = () => {
    const searchRef = useRef();
    const router = useRouter()

    const handleSearch = async (e) => {
      if(e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      const searchValue = searchRef.current.value;
      if (searchValue) {
        router.push(`../../search/${searchValue}`);
      } else { return}
    }
    };
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="text-black border rounded-md"
        ref={searchRef}
        onKeyDown={handleSearch}
      />
      <button
        className="rounded-md bg-blue-500 text-white text-center mx-1"
        onClick={handleSearch} 
      >
        Search
      </button>
    </div>
  );
};
