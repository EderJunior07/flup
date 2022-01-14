import theme from '@src/theme';
import styled, { css } from 'styled-components/native';

export const Image = styled.Image`
  width: 132px;
  height: 132px;
  border-radius: 80px;
  margin-right: 8px;
`;

export const Placeholder = styled.View`
  flex: 1;
  width: 132px;
  height: 132px;
  border-radius: 80px;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const PlaceholderTitle = styled.Text`
  font-size: 14px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
