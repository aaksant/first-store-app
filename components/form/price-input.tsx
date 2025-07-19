import FormInput from './form-input';

export default function PriceInput({
  defaultValue = 100
}: {
  defaultValue?: number;
}) {
  return (
    <FormInput
      name="price"
      type="number"
      defaultValue={defaultValue}
      label="price (USD)"
    />
  );
}
