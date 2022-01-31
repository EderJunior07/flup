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

export const ContainerHeadline = styled.View`
  width: 100%;
  height: 456px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER_COLOR};
`;

export const DescriptionHeadline = styled.Text`
  font-size: 14px;
  text-align: justify;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.DESCRIPTION};
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

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  padding: 0 8px;
  height: 36px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
`;

export const LocationLabel = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const HeadlineTitleBox = styled.View`
  position: absolute;
  right: 8px;
  bottom: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  padding: 0 8px;
  height: 36px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
`;
