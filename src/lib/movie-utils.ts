import { MovieDetails, MovieSearchResult } from "@/types/movie-types";

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MovieSearchResult> {
  const response = await fetch(
    `/api/get-movies?query=${encodeURIComponent(query)}&page=${page}`
  );
  console.log(response);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch movies");
  }

  return response.json();
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  console.log(id);
  const response = await fetch("/api/get-movie-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  console.log(response);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch movie details");
  }

  return response.json();
}
