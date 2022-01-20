import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 24px 0;
`;

export const MessageContainer = styled.View`
  width: 100%;
  min-height: 132px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
    margin-top: 24px;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON}
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
`;

export const Description = styled.Text`
    margin-top: 8px;
    padding: 0 48px;
    font-size: 14px;
    text-align: center;
    color: ${({ theme }) => theme.COLORS.DESCRIPTION}
    font-family: ${({ theme }) => theme.FONTS.TEXT};
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 32px;
  padding: 24px;
`;

export const Label = styled.Text`
  margin-bottom: 12px;
  font-size: 14px;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.BOLD_TEXT};
    color: ${theme.COLORS.PRIMARY_BUTTON};
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
