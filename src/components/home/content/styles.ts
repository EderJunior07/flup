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
  align-items: center;
  justify-content: center;
  min-width: 112px;
  padding: 0 8px;
  height: 56px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;

export const LocationLabel = styled.Text`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM_TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_BUTTON};
`;

export const SaludationsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
`;

export const SaludationsTitle = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.BOLD_TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_BUTTON};
`;
