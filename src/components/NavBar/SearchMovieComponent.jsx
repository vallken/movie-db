"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export const SearchMovieComponent = () => {
    const searchRef = useRef(null);
    const router = useRouter();

    // Function to handle navigation based on search input
    const handleSearch = () => {
        const searchValue = searchRef.current?.value;
        if (searchValue) {
            router.push(`/movie?search=${encodeURIComponent(searchValue)}`);
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
                placeholder="Search Movie..."
                className="input input-bordered w-full max-w-xs px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                ref={searchRef}
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
