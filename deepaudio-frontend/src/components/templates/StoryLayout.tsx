import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors, glass, blobColors, fontSize, fontWeight } from '../../styles/tokens';
import { Badge } from '../atoms/Badge';

interface StoryLayoutProps {
  children: React.ReactNode;
  title?: string;
  step?: string;
  showMore?: boolean;
  onDelete?: () => void;
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
  height: 90px;
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  background: ${glass.bg};
  border: 1px solid ${glass.border};
`;

const BackArrow = styled.span`
  font-size: ${fontSize.lg};
  color: ${colors.textPrimary};
`;

const HeaderTitle = styled.span`
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.bold};
  color: ${colors.textMuted};
`;

const MoreContainer = styled.div`
  position: relative;
`;

const MoreButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  background: ${glass.bg};
  border: 1px solid ${glass.border};
`;

const MoreIcon = styled.span`
  font-size: ${fontSize.lg};
  color: ${colors.textPrimary};
  letter-spacing: 0.15em;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: rgba(10, 14, 35, 0.97);
  border: 1px solid ${glass.border};
  border-radius: 12px;
  overflow: hidden;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

const DropdownItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.semibold};
  color: ${colors.red};
  cursor: pointer;
  background: transparent;

  &:hover {
    background: rgba(248, 113, 113, 0.08);
  }
`;

const HeaderSpacer = styled.div`
  width: 36px;
  height: 36px;
`;

const Main = styled.main`
  padding: 0 1.75rem 2.5rem;
`;

export function StoryLayout({ children, title, step, showMore, onDelete }: StoryLayoutProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <PageWrapper>
      <TopBlob />
      <LeftBlob />
      <RightBlob />

      <ContentWrapper>
        <Header>
          <BackButton type="button" onClick={() => navigate(-1)}>
            <BackArrow>←</BackArrow>
          </BackButton>

          {title && <HeaderTitle>{title}</HeaderTitle>}

          {step && <Badge>{step}</Badge>}
          {showMore && (
            <MoreContainer ref={menuRef}>
              <MoreButton type="button" onClick={() => setMenuOpen((o) => !o)}>
                <MoreIcon>···</MoreIcon>
              </MoreButton>
              {menuOpen && (
                <DropdownMenu>
                  <DropdownItem
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete?.();
                    }}
                  >
                    🗑 Delete Story
                  </DropdownItem>
                </DropdownMenu>
              )}
            </MoreContainer>
          )}
          {!step && !showMore && <HeaderSpacer />}
        </Header>

        <Main>{children}</Main>
      </ContentWrapper>
    </PageWrapper>
  );
}
