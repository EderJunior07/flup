import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  align-items: center;
  justify-content: center;
  padding-top: 90px
`;

export const Title = styled.Text`
  margin-top: 16px;
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const Description = styled.Text`
  padding: 0 48px;
  margin-top: 16px;
  margin-bottom: 48px;
  font-size: 14px;
  text-align: center;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.DESCRIPTION};
`;

export const ButtonBack = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  z-index: 100;
  position: absolute;
  left: 16px;
  top: 16px;
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const AddressButton = styled(TouchableOpacity)`
  position: absolute;
  align-self: center;
  bottom: 0px;
  height: 56px;
  width: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const AddressButtonLabel = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
  z-index: 9999;
`;
