interface ThemeTagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function ThemeTag({ label, selected, onClick }: ThemeTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-7 px-3 rounded-full text-[11px] font-semibold text-[#c4b5fd] shrink-0 transition-colors cursor-pointer"
      style={
        selected
          ? {
              background: 'rgba(139,92,246,0.28)',
              border: '1px solid rgba(139,92,246,0.5)',
            }
          : {
              background: 'rgba(139,92,246,0.12)',
              border: '1px solid rgba(139,92,246,0.2)',
            }
      }
    >
      {label}
    </button>
  );
}
