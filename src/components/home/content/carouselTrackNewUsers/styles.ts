import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity).attrs<TouchableOpacityProps>(
  () => ({
    touchableOpacity: 0,
  })
)`
    flex: 1;
    width: 156px;
    height: 156px;
    border-radius 78px;
    margin-right: 8px;
    overflow: hidden;
    margin-top: 4px
    

`;

export const Name = styled.Text`
  margin-top: 16px;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  font-family: ${({ theme }) => theme.FONTS.MEDIUM_TEXT};
`;
