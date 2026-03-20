import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { storiesApi } from '../api/stories';
import type { Story } from '../api/types';
import { colors, gradients, glass, violetGlow, shadows, letterSpacing, transition, fontSize, fontWeight, radius } from '../styles/tokens';
import { StoryLayout } from '../components/templates/StoryLayout';
import { GeneratingProgress } from '../components/organisms/GeneratingProgress';
import { AbstractList } from '../components/organisms/AbstractList';
import { AudioPlayer } from '../components/organisms/AudioPlayer';

// ──────────────────────────────────────────
// Story detail page — 4 states based on API status
//
//  generating_abstract  → GeneratingDraft (Step 1 of 3)
//  abstract_ready       → AbstractSelection (Step 2 of 3)
//  generating_text
//  generating_audio     → GeneratingStory (Step 3 of 3)
//  completed            → StoryPlayer
// ──────────────────────────────────────────

const POLL_INTERVAL = 3000;
const POLL_INTERVAL_FAST = 1000;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// ── Loading state ──────────────────────────

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16rem;
`;

const LoadingSpinner = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid ${violetGlow.a30};
  border-top-color: ${colors.violet600};
  animation: ${spin} ${transition.spinDuration} linear infinite;
`;

// ── Completed state ────────────────────────

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-top: 0.5rem;
`;

const HeroCircle = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 80px;
  background: ${gradients.space};
  border: 1px solid ${glass.border};
  box-shadow: ${shadows.hero};
`;

const ThemeChip = styled.span`
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 0.75rem;
  border-radius: ${radius.pill};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.textMuted};
  background: ${glass.bgDim};
  border: 1px solid ${glass.border};
`;

const StoryTitle = styled.h1`
  font-size: ${fontSize.xl4};
  font-weight: ${fontWeight.black};
  color: ${colors.textPrimary};
  letter-spacing: ${letterSpacing.tight};
  text-align: center;
  line-height: 1.25;
  margin-bottom: 1rem;
`;

const StoryAbstract = styled.p`
  font-size: ${fontSize.md};
  text-align: center;
  color: ${colors.textSecondary};
  line-height: 22px;
  margin-bottom: 1rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const MetaTag = styled.span`
  height: 1.75rem;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  border-radius: ${radius.pill};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.textPrimary};
  background: ${glass.bgFaint};
  border: 1px solid ${glass.bgMedium};
`;

// ── Abstract ready state ───────────────────

const ReadyIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ReadyDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${colors.green};
  box-shadow: ${shadows.readyDot};
`;

const ReadyText = styled.span`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold};
  color: ${colors.green};
  letter-spacing: 0.24px;
`;

const SectionLabel = styled.p`
  font-size: ${fontSize.xxs};
  font-weight: ${fontWeight.bold};
  letter-spacing: ${letterSpacing.label};
  text-transform: uppercase;
  color: ${colors.violet500};
  margin-bottom: 0.25rem;
`;

const StoryHeading = styled.h2`
  font-size: ${fontSize.xl3};
  font-weight: ${fontWeight.black};
  color: ${colors.textPrimary};
  letter-spacing: ${letterSpacing.tight};
  line-height: 1.25;
  margin-bottom: 0.5rem;
`;

const AbstractThemeChip = styled(ThemeChip)`
  height: 24px;
  margin-bottom: 1.25rem;
`;

const ChooseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ChooseLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChooseIcon = styled.span`
  font-size: 1.125rem;
`;

const ChooseLabel = styled.span`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.66px;
  text-transform: uppercase;
  color: ${colors.textMuted};
`;

const VersionCount = styled.span`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.violet400};
`;

export function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [story, setStory] = useState<Story | null>(null);
  const [abstracts, setAbstracts] = useState<string[]>([]);
  const [selecting, setSelecting] = useState(false);
  const [pollTrigger, setPollTrigger] = useState(0);

  const fetchStory = useCallback(async (): Promise<Story | null> => {
    if (!id) return null;
    try {
      const s = await storiesApi.getById(id);
      setStory(s);
      return s;
    } catch {
      return null;
    }
  }, [id]);

  // Unified polling effect — restarts when pollTrigger increments (after abstract selection)
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const poll = async () => {
      const s = await fetchStory();
      if (cancelled) return;
      if (!s) {
        // Retry on transient error rather than stopping permanently
        if (!cancelled) timer = setTimeout(poll, POLL_INTERVAL);
        return;
      }

      if (s.status === 'completed') return;

      if (s.status === 'abstract_ready') {
        try {
          const abs = await storiesApi.getAbstracts(id);
          if (abs && !cancelled) {
            setAbstracts(abs);
            return; // Stop polling — wait for user selection
          }
        } catch {
          // fall through to retry
        }
      }

      // generating_text: poll fast (1s) to detect voice generation start quickly
      const interval = s.status === 'generating_text' ? POLL_INTERVAL_FAST : POLL_INTERVAL;
      if (!cancelled) timer = setTimeout(poll, interval);
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [id, fetchStory, pollTrigger]);

  // ── Abstract selection handler ──────────────
  const handleSelectAbstract = async (abstract: string) => {
    if (!id) return;
    setSelecting(true);
    try {
      // 1. Store selected abstract → status: generating_text
      await storiesApi.selectAbstract(id, { abstract });
    } catch (e) {
      console.error(e);
      setSelecting(false);
      return;
    }
    try {
      // 2. Trigger story + audio generation (best-effort — backend may auto-start)
      await storiesApi.generateStory(id);
    } catch (e) {
      console.error('generateStory failed, continuing anyway:', e);
    }
    // 3. Refresh story state and restart polling regardless of generateStory result
    await fetchStory();
    setPollTrigger((k) => k + 1);
    setSelecting(false);
  };

  const handleRegenerate = async () => {
    if (!id) return;
    try {
      await storiesApi.delete(id);
    } catch (e) {
      console.error(e);
    }
    navigate('/');
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await storiesApi.delete(id);
    } catch (e) {
      console.error(e);
    }
    navigate('/');
  };

  // ── Loading state ────────────────────────────
  if (!story) {
    return (
      <StoryLayout>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </StoryLayout>
    );
  }

  // ── State 4: completed → Story Player ────────
  if (story.status === 'completed') {
    return (
      <StoryLayout showMore onDelete={handleDelete}>
        <HeroSection>
          <HeroCircle>📖</HeroCircle>
          <ThemeChip>🌌 {story.theme}</ThemeChip>
        </HeroSection>

        <StoryTitle>{story.title}</StoryTitle>
        <StoryAbstract>{story.abstract}</StoryAbstract>

        <MetaRow>
          <MetaTag>⏱ 8 min</MetaTag>
          <MetaTag>😊 Heartwarming</MetaTag>
        </MetaRow>

        <AudioPlayer story={story} />
      </StoryLayout>
    );
  }

  // ── State 2: abstract_ready → Story Draft ────
  if (story.status === 'abstract_ready' && abstracts.length > 0) {
    return (
      <StoryLayout title="Story Draft" step="Step 2 of 3">
        <ReadyIndicator>
          <ReadyDot />
          <ReadyText>AI-generated · Ready to read</ReadyText>
        </ReadyIndicator>

        <SectionLabel>✦ Tonight's Story</SectionLabel>
        <StoryHeading>{story.title ?? story.theme}</StoryHeading>
        <AbstractThemeChip>🔭 {story.theme}</AbstractThemeChip>

        <ChooseHeader>
          <ChooseLeft>
            <ChooseIcon>📖</ChooseIcon>
            <ChooseLabel>Choose a Story</ChooseLabel>
          </ChooseLeft>
          <VersionCount>{abstracts.length} versions</VersionCount>
        </ChooseHeader>

        <AbstractList
          abstracts={abstracts}
          onSelect={handleSelectAbstract}
          onRegenerate={handleRegenerate}
          loading={selecting}
        />
      </StoryLayout>
    );
  }

  // ── State 1: generating_abstract → Creating Draft ──
  if (story.status === 'generating_abstract') {
    return (
      <StoryLayout title="Creating Draft" step="Step 1 of 3">
        <GeneratingProgress type="draft" theme={story.theme} />
      </StoryLayout>
    );
  }

  // ── State 3: generating_text | generating_audio → Creating Story ──
  return (
    <StoryLayout title="Creating Story" step="Step 3 of 3">
      <GeneratingProgress
        type="story"
        theme={story.theme}
        status={story.status as 'generating_text' | 'generating_audio'}
      />
    </StoryLayout>
  );
}
