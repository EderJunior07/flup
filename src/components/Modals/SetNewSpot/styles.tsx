import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  height: 100%;
  padding-bottom: 100px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled.View`
  width: 100%;
  height: 62px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER_COLOR};
`;

export const HeaderBoxLeft = styled.View`
  align-items: center;
  justify-content: center;
  border-end-width: 1px;
  padding: 8px 16px;
  border-color: ${({ theme }) => theme.COLORS.BORDER_COLOR};
`;

export const HeaderBoxRight = styled.View`
  align-items: center;
  justify-content: center;
  border-start-width: 1px;
  padding: 8px 16px;
  border-color: ${({ theme }) => theme.COLORS.BORDER_COLOR};
`;

export const HeaderTitle = styled.Text`
  justify-content: center;
  font-size: 16px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const MessageContainer = styled.View`
  width: 100%;
  min-height: 132px;
  justify-content: flex-start;
  align-items: flex-start;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER_COLOR};
  padding-bottom: 24px;
`;

export const Title = styled.Text`
padding: 0 16px;
    margin-top: 24px;
  font-size: 18px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON}
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
`;

export const Description = styled.Text`
    margin-top: 8px;
    padding: 0 16px;
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.DESCRIPTION}
    font-family: ${({ theme }) => theme.FONTS.TEXT};
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 24px;
  padding: 16px;
`;

export const Label = styled.Text`
  margin-bottom: 8px;
  font-size: 12px;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.BOLD_TEXT};
    color: ${theme.COLORS.PRIMARY_BUTTON};
  `}
`;

export const Label2 = styled.Text`
  margin-bottom: 8px;
  font-size: 10px;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.BOLD_TEXT};
    color: ${theme.COLORS.DESCRIPTION};
  `}
`;

export const InputGroup = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const InputGroupHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MaxCharacters = styled.Text`
  font-size: 10px;
  margin-bottom: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.MEDIUM_TEXT};
    color: ${theme.COLORS.PRIMARY_BUTTON};
  `}
`;

export const ToggleBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
`;

export const ButtonLabel = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
  z-index: 9999;
`;
