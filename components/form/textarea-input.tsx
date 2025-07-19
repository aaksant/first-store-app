import { Textarea } from '../ui/textarea';
import FormInput from './form-input';

export default function TextareaInput({
  defaultValue
}: {
  defaultValue?: string;
}) {
  return (
    <FormInput
      name="description"
      type="text"
      label="description"
      placeholder="Enter your product description"
      as={Textarea}
      defaultValue={defaultValue}
    />
  );
}
