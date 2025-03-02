"use client";

import { ReactNode } from "react";

interface InfoSectionProps {
  title: string;
  content: ReactNode;
  className?: string;
}

export function InfoSection({
  title,
  content,
  className = "",
}: InfoSectionProps): React.ReactElement {
  return (
    <div className={`${className} w-full`}>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="text-sm text-muted-foreground break-words overflow-wrap-anywhere w-full max-w-full">
        {content || "Not available"}
      </div>
    </div>
  );
}
