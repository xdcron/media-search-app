"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MediaType } from "@/hooks/use-media-search";

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isLoadingNextPage: boolean;
  fetchNextPage: () => void;
  activeMediaType: MediaType;
  itemsCount: number;
  searchTerm: string;
}

export function useInfiniteScroll({
  hasNextPage,
  isLoadingNextPage,
  fetchNextPage,
  activeMediaType,
  itemsCount,
  searchTerm,
}: UseInfiniteScrollProps) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const prevResultsRef = useRef<number>(0);
  const loadingRef = useRef<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const currentResults = itemsCount;
      if (
        entry.isIntersecting &&
        hasNextPage &&
        !isLoadingNextPage &&
        prevResultsRef.current !== currentResults &&
        !loadingRef.current
      ) {
        console.log(
          `Intersection detected, preparing to load more ${activeMediaType} (current count: ${currentResults})`
        );
        setShouldFetch(true);
      } else if (!entry.isIntersecting) {
        setShouldFetch(false);
      }
    },
    [hasNextPage, isLoadingNextPage, activeMediaType, itemsCount]
  );

  useEffect(() => {
    if (shouldFetch && !loadingRef.current) {
      loadingRef.current = true;
      console.log(`Actually fetching next page of ${activeMediaType}`);

      prevResultsRef.current = itemsCount;
      fetchNextPage();
      setTimeout(() => {
        loadingRef.current = false;
        setShouldFetch(false);
      }, 500);
    }
  }, [shouldFetch, fetchNextPage, activeMediaType, itemsCount]);

  useEffect(() => {
    prevResultsRef.current = 0;
    loadingRef.current = false;
    setShouldFetch(false);
  }, [searchTerm, activeMediaType]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px 400px 0px", 
      threshold: 0.1,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [handleObserver]);

  return { observerTarget };
}
