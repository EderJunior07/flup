import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

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

export const ImageContainer = styled.View`
  flex: 1;
  width: 328px;
  height: 236px;
  margin-right: 8px;
  background-color: ${({ theme }) => theme.COLORS.DESCRIPTION};
`;

export const HeaderContainer = styled.View`
  flex-direction: column;
  width: 100%;
  padding: 16px 16px;
  border-bottom-width: 0.5px;
  border-color: ${({ theme }) => theme.COLORS.DESCRIPTION};
`;

export const NameContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  top: 242px;
  left: 16px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
`;

export const Name = styled.Text`
  font-size: 16px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
  z-index: 9999;
`;

export const Description = styled.Text`
  font-size: 14px;
  text-align: justify;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.DESCRIPTION};
`;

export const AddressButton = styled(TouchableOpacity)`
  position: absolute;
  align-self: center;
  bottom: 8px;
  height: 56px;
  width: 92%;
  padding-left: 16px;
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

export const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 16px 8px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
`;

export const Title = styled.Text`
  margin-left: 8px;
  justify-content: center;
  font-size: 14px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
  z-index: 9999;
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
