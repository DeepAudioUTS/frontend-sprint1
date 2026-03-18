interface SpinnerProps {
  size?: number;
  emoji?: string;
}

export function Spinner({ size = 140, emoji = '✨' }: SpinnerProps) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: 'linear-gradient(135deg, #1e2d5e, #0d1835)',
        border: '1px solid rgba(124,58,237,0.3)',
        boxShadow: '0 0 60px rgba(124,58,237,0.25), 0 20px 50px rgba(0,0,0,0.5)',
      }}
    >
      <span className="animate-pulse" style={{ fontSize: size * 0.41 }}>
        {emoji}
      </span>
    </div>
  );
}
