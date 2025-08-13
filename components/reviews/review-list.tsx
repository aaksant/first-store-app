'use client';

import { Review } from '@prisma/client';
import { useState } from 'react';
import { getProductReviewData } from '@/db/actions';
import EmptyList from '../globals/empty-list';
import ReviewCard from './review-card';
import { Button } from '../ui/button';
import { toast } from 'sonner';

type ReviewListProps = {
  initialReviews: Review[];
  productId: string;
  totalCount: number;
  hasNextPage: boolean;
  limit?: number;
};

export default function ReviewList({
  initialReviews,
  productId,
  totalCount,
  hasNextPage: initialHasNextPage,
  limit = 5
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreReviews = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const nextPage = currentPage + 1;
      const { paginatedReviews } = await getProductReviewData({
        productId,
        page: nextPage,
        limit
      });

      setReviews((prev) => [...prev, ...paginatedReviews.data]);
      setCurrentPage(nextPage);
      setHasNextPage(paginatedReviews.hasNextPage);
    } catch (error: unknown) {
      toast.error('Failed to load more reviews');
    } finally {
      setIsLoading(false);
    }
  };

  if (reviews.length === 0) {
    return (
      <EmptyList text="No reviews yet. Be the first one to review this product!" />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={loadMoreReviews}
            disabled={isLoading}
            className="btn"
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}

      {!hasNextPage && (
        <p className="text-center text-muted-foreground text-sm">
          You've seen all {totalCount} review{totalCount !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
