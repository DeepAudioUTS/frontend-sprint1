import { Spinner } from '../atoms/Spinner';
import { StepItem } from '../molecules/StepItem';

type GenType = 'draft' | 'story';

interface GeneratingProgressProps {
  type: GenType;
  theme?: string;
}

export function GeneratingProgress({ type, theme }: GeneratingProgressProps) {
  const isDraft = type === 'draft';

  return (
    <div className="flex flex-col items-center pt-4">
      {/* Theme tag */}
      {theme && (
        <span
          className="inline-flex items-center h-[29px] px-4 rounded-full text-[12px] font-semibold text-[#94a3b8] mb-10"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          🔭 {theme}
        </span>
      )}

      {/* Animated circle */}
      <div className="mb-8">
        <Spinner size={140} emoji={isDraft ? '✍️' : '🌌'} />
      </div>

      {/* Text */}
      <div className="text-center mb-8">
        <h2 className="text-[22px] font-black text-[#f1f5ff] tracking-tight leading-tight mb-2">
          {isDraft ? (
            <>
              Drafting your
              <br />
              story outline…
            </>
          ) : (
            <>
              Writing your
              <br />
              bedtime story…
            </>
          )}
        </h2>
        <p className="text-[13px] text-[#64748b] leading-relaxed">
          {isDraft ? (
            <>
              Hang tight — this only takes
              <br />a few seconds.
            </>
          ) : (
            <>
              This usually takes about 20–30 seconds.
              <br />
              We'll let you know when it's ready.
            </>
          )}
        </p>
      </div>

      {/* Progress steps */}
      <div className="w-full flex flex-col gap-3">
        {isDraft ? (
          <>
            <StepItem
              icon="✓"
              title="Theme received"
              subtitle={`${theme ?? 'Theme'} confirmed`}
              state="done"
            />
            <StepItem
              icon="🧠"
              title="Building story outline"
              subtitle="Characters, setting, plot…"
              state="active"
            />
            <StepItem
              icon="📖"
              title="Draft preview"
              subtitle="Ready after outline · waiting"
              state="waiting"
            />
          </>
        ) : (
          <>
            <StepItem
              icon="✓"
              title="Story outline"
              subtitle="Theme and characters confirmed"
              state="done"
            />
            <StepItem
              icon="✍️"
              title="Writing the story"
              subtitle="Crafting scenes and dialogue…"
              state="active"
            />
            <StepItem
              icon="🎙️"
              title="Generating voice"
              subtitle="AI narration · waiting"
              state="waiting"
            />
          </>
        )}
      </div>

      <p className="text-[12px] text-[#374151] text-center mt-6">
        {isDraft
          ? 'Almost there — your draft preview will appear shortly.'
          : "You can close this screen — we'll notify you when the story is ready."}
      </p>
    </div>
  );
}
