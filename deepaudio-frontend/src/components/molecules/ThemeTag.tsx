import styled, { css } from 'styled-components';
import { colors, violetA, fontSize, fontWeight, radius, transition } from '../../styles/tokens';

interface ThemeTagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const StyledThemeTag = styled.button<{ $selected?: boolean }>`
  height: 1.75rem;
  padding: 0 0.75rem;
  border-radius: ${radius.pill};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.violet200};
  flex-shrink: 0;
  transition: background ${transition.default}, border-color ${transition.default};
  cursor: pointer;
  ${({ $selected }) =>
    $selected
      ? css`
          background: ${violetA.a28};
          border: 1px solid ${violetA.a50};
        `
      : css`
          background: ${violetA.a12};
          border: 1px solid ${violetA.a20};
        `}
`;

export function ThemeTag({ label, selected, onClick }: ThemeTagProps) {
  return (
    <StyledThemeTag type="button" $selected={selected} onClick={onClick}>
      {label}
    </StyledThemeTag>
  );
}
