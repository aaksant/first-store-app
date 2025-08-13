import { Star } from 'lucide-react';

type ProductRatingProps = {
  averageRating: string;
  count: number;
};

export default function ProductRating({
  averageRating,
  count
}: ProductRatingProps) {
  return (
    <p className="flex gap-x-2 items-center text-sm mt-1">
      <span className="inline-flex items-center gap-x-1 font-semibold">
        <Star size={15} className="text-yellow-400 fill-yellow-400" />
        {averageRating}
      </span>
      <span className="text-primary">{count}</span>
    </p>
  );
}
