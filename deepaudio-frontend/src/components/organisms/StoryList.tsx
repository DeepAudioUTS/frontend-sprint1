import { useNavigate } from 'react-router-dom';
import type { Story } from '../../api/types';
import { StoryCard } from '../molecules/StoryCard';

interface StoryListProps {
  stories: Story[];
}

export function StoryList({ stories }: StoryListProps) {
  const navigate = useNavigate();

  if (stories.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[14px] font-bold text-[#f1f5ff]">Past Stories</span>
        <span className="text-[11px] font-semibold text-[#2dd4bf] cursor-pointer">
          See all
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            onClick={() => navigate(`/story/${story.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
