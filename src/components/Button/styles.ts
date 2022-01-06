import styled, { css } from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
  type: TypeProps;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  flex: 1;
  max-height: 56px;
  min-height: 56px;
  border-radius: 0;
  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme})=> theme.COLORS.BORDER_COLOR};

  background-color: ${({ theme, type }) =>
    type === 'primary' ? theme.COLORS.PRIMARY_BUTTON : theme.COLORS.SECONDARY_BUTTON};
`;

export const Title = styled.Text`
  font-size: 14px;

  

  ${({ theme}) => css`
    color: ${({ theme, type}) => type === 'primary' ? theme.COLORS.SECONDARY_BUTTON : theme.COLORS.PRIMARY_BUTTON};
    font-family: ${theme.FONTS.TEXT};
  `}
`;

export const Load = styled.ActivityIndicator.attrs(({theme}) => ({
    color: theme.COLORS.TITLE
}))``;