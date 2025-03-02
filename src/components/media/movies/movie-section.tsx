import MovieContainer from "@/components/media/movies/movie-container";
import { Movie } from "@/types/movie-types";

interface MoviesSectionProps {
  movies: Movie[];
  totalResults: number;
}

export function MoviesSection({ movies, totalResults }: MoviesSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Movies & TV Shows ({totalResults.toLocaleString()})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieContainer movie={movie} key={movie.imdbID} />
        ))}
      </div>
    </div>
  );
}
