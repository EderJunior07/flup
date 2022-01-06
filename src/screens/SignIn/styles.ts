import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
    padding: 0 24px;
    justify-content: center;

`

export const Button = styled(RectButton)`
    width: 100%;
    height: 56px;
    border: 1px solid ${({theme}) => theme.COLORS.BORDER_COLOR}

`