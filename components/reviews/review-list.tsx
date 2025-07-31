import EmptyList from '../globals/empty-list';
import ReviewCard from './review-card';
import { Review } from '@prisma/client';

type ReviewListProps = { reviews: Review[] };

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <EmptyList
        text="No reviews yet. Be the first one to review this product!"
        className="text-center text-muted-foreground tracking-tight font-semibold"
      />
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      {reviews.map((review) => {
        return <ReviewCard key={review.id} review={review} />;
      })}
    </div>
  );
}
