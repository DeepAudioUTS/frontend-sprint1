import { useNavigate } from 'react-router-dom';
import type { Story, StoryStatus } from '../../api/types';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

interface ProgressInfo {
  step: number;
  progress: number;
  steps: [string, string, string];
  activeStep: number;
}

function getProgressInfo(status: StoryStatus): ProgressInfo {
  switch (status) {
    case 'generating_abstract':
      return { step: 1, progress: 33, steps: ['✓ Theme', '✦ Draft', 'Story'], activeStep: 1 };
    case 'abstract_ready':
      return { step: 2, progress: 66, steps: ['✓ Theme', '✦ Draft', 'Story'], activeStep: 1 };
    case 'generating_text':
    case 'generating_audio':
      return { step: 3, progress: 85, steps: ['✓ Theme', '✓ Draft', '✦ Story'], activeStep: 2 };
    default:
      return { step: 3, progress: 100, steps: ['✓ Theme', '✓ Draft', '✓ Story'], activeStep: -1 };
  }
}

interface InProgressCardProps {
  story: Story;
}

export function InProgressCard({ story }: InProgressCardProps) {
  const navigate = useNavigate();
  const { step, progress, steps, activeStep } = getProgressInfo(story.status);

  return (
    <div
      className="overflow-hidden rounded-[22px]"
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(139,92,246,0.35)',
        boxShadow: '0 0 0 1px rgba(139,92,246,0.15), 0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      <div className="p-[18px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="size-[10px] rounded-full bg-[#a78bfa]"
              style={{ boxShadow: '0 0 0 5px rgba(167,139,250,0.15)' }}
            />
            <span className="text-[11px] font-semibold text-[#a78bfa] tracking-[0.2px]">
              Story creation in progress
            </span>
          </div>
          <Badge>Step {step} of 3</Badge>
        </div>

        {/* Title */}
        <h3 className="text-[20px] font-black text-[#f1f5ff] tracking-tight leading-tight mb-2">
          {story.title ?? story.theme}
        </h3>

        {/* Theme tag */}
        <span
          className="inline-flex items-center h-[23px] px-3 rounded-full text-[10px] font-semibold text-[#64748b] mb-4"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          🔭 {story.theme}
        </span>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold text-[#64748b] tracking-[0.3px]">
              Progress
            </span>
            <span className="text-[10px] font-bold text-[#a78bfa]">{progress}%</span>
          </div>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #7c3aed, #818cf8)',
              }}
            />
          </div>
        </div>

        {/* Step chips */}
        <div className="flex gap-2 mb-4">
          {steps.map((label, i) => {
            const isDone = label.startsWith('✓');
            const isActive = i === activeStep && !isDone;
            return (
              <div
                key={i}
                className="flex-1 h-7 flex items-center justify-center rounded-lg text-[10px] font-bold"
                style={
                  isDone
                    ? { background: 'rgba(139,92,246,0.2)', color: '#a78bfa' }
                    : isActive
                    ? {
                        background: 'rgba(139,92,246,0.35)',
                        border: '1px solid rgba(139,92,246,0.5)',
                        color: '#c4b5fd',
                      }
                    : { background: 'rgba(255,255,255,0.05)', color: '#334155' }
                }
              >
                {label}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <Button onClick={() => navigate(`/story/${story.id}`)}>
          ▶ Continue Creating
        </Button>
      </div>
    </div>
  );
}
