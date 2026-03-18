import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { storiesApi } from '../api/stories';
import { childrenApi } from '../api/children';
import type { Story, Child } from '../api/types';
import { colors, glass, letterSpacing, fontSize, fontWeight } from '../styles/tokens';
import { AppLayout } from '../components/templates/AppLayout';
import { StoryForm } from '../components/organisms/StoryForm';
import { StoryList } from '../components/organisms/StoryList';
import { InProgressCard } from '../components/organisms/InProgressCard';
import { StreakBanner } from '../components/molecules/StreakBanner';

const SectionLabel = styled.p`
  font-size: ${fontSize.xxs};
  font-weight: ${fontWeight.bold};
  letter-spacing: ${letterSpacing.label};
  text-transform: uppercase;
  color: ${colors.violet500};
  margin-bottom: 0.75rem;
`;

const Divider = styled.div`
  margin: 1.25rem 0;
  height: 1px;
  background: ${glass.bgDim};
`;

const StoriesSection = styled.div`
  margin-top: 1.25rem;
`;

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

        try {
          const inProgress = await storiesApi.getInProgress();
          const story = await storiesApi.getById(inProgress.story_id);
          setInProgressStory(story);
        } catch {
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
      {inProgressStory ? (
        <>
          <SectionLabel>✦ Tonight's Story</SectionLabel>
          <InProgressCard story={inProgressStory} />
        </>
      ) : (
        <StoryForm onGenerate={handleGenerate} loading={generating} />
      )}

      <Divider />

      <StreakBanner count={13}/>

      <StoriesSection>
        <StoryList stories={completedStories} />
      </StoriesSection>
    </AppLayout>
  );
}
