import styled from 'styled-components';
import { colors, glass, letterSpacing, fontSize, fontWeight, radius } from '../../styles/tokens';
import { Spinner } from '../atoms/Spinner';
import { StepItem } from '../molecules/StepItem';

type GenType = 'draft' | 'story';

interface GeneratingProgressProps {
  type: GenType;
  theme?: string;
}

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;

const ThemeChip = styled.span`
  display: inline-flex;
  align-items: center;
  height: 29px;
  padding: 0 1rem;
  border-radius: ${radius.pill};
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold};
  color: ${colors.textSecondary};
  margin-bottom: 2.5rem;
  background: ${glass.bg};
  border: 1px solid ${glass.borderStrong};
`;

const SpinnerWrapper = styled.div`
  margin-bottom: 2rem;
`;

const TextCenter = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ProgressTitle = styled.h2`
  font-size: ${fontSize.xl2};
  font-weight: ${fontWeight.black};
  color: ${colors.textPrimary};
  letter-spacing: ${letterSpacing.tight};
  line-height: 1.25;
  margin-bottom: 0.5rem;
`;

const ProgressSubtitle = styled.p`
  font-size: ${fontSize.md};
  color: ${colors.textMuted};
  line-height: 1.625;
`;

const StepsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterText = styled.p`
  font-size: ${fontSize.sm};
  color: ${colors.textSubtle};
  text-align: center;
  margin-top: 1.5rem;
`;

export function GeneratingProgress({ type, theme }: GeneratingProgressProps) {
  const isDraft = type === 'draft';

  return (
    <ProgressContainer>
      {theme && <ThemeChip>🔭 {theme}</ThemeChip>}

      <SpinnerWrapper>
        <Spinner size={140} emoji={isDraft ? '✍️' : '🌌'} />
      </SpinnerWrapper>

      <TextCenter>
        <ProgressTitle>
          {isDraft ? (
            <>
              Drafting your
              <br />
              story outline…
            </>
          ) : (
            <>
              Writing your
              <br />
              bedtime story…
            </>
          )}
        </ProgressTitle>
        <ProgressSubtitle>
          {isDraft ? (
            <>
              Hang tight — this only takes
              <br />a few seconds.
            </>
          ) : (
            <>
              This usually takes about 20–30 seconds.
              <br />
              We'll let you know when it's ready.
            </>
          )}
        </ProgressSubtitle>
      </TextCenter>

      <StepsContainer>
        {isDraft ? (
          <>
            <StepItem
              icon="✓"
              title="Theme received"
              subtitle={`${theme ?? 'Theme'} confirmed`}
              state="done"
            />
            <StepItem
              icon="🧠"
              title="Building story outline"
              subtitle="Characters, setting, plot…"
              state="active"
            />
            <StepItem
              icon="📖"
              title="Draft preview"
              subtitle="Ready after outline · waiting"
              state="waiting"
            />
          </>
        ) : (
          <>
            <StepItem
              icon="✓"
              title="Story outline"
              subtitle="Theme and characters confirmed"
              state="done"
            />
            <StepItem
              icon="✍️"
              title="Writing the story"
              subtitle="Crafting scenes and dialogue…"
              state="active"
            />
            <StepItem
              icon="🎙️"
              title="Generating voice"
              subtitle="AI narration · waiting"
              state="waiting"
            />
          </>
        )}
      </StepsContainer>

      <FooterText>
        {isDraft
          ? 'Almost there — your draft preview will appear shortly.'
          : "You can close this screen — we'll notify you when the story is ready."}
      </FooterText>
    </ProgressContainer>
  );
}
