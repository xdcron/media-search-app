import Image from "next/image";

interface MediaContainerImageProps {
  src: string;
  title: string;
}
export default function MediaContainerImage({
  src,
  title,
}: MediaContainerImageProps) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src || "/placeholder.svg"}
        alt={title}
        fill
        sizes="100px"
        className="object-cover"
        priority={false}
      />
    </div>
  );
}
