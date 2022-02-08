import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 24px 0;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

export const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  padding: 0 16px;
  height: 42px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;

export const LocationLabel = styled.Text`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM_TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
`;

export const SaludationsContainer = styled.View`
  width: 100%;
  justify-content: center;
  padding: 16px;
`;

export const SaludationsTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const SaludationsDescription = styled.Text`
  font-size: 14px;
  margin-bottom: 16px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.DESCRIPTION};
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 14px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;
