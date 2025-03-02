"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMovieSearch } from "./use-movie-search";
import { useBookSearch } from "./use-book-search";

export type MediaType = "movies" | "books";

export function useMediaSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlType = searchParams.get("type") as MediaType | null;
  const [activeMediaType, setActiveMediaType] = useState<MediaType>(
    urlType || "movies"
  );

  const movies = useMovieSearch();
  const books = useBookSearch();

  const updateUrlWithMediaType = useCallback(
    (type: MediaType) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", type);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleMediaTypeChange = useCallback(
    (type: MediaType) => {
      setActiveMediaType(type);
      updateUrlWithMediaType(type);

      const currentSearchTerm = searchParams.get("query") || "";

      if (currentSearchTerm.trim().length >= 3) {
        if (type === "movies") {
          movies.search(currentSearchTerm);
        } else if (type === "books") {
          books.search(currentSearchTerm);
        }
      }
    },
    [movies, books, searchParams, updateUrlWithMediaType]
  );

  useEffect(() => {
    const type = searchParams.get("type") as MediaType | null;
    if (type && type !== activeMediaType) {
      setActiveMediaType(type);
    }
  }, [searchParams, activeMediaType]);

  const search = useCallback(
    (query: string) => {
      if (activeMediaType === "movies") {
        movies.search(query);
      } else {
        books.search(query);
      }
    },
    [activeMediaType, movies, books]
  );

  const isLoading =
    activeMediaType === "movies" ? movies.loading : books.loading;
  const isLoadingNextPage =
    activeMediaType === "movies"
      ? movies.isFetchingNextPage
      : books.isFetchingNextPage;

  const searchTerm =
    activeMediaType === "movies" ? movies.searchTerm : books.searchTerm;

  const hasNextPage =
    activeMediaType === "movies" ? movies.hasNextPage : books.hasNextPage;

  const totalResults =
    activeMediaType === "movies" ? movies.totalResults : books.totalResults;

  const fetchNextPage = useCallback(async () => {
    try {
      if (activeMediaType === "movies") {
        return await movies.fetchNextPage();
      } else {
        return await books.fetchNextPage();
      }
    } catch (error) {
      console.error(`Error fetching next page of ${activeMediaType}:`, error);
    }
  }, [activeMediaType, movies, books]);
  return {
    isLoading,
    isLoadingNextPage,
    searchTerm,
    hasNextPage,
    totalResults,
    activeMediaType,
    setActiveMediaType: handleMediaTypeChange,
    search,
    fetchNextPage,
    moviesHook: movies,
    booksHook: books,
  };
}
