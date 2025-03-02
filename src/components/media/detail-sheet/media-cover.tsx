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
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <span className="text-6xl">{fallbackIcon}</span>
        </div>
      )}
    </div>
  );
}
