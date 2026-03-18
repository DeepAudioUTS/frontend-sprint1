import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storiesApi } from '../api/stories';
import type { Story } from '../api/types';
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
      if (cancelled || !s) return;

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

      // Keep polling for all other states and abstract_ready with no abstracts yet
      if (!cancelled) timer = setTimeout(poll, POLL_INTERVAL);
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
      // 2. Trigger story + audio generation
      await storiesApi.generateStory(id);
      // 3. Refresh story state
      await fetchStory();
      // 4. Restart polling loop for generating_text → generating_audio → completed
      setPollTrigger((k) => k + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setSelecting(false);
    }
  };

  const handleRegenerate = () => navigate('/');

  // ── Loading state ────────────────────────────
  if (!story) {
    return (
      <StoryLayout>
        <div className="flex items-center justify-center h-64">
          <div
            className="size-10 rounded-full border-2 animate-spin"
            style={{ borderColor: 'rgba(124,58,237,0.3)', borderTopColor: '#7c3aed' }}
          />
        </div>
      </StoryLayout>
    );
  }

  // ── State 4: completed → Story Player ────────
  if (story.status === 'completed') {
    return (
      <StoryLayout showMore>
        {/* Hero image / emoji */}
        <div className="flex flex-col items-center mb-6 pt-2">
          <div
            className="size-[180px] rounded-[90px] flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, #1e3a6e, #0f2447)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <span className="text-[80px]">🚀</span>
          </div>
          <span
            className="inline-flex items-center h-[26px] px-3 rounded-full text-[11px] font-semibold text-[#64748b]"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            🌌 {story.theme}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-black text-[#f1f5ff] tracking-tight text-center leading-tight mb-4">
          {story.title}
        </h1>

        {/* Abstract */}
        <p className="text-[13px] text-center text-[#94a3b8] leading-[22px] mb-4">
          {story.abstract}
        </p>

        {/* Meta tags */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span
            className="h-7 px-3 flex items-center rounded-full text-[11px] font-semibold text-[#f1f5ff]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            ⏱ 8 min
          </span>
          <span
            className="h-7 px-3 flex items-center rounded-full text-[11px] font-semibold text-[#f1f5ff]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            😊 Heartwarming
          </span>
        </div>

        {/* Audio player */}
        <AudioPlayer story={story} />
      </StoryLayout>
    );
  }

  // ── State 2: abstract_ready → Story Draft ────
  if (story.status === 'abstract_ready' && abstracts.length > 0) {
    return (
      <StoryLayout title="Story Draft" step="Step 2 of 3">
        {/* Ready indicator */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="size-2 rounded-full bg-[#34d399]"
            style={{ boxShadow: '0 0 8px rgba(52,211,153,0.6)' }}
          />
          <span className="text-[12px] font-semibold text-[#34d399] tracking-[0.24px]">
            AI-generated · Ready to read
          </span>
        </div>

        {/* Header */}
        <p className="text-[10px] font-bold tracking-[1px] uppercase text-[#8b5cf6] mb-1">
          ✦ Tonight's Story
        </p>
        <h2 className="text-[26px] font-black text-[#f1f5ff] tracking-tight leading-tight mb-2">
          {story.title ?? story.theme}
        </h2>
        <span
          className="inline-flex items-center h-6 px-3 rounded-full text-[11px] font-semibold text-[#64748b] mb-5"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          🔭 {story.theme}
        </span>

        {/* Choose a story header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📖</span>
            <span className="text-[11px] font-bold tracking-[0.66px] uppercase text-[#64748b]">
              Choose a Story
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#a78bfa]">
            {abstracts.length} versions
          </span>
        </div>

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
      <GeneratingProgress type="story" theme={story.theme} />
    </StoryLayout>
  );
}
