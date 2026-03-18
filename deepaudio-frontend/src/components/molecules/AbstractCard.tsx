interface AbstractCardProps {
  version: number;
  text: string;
  selected: boolean;
  onSelect: () => void;
}

export function AbstractCard({ version, text, selected, onSelect }: AbstractCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left p-4 rounded-[18px] transition-all cursor-pointer"
      style={
        selected
          ? {
              background: 'rgba(139,92,246,0.12)',
              border: '1px solid rgba(139,92,246,0.6)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            }
          : {
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            }
      }
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`text-[10px] font-bold tracking-[0.8px] uppercase ${
            selected ? 'text-[#a78bfa]' : 'text-[#64748b]'
          }`}
        >
          Version {version}
        </span>
        <div
          className="size-[18px] rounded-[9px] flex items-center justify-center"
          style={
            selected
              ? { background: '#8b5cf6', border: '1px solid #8b5cf6' }
              : { border: '1px solid rgba(255,255,255,0.2)' }
          }
        >
          {selected && <div className="size-[7px] rounded-[3.5px] bg-white" />}
        </div>
      </div>
      <p className="text-[13px] leading-[22px] text-[#cbd5e1]">{text}</p>
    </button>
  );
}
