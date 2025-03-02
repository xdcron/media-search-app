"use client";
import { useAppContext } from "@/contexts/app-context";
import { DetailSheet } from "../detail-sheet/details-sheet";

export function MovieDetailSheet() {
  const { selectedMovie, clearSelectedMovie, isLoadingMovieDetails } =
    useAppContext();

  if (!selectedMovie) {
    return null;
  }

  const tags = [
    ...(selectedMovie.Rated
      ? [{ label: selectedMovie.Rated, variant: "default" as const }]
      : []),
    ...(selectedMovie.Runtime
      ? [{ label: selectedMovie.Runtime, variant: "default" as const }]
      : []),
    ...(selectedMovie.Genre
      ? selectedMovie.Genre.split(", ").map((genre) => ({ label: genre }))
      : []),
  ];

  const detailSections = [
    { title: "Cast", content: selectedMovie.Actors },
    { title: "Director", content: selectedMovie.Director },
    { title: "Writer", content: selectedMovie.Writer },
    { title: "Language", content: selectedMovie.Language },
    { title: "Country", content: selectedMovie.Country },
    { title: "Awards", content: selectedMovie.Awards },
  ];

  const footerItems = [
    `IMDb ID: ${selectedMovie.imdbID}`,
    ...(selectedMovie.BoxOffice
      ? [`Box Office: ${selectedMovie.BoxOffice}`]
      : []),
    ...(selectedMovie.Production
      ? [`Production: ${selectedMovie.Production}`]
      : []),
  ];

  return (
    <DetailSheet
      isOpen={!!selectedMovie}
      onOpenChange={(open) => !open && clearSelectedMovie()}
      isLoading={isLoadingMovieDetails}
      item={selectedMovie}
      imageUrl={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : null}
      title={selectedMovie.Title}
      year={selectedMovie.Year}
      tags={tags}
      description={selectedMovie.Plot}
      detailSections={detailSections}
      footerItems={footerItems}
      fallbackIcon="🎬"
    />
  );
}
