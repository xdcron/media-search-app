import Image from "next/image";

export const AuthPoster = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 z-10" />
      <Image
        src="http://www.yijiedesign.co/jpg/50-list-of-best-movie-posters-2020-designwithred.jpg"
        alt="Authentication background"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};
