import { Book } from "@/types/book-types";
import BookContainer from "./book-container";

interface BooksSectionProps {
  books: Book[];
  totalResults: number;
}

export function BooksSection({ books, totalResults }: BooksSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Books ({totalResults.toLocaleString()})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {books.map((book) => (
          <BookContainer book={book} key={book.key} />
        ))}
      </div>
    </div>
  );
}
