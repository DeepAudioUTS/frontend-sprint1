import React from 'react';
import styled, { css } from 'styled-components';
import { colors, glass, violetA, greenA, fontSize, fontWeight, radius } from '../../styles/tokens';

type BadgeVariant = 'step' | 'success' | 'theme';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, ReturnType<typeof css>> = {
  step: css`
    background: ${violetA.a15};
    border: 1px solid ${violetA.a25};
    color: ${colors.violet400};
  `,
  success: css`
    background: ${greenA.a12};
    border: 1px solid ${greenA.a25};
    color: ${colors.green};
  `,
  theme: css`
    background: ${glass.bgDim};
    border: 1px solid ${glass.border};
    color: ${colors.textMuted};
  `,
};

const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 0 0.75rem;
  height: 24px;
  border-radius: ${radius.pill};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.bold};
  white-space: nowrap;
  ${({ $variant }) => variantStyles[$variant]}
`;

export function Badge({ children, variant = 'step' }: BadgeProps) {
  return <StyledBadge $variant={variant}>{children}</StyledBadge>;
}
