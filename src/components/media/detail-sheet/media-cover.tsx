import Image from "next/image";

interface MediaCoverProps {
  imageUrl?: string | null;
  title: string;
  fallbackIcon?: string;
  className?: string;
}

export function MediaCover({
  imageUrl,
  title,
  fallbackIcon = "🎬",
  className = "h-80",
}: MediaCoverProps): React.ReactElement {
  return (
    <div
      className={`relative w-full flex items-center justify-center bg-muted ${className}`}
    >
      {imageUrl ? (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <div className="relative h-full w-full flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <span className="text-6xl">{fallbackIcon}</span>
        </div>
      )}
    </div>
  );
}
