import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storiesApi } from '../api/stories';
import { childrenApi } from '../api/children';
import type { Story, Child } from '../api/types';
import { AppLayout } from '../components/templates/AppLayout';
import { StoryForm } from '../components/organisms/StoryForm';
import { StoryList } from '../components/organisms/StoryList';
import { InProgressCard } from '../components/organisms/InProgressCard';
import { StreakBanner } from '../components/molecules/StreakBanner';

export function HomePage() {
  const navigate = useNavigate();
  const [completedStories, setCompletedStories] = useState<Story[]>([]);
  const [inProgressStory, setInProgressStory] = useState<Story | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [storiesRes, childrenRes] = await Promise.all([
          storiesApi.list(10, 0),
          childrenApi.list(),
        ]);

        setCompletedStories(storiesRes.items.filter((s) => s.status === 'completed'));
        setChildren(childrenRes);

        // Check for in-progress story
        try {
          const inProgress = await storiesApi.getInProgress();
          const story = await storiesApi.getById(inProgress.story_id);
          setInProgressStory(story);
        } catch {
          // No in-progress story (404)
          setInProgressStory(null);
        }
      } catch {
        // Auth error handled by client (redirect to /login)
      }
    };

    load();
  }, []);

  const handleGenerate = async (theme: string) => {
    if (children.length === 0) {
      alert('No child profile found. Please set up a child profile first.');
      return;
    }
    setGenerating(true);
    try {
      const story = await storiesApi.create({
        child_id: children[0].id,
        theme,
      });
      navigate(`/story/${story.id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <AppLayout>
      {/* Tonight's story section */}
      {inProgressStory ? (
        <>
          <p className="text-[10px] font-bold tracking-[1.2px] uppercase text-[#8b5cf6] mb-3">
            ✦ Tonight's Story
          </p>
          <InProgressCard story={inProgressStory} />
        </>
      ) : (
        <StoryForm onGenerate={handleGenerate} loading={generating} />
      )}

      {/* Divider */}
      <div
        className="my-5 h-px"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      />

      {/* Streak banner */}
      <StreakBanner count={13} subtitle="7 more nights to unlock a reward!" />

      {/* Past stories */}
      <div className="mt-5">
        <StoryList stories={completedStories} />
      </div>
    </AppLayout>
  );
}
