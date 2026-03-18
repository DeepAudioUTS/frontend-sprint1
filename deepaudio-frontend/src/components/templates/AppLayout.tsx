import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
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
          top: -60,
          left: '50%',
          transform: 'translateX(calc(-50% + 0px))',
          width: 280,
          height: 280,
          borderRadius: 140,
          background: 'rgba(109,40,217,0.25)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: 524,
          left: 0,
          width: 200,
          height: 200,
          borderRadius: 100,
          background: 'rgba(14,165,233,0.15)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: 422,
          left: '50%',
          transform: 'translateX(10px)',
          width: 150,
          height: 150,
          borderRadius: 75,
          background: 'rgba(251,191,36,0.08)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-[390px] mx-auto min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 h-[110px]">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="size-[34px] rounded-[10px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                boxShadow: '0 0 16px rgba(124,58,237,0.5)',
              }}
            >
              <span className="text-[17px]">🌙</span>
            </div>
            <span className="text-[18px] font-extrabold text-[#f1f5ff] tracking-tight">
              Yomu
            </span>
          </button>

          <button
            type="button"
            className="size-[38px] rounded-[19px] flex items-center justify-center cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4338ca)',
              border: '1px solid rgba(139,92,246,0.4)',
              boxShadow: '0 0 12px rgba(139,92,246,0.3)',
            }}
          >
            <span className="text-[17px]">🧒</span>
          </button>
        </header>

        {/* Main content */}
        <main className="px-5 pb-10">{children}</main>
      </div>
    </div>
  );
}
