import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authApi } from '../api/auth';
import { colors, gradients, amberA, redA, blobColors, shadows, letterSpacing, fontSize, fontWeight, radius } from '../styles/tokens';
import { Button } from '../components/atoms/Button';
import { GlassCard } from '../components/atoms/GlassCard';
import { FormField } from '../components/molecules/FormField';

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: ${colors.bgPage};
`;

const GradientBlob = styled.div`
  position: absolute;
  pointer-events: none;
  filter: blur(70px);
`;

const TopBlob = styled(GradientBlob)`
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  border-radius: 150px;
  background: ${blobColors.top};
`;

const LeftBlob = styled(GradientBlob)`
  top: 544px;
  left: 0;
  width: 220px;
  height: 220px;
  border-radius: 110px;
  background: ${blobColors.left};
`;

const RightBlob = styled(GradientBlob)`
  top: 380px;
  left: 50%;
  width: 160px;
  height: 160px;
  border-radius: 80px;
  background: ${blobColors.right};
`;

const Content = styled.div`
  position: relative;
  max-width: 390px;
  margin: 0 auto;
  padding: 0 1.75rem;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 118px;
  margin-bottom: 2.5rem;
`;

const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  background: ${gradients.primaryDiag};
  box-shadow: ${shadows.logoLg};
`;

const LogoText = styled.span`
  font-size: ${fontSize.xl2};
  font-weight: ${fontWeight.extrabold};
  color: ${colors.textPrimary};
  letter-spacing: ${letterSpacing.tight};
`;

const HeadingSection = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: ${fontSize.xl4};
  font-weight: ${fontWeight.black};
  color: ${colors.textPrimary};
  letter-spacing: ${letterSpacing.tight};
  line-height: 1.25;
`;

const PageSubtitle = styled.p`
  font-size: ${fontSize.base};
  color: ${colors.textMuted};
  line-height: 1.625;
  margin-top: 0.75rem;
`;

const FormCard = styled(GlassCard)`
  padding: 1.5rem;
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ForgotRow = styled.div`
  text-align: right;
  margin-top: -0.5rem;
`;

const ForgotLink = styled.span`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold};
  color: ${colors.violet500};
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  font-size: ${fontSize.sm};
  color: ${colors.red};
  text-align: center;
  background: ${redA.a10};
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
`;

const Terms = styled.p`
  text-align: center;
  font-size: ${fontSize.sm};
  color: ${colors.textMuted};
  margin-top: 1.5rem;
  line-height: 1.625;
`;

const TermsLink = styled.span`
  color: ${colors.textPrimary};
  font-weight: ${fontWeight.semibold};
`;

const BadgeRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
  padding-bottom: 2.5rem;
`;

const BetaBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: ${radius.pill};
  font-size: ${fontSize.xxs};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.6px;
  color: ${colors.amber};
  background: ${amberA.a10};
  border: 1px solid ${amberA.a20};
`;

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
    <PageWrapper>
      <TopBlob />
      <LeftBlob />
      <RightBlob />

      <Content>
        <LogoRow>
          <LogoIcon>🌙</LogoIcon>
          <LogoText>Yomu</LogoText>
        </LogoRow>

        <HeadingSection>
          <PageTitle>
            Welcome
            <br />
            back.
          </PageTitle>
          <PageSubtitle>
            Sign in to continue your child's
            <br />
            bedtime story journey.
          </PageSubtitle>
        </HeadingSection>

        <FormCard borderRadius={24}>
          <FormFields>
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
            <ForgotRow>
              <ForgotLink>Forgot password?</ForgotLink>
            </ForgotRow>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button
              onClick={handleLogin}
              loading={loading}
              disabled={!email || !password}
            >
              Sign In →
            </Button>
          </FormFields>
        </FormCard>

        <Terms>
          By signing in, you agree to our
          <br />
          <TermsLink>Terms of Service</TermsLink>
          {' '}and{' '}
          <TermsLink>Privacy Policy</TermsLink>
        </Terms>

        <BadgeRow>
          <BetaBadge>⚡ Beta v0.1</BetaBadge>
        </BadgeRow>
      </Content>
    </PageWrapper>
  );
}
