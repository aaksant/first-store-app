import FormInput from './form-input';

export default function PriceInput() {
  return (
    <FormInput
      name="price"
      type="number"
      defaultValue={100}
      label="price (USD)"
    />
  );
}
