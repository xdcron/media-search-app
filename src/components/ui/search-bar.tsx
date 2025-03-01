"use client";

import { useMovieSearch } from "@/hooks/use-movie-search";
import { Input } from "./input";

export default function SearchBar() {
  const { searchTerm, search, loading } = useMovieSearch();

  return (
    <div className="relative">
      <Input
        className="max-w-[500px] md:w-[500px] border shadow-xl focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:outline-none"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => search(e.target.value)}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
        </div>
      )}
    </div>
  );
}
