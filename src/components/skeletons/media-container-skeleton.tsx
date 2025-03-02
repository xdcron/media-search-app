import { Skeleton } from "@/components/ui/skeleton";

export default function MediaContainerSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="flex rounded-md border border-border overflow-hidden"
          >
            <div className="relative h-[150px] w-[100px] flex-shrink-0">
              <Skeleton className="h-full w-full" />
            </div>

            <div className="p-3 flex flex-col justify-between flex-1">
              <div>
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/4 mt-1" />
              </div>

              <div className="mt-auto pt-2 flex justify-between items-center">
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
