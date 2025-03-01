"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { searchMovies } from "@/lib/movie-utils";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";

export function useMovieSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Get initial value from URL
  const urlQuery = searchParams.get("query") || "";

  // Input value state - updated immediately for smooth typing
  const [inputValue, setInputValue] = useState(urlQuery);

  // Search term state - only updated after debounce for API calls
  const [searchTerm, setSearchTerm] = useState(urlQuery);

  // Separate the URL update and search term update for better performance
  const updateSearchTerm = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  const updateUrl = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim().length > 0) {
        params.set("query", query);
        params.set("page", "1");
      } else {
        params.delete("query");
        params.delete("page");
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Create debounced functions with different timings
  const debouncedSearchUpdate = useCallback(debounce(updateSearchTerm, 250), [
    updateSearchTerm,
  ]);

  const debouncedUrlUpdate = useCallback(debounce(updateUrl, 350), [updateUrl]);

  // Clean up debounce handlers on unmount
  useEffect(() => {
    return () => {
      debouncedSearchUpdate.cancel();
      debouncedUrlUpdate.cancel();
    };
  }, [debouncedSearchUpdate, debouncedUrlUpdate]);

  // Listen for URL parameter changes
  useEffect(() => {
    const newQuery = searchParams.get("query") || "";
    // Only update if different to avoid infinite loops
    if (inputValue !== newQuery) {
      setInputValue(newQuery);
    }
    if (searchTerm !== newQuery) {
      setSearchTerm(newQuery);
    }
  }, [searchParams]);

  // Infinite query for movie search
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: loading,
    error: queryError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["moviesInfinite", searchTerm],
    queryFn: ({ pageParam = 1 }) => searchMovies(searchTerm, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalResults = parseInt(lastPage.totalResults || "0");
      const loadedCount = allPages.reduce(
        (count, page) => count + (page.Search?.length || 0),
        0
      );
      return loadedCount < totalResults ? allPages.length + 1 : undefined;
    },
    enabled: searchTerm.trim().length >= 3,
    staleTime: 5 * 60 * 1000,
  });

  // Process movies data
  const allMovies = data?.pages.flatMap((page) => page.Search || []) || [];
  const moviesPerPage = 8;
  const movies = allMovies.slice(0, (data?.pages.length || 0) * moviesPerPage);
  const totalResults = data?.pages[0]?.totalResults
    ? parseInt(data.pages[0].totalResults)
    : 0;

  // This function is called directly from the input onChange
  const handleInputChange = useCallback(
    (query: string) => {
      // Update input value immediately for smooth typing
      setInputValue(query);

      // Trigger the debounced functions
      debouncedSearchUpdate(query);
      debouncedUrlUpdate(query);
    },
    [debouncedSearchUpdate, debouncedUrlUpdate]
  );

  const clearMovies = useCallback(() => {
    setInputValue("");
    setSearchTerm("");
    router.replace("/", { scroll: false });
    queryClient.removeQueries({ queryKey: ["moviesInfinite"] });
  }, [queryClient, router]);

  // Format error message
  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Failed to search movies"
    : "";

  // Calculate if there are more pages to load
  const customHasNextPage = movies.length < totalResults;

  return {
    movies,
    loading,
    isFetchingNextPage,
    error,
    searchTerm: inputValue,
    search: handleInputChange,
    fetchNextPage,
    hasNextPage: customHasNextPage,
    clearMovies,
    refetch,
    totalResults,
  };
}
