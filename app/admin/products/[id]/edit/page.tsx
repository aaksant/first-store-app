import CheckboxInput from '@/components/form/checkbox-input';
import FormButton from '@/components/form/form-button';
import FormContainer from '@/components/form/form-container';
import FormInput from '@/components/form/form-input';
import ImageInput from '@/components/form/image-input';
import PriceInput from '@/components/form/price-input';
import TextareaInput from '@/components/form/textarea-input';
import { getAdminProductDetail, updateProductAction } from '@/db/actions';

export default async function EditPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { name, company, price, featured, description, image } =
    await getAdminProductDetail(id);

  return (
    <>
      <h1 className="text-xl font-semibold tracking-tight mb-8">
        Edit your product
      </h1>
      <div className="border p-8 rounded-sm">
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 my-4 md:grid-cols-2">
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="imagePath" value={image} />
            <FormInput
              name="name"
              type="text"
              label="Product name"
              defaultValue={name}
            />
            <FormInput
              name="company"
              type="text"
              label="Company name"
              defaultValue={company}
            />
            <PriceInput defaultValue={price} />
            <ImageInput defaultImage={image} />
          </div>
          <TextareaInput name="description" defaultValue={description} />
          <CheckboxInput
            name="featured"
            label="Featured"
            defaultChecked={featured}
          />
          <FormButton text="Update" className="mt-8" />
        </FormContainer>
      </div>
    </>
  );
}
