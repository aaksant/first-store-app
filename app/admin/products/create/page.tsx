import CheckboxInput from '@/components/form/checkbox-input';
import FormButton from '@/components/form/form-button';
import FormContainer from '@/components/form/form-container';
import FormInput from '@/components/form/form-input';
import ImageInput from '@/components/form/image-input';
import PriceInput from '@/components/form/price-input';
import TextareaInput from '@/components/form/textarea-input';
import { createProductAction } from '@/db/actions';

export default function CreateProductPage() {
  return (
    <>
      <h1 className="text-xl font-semibold tracking-tight mb-8">
        Create your product
      </h1>
      <div className="border p-8 rounded-sm">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 my-4 md:grid-cols-2">
            <FormInput name="name" type="text" label="Product name" />
            <FormInput name="company" type="text" label="Company name" />
            <PriceInput />
            <ImageInput />
          </div>
          <TextareaInput />
          <CheckboxInput name="isFeatured" label="Featured" />
          <FormButton text="Create" className="mt-8" />
        </FormContainer>
      </div>
    </>
  );
}
