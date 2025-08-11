import { getProductAverageRating, getProductReviewsCount } from '@/utils';
import { Review } from '@prisma/client';
import { Star } from 'lucide-react';

type ProductRatingProps = {
  reviews: Review[];
};

export default function ProductRating({ reviews }: ProductRatingProps) {
  return (
    <p className="flex gap-x-2 items-center text-sm mt-1">
      <span className="inline-flex items-center gap-x-1 font-semibold">
        <Star size={15} className="text-yellow-400 fill-yellow-400" />
        {getProductAverageRating(reviews)}
      </span>
      <span className="text-primary">
        [{getProductReviewsCount(reviews)} reviews]
      </span>
    </p>
  );
}
