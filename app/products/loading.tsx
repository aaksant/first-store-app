import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function Loading() {
  return (
    <>
      {/* breadcrumbs skeleton */}
      <Skeleton className="h-4 w-48" />

      <div className="mt-8 grid gap-8 lg:grid-cols-5 lg:gap-12">
        {/* image skeleton */}
        <div className="w-5/6 p-6 lg:w-full lg:col-span-2">
          <Skeleton className="w-full aspect-[3/4] rounded-lg" />
        </div>

        {/* detail skeleton */}
        <div className="space-y-6 lg:col-span-3">
          <div className="space-y-2">
            {/* product title */}
            <Skeleton className="h-8 w-3/4 md:h-9 lg:h-10" />
            {/* company badge */}
            <Skeleton className="h-6 w-24 rounded-full" />
            {/* rating */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div>
            {/* price */}
            <Skeleton className="h-6 w-20 ml-auto" />
            {/* description */}
            <div className="mt-2 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* quantity component skeleton */}
          <Skeleton className="h-12 w-32" />

          {/* subtotal */}
          <Separator />
          <div className="w-full bg-accent p-4 rounded-md flex justify-between items-center">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>

          {/* buttons skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* reviews skeleton */}
      <div className="mt-12">
        <Skeleton className="h-8 w-48 my-6" />
        <div className="space-y-4">
          {/* Individual review skeletons */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
