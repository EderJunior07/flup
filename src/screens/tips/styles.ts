import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
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
  margin-left: 16px;
  justify-content: center;
  font-size: 16px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const ContainerOfTitle = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
  padding-top: 16px;
  padding-bottom: 8px;
`;

export const LabelContainerOfTitle = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  padding: 0 8px;
  height: 36px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const TipsTitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  left: 8px;
  bottom: 16px;
  height: 48px;
  padding-horizontal: 8px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
`;

export const TipsTitleLabel = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;
