"use client";
import { useState } from "react";
import type { Movie } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/contexts/app-context";

interface MovieContainerProps {
  movie: Movie;
}

export default function MovieContainer({ movie }: MovieContainerProps) {
  const { selectMovie, isLoadingDetails } = useAppContext();
  const [isSelecting, setIsSelecting] = useState(false);

  function handleSelectMovie(id: string) {
    setIsSelecting(true);
    selectMovie(id).finally(() => {
      setIsSelecting(false);
    });
  }

  // Determine if this specific movie is being loaded
  const isLoading = isSelecting && isLoadingDetails;

  return (
    <div
      className={`flex rounded-md border border-border overflow-hidden hover:bg-accent/5 transition-all duration-200 ${
        isLoading ? "opacity-70" : "hover:shadow-sm cursor-pointer"
      }`}
      onClick={() => !isLoading && handleSelectMovie(movie.imdbID)}
    >
      {/* Poster on the left - increased dimensions */}
      <div className="relative h-[150px] w-[100px] bg-muted flex-shrink-0 flex items-center justify-center">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <>
            <img
              src={movie.Poster || "/placeholder.svg"}
              alt={movie.Title}
              className="h-full w-full object-cover"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            ) : (
              <span className="text-2xl">🎬</span>
            )}
          </div>
        )}
      </div>

      {/* Content on the right */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-medium text-sm line-clamp-2">{movie.Title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{movie.Year}</p>
        </div>
        <div className="mt-auto pt-2 flex justify-between items-center">
          <Badge variant="outline" className="capitalize text-xs py-0 h-5">
            {movie.Type}
          </Badge>
        </div>
      </div>
    </div>
  );
}
