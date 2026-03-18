import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  rounded?: string;
}

export function GlassCard({
  children,
  className = '',
  style,
  rounded = 'rounded-[22px]',
}: GlassCardProps) {
  return (
    <div
      className={`relative ${rounded} ${className}`}
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
