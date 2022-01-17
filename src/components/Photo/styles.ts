import theme from '@src/theme';
import styled, { css } from 'styled-components/native';


export const ImgContainer = styled.View`
  width: 132px;
  height: 132px;
  border-radius: 80px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 132px;
  height: 132px;
  border-radius: 80px;
`;

export const Placeholder = styled.View`
  width: 132px;
  height: 132px;
  border-radius: 80px;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${({ theme }) => theme.COLORS.ERROR_900};
`;

export const PlaceholderTitle = styled.Text`
  font-size: 14px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
