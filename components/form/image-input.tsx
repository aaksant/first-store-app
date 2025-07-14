import FormInput from './form-input';

export default function ImageInput() {
  return <FormInput name="image" type="file" label="image" accept="image/**" />;
}
