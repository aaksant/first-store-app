import { Checkbox } from '../ui/checkbox';

type CheckboxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

export default function CheckboxInput({
  name,
  label,
  defaultChecked = false
}: CheckboxInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={name}
        name={name}
        defaultChecked={defaultChecked}
        className="border-primary"
      />
      <label
        htmlFor={name}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
      >
        {label}
      </label>
    </div>
  );
}
