import type { Story } from '../../api/types';

const THEME_EMOJI: Record<string, string> = {
  space: '🚀',
  forest: '🦊',
  ocean: '🐠',
  castle: '🏰',
  dinosaur: '🦕',
  default: '📖',
};

const THEME_GRADIENT: Record<string, string> = {
  space: 'linear-gradient(135deg, #1e3a6e, #0f2447)',
  forest: 'linear-gradient(135deg, #064e3b, #065f46)',
  ocean: 'linear-gradient(135deg, #0c4a6e, #075985)',
  castle: 'linear-gradient(135deg, #4c1d95, #3730a3)',
  dinosaur: 'linear-gradient(135deg, #14532d, #166534)',
  default: 'linear-gradient(135deg, #1e2d5e, #0d1835)',
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

export function StoryCard({ story, onClick }: StoryCardProps) {
  const key = getThemeKey(story.theme);

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-[14px] rounded-2xl text-left transition-opacity hover:opacity-80 cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <div
        className="shrink-0 size-11 rounded-[10px] flex items-center justify-center text-2xl"
        style={{ background: THEME_GRADIENT[key] }}
      >
        {THEME_EMOJI[key]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-[#f1f5ff] truncate">
          {story.title ?? story.theme}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[11px] text-[#64748b]">{timeAgo(story.created_at)}</span>
          <span className="size-[3px] rounded-full bg-[#64748b]" />
          <span className="text-[11px] text-[#64748b]">Completed</span>
        </div>
      </div>
    </button>
  );
}
