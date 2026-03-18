import { useState } from 'react';
import { AbstractCard } from '../molecules/AbstractCard';
import { Button } from '../atoms/Button';

interface AbstractListProps {
  abstracts: string[];
  onSelect: (abstract: string) => Promise<void>;
  onRegenerate: () => void;
  loading?: boolean;
}

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
      <div className="flex flex-col gap-3 mb-4">
        {abstracts.map((text, i) => (
          <AbstractCard
            key={i}
            version={i + 1}
            text={text}
            selected={selectedIndex === i}
            onSelect={() => setSelectedIndex(i)}
          />
        ))}
      </div>

      <p className="text-[10px] text-[#334155] text-center mb-4">
        ↕ Scroll to see all versions
      </p>

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleDecide}
          loading={loading}
          disabled={selectedIndex === null}
        >
          ✨ Decide This Story
        </Button>
        <button
          type="button"
          onClick={onRegenerate}
          className="h-12 flex items-center justify-center rounded-2xl text-[14px] font-semibold text-[#94a3b8] cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          ↩ Try Different Stories
        </button>
      </div>
    </div>
  );
}
