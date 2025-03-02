import { MediaType } from "@/hooks/use-media-search";
import { Book, BookDetails } from "./book-types";
import { Movie, MovieDetails } from "./movie-types";
import { User } from "firebase/auth";

export type AppContextType = {
  movies: Movie[];
  books: Book[];
  selectedMovie: MovieDetails | null;
  selectedBook: BookDetails | null;
  isLoading: boolean;
  isLoadingNextPage: boolean;
  isLoadingMovieDetails: boolean;
  isLoadingBookDetails: boolean;
  movieError: string | null;
  bookError: string | null;
  searchTerm: string;
  hasNextPage: boolean;
  totalResults: number;
  activeMediaType: MediaType;
  setActiveMediaType: (type: MediaType) => void;
  search: (query: string) => void;
  fetchNextPage: () => void;
  selectMovie: (id: string) => Promise<void>;
  selectBook: (id: string) => Promise<void>;
  clearSelectedMovie: () => void;
  clearSelectedBook: () => void;
};

export type AuthContextType = {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

export interface FormData {
  email: string;
  password: string;
}
