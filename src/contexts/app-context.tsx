"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useMediaSearch } from "@/hooks/use-media-search";
import { AppContextType } from "@/types/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const {
    activeMediaType,
    setActiveMediaType,
    isLoading,
    isLoadingNextPage,
    searchTerm,
    hasNextPage,
    totalResults,
    search,
    fetchNextPage,
    moviesHook,
    booksHook,
  } = useMediaSearch();

  const value: AppContextType = {
    movies: moviesHook.movies,
    books: booksHook.books,
    selectedMovie: moviesHook.selectedMovie,
    selectedBook: booksHook.selectedBook,
    isLoading,
    isLoadingNextPage,
    isLoadingMovieDetails: moviesHook.isLoadingMovieDetails,
    isLoadingBookDetails: booksHook.isLoadingBookDetails,
    movieError: moviesHook.error || null,
    bookError: booksHook.error || null,
    searchTerm,
    hasNextPage,
    totalResults,
    activeMediaType,
    setActiveMediaType,
    search,
    fetchNextPage,
    selectMovie: moviesHook.selectMovie,
    selectBook: booksHook.selectBook,
    clearSelectedMovie: moviesHook.clearSelectedMovie,
    clearSelectedBook: booksHook.clearSelectedBook,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
