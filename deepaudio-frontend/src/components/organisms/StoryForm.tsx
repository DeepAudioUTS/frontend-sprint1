import { useState } from 'react';
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

export function StoryForm({ onGenerate, loading }: StoryFormProps) {
  const [theme, setTheme] = useState('');

  const handleTagClick = (tag: string) => {
    // Extract theme keyword without the emoji prefix
    const keyword = tag.replace(/^[\S]+\s/, '');
    setTheme(keyword);
  };

  const handleSubmit = () => {
    if (theme.trim()) onGenerate(theme.trim());
  };

  return (
    <div>
      <p className="text-[10px] font-bold tracking-[1.2px] uppercase text-[#8b5cf6] mb-3">
        ✦ Tonight's Story
      </p>
      <h2 className="text-[26px] font-black text-[#f1f5ff] tracking-tight leading-tight mb-5">
        What's the
        <br />
        <span>story about?</span>
      </h2>

      <GlassCard className="p-[18px]">
        {/* Theme text input */}
        <div
          className="flex items-center gap-3 min-h-[65px] px-4 py-3 rounded-2xl mb-4"
          style={{
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span className="text-xl shrink-0">🔭</span>
          <input
            className="flex-1 bg-transparent outline-none text-[14px] font-medium text-[#f1f5ff] placeholder:text-[#64748b]"
            placeholder="A brave astronaut exploring a hidden planet…"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          {theme && (
            <button
              type="button"
              onClick={() => setTheme('')}
              className="size-5 rounded-[10px] flex items-center justify-center text-[10px] text-[#64748b] shrink-0"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Theme suggestion tags */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-4">
          {THEME_SUGGESTIONS.map((tag) => (
            <ThemeTag key={tag} label={tag} onClick={() => handleTagClick(tag)} />
          ))}
        </div>

        {/* Generate button */}
        <Button onClick={handleSubmit} loading={loading} disabled={!theme.trim()}>
          ✨ Generate Story
        </Button>
      </GlassCard>
    </div>
  );
}
