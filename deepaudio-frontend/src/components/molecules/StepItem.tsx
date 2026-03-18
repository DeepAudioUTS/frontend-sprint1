import styled, { css, keyframes } from 'styled-components';
import { colors, glass, violetGlow, greenA, transition, fontSize, fontWeight } from '../../styles/tokens';

type StepState = 'done' | 'active' | 'waiting';

interface StepItemProps {
  icon: string;
  title: string;
  subtitle: string;
  state: StepState;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 57px;
  padding: 0 1rem;
  border-radius: 1rem;
  background: ${glass.bgFaint};
  border: 1px solid ${glass.bg};
`;

const iconStateStyles: Record<StepState, ReturnType<typeof css>> = {
  done: css`
    background: ${greenA.a12};
    border: 1px solid ${greenA.a25};
  `,
  active: css`
    background: ${violetGlow.a15};
    border: 1px solid ${violetGlow.a30};
  `,
  waiting: css`
    background: ${glass.bgFaint};
    border: 1px solid ${glass.bgMedium};
  `,
};

const StepIcon = styled.div<{ $state: StepState }>`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  ${({ $state }) => iconStateStyles[$state]}
`;

const StepContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const StepTitle = styled.p<{ $state: StepState }>`
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.bold};
  color: ${({ $state }) => ($state === 'waiting' ? colors.textMuted : colors.textPrimary)};
`;

const StepSubtitle = styled.p`
  font-size: ${fontSize.xs};
  color: ${colors.textMuted};
  margin-top: 1px;
`;

const StepStatus = styled.div`
  flex-shrink: 0;
`;

const DoneText = styled.span`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.bold};
  color: ${colors.green};
`;

const ActiveSpinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid ${violetGlow.a20};
  border-top-color: ${colors.violet600};
  animation: ${spin} ${transition.spinDuration} linear infinite;
`;

const WaitingText = styled.span`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.textSubtle};
`;

export function StepItem({ icon, title, subtitle, state }: StepItemProps) {
  return (
    <StepWrapper>
      <StepIcon $state={state}>{state === 'done' ? '✓' : icon}</StepIcon>
      <StepContent>
        <StepTitle $state={state}>{title}</StepTitle>
        <StepSubtitle>{subtitle}</StepSubtitle>
      </StepContent>
      <StepStatus>
        {state === 'done' && <DoneText>Done</DoneText>}
        {state === 'active' && <ActiveSpinner />}
        {state === 'waiting' && <WaitingText>—</WaitingText>}
      </StepStatus>
    </StepWrapper>
  );
}
