import styled from 'styled-components';
import { colors, letterSpacing, fontSize, fontWeight } from '../../styles/tokens';
import { Input } from '../atoms/Input';

interface FormFieldProps {
  label: string;
  icon?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Label = styled.span`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.bold};
  letter-spacing: ${letterSpacing.labelSm};
  text-transform: uppercase;
  color: ${colors.violet500};
`;

export function FormField({
  label,
  icon,
  value,
  onChange,
  type = 'text',
  placeholder,
}: FormFieldProps) {
  return (
    <FormFieldWrapper>
      <Label>{label}</Label>
      <Input
        icon={icon}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </FormFieldWrapper>
  );
}
