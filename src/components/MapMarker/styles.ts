import theme from '@src/theme';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  overflow: hidden;
  width: 124px;
  height: 124px;
  border-radius: 62px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;
