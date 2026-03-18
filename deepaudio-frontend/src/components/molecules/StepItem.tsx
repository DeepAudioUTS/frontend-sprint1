type StepState = 'done' | 'active' | 'waiting';

interface StepItemProps {
  icon: string;
  title: string;
  subtitle: string;
  state: StepState;
}

export function StepItem({ icon, title, subtitle, state }: StepItemProps) {
  const iconStyle: Record<StepState, React.CSSProperties> = {
    done: {
      background: 'rgba(52,211,153,0.12)',
      border: '1px solid rgba(52,211,153,0.25)',
    },
    active: {
      background: 'rgba(124,58,237,0.15)',
      border: '1px solid rgba(124,58,237,0.3)',
    },
    waiting: {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.08)',
    },
  };

  return (
    <div
      className="flex items-center gap-3 h-[57px] px-4 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="shrink-0 size-8 rounded-[9px] flex items-center justify-center text-base"
        style={iconStyle[state]}
      >
        {state === 'done' ? '✓' : icon}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-[13px] font-bold ${
            state === 'waiting' ? 'text-[#64748b]' : 'text-[#f1f5ff]'
          }`}
        >
          {title}
        </p>
        <p className="text-[11px] text-[#64748b] mt-px">{subtitle}</p>
      </div>

      <div className="shrink-0">
        {state === 'done' && (
          <span className="text-[11px] font-bold text-[#34d399]">Done</span>
        )}
        {state === 'active' && (
          <div
            className="size-5 rounded-full border-2 animate-spin"
            style={{
              borderColor: 'rgba(124,58,237,0.2)',
              borderTopColor: '#7c3aed',
            }}
          />
        )}
        {state === 'waiting' && (
          <span className="text-[11px] font-semibold text-[#374151]">—</span>
        )}
      </div>
    </div>
  );
}
