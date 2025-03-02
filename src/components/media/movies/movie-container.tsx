"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/contexts/app-context";
import { Movie } from "@/types/movie-types";
import SelectSpinner from "../spinner";
import FallBackIcon from "@/components/ui/fall-back";
import MediaContainerImage from "@/components/ui/media-container-image";

interface MovieContainerProps {
  movie: Movie;
}

export default function MovieContainer({ movie }: MovieContainerProps) {
  const { selectMovie, isLoadingMovieDetails } = useAppContext();
  const [isSelecting, setIsSelecting] = useState(false);

  function handleSelectMovie(id: string) {
    setIsSelecting(true);
    selectMovie(id).finally(() => {
      setIsSelecting(false);
    });
  }

  const isLoading = isSelecting && isLoadingMovieDetails;

  return (
    <div
      className={`flex rounded-md border border-border overflow-hidden 
      shadow-md dark:shadow-[0_4px_14px_rgba(0,0,0,0.3)] dark:shadow-slate-900/60
      hover:bg-accent/5 transition-all duration-200 
      ${
        isLoading
          ? "opacity-70"
          : "hover:shadow-lg dark:hover:shadow-slate-800/70 cursor-pointer"
      }`}
      onClick={() => !isLoading && handleSelectMovie(movie.imdbID)}
    >
      <div className="relative h-[150px] w-[100px] bg-muted flex-shrink-0 flex items-center justify-center">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <>
            <MediaContainerImage src={movie.Poster} title={movie.Title} />
            {isLoading && <SelectSpinner />}
          </>
        ) : (
          <FallBackIcon isLoading={isLoading} icon="🎬" />
        )}
      </div>
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
