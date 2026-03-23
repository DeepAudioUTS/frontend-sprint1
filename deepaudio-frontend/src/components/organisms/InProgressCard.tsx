import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import type { InProgressStory, StoryStatus } from '../../api/types';
import { colors, gradients, glass, violetA, letterSpacing, transition, fontSize, fontWeight, radius } from '../../styles/tokens';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

interface ProgressInfo {
  step: number;
  progress: number;
  steps: [string, string, string];
  activeStep: number;
}

function getProgressInfo(status: StoryStatus): ProgressInfo {
  switch (status) {
    case 'generating_abstract':
      return { step: 1, progress: 33, steps: ['✓ Theme', '✦ Draft', 'Story'], activeStep: 1 };
    case 'abstract_ready':
      return { step: 2, progress: 66, steps: ['✓ Theme', '✦ Draft', 'Story'], activeStep: 1 };
    case 'generating_text':
    case 'generating_audio':
      return { step: 3, progress: 85, steps: ['✓ Theme', '✓ Draft', '✦ Story'], activeStep: 2 };
    default:
      return { step: 3, progress: 100, steps: ['✓ Theme', '✓ Draft', '✓ Story'], activeStep: -1 };
  }
}

interface InProgressCardProps {
  draft: InProgressStory;
}

const CardContainer = styled.div`
  overflow: hidden;
  border-radius: ${radius.xl};
  background: ${glass.bg};
  border: 1px solid ${violetA.a35};
  box-shadow:
    0 0 0 1px ${violetA.a15},
    0 8px 32px ${glass.darkShadow};
`;

const CardInner = styled.div`
  padding: 18px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${colors.violet400};
  box-shadow: 0 0 0 5px rgba(167, 139, 250, 0.15);
`;

const StatusText = styled.span`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.violet400};
  letter-spacing: 0.2px;
`;

const CardTitle = styled.h3`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.black};
  color: ${colors.textPrimary};
  letter-spacing: ${letterSpacing.tight};
  line-height: 1.25;
  margin-bottom: 0.5rem;
`;


const ProgressSection = styled.div`
  margin-bottom: 1rem;
`;

const ProgressLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const ProgressLabel = styled.span`
  font-size: ${fontSize.xxs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.textMuted};
  letter-spacing: 0.3px;
`;

const ProgressValue = styled.span`
  font-size: ${fontSize.xxs};
  font-weight: ${fontWeight.bold};
  color: ${colors.violet400};
`;

const ProgressTrack = styled.div`
  height: 4px;
  border-radius: ${radius.pill};
  overflow: hidden;
  background: ${glass.bgMedium};
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  border-radius: ${radius.pill};
  transition: width ${transition.slow};
  width: ${({ $progress }) => $progress}%;
  background: ${gradients.progressIndigo};
`;

const StepChips = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StepChip = styled.div<{ $isDone: boolean; $isActive: boolean }>`
  flex: 1;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-size: ${fontSize.xxs};
  font-weight: ${fontWeight.bold};
  ${({ $isDone, $isActive }) =>
    $isDone
      ? css`
          background: ${violetA.a20};
          color: ${colors.violet400};
        `
      : $isActive
        ? css`
            background: ${violetA.a35};
            border: 1px solid ${violetA.a50};
            color: ${colors.violet200};
          `
        : css`
            background: ${glass.bgFaint};
            color: ${colors.textFaint};
          `}
`;

export function InProgressCard({ draft }: InProgressCardProps) {
  const navigate = useNavigate();
  const { step, progress, steps, activeStep } = getProgressInfo(draft.status);

  return (
    <CardContainer>
      <CardInner>
        <CardHeader>
          <StatusIndicator>
            <StatusDot />
            <StatusText>Story creation in progress</StatusText>
          </StatusIndicator>
          <Badge>Step {step} of 3</Badge>
        </CardHeader>

        <CardTitle>Story in progress</CardTitle>

        <ProgressSection>
          <ProgressLabelRow>
            <ProgressLabel>Progress</ProgressLabel>
            <ProgressValue>{progress}%</ProgressValue>
          </ProgressLabelRow>
          <ProgressTrack>
            <ProgressFill $progress={progress} />
          </ProgressTrack>
        </ProgressSection>

        <StepChips>
          {steps.map((label, i) => {
            const isDone = label.startsWith('✓');
            const isActive = i === activeStep && !isDone;
            return (
              <StepChip key={i} $isDone={isDone} $isActive={isActive}>
                {label}
              </StepChip>
            );
          })}
        </StepChips>

        <Button onClick={() => navigate(`/story/${draft.draft_id}`)}>
          ▶ Continue Creating
        </Button>
      </CardInner>
    </CardContainer>
  );
}
