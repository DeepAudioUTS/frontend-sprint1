import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../atoms/Badge';

interface StoryLayoutProps {
  children: React.ReactNode;
  title?: string;
  step?: string;
  showMore?: boolean;
}

export function StoryLayout({ children, title, step, showMore }: StoryLayoutProps) {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: '#06091a' }}
    >
      {/* Background gradient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          height: 300,
          borderRadius: 150,
          background: 'rgba(109,40,217,0.28)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: 544,
          left: 0,
          width: 220,
          height: 220,
          borderRadius: 110,
          background: 'rgba(14,165,233,0.14)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: 380,
          left: '50%',
          width: 160,
          height: 160,
          borderRadius: 80,
          background: 'rgba(124,58,237,0.1)',
          filter: 'blur(70px)',
        }}
      />

      <div className="relative max-w-[390px] mx-auto min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 h-[90px]">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-[36px] flex items-center justify-center rounded-[10px] cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="text-[18px] text-[#f1f5ff]">←</span>
          </button>

          {/* Title */}
          {title && (
            <span className="text-[14px] font-bold text-[#64748b]">{title}</span>
          )}

          {/* Right side: step badge or more button */}
          {step && <Badge>{step}</Badge>}
          {showMore && (
            <button
              type="button"
              className="size-[36px] flex items-center justify-center rounded-[10px] cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span className="text-[18px] text-[#f1f5ff] tracking-widest">···</span>
            </button>
          )}
          {!step && !showMore && <div className="size-[36px]" />}
        </header>

        {/* Main content */}
        <main className="px-7 pb-10">{children}</main>
      </div>
    </div>
  );
}
