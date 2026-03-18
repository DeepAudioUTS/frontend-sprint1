interface StreakBannerProps {
  count: number;
  subtitle?: string;
}

export function StreakBanner({ count, subtitle }: StreakBannerProps) {
  return (
    <div
      className="flex items-center gap-3 h-[61px] px-4 rounded-2xl"
      style={{
        background: 'rgba(251,191,36,0.06)',
        border: '1px solid rgba(251,191,36,0.15)',
      }}
    >
      <span className="text-2xl shrink-0">🔥</span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-[#f1f5ff]">Bedtime Streak</p>
        {subtitle && (
          <p className="text-[11px] text-[#64748b] mt-px">{subtitle}</p>
        )}
      </div>
      <div className="text-right shrink-0">
        <p className="text-[26px] font-black text-[#fbbf24] leading-none">{count}</p>
        <p className="text-[10px] font-semibold text-[#64748b]">days</p>
      </div>
    </div>
  );
}
