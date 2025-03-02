"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  useQueryClient,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { searchBooks, getBookDetails } from "@/lib/book-utils";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { BookDetails } from "@/types/book-types";

export function useBookSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const urlQuery = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(urlQuery);
  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const [selectedBook, setSelectedBook] = useState<BookDetails | null>(null);

  const updateSearchTerm = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  const updateUrl = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim().length > 0) {
        params.set("query", query);
        params.set("page", "1");
        params.set("type", "books");
      } else {
        params.delete("query");
        params.delete("page");
        params.delete("type");
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const debouncedSearchUpdate = useMemo(
    () => debounce(updateSearchTerm, 250),
    [updateSearchTerm]
  );

  const debouncedUrlUpdate = useMemo(
    () => debounce(updateUrl, 350),
    [updateUrl]
  );

  useEffect(() => {
    return () => {
      debouncedSearchUpdate.cancel();
      debouncedUrlUpdate.cancel();
    };
  }, [debouncedSearchUpdate, debouncedUrlUpdate]);

  useEffect(() => {
    const newQuery = searchParams.get("query") || "";
    const type = searchParams.get("type");

    if (type === "books" && inputValue !== newQuery) {
      setInputValue(newQuery);
    }
    if (type === "books" && searchTerm !== newQuery) {
      setSearchTerm(newQuery);
    }
  }, [searchParams, inputValue, searchTerm]);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: loading,
    error: queryError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["booksInfinite", searchTerm],
    queryFn: async ({ pageParam = 1 }) => {
      return searchBooks(searchTerm, pageParam, 20);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalResults = lastPage.numFound || 0;
      const loadedCount = allPages.reduce(
        (count, page) => count + (page.docs?.length || 0),
        0
      );
      return loadedCount < totalResults ? allPages.length + 1 : undefined;
    },
    enabled: searchTerm.trim().length >= 3,
    staleTime: 5 * 60 * 1000,
  });

  const bookDetailsMutation = useMutation({
    mutationFn: async (id: string) => {
      return getBookDetails(id);
    },
    onSuccess: (data) => {
      setSelectedBook(data);
      queryClient.setQueryData(["bookDetails", data.key], data);
    },
    onError: (error: Error) => {
      console.error("Book details error:", error);
    },
  });

  const allBooks = data?.pages.flatMap((page) => page.docs || []) || [];
  const booksPerPage = 20;
  const books = allBooks.slice(0, (data?.pages.length || 0) * booksPerPage);
  const totalResults = data?.pages[0]?.numFound || 0;

  const handleInputChange = useCallback(
    (query: string) => {
      setInputValue(query);
      debouncedSearchUpdate(query);
      debouncedUrlUpdate(query);
    },
    [debouncedSearchUpdate, debouncedUrlUpdate]
  );

  const selectBook = useCallback(
    async (id: string) => {
      const cachedData = queryClient.getQueryData<BookDetails>([
        "bookDetails",
        id,
      ]);

      if (cachedData) {
        console.log("Using cached book details for:", id);
        setSelectedBook(cachedData);
        return;
      }

      await bookDetailsMutation.mutateAsync(id);
    },
    [queryClient, bookDetailsMutation]
  );

  const clearSelectedBook = useCallback(() => {
    setSelectedBook(null);
  }, []);

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Failed to search books"
    : "";

  const hasNextPage = books.length < totalResults;

  return {
    books,
    loading,
    isFetchingNextPage,
    error,
    searchTerm: inputValue,
    search: handleInputChange,
    fetchNextPage,
    hasNextPage,
    refetch,
    totalResults,
    selectedBook,
    selectBook,
    clearSelectedBook,
    isLoadingBookDetails: bookDetailsMutation.isPending,
  };
}
