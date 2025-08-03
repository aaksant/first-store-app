'use client';

import { useState } from 'react';
import ReviewForm from './review-form';
import { Review } from '@prisma/client';
import ReviewList from './review-list';

type ReviewContainerProps = {
  productId: string;
  reviews: Review[];
  isAlreadyReviewed: Review | null;
};

export default function ReviewContainer({
  productId,
  reviews,
  isAlreadyReviewed
}: ReviewContainerProps) {
  const [isFormShown, setIsFormShown] = useState(false);

  return (
    <>
      <ReviewForm
        productId={productId}
        isFormShown={isFormShown}
        onFormShown={() => setIsFormShown(!isFormShown)}
        isAlreadyReviewed={isAlreadyReviewed}
      />
      <ReviewList reviews={reviews} />
    </>
  );
}
