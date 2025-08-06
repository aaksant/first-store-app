import EmptyList from '../globals/empty-list';
import ReviewCard from './review-card';
import { Review } from '@prisma/client';

type ReviewListProps = { reviews: Review[] };

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <EmptyList text="No reviews yet. Be the first one to review this product!" />
    );
  }

  return (
    <div className="grid gap-8 mt-8 lg:grid-cols-2">
      {reviews.map((review) => {
        return <ReviewCard key={review.id} review={review} />;
      })}
    </div>
  );
}
