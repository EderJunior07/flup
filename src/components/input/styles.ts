import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type Props = {
  type: TypeProps;
};

export const Container = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor:
    type === 'primary' ? theme.COLORS.DESCRIPTION : theme.COLORS.DESCRIPTION,
}))<Props>`
  width: 100%;
  height: 56px;
  background-color: transparent;
  padding: 7px 0;
  padding-left: 16px;
  margin-bottom: 16px;

  ${({ theme, type }) => css`
    font-family: ${theme.FONTS.TEXT};
    border: 1px solid ${theme.COLORS.BORDER_COLOR2};
    color: ${theme.COLORS.ICONS_PRIMARY_COLOR};
  `}
`;
