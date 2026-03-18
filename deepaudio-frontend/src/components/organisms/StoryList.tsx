import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { Story } from '../../api/types';
import { colors, fontSize, fontWeight } from '../../styles/tokens';
import { StoryCard } from '../molecules/StoryCard';

interface StoryListProps {
  stories: Story[];
}

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const ListTitle = styled.span`
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
`;

const SeeAllLink = styled.span`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.cyan};
  cursor: pointer;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export function StoryList({ stories }: StoryListProps) {
  const navigate = useNavigate();

  if (stories.length === 0) return null;

  return (
    <div>
      <ListHeader>
        <ListTitle>Past Stories</ListTitle>
        <SeeAllLink>See all</SeeAllLink>
      </ListHeader>
      <CardList>
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            onClick={() => navigate(`/story/${story.id}`)}
          />
        ))}
      </CardList>
    </div>
  );
}
