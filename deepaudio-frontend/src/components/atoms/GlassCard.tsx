import React from 'react';
import styled from 'styled-components';
import { glass, shadows } from '../../styles/tokens';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  borderRadius?: number | string;
}

const StyledCard = styled.div<{ $borderRadius: string }>`
  position: relative;
  border-radius: ${({ $borderRadius }) => $borderRadius};
  background: ${glass.bg};
  border: 1px solid ${glass.borderStrong};
  box-shadow: ${shadows.card};
`;

export function GlassCard({
  children,
  className,
  style,
  borderRadius = 22,
}: GlassCardProps) {
  const radius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
  return (
    <StyledCard $borderRadius={radius} className={className} style={style}>
      {children}
    </StyledCard>
  );
}
