import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.ALERT_50};
  padding: 24px 0;
`;

export const MessageContainer = styled.View`
  width: 100%;
  min-height: 132px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.ALERT_50};
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
