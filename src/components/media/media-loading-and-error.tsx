import type { MediaType } from "@/hooks/use-media-search";
import { BookOpen, Film, Loader2 } from "lucide-react";

export function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto text-neon-glow-strong" />
        <p className="mt-4 text-muted-foreground">Loading more...</p>
      </div>
    </div>
  );
}

export function MediaSearchPrompt() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6">
      <div className="flex gap-4 mb-4">
        <Film className="h-12 w-12 text-neon-glow-strong" />
        <BookOpen className="h-12 w-12  text-neon-glow-strong" />
      </div>
      <h2 className="text-xl font-semibold mb-2">
        Welcome to <span className="text-neon-glow-strong font-bold">M&B</span>
      </h2>
      <p className="text-center text-muted-foreground max-w-md">
        Get started by searching for your favorite movies or books in the search
        bar above.
      </p>
    </div>
  );
}

export function NoResultsMessage({
  searchTerm,
  activeMediaType,
}: {
  searchTerm: string;
  activeMediaType: MediaType;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
      {activeMediaType === "movies" ? (
        <Film className="h-12 w-12 text-neon-glow-strong mb-4" />
      ) : (
        <BookOpen className="h-12 w-12  mb-4 text-neon-glow-strong" />
      )}
      <p className="text-center text-muted-foreground">
        No {activeMediaType} found for "
        <span className="font-medium">{searchTerm}</span>".
      </p>
    </div>
  );
}
