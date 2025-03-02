"use client";

import { Film, BookOpen } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/contexts/app-context";

type MediaTypeToggleProps = {
  className?: string;
};

export default function MediaTypeToggle({
  className = "",
}: MediaTypeToggleProps) {
  const { activeMediaType, setActiveMediaType } = useAppContext();

  const handleMediaTypeChange = () => {
    setActiveMediaType(activeMediaType === "movies" ? "books" : "movies");
  };

  return (
    <div
      className={`flex items-center gap-2 border border-secondary/30 rounded-full px-3 py-1 shadow-neon ${className}`}
    >
      <Film
        className={`h-4 w-4 ${
          activeMediaType === "movies"
            ? "text-secondary animate-neon-glow"
            : "text-muted-foreground"
        }`}
      />

      <Switch
        checked={activeMediaType === "books"}
        onCheckedChange={handleMediaTypeChange}
        className="data-[state=checked]:bg-secondary"
      />

      <BookOpen
        className={`h-4 w-4 ${
          activeMediaType === "books"
            ? "text-secondary animate-neon-glow"
            : "text-muted-foreground"
        }`}
      />
    </div>
  );
}
