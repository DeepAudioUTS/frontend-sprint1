import { useState } from 'react';
import styled from 'styled-components';
import type { AbstractCandidate } from '../../api/types';
import { colors, glass, fontSize, fontWeight, radius } from '../../styles/tokens';
import { AbstractCard } from '../molecules/AbstractCard';
import { Button } from '../atoms/Button';

interface AbstractListProps {
  abstracts: AbstractCandidate[];
  onSelect: (candidate: AbstractCandidate) => Promise<void>;
  onRegenerate: () => void;
  loading?: boolean;
}

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const ScrollHint = styled.p`
  font-size: ${fontSize.xxs};
  color: ${colors.textFaint};
  text-align: center;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RegenerateButton = styled.button`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.md};
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.semibold};
  color: ${colors.textSecondary};
  cursor: pointer;
  background: ${glass.bgDim};
  border: 1px solid ${glass.border};
`;

export function AbstractList({
  abstracts,
  onSelect,
  onRegenerate,
  loading,
}: AbstractListProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleDecide = async () => {
    if (selectedIndex === null) return;
    await onSelect(abstracts[selectedIndex]);
  };

  return (
    <div>
      <CardList>
        {abstracts.map((candidate, i) => (
          <AbstractCard
            key={i}
            version={i + 1}
            text={candidate.abstract}
            selected={selectedIndex === i}
            onSelect={() => setSelectedIndex(i)}
          />
        ))}
      </CardList>

      <ScrollHint>↕ Scroll to see all versions</ScrollHint>

      <ButtonGroup>
        <Button
          onClick={handleDecide}
          loading={loading}
          disabled={selectedIndex === null}
        >
          ✨ Decide This Story
        </Button>
        <RegenerateButton type="button" onClick={onRegenerate}>
          ↩ Try Different Stories
        </RegenerateButton>
      </ButtonGroup>
    </div>
  );
}
