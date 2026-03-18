import styled from 'styled-components';
import { colors, amberA, fontSize, fontWeight } from '../../styles/tokens';

interface StreakBannerProps {
  count: number;
  subtitle?: string;
}

const BannerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 61px;
  padding: 0 1rem;
  border-radius: 1rem;
  background: ${amberA.a06};
  border: 1px solid ${amberA.a15};
`;

const FireEmoji = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const BannerContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const BannerTitle = styled.p`
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
`;

const BannerSubtitle = styled.p`
  font-size: ${fontSize.xs};
  color: ${colors.textMuted};
  margin-top: 1px;
`;

const CountArea = styled.div`
  text-align: right;
  flex-shrink: 0;
`;

const CountText = styled.p`
  font-size: ${fontSize.xl3};
  font-weight: ${fontWeight.black};
  color: ${colors.amber};
  line-height: 1;
`;

const DaysLabel = styled.p`
  font-size: ${fontSize.xxs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.textMuted};
`;

export function StreakBanner({ count, subtitle }: StreakBannerProps) {
  return (
    <BannerWrapper>
      <FireEmoji>🔥</FireEmoji>
      <BannerContent>
        <BannerTitle>Bedtime Streak</BannerTitle>
        {subtitle && <BannerSubtitle>{subtitle}</BannerSubtitle>}
      </BannerContent>
      <CountArea>
        <CountText>{count}</CountText>
        <DaysLabel>days</DaysLabel>
      </CountArea>
    </BannerWrapper>
  );
}
