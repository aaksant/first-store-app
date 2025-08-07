import { Textarea } from '../ui/textarea';
import FormInput from './form-input';

type TextareaInputProps = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
};

export default function TextareaInput({
  defaultValue,
  placeholder = 'Enter your product description',
  name,
  label
}: TextareaInputProps) {
  return (
    <FormInput
      name={name}
      type="text"
      label={label || name}
      placeholder={placeholder}
      as={Textarea}
      defaultValue={defaultValue}
    />
  );
}
