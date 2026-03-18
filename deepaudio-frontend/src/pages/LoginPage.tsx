import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { Button } from '../components/atoms/Button';
import { GlassCard } from '../components/atoms/GlassCard';
import { FormField } from '../components/molecules/FormField';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError('');
    try {
      const res = await authApi.login({ email, password });
      localStorage.setItem('access_token', res.access_token);
      navigate('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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

      <div className="relative max-w-[390px] mx-auto px-7">
        {/* Logo */}
        <div className="flex items-center gap-3 pt-[118px] mb-10">
          <div
            className="size-10 rounded-[12px] flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              boxShadow: '0 0 20px rgba(124,58,237,0.5)',
            }}
          >
            <span className="text-xl">🌙</span>
          </div>
          <span className="text-[22px] font-extrabold text-[#f1f5ff] tracking-tight">
            Yomu
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-[28px] font-black text-[#f1f5ff] tracking-tight leading-tight">
            Welcome
            <br />
            back.
          </h1>
          <p className="text-[14px] text-[#64748b] leading-relaxed mt-3">
            Sign in to continue your child's
            <br />
            bedtime story journey.
          </p>
        </div>

        {/* Form card */}
        <GlassCard rounded="rounded-[24px]" className="p-6">
          <div className="flex flex-col gap-5">
            <FormField
              label="Email"
              icon="✉️"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="parent@example.com"
            />
            <FormField
              label="Password"
              icon="🔒"
              value={password}
              onChange={setPassword}
              type="password"
              placeholder="••••••••••"
            />
            <div className="text-right -mt-2">
              <span className="text-[12px] font-semibold text-[#8b5cf6] cursor-pointer">
                Forgot password?
              </span>
            </div>
            {error && (
              <p className="text-xs text-red-400 text-center bg-red-500/10 rounded-xl py-2 px-3">
                {error}
              </p>
            )}
            <Button
              onClick={handleLogin}
              loading={loading}
              disabled={!email || !password}
            >
              Sign In →
            </Button>
          </div>
        </GlassCard>

        {/* Terms */}
        <p className="text-center text-[12px] text-[#64748b] mt-6 leading-relaxed">
          By signing in, you agree to our
          <br />
          <span className="text-[#f1f5ff] font-semibold">Terms of Service</span>
          {' '}and{' '}
          <span className="text-[#f1f5ff] font-semibold">Privacy Policy</span>
        </p>

        {/* Beta badge */}
        <div className="flex justify-center mt-5 pb-10">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.6px] text-[#fbbf24]"
            style={{
              background: 'rgba(251,191,36,0.1)',
              border: '1px solid rgba(251,191,36,0.2)',
            }}
          >
            ⚡ Beta v0.1
          </span>
        </div>
      </div>
    </div>
  );
}
