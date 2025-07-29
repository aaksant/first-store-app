import { createReviewAction } from '@/db/actions';
import FormContainer from '../form/form-container';
import TextareaInput from '../form/textarea-input';
import FormButton from '../form/form-button';
import { Button } from '../ui/button';
import { useUser } from '@clerk/nextjs';
import { faker } from '@faker-js/faker';
import RatingInput from './rating-input';
import { useState } from 'react';

type ReviewFormProps = {
  productId: string;
  isFormShown: boolean;
  onFormShown: () => void;
};

export default function ReviewForm({
  productId,
  isFormShown,
  onFormShown
}: ReviewFormProps) {
  const { user } = useUser();
  const [star, setStar] = useState<number>(1);

  const randomUserFirstName = faker.person.firstName();
  const randomUserProfileImageUrl = faker.image.avatar();

  return (
    <>
      <div className="text-center">
        <Button
          onClick={onFormShown}
          variant={isFormShown ? 'secondary' : 'outline'}
          className="btn mb-6"
        >
          {isFormShown ? 'Cancel' : 'Write a review'}
        </Button>
      </div>
      {isFormShown && (
        <div className="border rounded-md py-4 px-6">
          <h1 className="text-xl font-semibold tracking-tight mb-8">
            Write your review
          </h1>
          <div>
            <FormContainer action={createReviewAction} className="space-y-6">
              <input
                type="hidden"
                name="productId"
                id="productId"
                value={productId}
              />
              <input
                type="hidden"
                name="authorName"
                id="authorName"
                value={user?.firstName || randomUserFirstName}
              />
              <input
                type="hidden"
                name="authorProfileImageUrl"
                id="authorProfileImageUrl"
                value={user?.imageUrl || randomUserProfileImageUrl}
              />
              <RatingInput
                name="rating"
                value={star}
                onRatingChange={(rating) => {
                  setStar(rating);
                }}
              />
              <TextareaInput
                name="comment"
                placeholder="What is your experience"
              />
              <FormButton text="Submit" className="mt-8 w-full" />
            </FormContainer>
          </div>
        </div>
      )}
    </>
  );
}
