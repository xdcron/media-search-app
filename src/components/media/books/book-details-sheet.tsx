"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/contexts/app-context";
import {
  getBookCoverUrl,
  formatDescription,
  extractAuthorIdsFromBook,
  getAuthorsInfo,
} from "@/lib/book-utils";
import { InfoSection } from "../detail-sheet/info-section";
import { DetailSheet } from "../detail-sheet/details-sheet";

export function BookDetailSheet() {
  const { selectedBook, clearSelectedBook, isLoadingBookDetails } =
    useAppContext();

  const authorIds = selectedBook ? extractAuthorIdsFromBook(selectedBook) : [];
  const { data: authorData, isLoading: isLoadingAuthors } = useQuery({
    queryKey: ["authors", authorIds],
    queryFn: () => getAuthorsInfo(authorIds),
    enabled: !!selectedBook && authorIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (!selectedBook) {
    return null;
  }

  const tags = selectedBook.subjects
    ? selectedBook.subjects.slice(0, 5).map((subject) => ({ label: subject }))
    : [];

  const authors = selectedBook.authors
    ? selectedBook.authors
        .map((auth) => {
          if (!auth.author) return "Unknown";
          const authorId = auth.author.key.split("/").pop();
          if (!authorId) return "Unknown";
          return authorData && authorData[authorId]?.name
            ? authorData[authorId].name
            : authorId;
        })
        .join(", ")
    : "";
  const detailSections = [
    ...(authors ? [{ title: "Authors", content: authors }] : []),
    ...(selectedBook.subject_places && selectedBook.subject_places.length > 0
      ? [
          {
            title: "Places",
            content: `${selectedBook.subject_places.slice(0, 5).join(", ")}${
              selectedBook.subject_places.length > 5 ? "..." : ""
            }`,
          },
        ]
      : []),
    ...(selectedBook.subject_times && selectedBook.subject_times.length > 0
      ? [
          {
            title: "Time Periods",
            content: `${selectedBook.subject_times.slice(0, 5).join(", ")}${
              selectedBook.subject_times.length > 5 ? "..." : ""
            }`,
          },
        ]
      : []),
    ...(selectedBook.subject_people && selectedBook.subject_people.length > 0
      ? [
          {
            title: "People",
            content: `${selectedBook.subject_people.slice(0, 5).join(", ")}${
              selectedBook.subject_people.length > 5 ? "..." : ""
            }`,
          },
        ]
      : []),
  ];

  const footerItems = [`Open Library ID: ${selectedBook.key.split("/").pop()}`];

  const coverUrl =
    selectedBook.covers && selectedBook.covers[0]
      ? getBookCoverUrl(selectedBook.covers[0], "L")
      : null;

  const formattedDescription = selectedBook.description
    ? formatDescription(selectedBook.description)
    : "No description available.";

  // Simple fix: convert excerpt to string safely
  const excerptText =
    selectedBook.excerpts && selectedBook.excerpts.length > 0
      ? String(selectedBook.excerpts[0].excerpt || "")
      : null;

  const excerptSection = excerptText ? (
    <InfoSection
      title="Excerpt"
      content={`"${excerptText.substring(0, 300)}${
        excerptText.length > 300 ? "..." : ""
      }"`}
      className="mt-6"
    />
  ) : null;

  const linksSection =
    selectedBook.links && selectedBook.links.length > 0 ? (
      <div className="mt-2">
        Links:
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedBook.links.slice(0, 3).map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {link.title || "Related Link"}
            </a>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <DetailSheet
      isOpen={!!selectedBook}
      onOpenChange={(open) => !open && clearSelectedBook()}
      isLoading={isLoadingBookDetails || isLoadingAuthors}
      item={selectedBook}
      imageUrl={coverUrl}
      title={selectedBook.title}
      year={selectedBook.first_publish_date}
      tags={tags}
      description={formattedDescription}
      detailSections={detailSections}
      footerItems={footerItems}
      fallbackIcon="📚"
      beforeFooter={excerptSection}
    >
      {linksSection}
    </DetailSheet>
  );
}
