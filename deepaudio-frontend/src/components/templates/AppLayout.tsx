import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors, gradients, violetA, blobColors, shadows, letterSpacing, fontSize, fontWeight, glass } from '../../styles/tokens';
import { clearTokens } from '../../api/client';

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

const AvatarWrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${glass.bg};
  backdrop-filter: blur(16px);
  border: 1px solid ${violetA.a20};
  border-radius: 12px;
  box-shadow: ${shadows.card};
  overflow: hidden;
  z-index: 100;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.25rem;
  background: none;
  border: none;
  color: ${colors.textPrimary};
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: ${glass.bgDim};
  }
`;

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearTokens();
    navigate('/login');
  };

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

          <AvatarWrapper ref={wrapperRef}>
            <AvatarButton type="button" onClick={() => setMenuOpen(v => !v)}>🧒</AvatarButton>
            {menuOpen && (
              <DropdownMenu>
                <DropdownItem onClick={handleLogout}>
                  <span>🚪</span> Log out
                </DropdownItem>
              </DropdownMenu>
            )}
          </AvatarWrapper>
        </Header>

        <Main>{children}</Main>
      </ContentWrapper>
    </PageWrapper>
  );
}
