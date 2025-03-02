"use client";

import React from "react";
import { MovieDetailSheet } from "@/components/media/movies/movie-details-sheet";
import { BookDetailSheet } from "@/components/media/books/book-details-sheet";
import { useAppContext } from "@/contexts/app-context";
import { useInfiniteScroll } from "@/hooks/use-infite-scroll";
import {
  LoadingIndicator,
  MediaSearchPrompt,
  NoResultsMessage,
} from "./media-loading-and-error";
import { MoviesSection } from "./movies/movie-section";
import { BooksSection } from "./books/book-section";
import MediaContainerSkeleton from "../skeletons/media-container-skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

function MediaListContainer() {
  const {
    movies,
    books,
    isLoading,
    isLoadingNextPage,
    movieError,
    bookError,
    searchTerm,
    activeMediaType,
    totalResults,
    fetchNextPage,
    hasNextPage,
  } = useAppContext();

  const { observerTarget } = useInfiniteScroll({
    hasNextPage,
    isLoadingNextPage,
    fetchNextPage,
    activeMediaType,
    itemsCount: activeMediaType === "movies" ? movies.length : books.length,
    searchTerm,
  });

  const showMoviesLoading =
    isLoading && !movies.length && activeMediaType === "movies";
  const showBooksLoading =
    isLoading && !books.length && activeMediaType === "books";

  return (
    <>
      <div className="space-y-10">
        {(showMoviesLoading || showBooksLoading) && <MediaContainerSkeleton />}
        {((activeMediaType === "movies" && movieError) ||
          (activeMediaType === "books" && bookError)) &&
          searchTerm.length >= 3 && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {activeMediaType === "movies" ? movieError : bookError}
              </AlertDescription>
            </Alert>
          )}

        {(!searchTerm || searchTerm.length < 3) && <MediaSearchPrompt />}

        {activeMediaType === "movies" && movies.length > 0 && (
          <MoviesSection movies={movies} totalResults={totalResults} />
        )}

        {activeMediaType === "books" && books.length > 0 && (
          <BooksSection books={books} totalResults={totalResults} />
        )}

        {((activeMediaType === "movies" && !movies.length && !isLoading) ||
          (activeMediaType === "books" && !books.length && !isLoading)) &&
          searchTerm.length >= 3 && (
            <NoResultsMessage
              searchTerm={searchTerm}
              activeMediaType={activeMediaType}
            />
          )}

        {isLoadingNextPage && <LoadingIndicator />}

        {hasNextPage && <div ref={observerTarget} className="h-4 my-4" />}
      </div>

      <MovieDetailSheet />
      <BookDetailSheet />
    </>
  );
}

export default MediaListContainer;
