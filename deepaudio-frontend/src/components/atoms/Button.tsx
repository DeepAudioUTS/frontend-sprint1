import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { colors, gradients, glass, shadows, transition, fontSize, fontWeight, letterSpacing } from '../../styles/tokens';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const sizeStyles: Record<Size, ReturnType<typeof css>> = {
  sm: css`
    height: 2rem;
    padding: 0 1rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
  `,
  md: css`
    height: 3rem;
    padding: 0 1.5rem;
    font-size: ${fontSize.base};
    border-radius: 1rem;
  `,
  lg: css`
    height: 3.5rem;
    padding: 0 2rem;
    font-size: 1rem;
    border-radius: 1rem;
  `,
};

const variantStyles: Record<Variant, ReturnType<typeof css>> = {
  primary: css`
    background: ${gradients.primary};
    box-shadow: ${shadows.primaryButton}, inset 0 1px 0 rgba(255, 255, 255, 0.15);
    color: ${colors.white};
    border: none;
  `,
  secondary: css`
    background: ${glass.bgDim};
    border: 1px solid ${glass.border};
    color: ${colors.textSecondary};
  `,
  ghost: css`
    background: transparent;
    color: ${colors.violet500};
    border: none;
  `,
};

const StyledButton = styled.button<{ $variant: Variant; $size: Size }>`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${fontWeight.bold};
  letter-spacing: ${letterSpacing.tight};
  transition: opacity ${transition.default};
  cursor: pointer;
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const SpinnerRing = styled.span`
  margin-right: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid ${glass.alpha30};
  border-top-color: ${colors.white};
  display: inline-block;
  animation: ${spin} ${transition.spinDuration} linear infinite;
`;

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} $size={size} disabled={disabled || loading} {...props}>
      {loading && <SpinnerRing />}
      {children}
    </StyledButton>
  );
}
