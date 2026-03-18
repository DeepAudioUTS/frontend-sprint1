import { Input } from '../atoms/Input';

interface FormFieldProps {
  label: string;
  icon?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

export function FormField({
  label,
  icon,
  value,
  onChange,
  type = 'text',
  placeholder,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] font-bold tracking-[0.88px] uppercase text-[#8b5cf6]">
        {label}
      </span>
      <Input
        icon={icon}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
