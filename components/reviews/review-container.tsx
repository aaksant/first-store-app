'use client';

import { useState } from 'react';
import ReviewForm from './review-form';
import { Review } from '@prisma/client';
import ReviewList from './review-list';

type ReviewContainerProps = {
  productId: string;
  reviews: Review[];
};

export default function ReviewContainer({
  productId,
  reviews
}: ReviewContainerProps) {
  const [isFormShown, setIsFormShown] = useState(false);

  return (
    <>
      <ReviewForm
        productId={productId}
        isFormShown={isFormShown}
        onFormShown={() => setIsFormShown(!isFormShown)}
      />
      <ReviewList reviews={reviews} />
    </>
  );
}
