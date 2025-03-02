"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/contexts/app-context";
import { Book } from "@/types/book-types";
import { getBookCoverUrl, getIdFromKey } from "@/lib/book-utils";
import SelectSpinner from "../spinner";
import { placeholderImageUrl } from "@/constants/contants";

interface BookContainerProps {
  book: Book;
}

export default function BookContainer({ book }: BookContainerProps) {
  const { selectBook, isLoadingBookDetails } = useAppContext();
  const [isSelecting, setIsSelecting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const bookId = getIdFromKey(book.key);

  function handleSelectBook(id: string) {
    setIsSelecting(true);
    selectBook(id).finally(() => {
      setIsSelecting(false);
    });
  }

  const handleImageError = () => {
    setImageError(true);
  };

  const isLoading = isSelecting && isLoadingBookDetails;

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
      onClick={() => !isLoading && handleSelectBook(bookId)}
    >
      <div className="relative h-[150px] w-[100px] bg-muted flex-shrink-0 flex items-center justify-center">
        {book.cover_i && !imageError ? (
          <>
            <div className="relative h-full w-full">
              <Image
                src={getBookCoverUrl(book.cover_i)}
                alt={book.title}
                fill
                sizes="100px"
                className="object-cover"
                onError={handleImageError}
              />
            </div>
            {isLoading && <SelectSpinner />}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={placeholderImageUrl}
                  alt={`${book.title} (cover unavailable)`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-medium text-sm line-clamp-2">{book.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {book.author_name ? book.author_name[0] : "Unknown Author"}
          </p>
          {book.first_publish_year && (
            <p className="text-xs text-muted-foreground">
              {book.first_publish_year}
            </p>
          )}
        </div>
        <div className="mt-auto pt-2 flex justify-between items-center">
          <Badge variant="outline" className="capitalize text-xs py-0 h-5">
            Book
          </Badge>
          {book.language && book.language[0] && (
            <Badge variant="secondary" className="text-xs py-0 h-5">
              {book.language[0]}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
