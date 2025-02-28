"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import MovieContainerSkeleton from "../skeletons/movie-container-skeleton";
import { useMovieSearch } from "@/hooks/use-movie-search";
import MovieContainer from "../media/movie-container";
import { MovieDetailSheet } from "../media/movie-details-sheet";

function MediaListContainer() {
  const {
    movies,
    loading,
    isFetchingNextPage,
    error,
    searchTerm,
    fetchNextPage,
    hasNextPage,
  } = useMovieSearch();

  // Reference to the sentinel element for infinite scrolling
  const observerTarget = useRef<HTMLDivElement>(null);

  // Intersection Observer callback
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        console.log("Intersection detected, loading more movies");
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // Set up the intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px 400px 0px", // Start loading when 400px from bottom for smoother experience
      threshold: 0.1,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [handleObserver]);

  if (loading && movies.length === 0) {
    return <MovieContainerSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!searchTerm || searchTerm.length < 3) {
    return (
      <div className="w-full py-8 text-center text-muted-foreground">
        Enter at least 3 characters to search for movies.
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full py-8 text-center text-muted-foreground">
        No movies found for "{searchTerm}". Try a different search term.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Display all movies with infinite scrolling */}
          {movies.map((movie) => (
            <MovieContainer movie={movie} key={movie.imdbID} />
          ))}
        </div>

        {/* Loading indicator for next page */}
        {isFetchingNextPage && (
          <div className="py-4 text-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {/* Sentinel element for intersection observer */}
        <div ref={observerTarget} className="h-4" />

        {/* End of results message */}
        {!hasNextPage && movies.length > 0 && (
          <div className="py-4 text-center text-muted-foreground">
            No more movies to load
          </div>
        )}
      </div>

      {/* Movie Detail Sheet - will display when a movie is selected */}
      <MovieDetailSheet />
    </>
  );
}

export default MediaListContainer;
