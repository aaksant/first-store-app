import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

function ProductCardSkeleton() {
  return (
    <Card className="py-0 w-full max-w-sm overflow-hidden shadow-sm">
      <Skeleton className="w-full h-64" />
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoadingContainer() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
}
