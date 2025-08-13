'use client';

import { createReviewAction } from '@/db/actions';
import FormContainer from '../form/form-container';
import TextareaInput from '../form/textarea-input';
import FormButton from '../form/form-button';
import { Button } from '../ui/button';
import { useUser } from '@clerk/nextjs';
import { faker } from '@faker-js/faker';
import RatingInput from './rating-input';
import { useState } from 'react';
import { Review } from '@prisma/client';

type ReviewFormProps = {
  productId: string;
  isAlreadyReviewed: Review | null;
};

export default function ReviewForm({
  productId,
  isAlreadyReviewed
}: ReviewFormProps) {
  const { user } = useUser();
  const [star, setStar] = useState<number>(1);
  const [isFormShown, setIsFormShown] = useState(false);

  const randomUserFirstName = faker.person.firstName();
  const randomUserProfileImageUrl = faker.image.avatar();

  if (isAlreadyReviewed) {
    return (
      <div className="text-center p-6 bg-muted/50 rounded-lg">
        <h3 className="text-muted-foreground font-semibold tracking-tight text-lg">
          You already reviewed this product
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      <div className="text-center">
        <Button
          onClick={() => setIsFormShown(!isFormShown)}
          variant={isFormShown ? 'secondary' : 'outline'}
          className="btn w-full"
        >
          {isFormShown ? 'Cancel' : 'Write a review'}
        </Button>
      </div>

      {isFormShown && (
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold tracking-tight mb-6">
            Write your review
          </h2>
          <FormContainer action={createReviewAction} className="space-y-6">
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || randomUserFirstName}
            />
            <input
              type="hidden"
              name="authorProfileImageUrl"
              value={user?.imageUrl || randomUserProfileImageUrl}
            />
            <RatingInput name="rating" value={star} onRatingChange={setStar} />
            <TextareaInput
              name="comment"
              placeholder="Share your experience with this product..."
            />
            <FormButton text="Submit Review" className="w-full" />
          </FormContainer>
        </div>
      )}
    </div>
  );
}
