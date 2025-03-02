import { OPEN_LIBRARY_URL } from "@/constants/contants";
import { BookSearchResults, BookDetails, Author } from "@/types/book-types";

export async function searchBooks(
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<BookSearchResults> {
  try {
    const offset = (page - 1) * limit;

    const response = await fetch(
      `${OPEN_LIBRARY_URL}/search.json?q=${encodeURIComponent(
        query
      )}&limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(`Book search failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data as BookSearchResults;
  } catch (error) {
    console.error("Error searching for books:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to search books"
    );
  }
}

export async function getBookDetails(id: string): Promise<BookDetails> {
  try {
    const response = await fetch(`${OPEN_LIBRARY_URL}/works/${id}.json`);

    if (!response.ok) {
      throw new Error(
        `Book details fetch failed with status: ${response.status}`
      );
    }

    const data = await response.json();
    return data as BookDetails;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch book details"
    );
  }
}

export async function getAuthorInfo(authorId: string): Promise<Author | null> {
  try {
    const response = await fetch(
      `${OPEN_LIBRARY_URL}/authors/${authorId}.json`
    );

    if (!response.ok) {
      console.warn(
        `Author info fetch failed with status: ${response.status} for ID: ${authorId}`
      );
      return null;
    }

    const data = await response.json();
    return data as Author;
  } catch (error) {
    console.error(`Error fetching author info for ${authorId}:`, error);
    return null;
  }
}

export async function getAuthorsInfo(
  authorIds: string[]
): Promise<Record<string, Author>> {
  try {
    const authorPromises = authorIds.map((id) => getAuthorInfo(id));
    const authorsData = await Promise.all(authorPromises);

    const authorsRecord: Record<string, Author> = {};
    authorIds.forEach((id, index) => {
      const author = authorsData[index];
      if (author) {
        authorsRecord[id] = author;
      }
    });

    return authorsRecord;
  } catch (error) {
    console.error("Error fetching multiple authors:", error);
    return {};
  }
}

export function getBookCoverUrl(
  coverId?: number,
  size: "S" | "M" | "L" = "M"
): string {
  if (!coverId) {
    return "/placeholder-cover.jpg";
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export function getIdFromKey(key: string): string {
  return key.split("/").pop() || "";
}

export function formatDescription(
  description?: string | { value: string }
): string {
  if (!description) {
    return "No description available.";
  }

  if (typeof description === "string") {
    return description;
  }

  return description.value || "No description available.";
}

export function extractAuthorIdsFromBook(book: BookDetails): string[] {
  if (!book.authors || book.authors.length === 0) {
    return [];
  }

  return book.authors
    .map((author) => {
      if (!author.author || !author.author.key) {
        return null;
      }
      return getIdFromKey(author.author.key);
    })
    .filter((id): id is string => id !== null);
}
