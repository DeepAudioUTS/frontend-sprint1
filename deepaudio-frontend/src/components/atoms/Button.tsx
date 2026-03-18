import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

const sizeClass: Record<Size, string> = {
  sm: 'h-8 px-4 text-xs rounded-xl',
  md: 'h-12 px-6 text-[14px] rounded-2xl',
  lg: 'h-14 px-8 text-base rounded-2xl',
};

const variantStyle: Record<Variant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(171deg, #7c3aed 0%, #2563eb 100%)',
    boxShadow: '0 4px 24px rgba(124,58,237,0.45)',
    color: '#fff',
  },
  secondary: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#94a3b8',
  },
  ghost: {
    background: 'transparent',
    color: '#8b5cf6',
  },
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`w-full inline-flex items-center justify-center font-bold tracking-tight transition-opacity cursor-pointer disabled:opacity-40 ${sizeClass[size]} ${className}`}
      style={variantStyle[variant]}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="mr-2 size-4 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block"
        />
      )}
      {children}
    </button>
  );
}
