"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { useAppContext } from "@/contexts/app-context";

export function MovieDetailSheet() {
  const { selectedMovie, clearSelectedMovie, loading } = useAppContext();

  return (
    <Sheet
      open={!!selectedMovie}
      onOpenChange={(open) => !open && clearSelectedMovie()}
    >
      <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto p-0">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          selectedMovie && (
            <ScrollArea className="h-full">
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={clearSelectedMovie}
                    className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Poster */}
                <div className="relative w-full h-80">
                  {selectedMovie.Poster && selectedMovie.Poster !== "N/A" ? (
                    <img
                      src={selectedMovie.Poster}
                      alt={selectedMovie.Title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-4xl">🎬</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <SheetHeader className="text-left mb-4">
                    <SheetTitle className="text-2xl">
                      {selectedMovie.Title}{" "}
                      <span className="text-muted-foreground">
                        ({selectedMovie.Year})
                      </span>
                    </SheetTitle>
                    <SheetDescription className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{selectedMovie.Rated}</Badge>
                      <Badge variant="outline">{selectedMovie.Runtime}</Badge>
                      {selectedMovie.Genre.split(", ").map((genre) => (
                        <Badge key={genre} variant="secondary">
                          {genre}
                        </Badge>
                      ))}
                    </SheetDescription>
                  </SheetHeader>

                  {/* Ratings */}
                  {selectedMovie.Ratings &&
                    selectedMovie.Ratings.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-2">Ratings</h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedMovie.Ratings.map((rating) => (
                            <div
                              key={rating.Source}
                              className="bg-muted p-2 rounded text-sm"
                            >
                              <div className="font-medium">{rating.Source}</div>
                              <div>{rating.Value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Plot */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Plot</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedMovie.Plot}
                    </p>
                  </div>

                  <Separator className="my-4" />

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Cast */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Cast</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedMovie.Actors}
                      </p>
                    </div>

                    {/* Director */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Director</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedMovie.Director}
                      </p>
                    </div>

                    {/* Writer */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Writer</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedMovie.Writer}
                      </p>
                    </div>

                    {/* Language */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Language</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedMovie.Language}
                      </p>
                    </div>

                    {/* Country */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Country</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedMovie.Country}
                      </p>
                    </div>

                    {/* Awards */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Awards</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedMovie.Awards}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
                    <div>IMDb ID: {selectedMovie.imdbID}</div>
                    {selectedMovie.BoxOffice && (
                      <div>Box Office: {selectedMovie.BoxOffice}</div>
                    )}
                    {selectedMovie.Production && (
                      <div>Production: {selectedMovie.Production}</div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )
        )}
      </SheetContent>
    </Sheet>
  );
}
