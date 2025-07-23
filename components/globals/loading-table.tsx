import { Skeleton } from '../ui/skeleton';

export default function LoadingTable({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <div className="mb-4" key={index}>
          <Skeleton className="w-full h-8 rounded-sm" />
        </div>
      ))}
    </>
  );
}
