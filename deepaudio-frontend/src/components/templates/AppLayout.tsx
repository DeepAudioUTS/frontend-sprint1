import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors, gradients, violetA, blobColors, shadows, letterSpacing, fontSize, fontWeight } from '../../styles/tokens';

interface AppLayoutProps {
  children: React.ReactNode;
}

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: ${colors.bgPage};
`;

const GradientBlob = styled.div`
  position: absolute;
  pointer-events: none;
  filter: blur(60px);
`;

const TopBlob = styled(GradientBlob)`
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  height: 280px;
  border-radius: 140px;
  background: ${blobColors.topApp};
`;

const LeftBlob = styled(GradientBlob)`
  top: 524px;
  left: 0;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background: ${blobColors.leftApp};
`;

const RightBlob = styled(GradientBlob)`
  top: 422px;
  left: 50%;
  transform: translateX(10px);
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background: ${blobColors.rightApp};
`;

const ContentWrapper = styled.div`
  position: relative;
  max-width: 390px;
  margin: 0 auto;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 110px;
`;

const LogoButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
`;

const LogoIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${gradients.primaryDiag};
  box-shadow: ${shadows.logo};
`;

const LogoText = styled.span`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.extrabold};
  color: ${colors.textPrimary};
  letter-spacing: ${letterSpacing.tight};
`;

const AvatarButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  cursor: pointer;
  background: ${gradients.avatar};
  border: 1px solid ${violetA.a40};
  box-shadow: ${shadows.avatar};
`;

const Main = styled.main`
  padding: 0 1.25rem 2.5rem;
`;

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <TopBlob />
      <LeftBlob />
      <RightBlob />

      <ContentWrapper>
        <Header>
          <LogoButton onClick={() => navigate('/')}>
            <LogoIcon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#f1f5ff" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </LogoIcon>
            <LogoText>Yomu</LogoText>
          </LogoButton>

          <AvatarButton type="button">🧒</AvatarButton>
        </Header>

        <Main>{children}</Main>
      </ContentWrapper>
    </PageWrapper>
  );
}
