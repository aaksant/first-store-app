'use client';

import { useState } from 'react';
import ReviewForm from './review-form';

type ReviewContainerProps = { productId: string };

export default function ReviewContainer({ productId }: ReviewContainerProps) {
  const [isFormShown, setIsFormShown] = useState(false);

  return (
    <>
      <ReviewForm
        productId={productId}
        isFormShown={isFormShown}
        onFormShown={() => setIsFormShown(!isFormShown)}
      />
    </>
  );
}
