import { ElementType, HTMLInputTypeAttribute } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type FormInputProps = {
  name: string;
  type: HTMLInputTypeAttribute;
  label?: string;
  defaultValue?: string | number;
  placeholder?: string;
  accept?: string;
  isCheckbox?: boolean;
  as?: ElementType;
  className?: string;
};

export default function FormInput({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  accept,
  as: Component = Input,
  isCheckbox = false,
  className
}: FormInputProps) {
  return (
    <div
      className={`mb-6 w-full ${isCheckbox ? 'flex items-center gap-x-2' : ''}`}
    >
      <Label
        htmlFor={name}
        className={`capitalize mb-2 ${
          isCheckbox
            ? 'text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            : ''
        }`}
      >
        {label || name}
      </Label>
      <Component
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        accept={accept}
        required
        className={className}
      />
    </div>
  );
}
