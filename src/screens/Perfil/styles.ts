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
  justify-content: center;
  font-size: 16px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const PerfilInfoBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 24px;
`;

export const InfoBox = styled.View`
  flex: 1;
  margin-left: 8px;
  margin-right: 8px;
`;

export const FollowersBox = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 12px 0;
  padding-bottom: 8px;
  align-items: flex-end;
`;

export const ColumnBoxLeft = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-end-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER_COLOR};
  margin: 8px 0;
  padding-right: 8px;
`;
export const ColumnBoxMiddle = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-color: ${({ theme }) => theme.COLORS.BORDER_COLOR};
  margin: 8px 0;
  padding: 0 8px;
`;
export const ColumnBoxRight = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-start-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER_COLOR};
  margin: 8px 0;
  padding-left: 8px;
`;

export const UpLabel = styled.Text`
  font-size: 14px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const DownLabel = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.DESCRIPTION};
`;

export const ButtonsBox = styled.View`
  flex: 1;
  flex-direction: row;
  padding-top: 8px;
  padding-bottom: 16px;
`;

export const DynamicButton = styled(TouchableOpacity)`
  flex: 2;
  height: 48px;
  margin-right: 8px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON}
  align-items: center;
  justify-content: center;
`;

export const DynamicButtonLabel = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
`;

export const InstagramButotn = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BORDER_COLOR};
`;

export const AllBlackContainer = styled.View`
  flex-direction: row;
  align-items: center;
  min-width: 112px;
  padding: 0 16px;
  height: 62px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-end-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON}
  margin-right: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM_TEXT};
  color: ${({ theme }) => theme.COLORS.DESCRIPTION};
  margin-right: 8px;
`;

export const LabelWhite = styled.Text`
  font-size: 14px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM_TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
  margin-right: 16px;
`;

export const UserDescription = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.DESCRIPTION};
  margin: 16px;
`;
