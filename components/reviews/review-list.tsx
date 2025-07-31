import ReviewCard from './review-card';
import { Review } from '@prisma/client';

type ReviewListProps = { reviews: Review[] };

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <h3 className="text-lg font-bold mt-8">No reviews yet</h3>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      {reviews.map((review) => {
        return <ReviewCard key={review.id} review={review} />;
      })}
    </div>
  );
}
