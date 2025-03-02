"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "./input";
import { useAppContext } from "@/contexts/app-context";
import { Search } from "lucide-react";
import { MediaType } from "@/hooks/use-media-search";
import MediaTypeToggle from "./media-toggle";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const initialRender = useRef(true);

  const { search, activeMediaType, setActiveMediaType } = useAppContext();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (initialRender.current) {
      const queryParam = searchParams.get("query") || "";
      const typeParam = searchParams.get("type") as MediaType | null;

      setInputValue(queryParam);
      if (
        typeParam &&
        (typeParam === "movies" || typeParam === "books") &&
        typeParam !== activeMediaType
      ) {
        setActiveMediaType(typeParam);
      }

      initialRender.current = false;
    }
  }, [searchParams, activeMediaType, setActiveMediaType]);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    search(value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
      <div className="relative w-full">
        <Input
          className="
            pr-10 
            border-input dark:border-secondary/30  
            focus-visible:border-neon-glow 
            focus-visible:outline-neon-glow 
            focus-visible:ring-0
            transition-shadow duration-300
          "
          placeholder="Search movies and books..."
          value={inputValue}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Search className="h-4 w-4 text-secondary" />
        </div>
      </div>

      <div className="hidden sm:block">
        <MediaTypeToggle />
      </div>
    </div>
  );
}
