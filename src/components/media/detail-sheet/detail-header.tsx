import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export interface TagItem {
  label: string;
  variant?: "default";
}

interface DetailHeaderProps {
  title: string;
  year?: string | null;
  tags?: TagItem[];
}

export function DetailHeader({
  title,
  year,
  tags = [],
}: DetailHeaderProps): React.ReactElement {
  return (
    <SheetHeader className="text-left mb-4">
      <SheetTitle className="text-2xl break-words">
        {title}
        {year && <span className="text-muted-foreground"> ({year})</span>}
      </SheetTitle>
      <SheetDescription className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <Badge
            key={`${tag.label}-${index}`}
            variant={tag.variant || "secondary"}
            className="max-w-full truncate"
            title={tag.label}
          >
            {tag.label.length > 30
              ? tag.label.substring(0, 27) + "..."
              : tag.label}
          </Badge>
        ))}
      </SheetDescription>
    </SheetHeader>
  );
}
