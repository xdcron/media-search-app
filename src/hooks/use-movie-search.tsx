"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  useQueryClient,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { searchMovies, getMovieDetails } from "@/lib/movie-utils";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { MovieDetails } from "@/types/movie-types";

export function useMovieSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const urlQuery = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(urlQuery);
  const [searchTerm, setSearchTerm] = useState(urlQuery);

  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  const updateSearchTerm = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  const updateUrl = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim().length > 0) {
        params.set("query", query);
        params.set("page", "1");
        params.set("type", "movies");
      } else {
        params.delete("query");
        params.delete("page");
        params.delete("type");
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Use useMemo instead of useCallback for debounced functions
  const debouncedSearchUpdate = useMemo(
    () => debounce(updateSearchTerm, 250),
    [updateSearchTerm]
  );

  const debouncedUrlUpdate = useMemo(
    () => debounce(updateUrl, 350),
    [updateUrl]
  );

  useEffect(() => {
    return () => {
      debouncedSearchUpdate.cancel();
      debouncedUrlUpdate.cancel();
    };
  }, [debouncedSearchUpdate, debouncedUrlUpdate]);

  useEffect(() => {
    const newQuery = searchParams.get("query") || "";
    const type = searchParams.get("type");

    if (type === "movies" && inputValue !== newQuery) {
      setInputValue(newQuery);
    }
    if (type === "movies" && searchTerm !== newQuery) {
      setSearchTerm(newQuery);
    }
  }, [searchParams, inputValue, searchTerm]);

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

  const movieDetailsMutation = useMutation({
    mutationFn: async (id: string) => {
      return getMovieDetails(id);
    },
    onSuccess: (data) => {
      setSelectedMovie(data);
      queryClient.setQueryData(["movieDetails", data.imdbID], data);
    },
    onError: (error: Error) => {
      console.error("Movie details error:", error);
    },
  });

  const allMovies = data?.pages.flatMap((page) => page.Search || []) || [];
  const moviesPerPage = 10;
  const movies = allMovies.slice(0, (data?.pages.length || 0) * moviesPerPage);
  const totalResults = data?.pages[0]?.totalResults
    ? parseInt(data.pages[0].totalResults)
    : 0;

  const handleInputChange = useCallback(
    (query: string) => {
      setInputValue(query);
      debouncedSearchUpdate(query);
      debouncedUrlUpdate(query);
    },
    [debouncedSearchUpdate, debouncedUrlUpdate]
  );

  const selectMovie = useCallback(
    async (id: string) => {
      const cachedData = queryClient.getQueryData<MovieDetails>([
        "movieDetails",
        id,
      ]);

      if (cachedData) {
        console.log("Using cached movie details for:", id);
        setSelectedMovie(cachedData);
        return;
      }

      await movieDetailsMutation.mutateAsync(id);
    },
    [queryClient, movieDetailsMutation]
  );

  const clearSelectedMovie = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Failed to search movies"
    : "";

  const hasNextPage = movies.length < totalResults;

  return {
    movies,
    loading,
    isFetchingNextPage,
    error,
    searchTerm: inputValue,
    search: handleInputChange,
    fetchNextPage,
    hasNextPage,
    refetch,
    totalResults,
    selectedMovie,
    selectMovie,
    clearSelectedMovie,
    isLoadingMovieDetails: movieDetailsMutation.isPending,
  };
}
