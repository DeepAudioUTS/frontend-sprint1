import { useState } from 'react';
import styled from 'styled-components';
import { colors, glass, letterSpacing, fontSize, fontWeight } from '../../styles/tokens';
import { GlassCard } from '../atoms/GlassCard';
import { Button } from '../atoms/Button';
import { ThemeTag } from '../molecules/ThemeTag';

const THEME_SUGGESTIONS = [
  '🚀 Space',
  '🦊 Forest',
  '🏰 Magic Castle',
  '🐠 Ocean',
  '🦕 Dinosaurs',
];

interface StoryFormProps {
  onGenerate: (theme: string) => Promise<void>;
  loading?: boolean;
}

const SectionLabel = styled.p`
  font-size: ${fontSize.xxs};
  font-weight: ${fontWeight.bold};
  letter-spacing: ${letterSpacing.label};
  text-transform: uppercase;
  color: ${colors.violet500};
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: ${fontSize.xl3};
  font-weight: ${fontWeight.black};
  color: ${colors.textPrimary};
  letter-spacing: ${letterSpacing.tight};
  line-height: 1.25;
  margin-bottom: 1.25rem;
`;

const FormCard = styled(GlassCard)`
  padding: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08);
`;

const ThemeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 65px;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  margin-bottom: 1rem;
  background: ${glass.darkBg};
  border: 1px solid ${glass.border};
`;

const InputIcon = styled.span`
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const ThemeInput = styled.input`
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

const ClearButton = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.xxs};
  color: ${colors.textMuted};
  flex-shrink: 0;
  cursor: pointer;
  background: ${glass.bgMedium};
`;

const TagsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  margin-bottom: 1rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export function StoryForm({ onGenerate, loading }: StoryFormProps) {
  const [theme, setTheme] = useState('');

  const handleTagClick = (tag: string) => {
    const keyword = tag.replace(/^[\S]+\s/, '');
    setTheme(keyword);
  };

  const handleSubmit = () => {
    if (theme.trim()) onGenerate(theme.trim());
  };

  return (
    <div>
      <SectionLabel>✦ Tonight's Story</SectionLabel>
      <SectionTitle>
        What's the
        <br />
        <span>story about?</span>
      </SectionTitle>

      <FormCard>
        <ThemeInputWrapper>
          <InputIcon>🔭</InputIcon>
          <ThemeInput
            placeholder="A brave astronaut exploring a hidden planet…"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          {theme && (
            <ClearButton onClick={() => setTheme('')}>
              ✕
            </ClearButton>
          )}
        </ThemeInputWrapper>

        <TagsRow>
          {THEME_SUGGESTIONS.map((tag) => (
            <ThemeTag key={tag} label={tag} onClick={() => handleTagClick(tag)} />
          ))}
        </TagsRow>

        <Button onClick={handleSubmit} loading={loading} disabled={!theme.trim()}>
          ✨ Generate Story
        </Button>
      </FormCard>
    </div>
  );
}
