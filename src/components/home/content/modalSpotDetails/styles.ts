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
  background-color: ${({ theme }) => theme.COLORS.ALERT_50};
`;

export const ImageContainer = styled.View`
  flex: 1;
  width: 328px;
  height: 236px;
  margin-right: 8px;
  background-color: red;
`;
