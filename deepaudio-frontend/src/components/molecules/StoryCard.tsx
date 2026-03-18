import styled from 'styled-components';
import type { Story } from '../../api/types';
import { colors, gradients, glass, fontSize, fontWeight, transition } from '../../styles/tokens';

const THEME_EMOJI: Record<string, string> = {
  space: '🚀',
  forest: '🦊',
  ocean: '🐠',
  castle: '🏰',
  dinosaur: '🦕',
  default: '📖',
};

const THEME_GRADIENT: Record<string, string> = {
  space: gradients.space,
  forest: gradients.forest,
  ocean: gradients.ocean,
  castle: gradients.castle,
  dinosaur: gradients.dinosaur,
  default: gradients.cardDeep,
};

function getThemeKey(theme: string): string {
  const t = theme.toLowerCase();
  if (t.includes('space') || t.includes('astro') || t.includes('planet')) return 'space';
  if (t.includes('forest') || t.includes('fox') || t.includes('tree')) return 'forest';
  if (t.includes('ocean') || t.includes('sea') || t.includes('fish')) return 'ocean';
  if (t.includes('castle') || t.includes('magic') || t.includes('dragon')) return 'castle';
  if (t.includes('dino')) return 'dinosaur';
  return 'default';
}

function timeAgo(dateStr: string): string {
  const diffSec = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diffSec < 86400) return 'Today';
  if (diffSec < 172800) return 'Yesterday';
  return `${Math.floor(diffSec / 86400)} days ago`;
}

interface StoryCardProps {
  story: Story;
  onClick?: () => void;
}

const CardButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 14px 1rem;
  border-radius: 1rem;
  text-align: left;
  transition: opacity ${transition.default};
  cursor: pointer;
  background: ${glass.bg};
  border: 1px solid ${glass.borderStrong};

  &:hover {
    opacity: 0.8;
  }
`;

const ThemeIcon = styled.div<{ $gradient: string }>`
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: ${({ $gradient }) => $gradient};
`;

const CardContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.p`
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

const MetaText = styled.span`
  font-size: ${fontSize.xs};
  color: ${colors.textMuted};
`;

const Dot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: ${colors.textMuted};
`;

export function StoryCard({ story, onClick }: StoryCardProps) {
  const key = getThemeKey(story.theme);
  return (
    <CardButton type="button" onClick={onClick}>
      <ThemeIcon $gradient={THEME_GRADIENT[key]}>{THEME_EMOJI[key]}</ThemeIcon>
      <CardContent>
        <CardTitle>{story.title ?? story.theme}</CardTitle>
        <MetaRow>
          <MetaText>{timeAgo(story.created_at)}</MetaText>
          <Dot />
          <MetaText>Completed</MetaText>
        </MetaRow>
      </CardContent>
    </CardButton>
  );
}
