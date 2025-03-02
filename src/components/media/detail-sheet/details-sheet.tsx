import { ReactNode } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "./loading-spinner";
import { CloseButton } from "./close-button";
import { MediaCover } from "./media-cover";
import { DetailHeader, TagItem } from "./detail-header";
import { InfoSection } from "./info-section";
import { DetailsGrid, DetailSection } from "./details-grid";
import { FooterInfo } from "./footer";
import { MovieDetails } from "@/types/movie-types";
import { BookDetails } from "@/types/book-types";

export interface DetailSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isLoading: boolean;
  item: MovieDetails | BookDetails | null;
  imageUrl?: string | null;
  title: string;
  year?: string | null;
  tags?: TagItem[];
  description?: ReactNode;
  detailSections?: DetailSection[];
  footerItems?: (string | ReactNode)[];
  fallbackIcon?: string;
  afterDescription?: ReactNode;
  beforeFooter?: ReactNode;
  children?: ReactNode;
}

export function DetailSheet({
  isOpen,
  onOpenChange,
  isLoading,
  item,
  imageUrl,
  title,
  year,
  tags = [],
  description,
  detailSections = [],
  footerItems = [],
  fallbackIcon = "🎬",
  afterDescription,
  beforeFooter,
  children,
}: DetailSheetProps): React.ReactElement {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg p-0 overflow-hidden">
        <SheetTitle className="sr-only">{title} Details</SheetTitle>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          item && (
            <ScrollArea className="h-full max-h-[95vh]">
              <div className="relative">
                <CloseButton onClose={() => onOpenChange(false)} />
                <MediaCover
                  imageUrl={imageUrl}
                  title={title}
                  fallbackIcon={fallbackIcon}
                />
                <div className="p-6 max-w-full">
                  <DetailHeader title={title} year={year} tags={tags} />
                  {description && (
                    <InfoSection
                      title="Description"
                      content={description}
                      className="mb-6"
                    />
                  )}
                  {afterDescription && (
                    <div className="w-full max-w-full overflow-hidden">
                      {afterDescription}
                    </div>
                  )}

                  <Separator className="my-4" />
                  <DetailsGrid sections={detailSections} />
                  {beforeFooter && (
                    <div className="w-full max-w-full overflow-hidden">
                      {beforeFooter}
                    </div>
                  )}
                  <FooterInfo items={footerItems} />
                  {children && (
                    <div className="w-full max-w-full overflow-hidden">
                      {children}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          )
        )}
      </SheetContent>
    </Sheet>
  );
}
