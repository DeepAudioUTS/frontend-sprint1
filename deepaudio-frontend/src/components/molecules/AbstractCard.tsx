import styled, { css } from 'styled-components';
import { colors, glass, violetA, shadows, fontSize, fontWeight, radius, transition } from '../../styles/tokens';

interface AbstractCardProps {
  version: number;
  text: string;
  selected: boolean;
  onSelect: () => void;
}

const CardButton = styled.button<{ $selected: boolean }>`
  width: 100%;
  text-align: left;
  padding: 1rem;
  border-radius: ${radius.lg};
  transition: all ${transition.default};
  cursor: pointer;
  box-shadow: ${shadows.cardSubtle};
  ${({ $selected }) =>
    $selected
      ? css`
          background: ${violetA.a12};
          border: 1px solid ${violetA.a60};
        `
      : css`
          background: ${glass.bg};
          border: 1px solid ${glass.borderStrong};
        `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const VersionLabel = styled.span<{ $selected: boolean }>`
  font-size: ${fontSize.xxs};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: ${({ $selected }) => ($selected ? colors.violet400 : colors.textMuted)};
`;

const RadioCircle = styled.div<{ $selected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $selected }) =>
    $selected
      ? css`
          background: ${colors.violet500};
          border: 1px solid ${colors.violet500};
        `
      : css`
          border: 1px solid ${glass.alpha20};
        `}
`;

const RadioDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 3.5px;
  background: ${colors.white};
`;

const CardText = styled.p`
  font-size: ${fontSize.md};
  line-height: 22px;
  color: ${colors.textLight};
`;

export function AbstractCard({ version, text, selected, onSelect }: AbstractCardProps) {
  return (
    <CardButton type="button" $selected={selected} onClick={onSelect}>
      <CardHeader>
        <VersionLabel $selected={selected}>Version {version}</VersionLabel>
        <RadioCircle $selected={selected}>
          {selected && <RadioDot />}
        </RadioCircle>
      </CardHeader>
      <CardText>{text}</CardText>
    </CardButton>
  );
}
