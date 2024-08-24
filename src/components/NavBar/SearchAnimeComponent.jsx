"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const SearchAnimeComponent = () => {
    const searchRef = useRef(null);
    const router = useRouter();

    const handleSearch = async () => {
            const searchValue = searchRef.current?.value;
            if (searchValue) {
                router.push(`/anime?search=${encodeURIComponent(searchValue)}`);
            }
    };

    useEffect(() => {
        const inputElement = searchRef.current;
        if (inputElement) {
            const handleInputChange = () => {
                handleSearch();
            };

            inputElement.addEventListener("input", handleInputChange);

            return () => {
                inputElement.removeEventListener("input", handleInputChange);
            };
        }
    }, [router]);

    return (
        <div className="flex items-center space-x-2">
            <input
                type="text"
                placeholder="Search Anime..."
                className="px-4 py-2 text-black border rounded-md focus:outline-none focus:border-blue-500"
                ref={searchRef}
                onKeyDown={handleSearch}
            />
            <button
                className="px-4 py-2 rounded-md bg-blue-500 text-white text-center hover:bg-blue-600 focus:outline-none"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};
