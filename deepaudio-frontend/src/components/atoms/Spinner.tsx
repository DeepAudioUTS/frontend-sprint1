import styled, { keyframes } from 'styled-components';
import { gradients, violetGlow, glass } from '../../styles/tokens';

interface SpinnerProps {
  size?: number;
  emoji?: string;
}

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const SpinnerWrapper = styled.div<{ $size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: ${gradients.cardDeep};
  border: 1px solid ${violetGlow.a30};
  box-shadow:
    0 0 60px ${violetGlow.a25},
    0 20px 50px ${glass.darkHeavy};
`;

const EmojiSpan = styled.span<{ $fontSize: number }>`
  font-size: ${({ $fontSize }) => $fontSize}px;
  line-height: 1;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export function Spinner({ size = 140, emoji = '✨' }: SpinnerProps) {
  return (
    <SpinnerWrapper $size={size}>
      <EmojiSpan $fontSize={Math.round(size * 0.41)}>{emoji}</EmojiSpan>
    </SpinnerWrapper>
  );
}
