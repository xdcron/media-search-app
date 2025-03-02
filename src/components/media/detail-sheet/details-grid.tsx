import { ReactNode } from "react";
import { InfoSection } from "./info-section";

export interface DetailSection {
  title: string;
  content: ReactNode;
}

interface DetailsGridProps {
  sections?: DetailSection[];
}

export function DetailsGrid({
  sections = [],
}: DetailsGridProps): React.ReactElement {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {sections.map((section, index) => (
        <InfoSection
          key={`${section.title}-${index}`}
          title={section.title}
          content={section.content}
          className="overflow-hidden"
        />
      ))}
    </div>
  );
}
