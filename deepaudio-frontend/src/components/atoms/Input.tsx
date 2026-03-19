import React from 'react';
import styled from 'styled-components';
import { colors, glass, fontSize, fontWeight } from '../../styles/tokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 52px;
  padding: 0 1rem;
  border-radius: 1rem;
  background: ${glass.darkBg};
  border: 1px solid ${glass.border};
`;

const IconSpan = styled.span`
  font-size: 1.125rem;
  flex-shrink: 0;
`;

const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  outline: none;
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.medium};
  color: ${colors.textPrimary};
  border: none;

  &::placeholder {
    color: ${colors.textMuted};
  }
`;

export function Input({
  icon,
  type,
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <InputWrapper>
      {icon && <IconSpan>{icon}</IconSpan>}
      <StyledInput type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </InputWrapper>
  );
}
