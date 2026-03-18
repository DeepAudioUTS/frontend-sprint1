import React from 'react';

type BadgeVariant = 'step' | 'success' | 'theme';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyle: Record<BadgeVariant, React.CSSProperties> = {
  step: {
    background: 'rgba(139,92,246,0.15)',
    border: '1px solid rgba(139,92,246,0.25)',
    color: '#a78bfa',
  },
  success: {
    background: 'rgba(52,211,153,0.12)',
    border: '1px solid rgba(52,211,153,0.25)',
    color: '#34d399',
  },
  theme: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#64748b',
  },
};

export function Badge({ children, variant = 'step' }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center px-3 h-[24px] rounded-full text-[11px] font-bold whitespace-nowrap"
      style={variantStyle[variant]}
    >
      {children}
    </span>
  );
}
