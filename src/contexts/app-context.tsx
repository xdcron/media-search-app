"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { searchMovies, getMovieDetails } from "@/lib/movie-utils";
import { Movie, MovieDetails } from "@/types/types";

// Define the context type
type AppContextType = {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  isSearching: boolean;
  isLoadingDetails: boolean;
  detailsError: string | null;
  searchError: string | null;
  search: (query: string, page?: number) => Promise<void>;
  selectMovie: (id: string) => Promise<void>;
  clearMovies: () => void;
  clearSelectedMovie: () => void;
};

// Default values
const AppContext = createContext<AppContextType>({
  movies: [],
  selectedMovie: null,
  isSearching: false,
  isLoadingDetails: false,
  detailsError: null,
  searchError: null,
  search: async () => {},
  selectMovie: async () => {},
  clearMovies: () => {},
  clearSelectedMovie: () => {},
});

type AppProviderProps = {
  children: ReactNode;
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProviderWithClient = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>{children}</AppProvider>
    </QueryClientProvider>
  );
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Search mutation
  const searchMutation = useMutation({
    mutationFn: async ({
      query,
      page = 1,
    }: {
      query: string;
      page: number;
    }) => {
      console.log(`Searching for: ${query}, page: ${page}`);
      return searchMovies(query, page);
    },
    onSuccess: (data) => {
      setMovies(data.Search || []);

      if (!data.Search || data.Search.length === 0) {
        setSearchError("No movies found. Try a different search term.");
      } else {
        setSearchError(null);
      }
    },
    onError: (error: Error) => {
      console.error("Search error:", error);
      setSearchError(error.message || "Failed to search movies");
      setMovies([]);
    },
  });

  // Movie details mutation
  const detailsMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log(`Fetching details for: ${id}`);
      return getMovieDetails(id);
    },
    onSuccess: (data) => {
      console.log("Details received:", data);
      setSelectedMovie(data);
      // Cache the movie details
      queryClient.setQueryData(["movieDetails", data.imdbID], data);
    },
    onError: (error: Error) => {
      console.error("Details error:", error);
      // Leave the error handling to the component
    },
  });

  const search = async (query: string, page: number = 1) => {
    await searchMutation.mutateAsync({ query, page });
  };

  const selectMovie = async (id: string) => {
    // Check cache first
    const cachedData = queryClient.getQueryData<MovieDetails>([
      "movieDetails",
      id,
    ]);

    if (cachedData) {
      console.log("Using cached movie details for:", id);
      setSelectedMovie(cachedData);
      return;
    }

    await detailsMutation.mutateAsync(id);
  };

  const clearMovies = () => {
    setMovies([]);
    setSearchError(null);
  };

  const clearSelectedMovie = () => {
    setSelectedMovie(null);
  };

  // The context value
  const value = {
    movies,
    selectedMovie,
    isSearching: searchMutation.isPending,
    isLoadingDetails: detailsMutation.isPending,
    detailsError: detailsMutation.error ? detailsMutation.error.message : null,
    searchError,
    search,
    selectMovie,
    clearMovies,
    clearSelectedMovie,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
