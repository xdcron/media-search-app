import { ReactNode } from "react";

interface FooterInfoProps {
  items?: (string | ReactNode)[];
}

export function FooterInfo({
  items = [],
}: FooterInfoProps): React.ReactElement {
  return (
    <div className="mt-6 pt-4 border-t text-xs text-muted-foreground w-full">
      {items.map((item, index) => (
        <div
          key={index}
          className="break-words overflow-wrap-anywhere my-1 w-full"
        >
          {typeof item === "string" && item.includes("http") ? (
            <span className="truncate inline-block max-w-full" title={item}>
              {item.length > 40 ? item.substring(0, 37) + "..." : item}
            </span>
          ) : (
            item
          )}
        </div>
      ))}
    </div>
  );
}
