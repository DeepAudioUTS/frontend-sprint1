import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export function Input({ icon, className = '', ...props }: InputProps) {
  return (
    <div
      className="flex items-center gap-3 h-[52px] px-4 rounded-2xl"
      style={{
        background: 'rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {icon && <span className="text-lg shrink-0">{icon}</span>}
      <input
        className={`flex-1 bg-transparent outline-none text-[14px] font-medium text-[#f1f5ff] placeholder:text-[#64748b] ${className}`}
        {...props}
      />
    </div>
  );
}
